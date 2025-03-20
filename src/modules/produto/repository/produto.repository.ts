import { Injectable } from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from '../dto/create-produto.dto';

@Injectable()
export class ProdutoRepository {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}
  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produto = this.produtoRepository.create(createProdutoDto);
    return this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async findOne(id: string): Promise<Produto | null> {
    return this.produtoRepository.findOne({ where: { id } });
  }

  async update(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }

  async delete(id: string): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
