rm -rf platforms node_modules www plugins coverage cordova
mkdir www

#npm install -g cordova ionic
#ionic state reset
npm install -g plugman
npm install
ionic prepare
cordova plugin remove cordova-plugin-call-number
cordova plugin add cordova-plugin-call-number
cordova plugin remove cordova-sms-plugin
cordova plugin add cordova-sms-plugin

#plugman install --platform android --project platforms/android/ --plugin CordovaCallNumberPlugin/
#plugman install --platform ios --project platforms/ios/ --plugin CordovaCallNumberPlugin/
#plugman install --platform android --project platforms/android/ --plugin cordova-sms-plugin-master/
#plugman install --platform ios --project platforms/ios/ --plugin cordova-sms-plugin-master/
