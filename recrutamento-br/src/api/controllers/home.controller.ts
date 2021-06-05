import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioModel } from 'src/data/data-source/mongoose/schemas/conta-usuario/usuario.schema';
import { Usuario } from 'src/domain/conta-usuario/entities/usuario';
import { AllowAnonymous } from '../configurations/security-routes/roles.decorator';

@ApiTags('home')
@Controller('home')
export class HomeController {
  @Get()
  @AllowAnonymous()
  async index(@Req() req: any) {
    return await UsuarioModel.find({}, 'email perfil').exec() as Usuario[];
  }
}
