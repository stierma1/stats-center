var ss = require("simple-statistics");

module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Mode";

    var newSource = dataSource.map(function(val){
      return ss.mode(val);
    });

    dataSources.get("creationMap").set(newName, key, [key], "mode");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("mode", module.exports);
}
