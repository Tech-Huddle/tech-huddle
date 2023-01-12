CREATE DATABASE IF NOT EXISTS test;
USE test;
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
);