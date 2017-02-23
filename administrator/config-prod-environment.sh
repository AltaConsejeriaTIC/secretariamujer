sudo rm -rf /var/www/html/* /var/www/html/.*
sudo cp -r $HOME/secretariamujer/administrator/drupal/. /var/www/html/
#sudo mkdir /var/www/html/sites/default/files
#sudo mkdir /var/www/html/sites/default/files/translations
#sudo chmod -R 777 /var/www/html/sites/default/files
#sudo cp /var/www/html/sites/default/default.settings.php  /var/www/html/sites/default/settings.php
#sudo chmod 777 /var/www/html/sites/default/settings.php
sudo chown -R apache:apache /var/www/html/*
#sudo mysql -uroot -pSdmujer2017## < $HOME/secretariamujer/administrator/db/db-prod.sql
#sudo myslq -uroot -pSdmujer2017## < a2enmod rewrite
