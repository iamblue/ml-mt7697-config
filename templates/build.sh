ml build:heapsize && ml build:js && ml build:init && ml build:js2c && rm -rf ./_output.js && rm -rf ./tmp

cd sdk && ./build.sh mt7697_hdk wifi_demo bl

cp ./out/mt7697_hdk/wifi_demo/wifi_demo.bin ../node_modules/ml-mt7697-config/downloads

cd .. && ml burn:mt76x7_uploader
