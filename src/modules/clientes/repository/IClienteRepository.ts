import { CreateClienteDto } from '../dto/create-cliente.dto';
import { Cliente } from '../entities/cliente.entity';

export interface IClienteRepository {
  create(createClienteDto: CreateClienteDto): Promise<Cliente>;
  findAll(): Promise<Cliente[]>;
  findByEmail(email: string): Promise<Cliente | undefined>;
  //   findOne(id: string): Promise<Cliente | null>;
  //   update(cliente: Cliente): Promise<Cliente>;
  //   delete(id: string): Promise<void>;
}
