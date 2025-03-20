/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClientesService } from '../service/clientes.service';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../auth/decorators/public.decorator';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Public()
  // {
  //   "nome": "José da Silva",
  //   "email": "exemplo@email.com",
  //   "senha": "senha123",
  //   "tipo": "admin"
  // }
  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.clientesService.findAll();
  }
}
