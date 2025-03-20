/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateCompraDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  produtosIds: string[];

  @IsUUID()
  @IsNotEmpty()
  clienteId: string;

  @IsEnum(['pendente', 'pago', 'cancelado'])
  @IsNotEmpty()
  status: 'pendente' | 'pago' | 'cancelado';
}
