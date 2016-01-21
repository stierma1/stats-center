var $ = require("jquery");

module.exports = function(dataSources, utils){

  var contentFactory = {
    load : function(rerender){
      var value = [];
      var suppressRerender = false;
      var batchTrans = dataSources.get("translations").get("batch");

      var handler = function(val){
        value = dataSources.keys().filter(function(val){
          return !utils.isCoreDataSource(val);
        });
        if(!suppressRerender){
          setTimeout(function(){rerender();},0);
        }
      };

      dataSources.on("change", handler);
      dataSources.once("subscribed", handler);
      dataSources.emit("subscribe");

      return {
        render : function(){
          var sourceSelect = $("<select></select>");

          value.map(function(key){
            sourceSelect
              .append($("<option></option>")
              .attr("value",key)
              .text(key));
          });

          var batchSizeField = $("<input type='text'></input>");
          var renameField = $("<input type='text'></input>")

          var createButton = $("<input type='button' value='Create'></input>")
            .click(function(){
              var source = sourceSelect.val();
              var batchSize = parseInt(batchSizeField.val());
              var name = renameField.val();

              if(source && batchSize !== NaN){
                batchTrans(source, batchSize, dataSources, name);
              }
            });

          return $("<span></span>")
            .append($("<div></div>").append($("<span>Source: </span>")).append(sourceSelect))
            .append($("<div></div>").append($("<span>Batch Size: </span>")).append(batchSizeField))
            .append($("<div></div>").append($("<span>Name: </span>")).append(renameField))
            .append(createButton);

        }, unload: function(){
          suppressRerender = true;
          dataSources.removeListener("change", handler);
        }
      };
    }
  };

  dataSources.get("contentTypes").set("batch-translation", contentFactory);
}
