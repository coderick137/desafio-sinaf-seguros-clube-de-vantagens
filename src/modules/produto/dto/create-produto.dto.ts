/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto é obrigatório' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto é obrigatória' })
  descricao: string;

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto é obrigatória' })
  categoria: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0.01, { message: 'Preço do produto deve ser maior que 0' })
  preco: number;
}
