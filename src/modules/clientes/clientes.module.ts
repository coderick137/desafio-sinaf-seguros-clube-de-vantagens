/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientesController } from './controller/clientes.controller';
import { ClientesService } from './service/clientes.service';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
