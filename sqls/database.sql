-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kltn_spa
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` enum('customer','employee') NOT NULL DEFAULT 'customer',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a13e2234cf22b150ea2e72fba6` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'0329623380','$2a$10$7Vj/r.V6UzIhMfJwC8yEBu/6fKr3vLsJsAQPD04YJX9Un9JdtCmxG','employee','active'),(2,'0329623381','$2a$10$69rF8J7HKvHYXAvv71XjiehKWuf3VRlljFBt.8fky5Z.9R3mnfQf6','employee','active'),(3,'0329623382','$2a$10$ZaxWgWSz.cBqA3oD57eAbuoEN0q9zQOcQDRZMm8p3tw0tvdzuXvIu','employee','active'),(4,'0329623383','$2a$10$SrBIIgDrKkQ2dtWL/of2oujyTKhe5vWPJnHYj9BgA4wyeg6OEPw.C','employee','active'),(5,'0329623384','$2a$10$zPqQ8eFyFt35.KgjvRORd.nYMnzaQV.stvbAMsR7dv8KBsIxYgcAW','employee','active'),(6,'0329623385','$2a$10$4xFOQI7fSmZbOxBNZCv7S.FD.XZ18uQARo73ZLBQfRFoRUBHRR.9q','customer','active'),(7,'0329623386','$2a$10$/byj4vAzynanw0jpAxpT1.VDA.beN2n6ISHQH1Lvtq6syCkSJYzty','customer','active'),(8,'0329623387','$2a$10$qVFnoeWKPehlUIeKcmWPp.i64g.EFTeNekEMYB.iODeRSAOXf4RqK','customer','active'),(9,'0329623388','$2a$10$m19vqGuaQBul2.ODGNg/E.3sBwSV4ryDoGh/gcq8tRcQsbkTlp1ZK','customer','active'),(10,'0352014149','$2a$10$XJQKiomnTwOTcq8Q/k.pqOIt12JrdERyi2tkJwbuPsY3bfzaM8pha','customer','active'),(12,'0329623389','$2a$10$7Vj/r.V6UzIhMfJwC8yEBu/6fKr3vLsJsAQPD04YJX9Un9JdtCmxG','customer','active'),(13,'0256398745','$2a$10$x5Xa7oVuYfMhGEVGxuDJROrYDkymWIapsZrtT0aN9E65tPf9xDxjy','employee','active'),(14,'0256398788','$2a$10$6nWsVAFb6QPodfUKNIGrIOPcIeDkFk1lJ0a.b6yQyiTyxieqKYiWi','employee','active'),(15,'0256398777','$2a$10$hij69kQ/KiA6k4IB2MlucOqlvFZ81nybu5TnIeSBdN.gi9OaX7QaS','employee','active'),(16,'0328569985','$2a$10$y/Hnbz1BtAUitdwknPrVOuR3o/Xvh3.tleW3JtobarMMH4tBAyRY6','customer','active'),(17,'0325478896','$2a$10$6HpPnNHenilhu9FQ/jxXMu/a5.7sLt/gNnLVxu6R/F01lD8A2pSBG','customer','active'),(18,'0326589975','$2a$10$deSX98j6EL0j5wl0zXTdMevIIpjZDuvimbJINH7.D1z6afbk6hc4i','employee','active');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `category` enum('services','treatments') NOT NULL DEFAULT 'services',
  `serviceOrTreatmentId` int NOT NULL,
  `employeeId` int NOT NULL,
  `customerId` int NOT NULL,
  `branchId` int NOT NULL,
  `bedId` int NOT NULL,
  `status` enum('not_comfirm','confirmed','performing','finished','cancelled') NOT NULL DEFAULT 'confirmed',
  `bonusId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b6e57758a28acd843878b1f30d8` (`employeeId`),
  KEY `FK_d08b7b77e0f909c6e8723f07eaa` (`bedId`),
  KEY `FK_c048c6004b69354f46183f93a85` (`customerId`),
  KEY `FK_54e83867f2699998a25aa23e6ba` (`branchId`),
  KEY `FK_865c324af65a8a3e29764db7a8f` (`bonusId`),
  CONSTRAINT `FK_54e83867f2699998a25aa23e6ba` FOREIGN KEY (`branchId`) REFERENCES `branch` (`id`),
  CONSTRAINT `FK_865c324af65a8a3e29764db7a8f` FOREIGN KEY (`bonusId`) REFERENCES `bonus` (`id`),
  CONSTRAINT `FK_b6e57758a28acd843878b1f30d8` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`),
  CONSTRAINT `FK_c048c6004b69354f46183f93a85` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`),
  CONSTRAINT `FK_d08b7b77e0f909c6e8723f07eaa` FOREIGN KEY (`bedId`) REFERENCES `bed` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (2,'2024-11-01 21:00:00','services',1,1,1,1,71,'finished',1),(3,'2024-11-01 21:00:00','services',1,2,2,1,71,'finished',1),(4,'2024-11-01 21:00:00','services',2,4,4,2,71,'finished',1),(5,'2024-11-01 21:00:00','services',2,4,4,2,71,'finished',1),(6,'2024-11-01 21:00:00','services',3,4,4,2,71,'finished',1),(7,'2024-11-01 21:00:00','services',3,4,2,1,74,'finished',1),(8,'2024-11-01 21:00:00','services',4,2,3,1,77,'finished',1),(9,'2024-11-01 21:00:00','services',4,3,2,1,75,'finished',1),(10,'2024-11-01 21:00:00','services',5,3,4,1,72,'finished',1);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bed`
--

DROP TABLE IF EXISTS `bed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `roomId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6281e91aacd3728b560352ea961` (`roomId`),
  CONSTRAINT `FK_6281e91aacd3728b560352ea961` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bed`
--

LOCK TABLES `bed` WRITE;
/*!40000 ALTER TABLE `bed` DISABLE KEYS */;
INSERT INTO `bed` VALUES (71,'FR01','active',1),(72,'FR02','active',1),(73,'FR03','active',1),(74,'FR04','active',1),(75,'FR05','active',1),(76,'FR06','active',1),(77,'FR07','active',1),(78,'FR08','active',1),(79,'FR09','active',1),(80,'FR10','active',1),(81,'BCR01','active',2),(82,'BCR02','active',2),(83,'BCR03','active',2),(84,'BCR04','active',2),(85,'BCR05','active',2),(86,'BCR06','active',2),(87,'BCR07','active',2),(88,'BCR08','active',2),(89,'BCR09','active',2),(90,'BCR10','active',2),(91,'SMR01','active',3),(92,'SMR02','active',3),(93,'SMR03','active',3),(94,'SMR04','active',3),(95,'SMR05','active',3),(96,'SMR06','active',3),(97,'SMR07','active',3),(98,'SMR08','active',3),(99,'SMR09','active',3),(100,'SMR10','active',3),(101,'HNR01','active',4),(102,'HNR02','active',4),(103,'HNR03','active',4),(104,'HNR04','active',4),(105,'HNR05','active',4),(106,'HNR06','active',4),(107,'HNR07','active',4),(108,'HNR08','active',4),(109,'HNR09','active',4),(110,'HNR10','active',4),(111,'WR01','active',5),(112,'WR02','active',5),(113,'WR03','active',5),(114,'WR04','active',5),(115,'WR05','active',5),(116,'WR06','active',5),(117,'WR07','active',5),(118,'WR08','active',5),(119,'WR09','active',5),(120,'WR10','active',5),(121,'SBCR01','active',6),(122,'SBCR02','active',6),(123,'SBCR03','active',6),(124,'SBCR04','active',6),(125,'SBCR05','active',6),(126,'SBCR06','active',6),(127,'SBCR07','active',6),(128,'SBCR08','active',6),(129,'SBCR09','active',6),(130,'SBCR10','active',6),(131,'NAR01','active',7),(132,'NAR02','active',7),(133,'NAR03','active',7),(134,'NAR04','active',7),(135,'NAR05','active',7),(136,'NAR06','active',7),(137,'NAR07','active',7),(138,'NAR08','active',7),(139,'NAR09','active',7),(140,'NAR10','active',7);
/*!40000 ALTER TABLE `bed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bonus`
--

DROP TABLE IF EXISTS `bonus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bonus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `point` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bonus`
--

LOCK TABLES `bonus` WRITE;
/*!40000 ALTER TABLE `bonus` DISABLE KEYS */;
INSERT INTO `bonus` VALUES (1,100000,'active',1),(2,150000,'active',1);
/*!40000 ALTER TABLE `bonus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Beauty Spa','Bình Thạnh','active','image.png'),(2,'Beauty Spa','Gò Vấp','active','image.png'),(3,'Beauty Spa','Quận 1','active','image.png');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_history`
--

