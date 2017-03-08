ionic build android --prod --release 
mv platforms/android/build/outputs/apk/android-release-unsigned.apk ./
echo "appporta" | jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name
zipalign -v 4 android-release-unsigned.apk app.apk

rm android-release-unsigned.apk

adb -d uninstall com.vivelabbogota.appsofia
adb -d install app.apk 
