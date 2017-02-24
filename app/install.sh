rm -rf platforms node_modules www plugins coverage cordova
mkdir www

#npm install -g cordova ionic
#ionic state reset
npm install
ionic prepare
cordova plugin remove mx.ferreyra.callnumber

wget https://github.com/Rohfosho/CordovaCallNumberPlugin/archive/master.zip
unzip master.zip
mv CordovaCallNumberPlugin-master CordovaCallNumberPlugin
rm master.zip

plugman install --platform android --project platforms/android/ --plugin CordovaCallNumberPlugin/
#plugman install --platform ios --project platforms/ios/ --plugin CordovaCallNumberPlugin/

rm -rf CordovaCallNumberPlugin

ionic build android
mv ./platforms/android/build/outputs/apk/android-debug.apk ./sofiapp.apk
