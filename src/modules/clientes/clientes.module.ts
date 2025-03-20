/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientesController } from './controller/clientes.controller';
import { ClientesService } from './service/clientes.service';
import { ClienteRepository } from './repository/cliente.repository';
import { Cliente } from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../../config/configuration';
import { ConfigModule } from '@nestjs/config';

const config = configuration();

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule,
  ],
  controllers: [ClientesController],
  providers: [ClientesService, ClienteRepository],
  exports: [ClientesService],
})
export class ClientesModule {}
