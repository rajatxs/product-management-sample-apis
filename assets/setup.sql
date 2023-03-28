/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE `suppliers` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(46) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password_hash` text NOT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `suppliers` (`id`, `name`, `email`, `password_hash`, `phone`, `address`, `created_at`) VALUES
(13, 'User 1', 'user1@example.com', '$2a$10$DSSalqI/izTEXopsJTr/nORQ/sP.MkS2xskjBQ.WBsmzLshhVLww2', NULL, NULL, '2023-03-28 11:44:05');
INSERT INTO `suppliers` (`id`, `name`, `email`, `password_hash`, `phone`, `address`, `created_at`) VALUES
(14, 'User 2', 'user2@example.com', '$2a$10$GtlqtdN54bFMv7xwpU4DXepKjFuU4yMSJR7XJ21wbzaTSU/8u12Rm', NULL, NULL, '2023-03-28 13:48:21');
INSERT INTO `suppliers` (`id`, `name`, `email`, `password_hash`, `phone`, `address`, `created_at`) VALUES
(15, 'User 3', 'user3@example.com', '$2a$10$g2S10QF3xXEakPXXiCCT5OxGt0zMXCbSobemZK/EbQxfq553mBi56', NULL, NULL, '2023-03-28 13:48:27');
INSERT INTO `suppliers` (`id`, `name`, `email`, `password_hash`, `phone`, `address`, `created_at`) VALUES
(17, 'User 4', 'user4@example.com', '$2a$10$PY01UA0PRguXR4UXAh19juIHmq.qL/wURn7Gg9Pp5cEOHDGXoFoN.', NULL, 'ABC', '2023-03-28 13:48:57'),
(19, 'User 5', 'user5@example.com', '$2a$10$Fydt1RimNxs0QcavZMV5DeAx62/b.UzMBsETQolMeulcRNnkwqnsK', '911010101010', 'ABC', '2023-03-28 13:49:33');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `sku` varchar(46) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `products` (`id`, `name`, `price`, `sku`, `supplier_id`, `created_at`, `updated_at`) VALUES
(1, 'Product 1.2', 20.00, 'PROD1', 13, '2023-03-28 13:04:52', '2023-03-28 13:38:59');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `supplier_id`, `created_at`, `updated_at`) VALUES
(3, 'Product 2', 24.00, 'PROD2', 13, '2023-03-28 13:38:05', '2023-03-28 13:38:05');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `supplier_id`, `created_at`, `updated_at`) VALUES
(4, 'Product 2', 24.00, 'PROD2', 19, '2023-03-28 13:50:34', '2023-03-28 13:50:34');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `supplier_id`, `created_at`, `updated_at`) VALUES
(5, 'Product 12', 50.00, 'PROD12', 19, '2023-03-28 13:51:19', '2023-03-28 13:51:19');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
