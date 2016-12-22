#!/bin/sh
npm install
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt install php -y
sudo apt install php7.0-gd php7.0-mysql php7.0-dom -y
sudo apt install mysql-server -y

echo "drop database appsofia" | mysql -u root -ptoor
echo "create database appsofia" | mysql -u root -ptoor
mysql -u root -ptoor < db/db.sql

sudo cp appsofia.com.conf /etc/apache2/sites-enabled
sudo cp ports.conf /etc/apache2
sudo a2enmod rewrite
sudo a2enmod headers
chmod 664 drupal/sites/default/settings.php
sudo chown -R :www-data drupal/*
sudo service apache2 restart
