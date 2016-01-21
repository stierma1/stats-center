
module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Count";

    var newSource = dataSource.map(function(val){
      return val.length;
    });

    dataSources.get("creationMap").set(newName, key, [key], "count");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("count", module.exports);
}
