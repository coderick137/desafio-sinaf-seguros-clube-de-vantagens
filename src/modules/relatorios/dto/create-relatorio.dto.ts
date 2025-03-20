/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRelatorioDto {
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @ApiProperty({
    example: '2021-10-01',
    description: 'Data de início do relatório',
  })
  data_inicio: Date;

  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @ApiProperty({
    example: '2021-10-31',
    description: 'Data de fim do relatório',
  })
  data_fim: Date;
}
