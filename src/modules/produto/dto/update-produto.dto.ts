/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoDto } from './create-produto.dto';

import { IsOptional } from 'class-validator';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
  @IsOptional()
  nome?: string;

  @IsOptional()
  descricao?: string;

  @IsOptional()
  categoria?: string;

  @IsOptional()
  preco?: number;
}
