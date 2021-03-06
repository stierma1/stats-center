var ss = require("simple-statistics");

module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Mean";

    var newSource = dataSource.map(function(val){
      return ss.mean(val);
    });

    dataSources.get("creationMap").set(newName, key, [key], "mean");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("mean", module.exports);
}
