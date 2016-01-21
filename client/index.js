var $ = require("jquery");

module.exports = function(windowSlotsObj){
  var utils = windowSlotsObj.utils;
  var dataSources = windowSlotsObj.dataSources;
  require("./lib/translations/batch").initialize(dataSources);
  require("./lib/contents/batch-translation")(dataSources, utils);
  require("./lib/translations/rolling").initialize(dataSources);
  require("./lib/contents/rolling-translation")(dataSources, utils);
  require("./lib/translations/count").initialize(dataSources);
  require("./lib/contents/count-translation")(dataSources, utils);
  require("./lib/translations/max").initialize(dataSources);
  require("./lib/contents/max-translation")(dataSources, utils);
  require("./lib/translations/mean").initialize(dataSources);
  require("./lib/contents/mean-translation")(dataSources, utils);
  require("./lib/translations/median").initialize(dataSources);
  require("./lib/contents/median-translation")(dataSources, utils);
  require("./lib/translations/min").initialize(dataSources);
  require("./lib/contents/min-translation")(dataSources, utils);
  require("./lib/translations/mode").initialize(dataSources);
  require("./lib/contents/mode-translation")(dataSources, utils);
  require("./lib/translations/quantile").initialize(dataSources);
  require("./lib/contents/quantile-translation")(dataSources, utils);
  require("./lib/translations/standard-deviation").initialize(dataSources);
  require("./lib/contents/standard-deviation-translation")(dataSources, utils);
  require("./lib/translations/sum").initialize(dataSources);
  require("./lib/contents/sum-translation")(dataSources, utils);
  require("./lib/translations/variance").initialize(dataSources);
  require("./lib/contents/variance-translation")(dataSources, utils);
}
/*
$(document).ready(function(){
  var createWindowFrame = require("window-slots");
  var funcs = createWindowFrame($("body"));
  module.exports(funcs);
  funcs.createWindowSlot();
  funcs.loadContent("window-frame-editor",1);

  var t = '[{"key":"tRollingBatch","from":"tRolling","args":["tRolling",2],"type":"batch"},{"key":"tRolling","from":"t","args":["t",3],"type":"rolling"},{"key":"t","from":null,"args":[{"url":"http://jsonplaceholder.typicode.com/posts/1","method":"GET"},null],"type":"http-request"}]'
  var s = JSON.parse(t);

  funcs.buildCreationPath(s, funcs.dataSources)
});

*/
