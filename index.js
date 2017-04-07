module.exports = {
  'init:mt7697': {
    source: require('./commands/init_mt7697'),
    description: 'init mt7697 env',
  },
  'build:init': {
    source: require('./commands/build_init'),
    description: 'Reset mt7687 build env',
  },
  'parse:js' : {
    source: require('./commands/parse_js'),
    description: 'parse all js lib',
  },
  'build:js2c': {
    source: require('./commands/build_js2c'),
    description: 'build a c file from js',
  },
  'build:js' : {
    source: require('./commands/build_js'),
    description: 'build a js file',
  },
  'build:bin' : {
    source: require('./commands/build_bin'),
    description: 'build binary',
  },
  'install:gcc' : {
    source: require('./commands/install_gcc'),
    description: 'install gcc',
  },
  'install:ml' : {
    source: require('./commands/install_ml'),
    description: 'install ml',
  },
  'build:heapsize' : {
    source: require('./commands/build_heapsize'),
    description: 'build heap size',
  },
  'burn:mt76x7_uploader' : {
    source: require('./commands/burn_mt76x7_uploader'),
    description: 'mt76x7_uploader tool',
  },
}