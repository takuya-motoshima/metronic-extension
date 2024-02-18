CREATE DATABASE IF NOT EXISTS metronic_db DEFAULT CHARACTER SET utf8mb4;
USE metronic_db;

CREATE TABLE folder (
  id int unsigned NOT NULL AUTO_INCREMENT,
  parent int unsigned DEFAULT NULL COMMENT 'For the root folder, it is NULL because there is no parent folder.',
  `text` varchar(20) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY ukFolderText (parent, `text`),
  CONSTRAINT fkFolderParent FOREIGN KEY (parent) REFERENCES folder (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE file (
  id int unsigned NOT NULL AUTO_INCREMENT,
  folderId int unsigned NOT NULL,
  `text` varchar(20) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY ukFileText (folderId, `text`),
  CONSTRAINT fkFileFolder FOREIGN KEY (folderId) REFERENCES folder (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE person (
  id int unsigned NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  position varchar(50) NOT NULL,
  office varchar(50) NOT NULL,
  age tinyint unsigned NOT NULL,
  startDate date NOT NULL,
  salary decimal(10,2) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;