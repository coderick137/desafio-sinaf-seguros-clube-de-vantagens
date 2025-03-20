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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Produto } from '../entities/produto.entity';

@ApiTags('Produtos') // Agrupa todas as operações relacionadas a produtos no Swagger
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso.',
    type: Produto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
    type: [Produto],
  })
  async findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um produto pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Produto retornado com sucesso.',
    type: Produto,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async findOne(@Param('id') id: string): Promise<Produto> {
    return this.produtoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produto pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso.',
    type: Produto,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.produtoService.remove(id);
  }
}
