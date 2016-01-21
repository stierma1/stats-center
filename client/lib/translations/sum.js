var ss = require("simple-statistics");

module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Sum";

    var newSource = dataSource.map(function(val){
      return ss.sum(val);
    });

    dataSources.get("creationMap").set(newName, key, [key], "sum");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("sum", module.exports);
}
