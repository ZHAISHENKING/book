/*
 Navicat Premium Data Transfer

 Source Server         : mac
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : localhost:3306
 Source Schema         : tieba

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 07/07/2018 14:07:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sanhe
-- ----------------------------
DROP TABLE IF EXISTS `sanhe`;
CREATE TABLE `sanhe` (
  `tie_title` varchar(100) DEFAULT NULL,
  `tie_num` varchar(8) DEFAULT NULL,
  `post_no` int(30) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_id` int(30) DEFAULT NULL,
  `user_sex` tinyint(4) DEFAULT NULL,
  `level_id` int(4) DEFAULT NULL,
  `level_name` varchar(0) DEFAULT NULL,
  `cur_score` int(20) DEFAULT NULL,
  `user_zone` varchar(100) DEFAULT NULL,
  `user_photo` varchar(200) DEFAULT NULL,
  `user_from` varchar(100) DEFAULT NULL,
  `create_date` varchar(30) DEFAULT NULL,
  `comment_num` int(20) DEFAULT NULL,
  `is_bawu` tinyint(4) DEFAULT NULL,
  `tie_link` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
