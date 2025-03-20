/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateRelatorioDto } from './create-relatorio.dto';
import { IsOptional } from 'class-validator';

export class UpdateRelatorioDto extends PartialType(CreateRelatorioDto) {
  @IsOptional()
  data_inicio?: Date;

  @IsOptional()
  data_fim?: Date;
}
