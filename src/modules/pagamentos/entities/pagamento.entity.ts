/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Compra } from '../../compras/entities/compra.entity';

@Entity('pagamentos')
export class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Compra, (compra) => compra.id)
  compra: Compra;

  @Column('timestamp')
  data_pagamento: Date;

  @Column('decimal')
  valor: number;

  @Column({ type: 'enum', enum: ['pendente', 'pago'], default: 'pendente' })
  status: 'pendente' | 'pago';
}
