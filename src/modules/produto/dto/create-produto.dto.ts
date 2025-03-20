/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto é obrigatório' })
  @ApiProperty({ example: 'Produto 1', description: 'Nome do produto' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto é obrigatória' })
  @ApiProperty({
    example: 'Descrição do produto 1',
    description: 'Descrição do produto',
  })
  descricao: string;

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto é obrigatória' })
  @ApiProperty({ example: 'Categoria 1', description: 'Categoria do produto' })
  categoria: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0.01, { message: 'Preço do produto deve ser maior que 0' })
  @ApiProperty({ example: 100.0, description: 'Preço do produto' })
  preco: number;
}
