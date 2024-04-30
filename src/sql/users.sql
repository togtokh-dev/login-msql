CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wallet_id` varchar(500) NOT NULL,
  `wallet_status` tinyint(1) NOT NULL DEFAULT '1',
  `wallet_type` varchar(500) NOT NULL DEFAULT 'USER',
  `wallet_key` varchar(500) NOT NULL,
  `wallet_created_date` datetime NOT NULL,
  `wallet_name` varchar(255) DEFAULT NULL,
  `wallet_balance` decimal(12,2) NOT NULL DEFAULT '0.00',
  `wallet_balance_nande` decimal(12,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY ` id_UNIQUE` (`id`),
  UNIQUE KEY `wallet_id_UNIQUE` (`wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
