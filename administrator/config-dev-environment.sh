#!/bin/sh
npm install
sudo apt install php -y
sudo apt install php7.0-gd php7.0-mysql php7.0-dom -y
sudo apt install mysql-server -y
echo "create database appsofia" | mysql -u root -ptoor
mysql -u root -ptoor < db/db.sql