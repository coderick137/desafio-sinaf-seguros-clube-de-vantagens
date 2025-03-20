/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { RelatoriosService } from '../service/relatorios.service';
import { CreateRelatorioDto } from '../dto/create-relatorio.dto';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Post()
  create(@Body() createRelatorioDto: CreateRelatorioDto) {
    return this.relatoriosService.create(createRelatorioDto);
  }

  @Get()
  findAll() {
    return this.relatoriosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relatoriosService.findOne(+id);
  }
}
