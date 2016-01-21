var ss = require("simple-statistics");

module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Min";

    var newSource = dataSource.map(function(val){
      return ss.min(val);
    });

    dataSources.get("creationMap").set(newName, key, [key], "min");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("min", module.exports);
}
