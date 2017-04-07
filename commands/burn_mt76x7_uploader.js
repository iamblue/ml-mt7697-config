var child = require('child_process');
var path = require('path');

module.exports = function(arg, generate, done) {
  var uploaderUrl = path.join(__dirname, '../commands/burn');
  var featureConfig = require(process.env.PWD + '/featureConfig');
  var downloadPath = process.env.PWD + '/node_modules/ml-mt7697-config/downloads';

  var burn;
  if (process.platform === 'win32') {
    burn = child.exec('upload.exe -c ' + featureConfig.download_port + ' -f ./wifi_demo.bin -t cm4 -p mt7687', { cwd: downloadPath });

  } else {
    burn = child.exec('python ./upload.py -c ' + featureConfig.download_port + ' -f ./wifi_demo.bin -t cm4 -p mt7697', { cwd: downloadPath });
  }

  burn.stdout.on('data', function(data) {
    console.log(data);
  });
  burn.stderr.on('data', function(data) {
    console.log(data);
  });
  burn.on('exit', function() {
    console.log('==============================================================');
    console.log('Success!'.green + ' Download! ');
    console.log('==============================================================');
  });
}