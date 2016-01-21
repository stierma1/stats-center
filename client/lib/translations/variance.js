var ss = require("simple-statistics");

module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Variance";

    var newSource = dataSource.map(function(val){
      return ss.variance(val);
    });

    dataSources.get("creationMap").set(newName, key, [key], "variance");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("variance", module.exports);
}
