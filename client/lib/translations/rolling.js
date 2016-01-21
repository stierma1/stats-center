
module.exports = function(key, num, dataSources, rename){
    var num = num || 0;
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Rolling";
    var buffer = [];
    var newSource = dataSource.bufferWithCount(num, 1);

    dataSources.get("creationMap").set(newName, key, [key, num], "rolling");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("rolling", module.exports);
}
