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
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'0329623389','$2a$10$qCl0sPCMbsP5b1JR9Ear9uCtHlt.8BNN/yrp7.hL7CrRkiOlwFSmC','employee','active'),(2,'0329623381','$2a$10$k5vcfQoWQ3G8dh0V0nINjeO7ROXN4.f3lqx31pJQuzH3gayzVeYBK','employee','active'),(3,'0329623382','$2a$10$ZaxWgWSz.cBqA3oD57eAbuoEN0q9zQOcQDRZMm8p3tw0tvdzuXvIu','employee','active'),(4,'0329623383','$2a$10$SrBIIgDrKkQ2dtWL/of2oujyTKhe5vWPJnHYj9BgA4wyeg6OEPw.C','employee','active'),(5,'0329623384','$2a$10$zPqQ8eFyFt35.KgjvRORd.nYMnzaQV.stvbAMsR7dv8KBsIxYgcAW','employee','active'),(6,'0329623385','$2a$10$4xFOQI7fSmZbOxBNZCv7S.FD.XZ18uQARo73ZLBQfRFoRUBHRR.9q','customer','active'),(7,'0329623386','$2a$10$/byj4vAzynanw0jpAxpT1.VDA.beN2n6ISHQH1Lvtq6syCkSJYzty','customer','active'),(8,'0329623387','$2a$10$qVFnoeWKPehlUIeKcmWPp.i64g.EFTeNekEMYB.iODeRSAOXf4RqK','customer','active'),(9,'0329623388','$2a$10$m19vqGuaQBul2.ODGNg/E.3sBwSV4ryDoGh/gcq8tRcQsbkTlp1ZK','customer','active'),(10,'0352014149','$2a$10$XJQKiomnTwOTcq8Q/k.pqOIt12JrdERyi2tkJwbuPsY3bfzaM8pha','customer','active');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (2,'2024-10-19 21:00:00','confirmed','services',1,1,1,1,71),(3,'2024-10-19 21:00:00','confirmed','services',1,2,2,1,71),(4,'2024-10-12 21:00:00','confirmed','services',1,4,4,2,71);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `bed`
--

