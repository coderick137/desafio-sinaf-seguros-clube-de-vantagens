import { Produto } from '../entities/produto.entity';
import { CreateProdutoDto } from '../dto/create-produto.dto';

export interface IProdutoRepository {
  create(createProdutoDto: CreateProdutoDto): Promise<Produto>;
  findAll(): Promise<Produto[]>;
  findOne(id: string): Promise<Produto | null>;
  update(produto: Produto): Promise<Produto>;
  delete(id: string): Promise<void>;
}
