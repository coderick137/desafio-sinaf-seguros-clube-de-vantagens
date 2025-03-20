/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProdutoController } from './controller/produto.controller';
import { ProdutoService } from './service/produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoRepository } from './repository/produto.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoRepository],
})
export class ProdutoModule {}
