-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: discord
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `id` varchar(36) NOT NULL,
  `name` varchar(32) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `creatorId` varchar(255) NOT NULL,
  `guildId` varchar(255) NOT NULL,
  `filterProfanity` tinyint NOT NULL,
  `firstMessageId` varchar(255) NOT NULL,
  `lastMessageId` varchar(255) NOT NULL,
  `summary` varchar(128) NOT NULL,
  `position` int NOT NULL,
  `userIds` text NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'TEXT',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
INSERT INTO `channel` VALUES ('channel_id_1','Channel 1','2022-01-01 00:00:00.000000','user_id_1','guild_id_1',1,'first_message_id_1','last_message_id_1','channel_summary_1',1,'user_id_1,user_id_2','TEXT'),('channel_id_2','Channel 2','2022-01-02 00:00:00.000000','user_id_1','guild_id_1',0,'first_message_id_2','last_message_id_2','channel_summary_2',2,'user_id_1,user_id_2','VOICE'),('channel_id_3','Example Channel 3','2022-01-03 00:00:00.000000','user_id_3','guild_id_1',0,'first_message_id_3','last_message_id_3','Example summary 3',3,'user_ids_3','DM'),('channel_id_4','Example Channel 4','2022-01-04 00:00:00.000000','user_id_4','guild_id_1',1,'first_message_id_4','last_message_id_4','Example summary 4',4,'user_ids_4','TEXT');
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guild`
--

DROP TABLE IF EXISTS `guild`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guild` (
  `id` varchar(36) NOT NULL,
  `name` varchar(32) NOT NULL,
  `iconURL` varchar(255) NOT NULL,
  `ownerId` varchar(255) NOT NULL,
  `systemChannelId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guild`
--

LOCK TABLES `guild` WRITE;
/*!40000 ALTER TABLE `guild` DISABLE KEYS */;
INSERT INTO `guild` VALUES ('guild_id_1','Guild 1','https://example.com/icon1.jpg','user_id_1','system_channel_id_1','2022-01-01 00:00:00.000000'),('guild_id_2','Guild 2','https://example.com/icon2.jpg','user_id_2','system_channel_id_2','2022-01-02 00:00:00.000000');
/*!40000 ALTER TABLE `guild` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guild_member`
--

DROP TABLE IF EXISTS `guild_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guild_member` (
  `id` varchar(36) NOT NULL,
  `guildId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `roleIds` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guild_member`
--

LOCK TABLES `guild_member` WRITE;
/*!40000 ALTER TABLE `guild_member` DISABLE KEYS */;
INSERT INTO `guild_member` VALUES ('guild_member_id_1','guild_id_1','user_id_1','role_id_1,role_id_4','2022-01-01 00:00:00.000000'),('guild_member_id_2','guild_id_1','user_id_3','role_id_4,role_id_3','2022-01-02 00:00:00.000000'),('guild_member_id_3','guild_id_1','user_id_2','role_id_1','2022-01-01 00:00:00.000000'),('guild_member_id_4','guild_id_1','user_id_4','role_id_1','2022-02-02 00:00:00.000000');
/*!40000 ALTER TABLE `guild_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invite`
--

DROP TABLE IF EXISTS `invite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invite` (
  `id` varchar(36) NOT NULL,
  `inviteCode` varchar(32) NOT NULL,
  `inviterId` varchar(255) NOT NULL,
  `guildId` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `uses` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invite`
--

LOCK TABLES `invite` WRITE;
/*!40000 ALTER TABLE `invite` DISABLE KEYS */;
INSERT INTO `invite` VALUES ('invite_id_1','example_invite_code_1','user_id_1','guild_id_1','2022-01-01 00:00:00.000000',0),('invite_id_2','example_invite_code_2','user_id_1','guild_id_1','2022-01-02 00:00:00.000000',0);
/*!40000 ALTER TABLE `invite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `last_message`
--

DROP TABLE IF EXISTS `last_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `last_message` (
  `id` varchar(36) NOT NULL,
  `channelId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `messageId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `last_message`
--

LOCK TABLES `last_message` WRITE;
/*!40000 ALTER TABLE `last_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `last_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` varchar(36) NOT NULL,
  `attachmentURL` text,
  `authorId` varchar(255) NOT NULL,
  `channelId` varchar(255) NOT NULL,
  `content` varchar(3000) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `system` tinyint NOT NULL DEFAULT '0',
  `type` varchar(255) NOT NULL,
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `embedDescription` varchar(255) DEFAULT NULL,
  `embedImageurl` varchar(255) DEFAULT NULL,
  `embedTitle` varchar(255) DEFAULT NULL,
  `embedUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` varchar(36) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT '@everyone',
  `color` varchar(7) NOT NULL DEFAULT '#FFFFFF',
  `hoisted` tinyint NOT NULL,
  `mentionable` tinyint NOT NULL,
  `position` int NOT NULL,
  `permissions` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `guildId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('role_id_1','@everyone','#FF0000',1,1,1,0,'2022-01-01 00:00:00.000000','guild_id_1'),('role_id_2','example role 2','#00FF00',0,1,2,0,'2022-01-02 00:00:00.000000','guild_id_2'),('role_id_3','Example Role 3','#0000FF',1,0,3,0,'2022-01-03 00:00:00.000000','guild_id_1'),('role_id_4','Example Role 4','#FFFF00',0,0,4,0,'2022-01-04 00:00:00.000000','guild_id_1');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theme`
--

DROP TABLE IF EXISTS `theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theme` (
  `id` varchar(36) NOT NULL,
  `code` varchar(32) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(32) NOT NULL,
  `creatorId` varchar(255) NOT NULL,
  `style` varchar(10000) NOT NULL,
  `isFeatured` tinyint NOT NULL,
  `iconURL` varchar(255) NOT NULL,
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d39e888e20592fb5fb0ff9c2f0` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theme`
--

LOCK TABLES `theme` WRITE;
/*!40000 ALTER TABLE `theme` DISABLE KEYS */;
INSERT INTO `theme` VALUES ('theme_id_1','example_code_1','2022-01-01 00:00:00.000000','Example Theme 1','user_id_1','example_style_1',1,'https://example.com/icon1','2023-05-26 16:47:31.360250'),('theme_id_2','example_code_2','2022-01-02 00:00:00.000000','Example Theme 2','user_id_2','example_style_2',0,'https://example.com/icon2','2023-05-26 16:47:31.361237');
/*!40000 ALTER TABLE `theme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `activeThemeId` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '0',
  `avatarURL` varchar(150) NOT NULL,
  `isBot` tinyint NOT NULL DEFAULT '0',
  `discriminator` int NOT NULL DEFAULT '0',
  `premium` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `badge` text NOT NULL,
  `guildIds` text NOT NULL,
  `voice` varchar(255) DEFAULT NULL,
  `verified` tinyint NOT NULL DEFAULT '0',
  `locked` tinyint NOT NULL DEFAULT '0',
  `premiumExpirationDate` timestamp NOT NULL,
  `email` varchar(150) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'OFFLINE',
  `ignoredChannelids` text NOT NULL,
  `ignoredGuildids` text NOT NULL,
  `ignoredUserids` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('user_id_1','theme_id_1','John Doe',1,'https://example.com/avatar.jpg',0,1234,1,'2022-01-01 00:00:00.000000','badge_text','guild_id_1,guild_id_2','voice_channel_id',1,0,'2022-12-31 17:00:00','johndoe@example.com','ONLINE','channel_id_1,channel_id_2','guild_id_5',''),('user_id_2','theme_id_2','Jane Smith',0,'https://example.com/avatar2.jpg',1,5678,0,'2022-01-02 00:00:00.000000','badge_text_2','guild_id_1,guild_id_2,guild_id_3',NULL,0,1,'2023-12-31 17:00:00','janesmith@example.com','OFFLINE','','',''),('user_id_3','theme_id_3','Bob Johnson',1,'https://example.com/avatar3.jpg',0,4321,1,'2022-01-03 00:00:00.000000','badge_text_3','guild_id_1,guild_id_3','voice_channel_id_2',1,0,'2024-12-31 17:00:00','bobjohnson@example.com','ONLINE','channel_id_1','',''),('user_id_4','theme_id_4','Sarah Lee',0,'https://example.com/avatar4.jpg',1,8765,0,'2022-01-04 00:00:00.000000','badge_text_4','guild_id_3,guild_id_4',NULL,0,1,'2025-12-31 17:00:00','sarahlee@example.com','OFFLINE','channel_id_2','','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-27  0:49:08
