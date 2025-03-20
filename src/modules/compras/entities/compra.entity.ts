/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('compras')
export class Compra {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Produto)
  @JoinTable()
  produtos: Produto[];

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' }) // Coluna que referencia o cliente
  cliente: Cliente;

  @Column({
    type: 'enum',
    enum: ['pendente', 'pago', 'cancelado'],
    default: 'pendente',
  })
  status: 'pendente' | 'pago' | 'cancelado';
}
