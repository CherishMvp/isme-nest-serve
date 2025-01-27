/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:30:08
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClassModule } from './modules/class/class.module';
import { OssModule } from './modules/oss/oss.module';

let envFilePath = ['.env.development', '.env.production', '.env'];
const isDev = process.env.NODE_ENV === 'development';

if (!isDev) envFilePath.shift();

console.log('isDev', isDev);
console.log('envFilePath', envFilePath);
@Module({
  imports: [
    /* 配置文件模块 */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
    }),

    UserModule,
    PermissionModule,
    RoleModule,
    AuthModule,
    ClassModule,
    SharedModule,
    OssModule,
  ],
})
export class AppModule {}
