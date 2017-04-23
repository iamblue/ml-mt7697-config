![](https://github.com/iamblue/ml-mt7697-config/blob/master/microlattice_7697.png?raw=true) 

[中文](https://iamblue.gitbooks.io/microlattice-js-for-linkit-rtos/content/zh-TW/intro/create/mt7697.html)
## Install Microlattice Env 

* Please prepare Node.js ( >= 6 ) env
* Install [cp2102p driver](http://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers) 
* npm install microlattice -g
* mkdir testSDK && cd testSDK
* ml create
* Edit featureConfig.json:
```
{
"IC_CONFIG": "mt7697",
"BOARD_CONFIG": "mt7697_hdk"
}
```
* npm install ml-mt7697-config --save
* ml init:mt7697
* npm i

## Install mt7697 sdk for microlattice

### Mac/Linux User

* Download [SDK](https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/Mediatek-Cloud/LinkIt_SDK_V4.2.0_public_ml.zip) and put this file into ./sdk folder
* npm run installEnv

### Windows User

* Download [SDK](https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/Mediatek-Cloud/LinkIt_SDK_V4.2.0_public_ml.zip) and put this file into ./sdk folder
* Download [GCC](https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q3-update/+download/gcc-arm-none-eabi-4_8-2014q3-20140805-win32.zip) and rename this file to `gcc-arm-none-eabi.zip` and put it into ./sdk
* npm run installEnv
* sh ./windows.sh
* Connect MT7697 to your computer, go to "Console" -> "All Console Items" -> "System" -> "Device Manager" -> "Connect to CO"M -> Find Silicon labs ... (COMXX) and paste this COMXX into ./featureConfig.json "download_port" field.

## Build and Burn into your mt7697
* Edit index.js:
```
print('Hello world!');
```
* npm run build
(This script will build an image and burn it into your MT7697)
* open your screen (mac/linux) or Putty (windows), you will see `hello world` !!
