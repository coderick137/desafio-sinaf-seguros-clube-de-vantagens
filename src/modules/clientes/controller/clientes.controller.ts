/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  ForbiddenException,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { ClientesService } from '../service/clientes.service';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../../auth/decorators/public.decorator';
import { AuthGuard } from '../../../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../../auth/roles.guard';
@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários.',
    type: [CreateClienteDto],
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async findAll(@Request() req: Request & { user: { tipo: string } }) {
    try {
      const user = req.user;

      // Verifica se o usuário tem a role 'admin' (já feito pelo RolesGuard)
      if (user.tipo !== 'admin') {
        throw new ForbiddenException(
          'Acesso negado: somente administradores podem acessar esta rota.',
        );
      }

      const clientes = await this.clientesService.findAll();
      console.log('Clientes:', clientes);
      return clientes;
    } catch (error: unknown) {
      if (
        error instanceof ForbiddenException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new ForbiddenException('Ocorreu um erro desconhecido.');
    }
  }
}
