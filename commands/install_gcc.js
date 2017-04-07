var Promise = require('bluebird');
var child = require('child_process');
var fs = require('fs');
var readFile = Promise.promisify(fs.readFile);
var path = require('path');
var config = require('../config');

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

module.exports = function(arg, generate, done) {
  console.log("let's install gcc!");
  var package = require(process.env.PWD + '/package.json');
  var sdkPath = package.SDKpath;
  var SDKversion = package.SDKversion;
  if (/^\.\//.test(package.SDKpath)) {
    sdkPath = process.env.PWD + package.SDKpath.replace('.', '');
  }
  var hasFile = false;
  console.log(sdkPath);
  return new Promise(function (resolve, reject) {

    var gccFile = sdkPath;

    if (process.platform === 'win32') {
      gccFile += '/gcc-arm-none-eabi.zip';
    } else {
      gccFile += '/gcc-arm-none-eabi.tar.bz2';
    }

    readFile(gccFile)
    .then(function() {
      hasFile = true;
      return resolve();
    })
    .catch(function() {
      hasFile = false;
      return resolve();
    });
  }).then(function() {
    if (!hasFile) {
      return new Promise(function (resolve, reject) {
        if (process.platform === 'darwin') {
          var gccUrl = config.gcc.source.darwin;
          var download = child.exec('wget ' + gccUrl + ' -O ' + sdkPath + '/gcc-arm-none-eabi.tar.bz2');
        } else if (process.platform === 'linux') {
          var gccUrl = config.gcc.source.linux;
          var download = child.exec('wget ' + gccUrl + ' -O ' + sdkPath + '/gcc-arm-none-eabi.tar.bz2');
        } else if (process.platform === 'win32') {
          var gccUrl = config.gcc.source.win32;
          var download = child.exec('wget ' + gccUrl + ' -O ' + sdkPath + '/gcc-arm-none-eabi.zip');
        }
        download.stderr.on('data', function(data) {
          console.log(data);
        });
        download.on('exit', function() {
          return resolve();
        });
      });
    } else {
      return true;
    }
  }).then(function() {
    if (process.platform === 'win32') {
      return readFile(sdkPath + '/gcc-arm-none-eabi.zip');
    } else {
      return readFile(sdkPath + '/gcc-arm-none-eabi.tar.bz2');
    }
  })
  .then(function() {
    return new Promise(function (resolve, reject) {
      var unzipCmd = 'mkdir gcc-arm-none-eabi && tar -xvf ./gcc-arm-none-eabi.tar.bz2';

      if (process.platform === 'win32') {
        return resolve();
        // unzipCmd = 'mkdir gcc-arm-none-eabi && unzip -o ./gcc-arm-none-eabi.zip -d ./gcc-arm-none-eabi';
      }

      var unzip = child.exec(unzipCmd, { cwd: sdkPath });

      unzip.stdout.on('data', function(data) {
        console.log(data);
      });
      unzip.stderr.on('data', function(data) {
        console.log(data);
      });
      unzip.on('exit', function() {
        return resolve();
      });

    });
  })
  .then(function() {
    return new Promise(function (resolve, reject) {
      var copyCmd = 'rm -rf ./tools/gcc/gcc-arm-none-eabi/ && mkdir ./tools/gcc/gcc-arm-none-eabi/ && mv ./gcc-arm-none-eabi-4_8-2014q3/* ./tools/gcc/gcc-arm-none-eabi/';
      if (process.platform === 'win32') {
        return resolve();
        // copyCmd = 'rm -rf ./tools/gcc/gcc-arm-none-eabi/ && mkdir ./tools/gcc/gcc-arm-none-eabi/ && cp -R ./gcc-arm-none-eabi/ ./tools/gcc/'
      }
      var copy = child.exec(copyCmd, { cwd: sdkPath });
      copy.stdout.on('data', function(data) {
        console.log(data);
      });
      copy.stderr.on('data', function(data) {
        console.log(data);
      });
      copy.on('exit', function() {
        return resolve();
      });
    });
  })
  .then(function() {
    if (process.platform === 'win32') {
      // child.exec('rm -rf ./gcc-arm-none-eabi/', { cwd: sdkPath });
    } else {
      child.exec('rm -rf ./gcc-arm-none-eabi-4_8-2014q3/ && rm -rf ./gcc-arm-none-eabi/', { cwd: sdkPath });
    }
    return true;
  })
  .then(function() {
    console.log('==============================================================');
    console.log('Success!'.green + ' Install gcc completely. ');
    console.log('==============================================================');
  })
  .catch(function(err) {
    return done({ message: err });
  });
}