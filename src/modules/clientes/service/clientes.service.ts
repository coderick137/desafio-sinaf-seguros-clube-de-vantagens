/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { ClienteRepository } from '../repository/cliente.repository';
import { Cliente } from '../entities/cliente.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ClientesService {
  private readonly logger = new Logger(ClientesService.name);
  private readonly tiposPermitidos = ['admin', 'cliente'];

  constructor(private readonly clienteRepository: ClienteRepository) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    this.logger.log('Criando um novo cliente');
    try {
      const { nome, email, senha, tipo } = createClienteDto;

      this.validarTipoCliente(tipo);

      const clienteExistente = await this.clienteRepository.findByEmail(email);
      if (clienteExistente) {
        this.logger.warn(`Cliente com email ${email} já existe`);
        throw new ConflictException(`Cliente com email ${email} já existe`);
      }

      const senhaHash = await this.hashSenha(senha);

      const novoCliente = await this.clienteRepository.create({
        nome,
        email,
        senha: senhaHash,
        tipo,
      });

      this.logger.log(`Cliente criado com sucesso: ${novoCliente.nome}`);
      return novoCliente;
    } catch (error) {
      this.handleError(error, 'criar cliente');
    }
  }

  async findAll(): Promise<Cliente[]> {
    this.logger.log('Buscando todos os clientes');
    try {
      const clientes = await this.clienteRepository.findAll();
      if (clientes.length === 0) {
        this.logger.warn('A lista de clientes está vazia');
        throw new NotFoundException('Nenhum cliente encontrado.');
      }
      return clientes;
    } catch (error) {
      this.handleError(error, 'buscar todos os clientes');
    }
  }

  async findByEmail(email: string): Promise<Cliente | undefined> {
    this.logger.log(`Buscando cliente com email ${email}`);
    try {
      return await this.clienteRepository.findByEmail(email);
    } catch (error) {
      this.handleError(error, `buscar cliente com email ${email}`);
    }
  }

  private handleError(error: unknown, context: string): never {
    const errorStack = error instanceof Error ? error.stack : undefined;
    this.logger.error(`Erro ao ${context}`, errorStack);
    throw error;
  }

  private async hashSenha(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(senha, salt);
  }

  validarTipoCliente(tipo: string): void {
    if (!this.tiposPermitidos.includes(tipo)) {
      this.logger.warn(`Tipo de cliente inválido: ${tipo}`);
      throw new ConflictException(
        `Tipo de cliente inválido. Permitidos: ${this.tiposPermitidos.join(', ')}`,
      );
    }
  }
}
