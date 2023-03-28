# Product Management Sample APIs

A collection of APIs including for supplier and products.

### Requirements
You need to install following tools in your system:
- [Node.js 18](https://nodejs.org)
- [MySQL 8](https://dev.mysql.com/downloads/mysql)
- [Postman API Tool](https://www.postman.com)

### Setup
You can follow this steps in sequence to complete setup:

Firstly you've to clone this repository in your local
```sh
git clone https://github.com/rajatxs/product-management-sample-apis.git pma
```

Change the current directory
```sh
cd pma
```

Install required dependencies
```sh
npm install
```
or
```sh
yarn install 
```

If you have setup MySQL in your system then your can run following SQL queries for initial migration:
```sql
CREATE DATABASE pma;
```
```sql
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
```
```sql
CREATE TABLE IF NOT EXISTS `products`(
   id INT(8) AUTO_INCREMENT,
   name VARCHAR(50),
   price DECIMAL(10,2),
   sku VARCHAR(46),
   supplier_id INT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   
   PRIMARY KEY(id),
   FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);
```
Create one file named **.env** in the project root, and update values based on your system config
```sh
# Server config
APP_HOST="localhost"
APP_PORT="5000"

# MySQL Database connection
APP_MYSQL_HOST="localhost"
APP_MYSQL_PORT="3306"
APP_MYSQL_USER="root"
APP_MYSQL_PSWD="1752"
APP_MYSQL_DB="pma"

# JWT Secrets
APP_JWT_SECRET="<WRITE YOUR SECRET HERE>"
```
Compile TypeScript code to JavaScript using
```sh
npm run build
```
Finally we can run API server
```sh
npm start
```
