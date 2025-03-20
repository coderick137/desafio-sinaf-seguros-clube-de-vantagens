/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome do cliente é obrigatório' })
  @ApiProperty({ example: 'José da Silva', description: 'Nome do cliente' })
  nome: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email do cliente é obrigatório' })
  @ApiProperty({
    example: 'exemplo@email.com',
    description: 'Email do cliente',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'senha123', description: 'Senha do cliente' })
  senha: string;

  @ApiProperty({
    example: 'cliente',
    description: 'Tipo de usuário (admin ou cliente)',
  })
  @IsString()
  tipo: string;
}
