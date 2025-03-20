/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProdutoModule } from './modules/produto/produto.module';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Altere para false em produção
    }),
    ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
