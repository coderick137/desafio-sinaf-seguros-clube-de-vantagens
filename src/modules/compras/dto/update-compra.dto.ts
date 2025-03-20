/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';

export class UpdateCompraDto {
  @IsOptional()
  produtosIds?: string[];

  @IsOptional()
  clienteId?: string;

  @IsOptional()
  status?: 'pendente' | 'pago' | 'cancelado';
}
