/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */

import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/users.entity';


export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async () : Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.PG_LOCALHOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [UserEntity],
      migrations: [__dirname + '/../migrations/*{.ts/.js}'],
      extra: {
      charset: 'utf8mb4_unicode_ci'
      },
      synchronize: true,
      logging: true
    }
  }
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_LOCALHOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [UserEntity],
  migrations: [__dirname + '/../migrations/*{.ts/.js}'],
  extra: {
  charset: 'utf8mb4_unicode_ci'
  },
  logging: true
}

