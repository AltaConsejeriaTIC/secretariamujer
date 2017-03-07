BUILD_TOOLS=$HOME/Library/Android/sdk/build-tools/25.0.2
#BUILD_TOOLS=$HOME/bin/android/Sdk/build-tools/25.0.2
BUILD_FOLDER=./build

#git reset --hard
git pull

rm -rf platforms www plugins coverage cordova
mkdir www

#npm install -g cordova ionic
npm install
ionic prepare
cordova plugin add https://github.com/Rohfosho/CordovaCallNumberPlugin.git
#ionic plugin remove cordova-plugin-call-number
#cordova plugin add cordova-plugin-call-number
#cordova plugin remove cordova-sms-plugin
#cordova plugin add cordova-sms-plugin

#plugman install --platform android --project platforms/android/ --plugin CordovaCallNumberPlugin/
#plugman install --platform ios --project platforms/ios/ --plugin CordovaCallNumberPlugin/
#plugman install --platform android --project platforms/android/ --plugin cordova-sms-plugin-master/
#plugman install --platform ios --project platforms/ios/ --plugin cordova-sms-plugin-master/

#cordova platform rm android
#cordova platform add android@6.1.0

ionic build android --prod --release
mkdir $BUILD_FOLDER 2>/dev/null
mv platforms/android/build/outputs/apk/android-release-unsigned.apk $BUILD_FOLDER

if [ -d "$BUILD_TOOLS" ]; then
rm $BUILD_FOLDER/app.apk
echo "appsofia" | $BUILD_TOOLS/apksigner sign --ks appsofia.jks $BUILD_FOLDER/android-release-unsigned.apk
$BUILD_TOOLS/zipalign -v -p 4 $BUILD_FOLDER/android-release-unsigned.apk $BUILD_FOLDER/app.apk
rm $BUILD_FOLDER/android-release-unsigned.apk
fi

#adb -d uninstall com.vivelabbogota.appsofia
#adb -d install app.apk

#ionic build ios --prod --release
ionic build ios --prod --device --buildFlag="DEVELOPMENT_TEAM=7636LBL49U"
mv platforms/ios/build/device/SOFIApp.ipa $BUILD_FOLDER/
