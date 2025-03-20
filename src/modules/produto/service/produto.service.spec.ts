/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { ProdutoRepository } from '../repository/produto.repository';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let repository: ProdutoRepository;

  const mockRepository: Partial<Record<keyof ProdutoRepository, jest.Mock>> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: ProdutoRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
    repository = module.get<ProdutoRepository>(ProdutoRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Deve retornar um novo produto criado', async () => {
      const createProdutoDto: CreateProdutoDto = {
        nome: 'Produto Teste',
        descricao: 'Descrição do Produto Teste',
        categoria: 'Categoria Teste',
        preco: 100,
      };

      const produto = { id: '1', ...createProdutoDto };
      mockRepository.create!.mockResolvedValue(produto);

      await expect(service.create(createProdutoDto)).resolves.toEqual(produto);
      expect(mockRepository.create).toHaveBeenCalledWith(createProdutoDto);
    });
  });

  describe('findAll', () => {
    it('Deve rtetornar todos os produtos', async () => {
      const produtos = [{ id: '1', nome: 'Produto Teste' }];
      mockRepository.findAll!.mockResolvedValue(produtos);

      await expect(service.findAll()).resolves.toEqual(produtos);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Deve retornar um produto expec[ifico de acordo com o id', async () => {
      const id = '1';
      const produto = { id, nome: 'Produto Teste' };
      mockRepository.findOne!.mockResolvedValue(produto);

      await expect(service.findOne(id)).resolves.toEqual(produto);
      expect(mockRepository.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if produto not found', async () => {
      const id = '1';
      mockRepository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(
        new NotFoundException(`Produto com ID ${id} não encontrado`),
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith(id);
    });
  });
});
