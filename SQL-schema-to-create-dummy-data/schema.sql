--schemas

CREATE TABLE `authors` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL COLLATE 'utf8_unicode_ci',
	`email` VARCHAR(100) NOT NULL COLLATE 'utf8_unicode_ci',
	`added` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `email` (`email`)
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB;


CREATE TABLE `posts` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`author_id` INT(11) NOT NULL,
	`title` VARCHAR(255) NOT NULL COLLATE 'utf8_unicode_ci',
	`content` TEXT NOT NULL COLLATE 'utf8_unicode_ci',
        `finished` BOOLEAN,
	`date` DATE NOT NULL,
	PRIMARY KEY (`id`),
        FOREIGN KEY(`author_id`) REFERENCES authors(`id`)
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB;

