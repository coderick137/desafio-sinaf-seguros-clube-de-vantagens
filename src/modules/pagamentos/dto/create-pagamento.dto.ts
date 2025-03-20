/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePagamentoDto {
  @IsNotEmpty()
  data_pagamento: Date;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsEnum(['pendente', 'pago'])
  @IsNotEmpty()
  status: 'pendente' | 'pago';
}
