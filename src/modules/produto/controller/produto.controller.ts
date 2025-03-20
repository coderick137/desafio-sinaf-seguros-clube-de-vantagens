/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProdutoService } from '../service/produto.service';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Produto } from '../entities/produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
  })
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um produto pelo id' })
  @ApiResponse({ status: 200, description: 'Produto retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produto pelo id' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um produto pelo id' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  remove(@Param('id') id: string) {
    return this.produtoService.remove(id);
  }
}
