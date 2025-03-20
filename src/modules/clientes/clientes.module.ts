/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientesController } from './controller/clientes.controller';
import { ClientesService } from './service/clientes.service';
import { ClienteRepository } from './repository/cliente.repository';
import { Cliente } from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClientesService, ClienteRepository],
  exports: [ClientesService],
})
export class ClientesModule {}
