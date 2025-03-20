/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Compra } from '../../compras/entities/compra.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'cliente'],
    default: 'cliente',
  })
  tipo: 'admin' | 'cliente';

  @OneToMany(() => Compra, (compra) => compra.cliente)
  compras: Compra[];
}
