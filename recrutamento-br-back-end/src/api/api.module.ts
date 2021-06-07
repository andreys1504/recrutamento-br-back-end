import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CoreModule } from 'src/core/core.module';
import { DomainModule } from 'src/domain/domain.module';
import { AppAuthGuard } from './configurations/security-routes/app-auth.guard';
import { TokenService } from './configurations/security-routes/token.service';
import { TokenStrategy } from './configurations/security-routes/token.strategy';
import { ContaUsuarioController } from './controllers/conta-usuario.controller';
import { HomeController } from './controllers/home.controller';
import { VagaController } from './controllers/vaga.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
    CoreModule,
    DomainModule,
  ],
  controllers: [ContaUsuarioController, HomeController, VagaController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard,
    },
    TokenService,
    TokenStrategy,
  ],
})
export class ApiModule {}
