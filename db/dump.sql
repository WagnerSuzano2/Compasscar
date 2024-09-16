-- Use this file to create your database using MySQL
CREATE SCHEMA IF NOT EXISTS `compasscar`;

USE `compasscar`;

CREATE TABLE IF NOT EXISTS `cars` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(45) NULL,
  `model` VARCHAR(45) NULL,
  `year` INT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `cars_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `car_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_car_id` (`car_id` ASC),
  CONSTRAINT `fk_cars_items_car_id`
    FOREIGN KEY (`car_id`)
    REFERENCES `cars` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;