var ss = require("simple-statistics");

module.exports = function(key, quantile, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Quantile";

    var newSource = dataSource.map(function(val){
      return ss.quantile(val, quantile);
    });

    dataSources.get("creationMap").set(newName, key, [key, quantile], "quantile");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("quantile", module.exports);
}
