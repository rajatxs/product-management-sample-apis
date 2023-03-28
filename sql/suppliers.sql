CREATE TABLE IF NOT EXISTS `suppliers`(
   id INT(8) AUTO_INCREMENT,
   name VARCHAR(46) NOT NULL, 
   email VARCHAR(64) UNIQUE NOT NULL,
   password_hash TEXT NOT NULL,
   phone VARCHAR(12) UNIQUE,
   address TEXT,
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

   PRIMARY KEY(id)
);
