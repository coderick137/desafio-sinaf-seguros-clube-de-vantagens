/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePagamentoDto } from './create-pagamento.dto';

import { IsOptional } from 'class-validator';

export class UpdatePagamentoDto extends PartialType(CreatePagamentoDto) {
  @IsOptional()
  data_pagamento?: Date;

  @IsOptional()
  valor?: number;

  @IsOptional()
  status?: 'pendente' | 'pago';
}
