
module.exports = function(key, num, dataSources, rename){
    var num = num || 0;
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Batch";
    var buffer = [];
    var newSource = dataSource.bufferWithCount(num);

    dataSources.get("creationMap").set(newName, key, [key, num], "batch");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("batch", module.exports);
}
