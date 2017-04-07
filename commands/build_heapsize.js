var Promise = require('bluebird');
var child = require('child_process');
var fsExtra = require('fs-extra');
var path = require('path');
var fs = require('fs');

module.exports = function(arg, generate, done) {
  var package = require(process.env.PWD + '/package.json');
  var featureConfig = require(process.env.PWD + '/featureConfig.json');
  var sdkPath = package.SDKpath;
  var SDKversion = package.SDKversion;
  if (/^\.\//.test(package.SDKpath)) {
    sdkPath = process.env.PWD + package.SDKpath.replace('.', '');
  }

  return new Promise(function (resolve, reject) {
    return generate
    .create(path.join(__dirname, '../templates'), sdkPath)
    .createFile('./FreeRTOSConfig.h', '/project/mt7697_hdk/apps/wifi_demo/inc/FreeRTOSConfig.h', {
      TOTAL_HEAP_SIZE: featureConfig.TOTAL_HEAP_SIZE || 105,
    }, function() {
      return resolve();
    });
  }).then(function() {
    console.log('==============================================================');
    console.log('Success!'.green + ' Reset sdk completely. ');
    console.log('==============================================================');
  })

}