var ss = require("simple-statistics");

module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Max";

    var newSource = dataSource.map(function(val){
      return ss.max(val);
    });

    dataSources.get("creationMap").set(newName, key, [key], "max");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("max", module.exports);
}
