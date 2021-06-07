import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '../configurations/security-routes/roles.decorator';

@ApiTags('home')
@Controller('home')
export class HomeController {
  @Get()
  @AllowAnonymous()
  async index() {
    return 'Recrutamento BR'
  }
}
