/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { ClienteRepository } from '../repository/cliente.repository';
import { Cliente } from '../entities/cliente.entity';

const mockArrayClientes: Cliente[] = [
  {
    id: '1a2b3c4d-5678-90ab-cdef-1234567890ab',
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    senha: 'senha123',
    tipo: 'cliente',
    compras: [],
  },
  {
    id: '2b3c4d5e-6789-01bc-defa-2345678901bc',
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    senha: 'senha456',
    tipo: 'cliente',
    compras: [],
  },
  {
    id: '3c4d5e6f-7890-12cd-efab-3456789012cd',
    nome: 'Carlos Souza',
    email: 'carlos.souza@example.com',
    senha: 'senha789',
    tipo: 'admin',
    compras: [],
  },
];

const mockRepository: Partial<Record<keyof ClienteRepository, jest.Mock>> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByEmail: jest.fn(),
};

describe('ClientesService', () => {
  let clienteService: ClientesService;
  let clienteRepository: ClienteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: ClienteRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    clienteService = module.get<ClientesService>(ClientesService);
    clienteRepository = module.get<ClienteRepository>(ClienteRepository);
  });

  it('should be defined', () => {
    expect(clienteService).toBeDefined();
    expect(clienteRepository).toBeDefined();
  });

  describe('create', () => {
    it('Deve retornar um novo Cliente criado', async () => {
      const createClienteDto = {
        nome: 'José Pereira',
        email: 'email.jose@gmail.com',
        senha: 'senha123',
        tipo: 'cliente',
      };

      const cliente = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        ...createClienteDto,
      };
      mockRepository.create!.mockResolvedValue(cliente);

      const result = await clienteService.create(createClienteDto);
      expect(result).toEqual(cliente);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
    it('deve lançar uma exceção quando o cliente já existe', async () => {
      const createClienteDto = {
        nome: 'José Pereira',
        email: 'email.jose@gmail.com',
        senha: 'senha123',
        tipo: 'cliente',
      };

      const cliente = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        ...createClienteDto,
      };
      mockRepository.findByEmail!.mockResolvedValue(cliente.email);
      await expect(clienteService.create(createClienteDto)).rejects.toThrow(
        `Cliente com email ${cliente.email} já existe`,
      );
    });
    it('deve lançar uma exceção quando o tipo de cliente é inválido', async () => {
      const createClienteDto = {
        nome: 'José Pereira',
        email: 'email.jose@gmail.com',
        senha: 'senha123',
        tipo: 'invalido',
      };

      jest
        .spyOn(clienteService, 'validarTipoCliente')
        .mockImplementation(() => {
          throw new Error('Tipo de cliente inválido');
        });

      await expect(clienteService.create(createClienteDto)).rejects.toThrow(
        'Tipo de cliente inválido',
      );
    });
  });

  describe('findAll', () => {
    it('Deve retornar uma lista com todos os Clientes', async () => {
      mockRepository.findAll!.mockResolvedValue(mockArrayClientes);

      const clientes = await clienteService.findAll();
      expect(clientes).toEqual(mockArrayClientes);
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar um erro ao buscar todos os Clientes', () => {
      jest
        .spyOn(clienteRepository, 'findAll')
        .mockRejectedValueOnce(new Error());

      void expect(clienteService.findAll()).rejects.toThrow();
    });
  });
});
