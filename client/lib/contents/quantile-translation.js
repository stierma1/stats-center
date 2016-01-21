var $ = require("jquery");

module.exports = function(dataSources, utils){

  var contentFactory = {
    load : function(rerender){
      var value = [];
      var suppressRerender = false;
      var quantileTrans = dataSources.get("translations").get("quantile");

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

          var quantileField = $("<input type='text'></input>");
          var renameField = $("<input type='text'></input>")

          var createButton = $("<input type='button' value='Create'></input>")
            .click(function(){
              var source = sourceSelect.val();
              var quant = parseFloat(quantileField.val());
              var name = renameField.val();

              if(source && quant >= 0 && quant <= 1){
                quantileTrans(source, quant, dataSources, name);
              }
            });

          return $("<span></span>")
            .append($("<div>Quantile Translation</div>"))
            .append($("<div></div>").append($("<span>Source: </span>")).append(sourceSelect))
            .append($("<div></div>").append($("<span>Quantile: </span>")).append(quantileField))
            .append($("<div></div>").append($("<span>Name: </span>")).append(renameField))
            .append(createButton);

        }, unload: function(){
          suppressRerender = true;
          dataSources.removeListener("change", handler);
        }
      };
    }
  };

  dataSources.get("contentTypes").set("quantile-translation", contentFactory);
}
