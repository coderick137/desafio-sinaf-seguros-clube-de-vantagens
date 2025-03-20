/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProdutoController } from './controller/produto.controller';
import { ProdutoService } from './service/produto.service';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
