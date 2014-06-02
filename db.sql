CREATE DATABASE  IF NOT EXISTS `snaps` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `snaps`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: snaps
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tprojects`
--

DROP TABLE IF EXISTS `tprojects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tprojects` (
  `tprojects_name` varchar(45) NOT NULL,
  `tprojects_group` varchar(45) DEFAULT NULL,
  `tprojects_active` bit(1) NOT NULL DEFAULT b'1',
  `tprojects_base` varchar(255) NOT NULL DEFAULT 'shares',
  PRIMARY KEY (`tprojects_name`,`tprojects_base`),
  UNIQUE KEY `tprojects_name_UNIQUE` (`tprojects_name`,`tprojects_base`),
  KEY `FULLNAME` (`tprojects_name`,`tprojects_base`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tprojects`
--

LOCK TABLES `tprojects` WRITE;
/*!40000 ALTER TABLE `tprojects` DISABLE KEYS */;
INSERT INTO `tprojects` VALUES ('000','0000','','000'),('11212','12121','','1212'),('124125125','p124125125','\0','215325'),('13027','p13027','\0','shares'),('222','22','','22'),('2222','222','','222'),('22222','22222','','222222'),('235325235','32523523','','523525'),('32rr','p32rr','','r32rr'),('3332323','p3332323','','33333'),('43t23623','p43t23623','','632623'),('AAAAAAAA','AAAAAAAA','','AAAAAAAA'),('DAN','pDAN','','shares'),('erwgvsdv','wveqwv','','wewefwe'),('FART','FART','','FART'),('tes321','ptes321','','shares'),('test','ptest','','shares'),('test33344','ptest33344','\0','shares'),('testing','testingt','','testing'),('vfdvdfv','dvdfv','','dfvdfv'),('zaqqs','zqwx','','zzq'),('ZZZZZZ','ZZZZZZ','','ZZZZZZ');
/*!40000 ALTER TABLE `tprojects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tsnapdef`
--

DROP TABLE IF EXISTS `tsnapdef`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tsnapdef` (
  `tsnapdef_type` varchar(45) NOT NULL,
  `tsnapdef_interval` bigint(20) NOT NULL DEFAULT '0',
  `tsnapdef_ttl` bigint(20) NOT NULL DEFAULT '0',
  `tsnapdef_enabled` bit(1) NOT NULL DEFAULT b'0',
  `tsnapdef_when` datetime DEFAULT NULL,
  `tsnapdef_last` datetime DEFAULT NULL,
  PRIMARY KEY (`tsnapdef_type`),
  UNIQUE KEY `tsnapdef_type_UNIQUE` (`tsnapdef_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsnapdef`
--

LOCK TABLES `tsnapdef` WRITE;
/*!40000 ALTER TABLE `tsnapdef` DISABLE KEYS */;
INSERT INTO `tsnapdef` VALUES ('daily',86380,3024000,'','2014-05-06 23:00:00','2014-05-22 00:00:01'),('hourly',3598,172800,'','2014-05-06 15:00:00','2014-05-22 08:00:01'),('manual',0,0,'\0',NULL,NULL),('monthly',2419197,14515200,'','2014-05-01 23:59:00','2014-05-01 23:00:03');
/*!40000 ALTER TABLE `tsnapdef` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tsnapreasons`
--

DROP TABLE IF EXISTS `tsnapreasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tsnapreasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reason` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsnapreasons`
--

LOCK TABLES `tsnapreasons` WRITE;
/*!40000 ALTER TABLE `tsnapreasons` DISABLE KEYS */;
INSERT INTO `tsnapreasons` VALUES (5,'gtdsgwet12'),(6,'2r1r12r'),(9,'d11d1d'),(10,'new reason');
/*!40000 ALTER TABLE `tsnapreasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tsnaps`
--

DROP TABLE IF EXISTS `tsnaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tsnaps` (
  `tsnaps_id` varchar(255) NOT NULL,
  `tsnaps_taken` bigint(20) NOT NULL,
  `tsnaps_ttl` bigint(20) NOT NULL,
  `tsnaps_reason` varchar(65) DEFAULT NULL,
  `tsnaps_notes` varchar(255) DEFAULT NULL,
  `tsnaps_created` int(11) NOT NULL DEFAULT '-1',
  `tsnaps_project` varchar(45) NOT NULL,
  `tsnaps_base` varchar(255) NOT NULL,
  `tsnaps_type` varchar(45) NOT NULL DEFAULT 'manual',
  PRIMARY KEY (`tsnaps_id`,`tsnaps_project`,`tsnaps_base`),
  KEY `projects_idx` (`tsnaps_project`,`tsnaps_base`),
  KEY `snaptype_idx` (`tsnaps_type`),
  CONSTRAINT `projects` FOREIGN KEY (`tsnaps_project`, `tsnaps_base`) REFERENCES `tprojects` (`tprojects_name`, `tprojects_base`),
  CONSTRAINT `snaptype` FOREIGN KEY (`tsnaps_type`) REFERENCES `tsnapdef` (`tsnapdef_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsnaps`
--

LOCK TABLES `tsnaps` WRITE;
/*!40000 ALTER TABLE `tsnaps` DISABLE KEYS */;
INSERT INTO `tsnaps` VALUES ('1400791066076',0,0,'test',NULL,0,'test33344','shares','manual'),('1400791073883',0,0,'test',NULL,0,'test','shares','manual'),('1400791075675',0,0,'test',NULL,0,'test','shares','manual'),('1400791077962',0,0,'test',NULL,0,'tes321','shares','manual'),('1400791088385',0,0,'test32',NULL,0,'test','shares','manual'),('1400791120176',0,0,'ABCEFG',NULL,0,'test33344','shares','manual'),('1400791120857',0,0,'ABCEFG',NULL,0,'test33344','shares','manual'),('1401209186350',0,0,'test','test',0,'124125125','215325','manual'),('1401209286642',0,0,'hurr','rrrr',0,'124125125','215325','manual'),('1401226597951',0,0,'323r','rr32r',0,'124125125','215325','manual'),('GMT--17932903199900',0,0,'test','11234',0,'124125125','215325','manual'),('GMT--17935700399800',0,0,'test','test',0,'124125125','215325','manual'),('GMT-1401292429512',0,0,'test','tet',0,'124125125','215325','manual'),('GMT-2014.05.19-01.00.01',1400479201,3024000,'daily',NULL,0,'13027','shares','daily'),('GMT-2014.05.20-09.00.00',1400594401,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-10.00.00',1400598001,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-11.00.00',1400601601,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-13.00.00',1400608801,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-14.00.00',1400612401,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-15.00.00',1400616002,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-17.00.00',1400623201,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-18.00.00',1400626801,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-19.00.00',1400630401,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-20.00.00',1400634001,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-21.00.00',1400637601,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.20-23.00.00',1400644801,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.21-00.00.00',1400648402,172800,'hourly',NULL,0,'13027','shares','hourly'),('GMT-2014.05.28-10.05.68',0,0,'test','t35153',0,'124125125','215325','manual'),('GMT-2014.05.28-10.05.94',0,0,'test','momentest',0,'124125125','215325','manual'),('GMT-2014.05.29-14.05.11',1401391077,0,'re2rr23','t435345345',-1,'000','000','manual');
/*!40000 ALTER TABLE `tsnaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'snaps'
--

--
-- Dumping routines for database 'snaps'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-06-02 18:28:53
