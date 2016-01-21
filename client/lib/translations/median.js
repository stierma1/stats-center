var ss = require("simple-statistics");

module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Median";

    var newSource = dataSource.map(function(val){
      return ss.median(val);
    });

    dataSources.get("creationMap").set(newName, key, [key], "median");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("median", module.exports);
}
