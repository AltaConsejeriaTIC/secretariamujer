#!/bin/sh
npm install
sudo apt install php -y
sudo apt install php7.0-gd php7.0-mysql php7.0-dom -y
sudo apt install mysql-server -y
echo "drop database appsofia" | mysql -u root -ptoor
echo "create database appsofia" | mysql -u root -ptoor
mysql -u root -ptoor < db/db.sql

sudo cp 000-default.conf /etc/apache2/sites-enabled
