/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ComprasController } from './controller/compras.controller';
import { ComprasService } from './service/compras.service';

@Module({
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
