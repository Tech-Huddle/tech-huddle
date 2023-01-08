# TECH-HUDDLE
This is a poc for back-end node js project

## Pre-requisit

 - node.js v^16.0.1
 - mysql v^5.7

## START THE APP
To start the app user `npm start`
## .env file veriables with example
PORT=5000
DBHOST=127.0.0.1
DBUSER=root
DBPASSWPRD=root
DBNAME=testdb
## api documentation
https://documenter.getpostman.com/view/18393491/2s8Z75SVSo

## tablre creation command
`CREATE TABLE `task` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
)`