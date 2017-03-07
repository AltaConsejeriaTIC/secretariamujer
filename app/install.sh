BUILD_TOOLS=$HOME/Library/Android/sdk/build-tools/25.0.2
ZIPALIGN_HOME=$HOME/Library/Android/sdk/build-tools/25.0.2/zipalign

#git reset --hard
git pull

rm -rf platforms node_modules www plugins coverage cordova
mkdir www

npm install -g cordova ionic plugman
npm install
ionic prepare
ionic plugin remove cordova-plugin-call-number
#cordova plugin add cordova-plugin-call-number
#cordova plugin remove cordova-sms-plugin
#cordova plugin add cordova-sms-plugin

plugman install --platform android --project platforms/android/ --plugin CordovaCallNumberPlugin/
plugman install --platform ios --project platforms/ios/ --plugin CordovaCallNumberPlugin/
#plugman install --platform android --project platforms/android/ --plugin cordova-sms-plugin-master/
#plugman install --platform ios --project platforms/ios/ --plugin cordova-sms-plugin-master/

cordova platform rm android
cordova platform add android@6.1.0

ionic build --prod --release
mkdir build 2>/dev/null
mv platforms/android/build/outputs/apk/android-release-unsigned.apk ./build

if [ -d "$BUILD_TOOLS" ]; then
echo "appsofia" | $BUILD_TOOLS/apksigner sign --ks appsofia.jks ./build/android-release-unsigned.apk
$BUILD_TOOLS/zipalign -v -p 4 ./build/android-release-unsigned.apk build/app.apk
rm build/android-release-unsigned.apk
fi


#adb -d uninstall com.vivelabbogota.appsofia
#adb -d install app.apk
