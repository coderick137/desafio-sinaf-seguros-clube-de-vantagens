/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { ProdutoRepository } from '../repository/produto.repository';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  private readonly logger = new Logger(ProdutoService.name);

  constructor(private readonly produtoRepository: ProdutoRepository) {}

  private handleError(error: unknown, context: string): never {
    const errorStack = error instanceof Error ? error.stack : undefined;
    this.logger.error(`Erro ao ${context}`, errorStack);
    throw error;
  }

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    this.logger.log('Criando um novo produto');
    try {
      return await this.produtoRepository.create(createProdutoDto);
    } catch (error) {
      this.handleError(error, 'criar produto');
    }
  }

  async findAll(): Promise<Produto[]> {
    this.logger.log('Buscando todos os produtos');
    try {
      return await this.produtoRepository.findAll();
    } catch (error) {
      this.handleError(error, 'buscar todos os produtos');
    }
  }

  async findOne(id: string): Promise<Produto> {
    this.logger.log(`Buscando produto com ID ${id}`);
    try {
      const produto = await this.produtoRepository.findOne(id);
      if (!produto) {
        this.logger.warn(`Produto com ID ${id} não encontrado`);
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }
      return produto;
    } catch (error) {
      this.handleError(error, `buscar produto com ID ${id}`);
    }
  }

  async update(
    id: string,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    this.logger.log(`Atualizando produto com ID ${id}`);
    try {
      const produto = await this.findOne(id);
      const updatedProduto = { ...produto, ...updateProdutoDto };
      return await this.produtoRepository.update(updatedProduto);
    } catch (error) {
      this.handleError(error, `atualizar produto com ID ${id}`);
    }
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    this.logger.log(`Removendo produto com ID ${id}`);
    try {
      await this.produtoRepository.delete(id);
      return { deleted: true };
    } catch (error) {
      this.handleError(error, `remover produto com ID ${id}`);
    }
  }
}