DROP TABLE IF EXISTS `card_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expense` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `prepaidCardId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4f1726d90a0a70ba8e85916caf4` (`prepaidCardId`),
  CONSTRAINT `FK_4f1726d90a0a70ba8e85916caf4` FOREIGN KEY (`prepaidCardId`) REFERENCES `prepaid_card` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_history`
--

LOCK TABLES `card_history` WRITE;
/*!40000 ALTER TABLE `card_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumed_product`
--

DROP TABLE IF EXISTS `consumed_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumed_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `content` varchar(255) NOT NULL,
  `branchId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ea766f2e8ba9e33f3726e8939e1` (`branchId`),
  KEY `FK_be0b9fbeef277b569de7ae1bb54` (`productId`),
  CONSTRAINT `FK_be0b9fbeef277b569de7ae1bb54` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_ea766f2e8ba9e33f3726e8939e1` FOREIGN KEY (`branchId`) REFERENCES `branch` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumed_product`
--

LOCK TABLES `consumed_product` WRITE;
/*!40000 ALTER TABLE `consumed_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumed_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `gender` tinyint NOT NULL,
  `dob` date DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'avatar.png',
  `accountId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_c97c8c28cd65bdc7a3dcd26af5` (`accountId`),
  UNIQUE KEY `IDX_03846b4bae9df80f19c76005a8` (`phone`),
  UNIQUE KEY `IDX_fdb2f3ad8115da4c7718109a6e` (`email`),
  CONSTRAINT `FK_c97c8c28cd65bdc7a3dcd26af5c` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Nguyễn Thị Hiền',1,'2003-04-11','0329623385','mail5@gmail.com','HCM City','avatar.png',6),(2,'Nguyễn Thị Như',1,'2003-04-11','0329623386','mail6@gmail.com','HCM City','avatar.png',7),(3,'Nguyễn Thị Ý',1,'2003-04-11','0329623387','mail7@gmail.com','HCM City','avatar.png',8),(4,'Nguyễn Thị Quỳnh',1,'2003-04-11','0329623388','mail8@gmail.com','HCM City','avatar.png',9),(5,'Tống Thị Minh Hợp',1,'2002-06-28','0352014149','min@gmail.com','HCM City','avatar.png',10),(6,'Full Name',1,'2002-05-06','0329623358','email@gmail.com','123 Main Street','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/a670be5a-2e9c-4d8f-9b13-9157b503d9a7-HP%20ProBook%20440%20G6.jpg',12),(7,'Demo3',1,'2024-10-30','0328569985','demo3@gmail.com','Demo3','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/107aa029-2b64-402b-aa08-c65033109354-HP%20ProBook%20440%20G6.jpg',16),(8,'Demo4update',0,'2024-10-30','0325478896','demo4update@gmail.com','Demo4update','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/980ffa73-7a26-43bd-9ddd-384da1797c1c-logoWord.png',17);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_gift`
--

DROP TABLE IF EXISTS `customer_gift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_gift` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` enum('gift','voucher') NOT NULL DEFAULT 'gift',
  `status` varchar(255) NOT NULL,
  `customerId` int NOT NULL,
  `giftId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_738dcd104e60f4add6ea66b80c9` (`customerId`),
  CONSTRAINT `FK_738dcd104e60f4add6ea66b80c9` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_gift`
--

LOCK TABLES `customer_gift` WRITE;
/*!40000 ALTER TABLE `customer_gift` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_gift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_event`
--

DROP TABLE IF EXISTS `detail_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `eventId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_317328f8a5331f5a19a9d0244d2` (`eventId`),
  CONSTRAINT `FK_317328f8a5331f5a19a9d0244d2` FOREIGN KEY (`eventId`) REFERENCES `events` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_event`
--

LOCK TABLES `detail_event` WRITE;
/*!40000 ALTER TABLE `detail_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_service`
--

DROP TABLE IF EXISTS `detail_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `serviceId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_80b755f34e5e43f039161853eed` (`serviceId`),
  CONSTRAINT `FK_80b755f34e5e43f039161853eed` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_service`
--

LOCK TABLES `detail_service` WRITE;
/*!40000 ALTER TABLE `detail_service` DISABLE KEYS */;
INSERT INTO `detail_service` VALUES (1,'Mô tả dịch vụ','balablabalabla1','image.png',1),(2,'Mô tả dịch vụ','balablabalabla2','image.png',2),(3,'Mô tả dịch vụ','balablabalabla3','image.png',3),(4,'Mô tả dịch vụ','balablabalabla4','image.png',4),(5,'Bước 1','làm bước 1','image.png',1);
/*!40000 ALTER TABLE `detail_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `details_appointment`
--

DROP TABLE IF EXISTS `details_appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `details_appointment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timeIn` time NOT NULL,
  `timeOut` time NOT NULL,
  `appointmentId` int NOT NULL,
  `bedId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_269ec2474c3ee29ea16e83ee7b0` (`appointmentId`),
  KEY `FK_7f11f7375fe3879250ff913906a` (`bedId`),
  CONSTRAINT `FK_269ec2474c3ee29ea16e83ee7b0` FOREIGN KEY (`appointmentId`) REFERENCES `appointment` (`id`),
  CONSTRAINT `FK_7f11f7375fe3879250ff913906a` FOREIGN KEY (`bedId`) REFERENCES `bed` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `details_appointment`
--

LOCK TABLES `details_appointment` WRITE;
/*!40000 ALTER TABLE `details_appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `details_appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `gender` tinyint NOT NULL,
  `dob` date DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` enum('admin','manager','employee') NOT NULL DEFAULT 'employee',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `image` varchar(255) NOT NULL DEFAULT 'avatar.png',
  `accountId` int NOT NULL,
  `wageId` int NOT NULL,
  `branchId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_0bac95278716cdb1057c9129fd` (`accountId`),
  KEY `FK_ff517a067283daf2108a38829b7` (`wageId`),
  KEY `FK_c36b6dc182259c56ee8c1cfecb3` (`branchId`),
  CONSTRAINT `FK_0bac95278716cdb1057c9129fdc` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`),
  CONSTRAINT `FK_c36b6dc182259c56ee8c1cfecb3` FOREIGN KEY (`branchId`) REFERENCES `branch` (`id`),
  CONSTRAINT `FK_ff517a067283daf2108a38829b7` FOREIGN KEY (`wageId`) REFERENCES `wage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Lê Thanh Toàn',1,'2002-04-08','0329623389','mail@gmail.com','HCM','manager','active','image.png',1,1,1),(2,'Lê Thanh Tú',1,'2002-04-09','0329623381','mail1@gmail.com','HCM','employee','active','image.png',2,2,1),(3,'Lê Thanh Tèo',1,'2002-04-10','0329623382','mail2@gmail.com','HCM','employee','active','image.png',3,2,1),(4,'Lê Thanh Táo',1,'2002-04-11','0329623383','mail3@gmail.com','HCM City','employee','active','image.png',4,2,1),(5,'Lê Thanh Tí',1,'2002-04-10','0329623384','mail4@gmail.com','HCM City','employee','active','image.png',5,2,1),(6,'Demoud',1,'2024-10-30','0256398745','demoud@gmail.com','Demoud','employee','active','image.png',13,2,1),(7,'Demo1',1,'2024-10-30','0256398788','demo1@gmail.com','Demo1','employee','active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/50d1ddb9-4fe1-4995-842f-b457235eedd5-HP%20ProBook%20440%20G6.jpg',14,2,1),(8,'DemoUpdate',0,'2024-10-30','0256398777','demoupdate@gmail.com','DemoUpdate','employee','active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/60d498ba-da9d-4a84-9ce3-ecfb7029b5f6-logoWord.png',15,2,1),(9,'Demo3',1,'2024-11-01','0326589975','demo3@gmail.com','demo3','employee','active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/7a470654-74ae-4158-ad4d-53c3f58f85df-logoWord.png',18,2,1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `expiryDate` datetime NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Kimbeautyspa','2024-11-01','2024-12-31 00:00:00','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/slide-main.png'),(2,'Làm đẹp nữa giá','2024-11-01','2024-12-31 00:00:00','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/slide-sale50.png'),(3,'trung thu','2024-11-01','2024-11-01 00:00:00','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/slide-trungthu.png');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gift`
--

DROP TABLE IF EXISTS `gift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gift` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `point` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gift`
--

LOCK TABLES `gift` WRITE;
/*!40000 ALTER TABLE `gift` DISABLE KEYS */;
INSERT INTO `gift` VALUES (1,'Mặt nạ dưỡng da',10,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/matnaduongda.jpg','active'),(2,'Sửa rửa mặt',15,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/suaruamat.jpg','active'),(3,'Serum dưỡng da',15,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/serumduongda.jpg','active'),(4,'Serum dưỡng da',15,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/serumduongda1.jfif','active'),(5,'Kem dưỡng da',15,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/kemduongda.jfif','active');
/*!40000 ALTER TABLE `gift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internal_expense`
--

DROP TABLE IF EXISTS `internal_expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internal_expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `branchId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8cdc4557e1542c5a8c286cdcf89` (`branchId`),
  CONSTRAINT `FK_8cdc4557e1542c5a8c286cdcf89` FOREIGN KEY (`branchId`) REFERENCES `branch` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internal_expense`
--

LOCK TABLES `internal_expense` WRITE;
/*!40000 ALTER TABLE `internal_expense` DISABLE KEYS */;
/*!40000 ALTER TABLE `internal_expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prepaid_card`
--

DROP TABLE IF EXISTS `prepaid_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prepaid_card` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cardNumber` varchar(255) NOT NULL,
  `balance` int NOT NULL,
  `issueDate` date NOT NULL,
  `expiryDate` date DEFAULT NULL,
  `status` enum('active','inactive','expired') NOT NULL DEFAULT 'active',
  `customerId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_43f20a04f7ec21735773dca95d` (`customerId`),
  CONSTRAINT `FK_43f20a04f7ec21735773dca95d1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prepaid_card`
--

LOCK TABLES `prepaid_card` WRITE;
/*!40000 ALTER TABLE `prepaid_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `prepaid_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `originalPrice` int NOT NULL,
  `price` int NOT NULL,
  `specialPrice` int NOT NULL,
  `commission` int NOT NULL,
  `applicableDate` date NOT NULL,
  `type` enum('service','product') NOT NULL DEFAULT 'service',
  `foreignKeyId` int NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,0,500000,300000,30000,'2024-10-19','service',1,'active'),(2,0,500000,400000,40000,'2024-10-19','service',2,'active'),(3,0,1500000,1200000,100000,'2024-10-19','service',3,'active'),(4,0,2000000,1700000,100000,'2024-10-19','service',4,'active'),(5,0,2500000,2300000,150000,'2024-10-19','service',5,'active'),(6,200000,600000,500000,50000,'2024-10-19','product',49,'active'),(7,250000,500000,400000,40000,'2024-10-19','product',50,'active'),(8,300000,700000,600000,60000,'2024-10-19','product',51,'active'),(9,350000,750000,700000,70000,'2024-10-19','product',52,'active'),(10,450000,700000,600000,60000,'2024-10-19','product',53,'active'),(11,0,800000,700000,70000,'2024-10-19','service',6,'active'),(12,0,1000000,900000,90000,'2024-10-19','service',7,'active'),(13,0,2000000,1900000,150000,'2024-10-19','service',8,'active'),(14,0,2500000,2400000,200000,'2024-10-19','service',9,'active'),(15,200000,500000,400000,40000,'2024-10-19','product',54,'active'),(16,250000,600000,500000,50000,'2024-10-19','product',55,'active'),(17,300000,700000,600000,60000,'2024-10-19','product',56,'active'),(18,500000,1000000,900000,90000,'2024-10-19','product',57,'active'),(19,0,6000000,5500000,200000,'2024-10-19','service',10,'active'),(20,0,4000000,3700000,150000,'2024-10-19','service',11,'active'),(21,0,5000000,4800000,180000,'2024-10-19','service',12,'active'),(22,100000,300000,200000,20000,'2024-10-19','product',58,'active'),(23,200000,500000,400000,40000,'2024-10-19','product',59,'active'),(24,300000,600000,500000,50000,'2024-10-19','product',60,'active'),(25,0,300000,250000,25000,'2024-10-19','service',13,'active'),(26,0,200000,150000,15000,'2024-10-19','service',14,'active'),(27,0,500000,450000,45000,'2024-10-19','service',15,'active'),(28,300000,500000,450000,45000,'2024-10-19','product',61,'active'),(29,500000,1000000,900000,90000,'2024-10-19','product',62,'active'),(30,200000,450000,400000,40000,'2024-10-19','product',63,'active'),(31,0,2500000,2300000,200000,'2024-10-19','service',16,'active'),(32,0,4000000,3500000,200000,'2024-10-19','service',17,'active'),(33,200000,500000,450000,45000,'2024-10-19','product',64,'active'),(34,600000,600000,550000,55000,'2024-10-19','product',65,'active'),(35,500000,1500000,1300000,130000,'2024-10-19','product',66,'active'),(36,0,6000000,5500000,300000,'2024-10-19','service',18,'active'),(37,0,3500000,3000000,200000,'2024-10-19','service',19,'active'),(38,400000,800000,750000,75000,'2024-10-19','product',67,'active'),(39,500000,1200000,1100000,100000,'2024-10-19','product',68,'active'),(40,300000,600000,550000,55000,'2024-10-19','product',69,'active'),(41,0,8000000,7500000,300000,'2024-10-19','service',20,'active'),(42,0,5000000,4600000,250000,'2024-10-19','service',21,'active'),(43,0,6000000,5400000,280000,'2024-10-19','service',22,'active'),(44,600000,1200000,1100000,100000,'2024-10-19','product',70,'active'),(45,1000000,2500000,2300000,150000,'2024-10-19','product',71,'active'),(46,500000,1500000,1300000,100000,'2024-10-19','product',72,'active');
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `serviceCategoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8392c4a9293209b44bbdddbeee4` (`serviceCategoryId`),
  CONSTRAINT `FK_8392c4a9293209b44bbdddbeee4` FOREIGN KEY (`serviceCategoryId`) REFERENCES `service_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (49,'CeraVe Hydrating Cleanser','active','image.png',1),(50,'Thayers Witch Hazel Toner','active','image.png',1),(51,'The Ordinary Hyaluronic Acid 2% + B5','active','image.png',1),(52,'La Roche-Posay Cicaplast Baume B5','active','image.png',1),(53,'Anessa Perfect UV Sunscreen Skincare Milk SPF 50+','active','image.png',1),(54,'Dove Deep Moisture Body Wash','active','image.png',2),(55,'St. Ives Apricot Scrub','active','image.png',2),(56,'Nivea Body Lotion Q10 Firming','active','image.png',2),(57,'L\'Occitane Aromachologie Relaxing Massage Oil','active','image.png',2),(58,'Vaseline Healing Jelly','active','image.png',3),(59,'Laneige Lip Sleeping Mask','active','image.png',3),(60,'Benefit Gimme Brow+ Volumizing Eyebrow Gel','active','image.png',3),(61,'OGX Coconut Milk Shampoo','active','image.png',4),(62,'Moroccanoil Treatment','active','image.png',4),(63,'O.P.I Nail Strengthener','active','image.png',4),(64,'Shiseido Perfect White Body Wash','active','image.png',5),(65,'Vaseline Healthy White UV Lightening','active','image.png',5),(66,'Relumins Advance White Glutathione Complex','active','image.png',5),(67,'Clarins Body Fit Anti-Cellulite Contouring Expert','active','image.png',6),(68,'Garcinia Cambogia','active','image.png',6),(69,'Teami Blends Detox Tea','active','image.png',6),(70,'Eucerin Hyaluron-Filler Day Cream','active','image.png',7),(71,'Estée Lauder Advanced Night Repair','active','image.png',7),(72,'Olay Regenerist Micro-Sculpting Cream','active','image.png',7);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Phòng chăm sóc da mặt (Facial Room)'),(2,'Phòng chăm sóc cơ thể (Body Care Room)'),(3,'Phòng phun xăm thẩm mỹ (Semi-permanent Makeup Room)'),(4,'Phòng chăm sóc tóc và móng (Hair and Nail Room)'),(5,'Phòng tắm trắng (Whitening Room)'),(6,'Phòng giảm béo và tạo hình (Slimming and Body Contouring Room'),(7,'Phòng thẩm mỹ không xâm lấn (Non-invasive Aesthetic Room)');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `shift` enum('morning','afternoon') NOT NULL DEFAULT 'morning',
  `checkInTime` time NOT NULL,
  `checkOutTime` time NOT NULL,
  `employeeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b81737400cce9875401177fd48b` (`employeeId`),
  CONSTRAINT `FK_b81737400cce9875401177fd48b` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,'2024-10-01','morning','07:00:00','15:00:00',1),(2,'2024-10-02','morning','07:00:00','15:00:00',1),(3,'2024-10-03','morning','07:00:00','15:00:00',1),(4,'2024-10-04','morning','07:00:00','15:00:00',1),(5,'2024-10-05','morning','07:00:00','15:00:00',1),(6,'2024-10-06','morning','07:00:00','15:00:00',1),(7,'2024-10-07','morning','07:00:00','15:00:00',1),(8,'2024-10-08','morning','07:00:00','15:00:00',1),(9,'2024-10-09','morning','07:00:00','15:00:00',1),(10,'2024-10-10','morning','07:00:00','15:00:00',1),(11,'2024-10-11','morning','07:00:00','15:00:00',1),(12,'2024-10-12','morning','07:00:00','15:00:00',1),(13,'2024-10-13','morning','07:00:00','15:00:00',1),(14,'2024-10-14','morning','07:00:00','15:00:00',1),(15,'2024-10-15','morning','07:00:00','15:00:00',1),(16,'2024-10-16','morning','07:00:00','15:00:00',1),(17,'2024-10-17','morning','07:00:00','15:00:00',1),(18,'2024-10-18','morning','07:00:00','15:00:00',1),(19,'2024-10-19','morning','07:00:00','15:00:00',1),(20,'2024-10-20','morning','07:00:00','15:00:00',1),(21,'2024-10-01','afternoon','15:00:00','23:00:00',2),(22,'2024-10-02','afternoon','15:00:00','23:00:00',2),(23,'2024-10-03','afternoon','15:00:00','23:00:00',2),(24,'2024-10-04','afternoon','15:00:00','23:00:00',2),(25,'2024-10-05','afternoon','15:00:00','23:00:00',2),(26,'2024-10-06','afternoon','15:00:00','23:00:00',2),(27,'2024-10-07','afternoon','15:00:00','23:00:00',2),(28,'2024-10-08','afternoon','15:00:00','23:00:00',2),(29,'2024-10-09','afternoon','15:00:00','23:00:00',2),(30,'2024-10-10','afternoon','15:00:00','23:00:00',2),(31,'2024-10-11','afternoon','15:00:00','23:00:00',2),(32,'2024-10-12','afternoon','15:00:00','23:00:00',2),(33,'2024-10-13','afternoon','15:00:00','23:00:00',2),(34,'2024-10-14','afternoon','15:00:00','23:00:00',2),(35,'2024-10-15','afternoon','15:00:00','23:00:00',2),(36,'2024-10-16','afternoon','15:00:00','23:00:00',2),(37,'2024-10-17','afternoon','15:00:00','23:00:00',2),(38,'2024-10-18','afternoon','15:00:00','23:00:00',2),(39,'2024-10-19','afternoon','15:00:00','23:00:00',2),(40,'2024-10-20','afternoon','15:00:00','23:00:00',2);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `duration` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `serviceCategoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7a1a6e2ccf2b42863d8142d306a` (`serviceCategoryId`),
  CONSTRAINT `FK_7a1a6e2ccf2b42863d8142d306a` FOREIGN KEY (`serviceCategoryId`) REFERENCES `service_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Làm sạch da (Facial cleansing)',45,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/lamsachda.jpg',1),(2,'Dưỡng ẩm, chống lão hóa',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/duongam-chonglaohoa.jpg',1),(3,'Peel da (tẩy tế bào chết hóa học)',30,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/peelda.jpg',1),(4,'Cấy collagen, cấy tảo',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/caytao.jpg',1),(5,'Trị nám, tàn nhang',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/trinam.jpg',1),(6,'Massage toàn thân',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/massage.jpg',2),(7,'Tẩy tế bào chết toàn thân',45,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/taytebao.jpg',2),(8,'Giảm béo, săn chắc cơ thể',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/giambeo.avif',2),(9,'Chăm sóc da tay, chân',30,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/chamsocdatay.jpg',2),(10,'Phun môi',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/phunmoi.jpg',3),(11,'Điêu khắc, phun lông mày',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/dieukhac.jpg',3),(12,'Phun mí mắt',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/phunmimat.jpg',3),(13,'Gội đầu, hấp dầu',45,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/image2.png',4),(14,'Làm móng (manicure, pedicure)',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/lammong.jpg',4),(15,'Sơn gel, đắp móng bột',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/songel.jpg',4),(16,'Tắm trắng body',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/tamtrangbody.jpg',5),(17,'Tắm trắng phi thuyền',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/tamtrang.jpg',5),(18,'Giảm béo công nghệ cao (RF, cavitation, hifu)',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/giambeocongnghecao.jpg',6),(19,'Massage giảm béo',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/massagegiambeo.jpg',6),(20,'Căng da mặt bằng chỉ',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/cangdabangchi.jpg',7),(21,'Tiêm filler, botox',30,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/tiemfiller.jpeg',7),(22,'Điều trị bằng laser (trị nám, trẻ hóa da)',45,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/dieutribanglaser.jpg',7),(23,'Service Demo',60,'active','newImage.png',1),(24,'Service Demo',60,'active','newImage.png',1),(25,'Service Demo',60,'active','ImageNew.png',1),(26,'Service Demo',60,'active','newImage.png',1),(27,'DemoUpdate',60,'active','https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/46d8044d-361e-4e5a-8c95-4bbb53afe344-Lenovo%20T14%20Gen%205.jpg',1);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_category`
--

DROP TABLE IF EXISTS `service_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `roomId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_f4b459f8da368795cd0ad77abb` (`roomId`),
  CONSTRAINT `FK_f4b459f8da368795cd0ad77abb9` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_category`
--

LOCK TABLES `service_category` WRITE;
/*!40000 ALTER TABLE `service_category` DISABLE KEYS */;
INSERT INTO `service_category` VALUES (1,'Dịch vụ chăm sóc da mặt',1),(2,'Dịch vụ chăm sóc cơ thể',2),(3,'Dịch vụ phun xăm thẩm mỹ',3),(4,'Dịch vụ chăm sóc tóc và móng',4),(5,'Dịch vụ tắm trắng và làm trắng da',5),(6,'Dịch vụ giảm béo và tạo hình cơ thể',6),(7,'Dịch vụ thẩm mỹ không xâm lấn',7);
/*!40000 ALTER TABLE `service_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_package`
--

DROP TABLE IF EXISTS `treatment_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment_package` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `numberOfTimes` int NOT NULL,
  `intervalBetweenTimes` int NOT NULL,
  `numberOfTimesPerformed` int NOT NULL,
  `price` int NOT NULL,
  `specialPrice` int NOT NULL,
  `downPayment` int NOT NULL,
  `commission` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_package`
--

LOCK TABLES `treatment_package` WRITE;
/*!40000 ALTER TABLE `treatment_package` DISABLE KEYS */;
/*!40000 ALTER TABLE `treatment_package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_service`
--

DROP TABLE IF EXISTS `treatment_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceOrder` int NOT NULL,
  `numberOfTimes` int NOT NULL,
  `treatmentId` int NOT NULL,
  `serviceId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e659b91fa2b14b60b0da092202b` (`treatmentId`),
  KEY `FK_817a45190895e3d8e4dc8665997` (`serviceId`),
  CONSTRAINT `FK_817a45190895e3d8e4dc8665997` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`),
  CONSTRAINT `FK_e659b91fa2b14b60b0da092202b` FOREIGN KEY (`treatmentId`) REFERENCES `treatment_package` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_service`
--

LOCK TABLES `treatment_service` WRITE;
/*!40000 ALTER TABLE `treatment_service` DISABLE KEYS */;
/*!40000 ALTER TABLE `treatment_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `discount` int NOT NULL,
  `minimumOrder` int NOT NULL,
  `maximumDiscount` int NOT NULL,
  `expiryDate` datetime NOT NULL,
  `point` int NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (1,5,500000,50000,'2024-12-31 00:00:00',10,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/Beige+Minimalist+Beauty+Gift+Voucher+Coupon+5%25.png'),(2,10,500000,100000,'2024-12-31 00:00:00',15,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/Beige+Minimalist+Beauty+Gift+Voucher+Coupon+10%25.png'),(3,15,500000,150000,'2024-12-31 00:00:00',20,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/Beige+Minimalist+Beauty+Gift+Voucher+Coupon+15%25.png'),(4,20,1000000,400000,'2024-12-31 00:00:00',25,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/Beige+Minimalist+Beauty+Gift+Voucher+Coupon+20%25.png'),(5,25,1000000,450000,'2024-12-31 00:00:00',30,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/Beige+Minimalist+Beauty+Gift+Voucher+Coupon+25%25.png'),(6,30,1000000,500000,'2024-12-31 00:00:00',35,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/Beige+Minimalist+Beauty+Gift+Voucher+Coupon+30%25.png'),(7,35,1500000,700000,'2024-12-31 00:00:00',40,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/Beige+Minimalist+Beauty+Gift+Voucher+Coupon+35%25.png'),(8,40,1500000,750000,'2024-12-31 00:00:00',45,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/Beige+Minimalist+Beauty+Gift+Voucher+Coupon+40%25.png'),(9,45,1500000,800000,'2024-12-31 00:00:00',50,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/Beige+Minimalist+Beauty+Gift+Voucher+Coupon+45%25.png'),(10,50,2000000,1500000,'2024-12-31 00:00:00',55,'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/Beige+Minimalist+Beauty+Gift+Voucher+Coupon+50%25.png');
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wage`
--

DROP TABLE IF EXISTS `wage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hourlyRate` int NOT NULL,
  `effectiveDate` date NOT NULL,
  `role` enum('admin','manager','employee') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wage`
--

LOCK TABLES `wage` WRITE;
/*!40000 ALTER TABLE `wage` DISABLE KEYS */;
INSERT INTO `wage` VALUES (1,50000,'2024-10-10','manager'),(2,25000,'2024-10-10','employee'),(3,75000,'2024-10-10','admin');
/*!40000 ALTER TABLE `wage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `working_time`
--

DROP TABLE IF EXISTS `working_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `working_time` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `working_time`
--

LOCK TABLES `working_time` WRITE;
/*!40000 ALTER TABLE `working_time` DISABLE KEYS */;
INSERT INTO `working_time` VALUES (1,'08:00','active'),(2,'09:00','active'),(3,'10:00','active'),(4,'11:00','active'),(5,'13:00','active'),(6,'14:00','active'),(7,'15:00','active'),(8,'16:00','active'),(9,'17:00','active'),(10,'18:00','active'),(11,'19:00','active'),(12,'20:00','active'),(13,'21:00','active'),(14,'22:00','active');
/*!40000 ALTER TABLE `working_time` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-08 16:26:57
