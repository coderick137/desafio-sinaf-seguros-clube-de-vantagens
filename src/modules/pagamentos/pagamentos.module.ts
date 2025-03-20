/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PagamentosController } from './controller/pagamentos.controller';
import { PagamentosService } from './service/pagamentos.service';

@Module({
  controllers: [PagamentosController],
  providers: [PagamentosService],
})
export class PagamentosModule {}
