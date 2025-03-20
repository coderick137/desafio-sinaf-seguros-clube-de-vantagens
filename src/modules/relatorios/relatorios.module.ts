/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RelatoriosController } from './controller/relatorios.controller';
import { RelatoriosService } from './service/relatorios.service';

@Module({
  controllers: [RelatoriosController],
  providers: [RelatoriosService],
})
export class RelatoriosModule {}
