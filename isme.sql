/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50743 (5.7.43)
 Source Host           : localhost:3306
 Source Schema         : isme

 Target Server Type    : MySQL
 Target Server Version : 50743 (5.7.43)
 File Encoding         : 65001

 Date: 13/01/2024 01:22:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(50) NOT NULL,
  `type` varchar(255) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `redirect` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `component` varchar(255) DEFAULT NULL,
  `layout` varchar(255) DEFAULT NULL,
  `keepAlive` tinyint(4) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `show` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否展示在页面菜单',
  `enable` tinyint(4) NOT NULL DEFAULT '1',
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_30e166e8c6359970755c5727a2` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of permission
-- ----------------------------
BEGIN;
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (1, '资源管理', 'Resource_Mgt', 'MENU', 2, '/pms/resource', NULL, 'i-fe:list', '/src/views/pms/resource/index.vue', NULL, NULL, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (2, '系统管理', 'SysMgt', 'MENU', NULL, NULL, NULL, 'i-fe:grid', NULL, NULL, NULL, NULL, NULL, 1, 1, 2);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (3, '角色管理', 'RoleMgt', 'MENU', 2, '/pms/role', NULL, 'i-fe:user-check', '/src/views/pms/role/index.vue', NULL, NULL, NULL, NULL, 1, 1, 2);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (4, '用户管理', 'UserMgt', 'MENU', 2, '/pms/user', NULL, 'i-fe:user', '/src/views/pms/user/index.vue', NULL, 1, NULL, NULL, 1, 1, 3);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (5, '分配用户', 'RoleUser', 'MENU', 3, '/pms/role/user/:roleId', NULL, 'i-fe:user-plus', '/src/views/pms/role/role-user.vue', NULL, NULL, NULL, NULL, 0, 1, 1);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (6, '业务示例', 'Demo', 'MENU', NULL, NULL, NULL, 'i-fe:grid', NULL, NULL, NULL, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (7, '图片上传', 'ImgUpload', 'MENU', 6, '/demo/upload', NULL, 'i-fe:image', '/src/views/demo/upload/index.vue', NULL, 1, NULL, NULL, 1, 1, 2);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (8, '个人资料', 'UserProfile', 'MENU', NULL, '/profile', NULL, 'i-fe:user', '/src/views/profile/index.vue', NULL, NULL, NULL, NULL, 0, 1, 99);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (9, '基础功能', 'Base', 'MENU', NULL, '/base', NULL, 'i-fe:grid', NULL, NULL, NULL, NULL, NULL, 1, 1, 0);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (10, '基础组件', 'BaseComponents', 'MENU', 9, '/base/components', NULL, 'i-me:awesome', '/src/views/base/index.vue', NULL, NULL, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (11, 'Unocss', 'Unocss', 'MENU', 9, '/base/unocss', NULL, 'i-me:awesome', '/src/views/base/unocss.vue', NULL, NULL, NULL, NULL, 1, 1, 2);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (12, 'KeepAlive', 'KeepAlive', 'MENU', 9, '/base/keep-alive', NULL, 'i-me:awesome', '/src/views/base/keep-alive.vue', NULL, 1, NULL, NULL, 1, 1, 3);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (13, '创建新用户', 'AddUser', 'BUTTON', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (14, '图标 Icon', 'Icon', 'MENU', 9, '/base/icon', NULL, 'i-fe:feather', '/src/views/base/unocss-icon.vue', NULL, NULL, NULL, NULL, 1, 1, 0);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (15, 'MeModal', 'TestModal', 'MENU', 9, '/testModal', NULL, 'i-me:dialog', '/src/views/base/test-modal.vue', NULL, NULL, NULL, NULL, 1, 1, 5);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (22, '测试', 'Test', 'MENU', NULL, '/test2', NULL, 'i-fe:zoom-out', NULL, '', NULL, NULL, NULL, 1, 1, 31);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (23, '长撒', 'SonOne', 'MENU', 22, '/test2/sonone', NULL, 'i-fe:zoom-out', '/src/views/pms/resource/index.vue', '', NULL, NULL, NULL, 1, 1, 21);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (24, '相册管理', 'PhotosAdmin', 'MENU', NULL, '/photos', NULL, 'i-fe:image', NULL, '', NULL, NULL, NULL, 1, 1, 31);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (25, '相册列表', 'List', 'MENU', 24, '/photos/list', NULL, 'i-fe:list', '/src/views/photos/list/index.vue', '', 1, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (26, '小程序配置', 'Config', 'MENU', 24, '/photos/config', NULL, 'i-fe:settings', '/src/views/photos/config/index.vue', '', NULL, NULL, NULL, 1, 1, 2);
COMMIT;

-- ----------------------------
-- Table structure for profile
-- ----------------------------
DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` int(11) DEFAULT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `nickName` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_a24972ebd73b106250713dcddd` (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of profile
-- ----------------------------
BEGIN;
INSERT INTO `profile` (`id`, `gender`, `avatar`, `address`, `email`, `userId`, `nickName`) VALUES (1, NULL, 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80', NULL, NULL, 1, 'Admin');
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `enable` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_ee999bb389d7ac0fd967172c41` (`code`) USING BTREE,
  UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`id`, `code`, `name`, `enable`) VALUES (1, 'SUPER_ADMIN', '超级管理员', 1);
INSERT INTO `role` (`id`, `code`, `name`, `enable`) VALUES (2, 'ROLE_QA', '质检员', 1);
COMMIT;

-- ----------------------------
-- Table structure for role_permissions_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permissions_permission`;
CREATE TABLE `role_permissions_permission` (
  `roleId` int(11) NOT NULL,
  `permissionId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`) USING BTREE,
  KEY `IDX_b36cb2e04bc353ca4ede00d87b` (`roleId`) USING BTREE,
  KEY `IDX_bfbc9e263d4cea6d7a8c9eb3ad` (`permissionId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of role_permissions_permission
-- ----------------------------
BEGIN;
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 1);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 2);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 3);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 4);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 5);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 9);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 10);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 11);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 12);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 14);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 15);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `enable` tinyint(4) NOT NULL DEFAULT '1',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `password`, `enable`, `createTime`, `updateTime`) VALUES (1, 'admin', '$2a$10$FsAafxTTVVGXfIkJqvaiV.1vPfq4V9HW298McPldJgO829PR52a56', 1, '2023-11-18 16:18:59.150632', '2023-11-18 16:18:59.150632');
COMMIT;

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role` (
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`roleId`) USING BTREE,
  KEY `IDX_5f9286e6c25594c6b88c108db7` (`userId`) USING BTREE,
  KEY `IDX_4be2f7adf862634f5f803d246b` (`roleId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
BEGIN;
INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (1, 1);
INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (1, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
