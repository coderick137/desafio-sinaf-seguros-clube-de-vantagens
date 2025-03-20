import { Injectable } from '@nestjs/common';
import { IClienteRepository } from './IClienteRepository';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClienteDto } from '../dto/create-cliente.dto';

@Injectable()
export class ClienteRepository implements IClienteRepository {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create({
      ...createClienteDto,
      tipo: createClienteDto.tipo as 'admin' | 'cliente',
    });
    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async findByEmail(email: string): Promise<Cliente | undefined> {
    const cliente = await this.clienteRepository
      .createQueryBuilder('cliente')
      .where('cliente.email = :email', { email })
      .getOne();
    return cliente ?? undefined;
  }
}
