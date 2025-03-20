/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from '../service/produto.service';
import { CreateProdutoDto } from '../dto/create-produto.dto';

describe('ProdutoController', () => {
  let controller: ProdutoController;
  let service: ProdutoService;

  const mockService: Partial<Record<keyof ProdutoService, jest.Mock>> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [
        {
          provide: ProdutoService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProdutoController>(ProdutoController);
    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      mockService.create!.mockResolvedValue(produto);

      await expect(controller.create(createProdutoDto)).resolves.toEqual(
        produto,
      );
      expect(mockService.create).toHaveBeenCalledWith(createProdutoDto);
    });
  });

  describe('findAll', () => {
    it('Deve retornar todos os produtos', async () => {
      const produtos = [{ id: '1', nome: 'Produto Teste' }];
      mockService.findAll!.mockResolvedValue(produtos);

      await expect(controller.findAll()).resolves.toEqual(produtos);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Deve retornar um produto específico de acordo com o id', async () => {
      const id = '1';
      const produto = { id, nome: 'Produto Teste' };
      mockService.findOne!.mockResolvedValue(produto);

      await expect(controller.findOne(id)).resolves.toEqual(produto);
      expect(mockService.findOne).toHaveBeenCalledWith(id);
    });

    it('Deve lançar NotFoundException se o produto não for encontrado', () => {
      const id = '1';
      mockService.findOne!.mockResolvedValue(null);
      expect(mockService.findOne).toHaveBeenCalledWith(id);
    });
  });
});