LOCK TABLES `bed` WRITE;
/*!40000 ALTER TABLE `bed` DISABLE KEYS */;
INSERT INTO `bed` VALUES (71,'FR01','active',1),(72,'FR02','active',1),(73,'FR03','active',1),(74,'FR04','active',1),(75,'FR05','active',1),(76,'FR06','active',1),(77,'FR07','active',1),(78,'FR08','active',1),(79,'FR09','active',1),(80,'FR10','active',1),(81,'BCR01','active',2),(82,'BCR02','active',2),(83,'BCR03','active',2),(84,'BCR04','active',2),(85,'BCR05','active',2),(86,'BCR06','active',2),(87,'BCR07','active',2),(88,'BCR08','active',2),(89,'BCR09','active',2),(90,'BCR10','active',2),(91,'SMR01','active',3),(92,'SMR02','active',3),(93,'SMR03','active',3),(94,'SMR04','active',3),(95,'SMR05','active',3),(96,'SMR06','active',3),(97,'SMR07','active',3),(98,'SMR08','active',3),(99,'SMR09','active',3),(100,'SMR10','active',3),(101,'HNR01','active',4),(102,'HNR02','active',4),(103,'HNR03','active',4),(104,'HNR04','active',4),(105,'HNR05','active',4),(106,'HNR06','active',4),(107,'HNR07','active',4),(108,'HNR08','active',4),(109,'HNR09','active',4),(110,'HNR10','active',4),(111,'WR01','active',5),(112,'WR02','active',5),(113,'WR03','active',5),(114,'WR04','active',5),(115,'WR05','active',5),(116,'WR06','active',5),(117,'WR07','active',5),(118,'WR08','active',5),(119,'WR09','active',5),(120,'WR10','active',5),(121,'SBCR01','active',6),(122,'SBCR02','active',6),(123,'SBCR03','active',6),(124,'SBCR04','active',6),(125,'SBCR05','active',6),(126,'SBCR06','active',6),(127,'SBCR07','active',6),(128,'SBCR08','active',6),(129,'SBCR09','active',6),(130,'SBCR10','active',6),(131,'NAR01','active',7),(132,'NAR02','active',7),(133,'NAR03','active',7),(134,'NAR04','active',7),(135,'NAR05','active',7),(136,'NAR06','active',7),(137,'NAR07','active',7),(138,'NAR08','active',7),(139,'NAR09','active',7),(140,'NAR10','active',7);
/*!40000 ALTER TABLE `bed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Beauty Spa','Bình Thạnh','active','image.png'),(2,'Beauty Spa','Gò Vấp','active','image.png'),(3,'Beauty Spa','Quận 1','active','image.png');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `card_history`
--

LOCK TABLES `card_history` WRITE;
/*!40000 ALTER TABLE `card_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `consumed_product`
--

LOCK TABLES `consumed_product` WRITE;
/*!40000 ALTER TABLE `consumed_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumed_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Nguyễn Thị Hiền',1,'2003-04-11','0329623385','mail5@gmail.com','HCM City','avatar.png',6),(2,'Nguyễn Thị Như',1,'2003-04-11','0329623386','mail6@gmail.com','HCM City','avatar.png',7),(3,'Nguyễn Thị Ý',1,'2003-04-11','0329623387','mail7@gmail.com','HCM City','avatar.png',8),(4,'Nguyễn Thị Quỳnh',1,'2003-04-11','0329623388','mail8@gmail.com','HCM City','avatar.png',9),(5,'Tống Thị Minh Hợp',1,'2002-06-28','0352014149','min@gmail.com','HCM City','avatar.png',10);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `detail_event`
--

LOCK TABLES `detail_event` WRITE;
/*!40000 ALTER TABLE `detail_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `details_appointment`
--

LOCK TABLES `details_appointment` WRITE;
/*!40000 ALTER TABLE `details_appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `details_appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Lê Thanh Toàn',1,'2002-04-08','0329623389','mail@gmail.com','HCM','manager','active','image.png',1,1),(2,'Lê Thanh Tú',1,'2002-04-09','0329623381','mail1@gmail.com','HCM','employee','active','image.png',2,2),(3,'Lê Thanh Tèo',1,'2002-04-10','0329623382','mail2@gmail.com','HCM','employee','active','image.png',3,2),(4,'Lê Thanh Táo',1,'2002-04-11','0329623383','mail3@gmail.com','HCM City','employee','active','image.png',4,2),(5,'Lê Thanh Tí',1,'2002-04-10','0329623384','mail4@gmail.com','HCM City','employee','active','image.png',5,2);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `internal_expense`
--

LOCK TABLES `internal_expense` WRITE;
/*!40000 ALTER TABLE `internal_expense` DISABLE KEYS */;
/*!40000 ALTER TABLE `internal_expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `prepaid_card`
--

LOCK TABLES `prepaid_card` WRITE;
/*!40000 ALTER TABLE `prepaid_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `prepaid_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,0,500000,300000,30000,'2024-10-19','service',1),(2,0,500000,400000,40000,'2024-10-19','service',2),(3,0,1500000,1200000,100000,'2024-10-19','service',3),(4,0,2000000,1700000,100000,'2024-10-19','service',4),(5,0,2500000,2300000,150000,'2024-10-19','service',5),(6,200000,600000,500000,50000,'2024-10-19','product',49),(7,250000,500000,400000,40000,'2024-10-19','product',50),(8,300000,700000,600000,60000,'2024-10-19','product',51),(9,350000,750000,700000,70000,'2024-10-19','product',52),(10,450000,700000,600000,60000,'2024-10-19','product',53),(11,0,800000,700000,70000,'2024-10-19','service',6),(12,0,1000000,900000,90000,'2024-10-19','service',7),(13,0,2000000,1900000,150000,'2024-10-19','service',8),(14,0,2500000,2400000,200000,'2024-10-19','service',9),(15,200000,500000,400000,40000,'2024-10-19','product',54),(16,250000,600000,500000,50000,'2024-10-19','product',55),(17,300000,700000,600000,60000,'2024-10-19','product',56),(18,500000,1000000,900000,90000,'2024-10-19','product',57),(19,0,6000000,5500000,200000,'2024-10-19','service',10),(20,0,4000000,3700000,150000,'2024-10-19','service',11),(21,0,5000000,4800000,180000,'2024-10-19','service',12),(22,100000,300000,200000,20000,'2024-10-19','product',58),(23,200000,500000,400000,40000,'2024-10-19','product',59),(24,300000,600000,500000,50000,'2024-10-19','product',60),(25,0,300000,250000,25000,'2024-10-19','service',13),(26,0,200000,150000,15000,'2024-10-19','service',14),(27,0,500000,450000,45000,'2024-10-19','service',15),(28,300000,500000,450000,45000,'2024-10-19','product',61),(29,500000,1000000,900000,90000,'2024-10-19','product',62),(30,200000,450000,400000,40000,'2024-10-19','product',63),(31,0,2500000,2300000,200000,'2024-10-19','service',16),(32,0,4000000,3500000,200000,'2024-10-19','service',17),(33,200000,500000,450000,45000,'2024-10-19','product',64),(34,600000,600000,550000,55000,'2024-10-19','product',65),(35,500000,1500000,1300000,130000,'2024-10-19','product',66),(36,0,6000000,5500000,300000,'2024-10-19','service',18),(37,0,3500000,3000000,200000,'2024-10-19','service',19),(38,400000,800000,750000,75000,'2024-10-19','product',67),(39,500000,1200000,1100000,100000,'2024-10-19','product',68),(40,300000,600000,550000,55000,'2024-10-19','product',69),(41,0,8000000,7500000,300000,'2024-10-19','service',20),(42,0,5000000,4600000,250000,'2024-10-19','service',21),(43,0,6000000,5400000,280000,'2024-10-19','service',22),(44,600000,1200000,1100000,100000,'2024-10-19','product',70),(45,1000000,2500000,2300000,150000,'2024-10-19','product',71),(46,500000,1500000,1300000,100000,'2024-10-19','product',72);
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (49,'CeraVe Hydrating Cleanser','active','image.png',1),(50,'Thayers Witch Hazel Toner','active','image.png',1),(51,'The Ordinary Hyaluronic Acid 2% + B5','active','image.png',1),(52,'La Roche-Posay Cicaplast Baume B5','active','image.png',1),(53,'Anessa Perfect UV Sunscreen Skincare Milk SPF 50+','active','image.png',1),(54,'Dove Deep Moisture Body Wash','active','image.png',2),(55,'St. Ives Apricot Scrub','active','image.png',2),(56,'Nivea Body Lotion Q10 Firming','active','image.png',2),(57,'L\'Occitane Aromachologie Relaxing Massage Oil','active','image.png',2),(58,'Vaseline Healing Jelly','active','image.png',3),(59,'Laneige Lip Sleeping Mask','active','image.png',3),(60,'Benefit Gimme Brow+ Volumizing Eyebrow Gel','active','image.png',3),(61,'OGX Coconut Milk Shampoo','active','image.png',4),(62,'Moroccanoil Treatment','active','image.png',4),(63,'O.P.I Nail Strengthener','active','image.png',4),(64,'Shiseido Perfect White Body Wash','active','image.png',5),(65,'Vaseline Healthy White UV Lightening','active','image.png',5),(66,'Relumins Advance White Glutathione Complex','active','image.png',5),(67,'Clarins Body Fit Anti-Cellulite Contouring Expert','active','image.png',6),(68,'Garcinia Cambogia','active','image.png',6),(69,'Teami Blends Detox Tea','active','image.png',6),(70,'Eucerin Hyaluron-Filler Day Cream','active','image.png',7),(71,'Estée Lauder Advanced Night Repair','active','image.png',7),(72,'Olay Regenerist Micro-Sculpting Cream','active','image.png',7);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Phòng chăm sóc da mặt (Facial Room)'),(2,'Phòng chăm sóc cơ thể (Body Care Room)'),(3,'Phòng phun xăm thẩm mỹ (Semi-permanent Makeup Room)'),(4,'Phòng chăm sóc tóc và móng (Hair and Nail Room)'),(5,'Phòng tắm trắng (Whitening Room)'),(6,'Phòng giảm béo và tạo hình (Slimming and Body Contouring Room'),(7,'Phòng thẩm mỹ không xâm lấn (Non-invasive Aesthetic Room)');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,'2024-10-01','morning','07:00:00','15:00:00',1),(2,'2024-10-02','morning','07:00:00','15:00:00',1),(3,'2024-10-03','morning','07:00:00','15:00:00',1),(4,'2024-10-04','morning','07:00:00','15:00:00',1),(5,'2024-10-05','morning','07:00:00','15:00:00',1),(6,'2024-10-06','morning','07:00:00','15:00:00',1),(7,'2024-10-07','morning','07:00:00','15:00:00',1),(8,'2024-10-08','morning','07:00:00','15:00:00',1),(9,'2024-10-09','morning','07:00:00','15:00:00',1),(10,'2024-10-10','morning','07:00:00','15:00:00',1),(11,'2024-10-11','morning','07:00:00','15:00:00',1),(12,'2024-10-12','morning','07:00:00','15:00:00',1),(13,'2024-10-13','morning','07:00:00','15:00:00',1),(14,'2024-10-14','morning','07:00:00','15:00:00',1),(15,'2024-10-15','morning','07:00:00','15:00:00',1),(16,'2024-10-16','morning','07:00:00','15:00:00',1),(17,'2024-10-17','morning','07:00:00','15:00:00',1),(18,'2024-10-18','morning','07:00:00','15:00:00',1),(19,'2024-10-19','morning','07:00:00','15:00:00',1),(20,'2024-10-20','morning','07:00:00','15:00:00',1),(21,'2024-10-01','afternoon','15:00:00','23:00:00',2),(22,'2024-10-02','afternoon','15:00:00','23:00:00',2),(23,'2024-10-03','afternoon','15:00:00','23:00:00',2),(24,'2024-10-04','afternoon','15:00:00','23:00:00',2),(25,'2024-10-05','afternoon','15:00:00','23:00:00',2),(26,'2024-10-06','afternoon','15:00:00','23:00:00',2),(27,'2024-10-07','afternoon','15:00:00','23:00:00',2),(28,'2024-10-08','afternoon','15:00:00','23:00:00',2),(29,'2024-10-09','afternoon','15:00:00','23:00:00',2),(30,'2024-10-10','afternoon','15:00:00','23:00:00',2),(31,'2024-10-11','afternoon','15:00:00','23:00:00',2),(32,'2024-10-12','afternoon','15:00:00','23:00:00',2),(33,'2024-10-13','afternoon','15:00:00','23:00:00',2),(34,'2024-10-14','afternoon','15:00:00','23:00:00',2),(35,'2024-10-15','afternoon','15:00:00','23:00:00',2),(36,'2024-10-16','afternoon','15:00:00','23:00:00',2),(37,'2024-10-17','afternoon','15:00:00','23:00:00',2),(38,'2024-10-18','afternoon','15:00:00','23:00:00',2),(39,'2024-10-19','afternoon','15:00:00','23:00:00',2),(40,'2024-10-20','afternoon','15:00:00','23:00:00',2);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Làm sạch da (Facial cleansing)',45,'active','service.png',1),(2,'Dưỡng ẩm, chống lão hóa',60,'active','service.png',1),(3,'Peel da (tẩy tế bào chết hóa học)',30,'active','service.png',1),(4,'Cấy collagen, cấy tảo',60,'active','service.png',1),(5,'Trị nám, tàn nhang',60,'active','service.png',1),(6,'Massage toàn thân',60,'active','service.png',2),(7,'Tẩy tế bào chết toàn thân',45,'active','service.png',2),(8,'Giảm béo, săn chắc cơ thể',60,'active','service.png',2),(9,'Chăm sóc da tay, chân',30,'active','service.png',2),(10,'Phun môi',60,'active','service.png',3),(11,'Điêu khắc, phun lông mày',60,'active','service.png',3),(12,'Phun mí mắt',60,'active','service.png',3),(13,'Gội đầu, hấp dầu',45,'active','service.png',4),(14,'Làm móng (manicure, pedicure)',60,'active','service.png',4),(15,'Sơn gel, đắp móng bột',60,'active','service.png',4),(16,'Tắm trắng body',60,'active','service.png',5),(17,'Tắm trắng phi thuyền',60,'active','service.png',5),(18,'Giảm béo công nghệ cao (RF, cavitation, hifu)',60,'active','service.png',6),(19,'Massage giảm béo',60,'active','service.png',6),(20,'Căng da mặt bằng chỉ',60,'active','service.png',7),(21,'Tiêm filler, botox',30,'active','service.png',7),(22,'Điều trị bằng laser (trị nám, trẻ hóa da)',45,'active','service.png',7);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `service_category`
--

LOCK TABLES `service_category` WRITE;
/*!40000 ALTER TABLE `service_category` DISABLE KEYS */;
INSERT INTO `service_category` VALUES (1,'Dịch vụ chăm sóc da mặt',1),(2,'Dịch vụ chăm sóc cơ thể',2),(3,'Dịch vụ phun xăm thẩm mỹ',3),(4,'Dịch vụ chăm sóc tóc và móng',4),(5,'Dịch vụ tắm trắng và làm trắng da',5),(6,'Dịch vụ giảm béo và tạo hình cơ thể',6),(7,'Dịch vụ thẩm mỹ không xâm lấn',7);
/*!40000 ALTER TABLE `service_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `treatment_package`
--

LOCK TABLES `treatment_package` WRITE;
/*!40000 ALTER TABLE `treatment_package` DISABLE KEYS */;
/*!40000 ALTER TABLE `treatment_package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `treatment_service`
--

LOCK TABLES `treatment_service` WRITE;
/*!40000 ALTER TABLE `treatment_service` DISABLE KEYS */;
/*!40000 ALTER TABLE `treatment_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `voucher_category`
--

LOCK TABLES `voucher_category` WRITE;
/*!40000 ALTER TABLE `voucher_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `voucher_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `wage`
--

LOCK TABLES `wage` WRITE;
/*!40000 ALTER TABLE `wage` DISABLE KEYS */;
INSERT INTO `wage` VALUES (1,50000,'2024-10-10','manage'),(2,25000,'2024-10-10','employee');
/*!40000 ALTER TABLE `wage` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2024-10-23  9:20:06
