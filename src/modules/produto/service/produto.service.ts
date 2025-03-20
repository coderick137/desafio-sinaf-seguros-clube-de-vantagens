/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { ProdutoRepository } from '../repository/produto.repository';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtoRepository.create(createProdutoDto);
  }

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.findAll();
  }

  async findOne(id: string): Promise<Produto> {
    const produto = await this.produtoRepository.findOne(id);
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }
  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.produtoRepository.findOne(id);
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    const updatedProduto = { ...produto, ...updateProdutoDto };
    return this.produtoRepository.update(updatedProduto);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const produto = await this.findOne(id);

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    await this.produtoRepository.delete(id);
    return { deleted: true };
  }
}
