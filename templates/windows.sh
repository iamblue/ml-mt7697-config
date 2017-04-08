cd sdk && unzip ./LinkIt_SDK_V4.2.0_public_ml.zip
cp -R ./LinkIt_SDK_V4.2.0_public_ml/* ./
cp ./LinkIt_SDK_V4.2.0_public_ml/.[^.]* ./
cd ..
ml install:gcc
rm -r ./sdk/LinkIt_SDK_V4.2.0_public_ml
cd ./sdk/tools/gcc && mkdir gcc-arm-none-eabi
cd ../..
cp ./gcc-arm-none-eabi.zip ./tools/gcc/gcc-arm-none-eabi
cd ./tools/gcc/gcc-arm-none-eabi && unzip ./gcc-arm-none-eabi.zip
cd ../../../..