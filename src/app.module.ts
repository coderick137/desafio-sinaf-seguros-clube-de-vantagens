/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProdutoModule } from './modules/produto/produto.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ComprasModule } from './modules/compras/compras.module';
import { PagamentosModule } from './modules/pagamentos/pagamentos.module';
import { RelatoriosModule } from './modules/relatorios/relatorios.module';

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
    ClientesModule,
    ComprasModule,
    PagamentosModule,
    RelatoriosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
