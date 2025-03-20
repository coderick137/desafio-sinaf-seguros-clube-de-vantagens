/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsOptional, IsEnum } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsOptional()
  nome?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  senha?: string;

  @IsOptional()
  @IsEnum(['admin', 'cliente'])
  tipo?: 'admin' | 'cliente';
}
