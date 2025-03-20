/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('relatorios')
export class Relatorio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  data_inicio: Date;

  @Column('timestamp')
  data_fim: Date;

  @Column('decimal')
  total_vendas: number;
}
