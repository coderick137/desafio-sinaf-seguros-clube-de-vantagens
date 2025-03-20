/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Compra } from '../../compras/entities/compra.entity';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  categoria: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @ManyToMany(() => Compra, (compra) => compra.produtos)
  compras: Compra[];
}
