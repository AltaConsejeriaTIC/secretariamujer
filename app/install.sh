rm -rf platforms node_modules www plugins coverage cordova
npm install -g cordova ionic
npm install
ionic state reset
ionic prepare
cordova plugin remove mx.ferreyra.callnumber

wget https://github.com/Rohfosho/CordovaCallNumberPlugin/archive/master.zip
unzip master.zip
mv CordovaCallNumberPlugin-master CordovaCallNumberPlugin
rm master.zip

plugman install --platform android --project platforms/android/ --plugin $HOME/CordovaCallNumberPlugin/
plugman install --platform ios --project platforms/ios/ --plugin $HOME/CordovaCallNumberPlugin/

rm -rf CordovaCallNumberPlugin
