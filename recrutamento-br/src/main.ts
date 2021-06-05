import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionsHandler } from './api/configurations/exceptions/exceptions-handler.filter';
import { AppModule } from './app.module';
import { DatabaseService } from './data/data-source/database-service';
import { Environments } from './core/settings/environments';
import { ResponseInterceptor } from './api/configurations/controllers/response.interceptor';

const configsSwagger = new DocumentBuilder()
  .setTitle('Recrutamento BR')
  .setDescription('')
  .setVersion('1.0')
  .addTag('')
  .build();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: 'Content-Type, Accept, Authorization',
};


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  const document = SwaggerModule.createDocument(app, configsSwagger);
  SwaggerModule.setup('api', app, document);

  if (process.env.ENABLE_CORS === 'true') {
    app.enableCors(corsOptions);
  }

  if (process.env.NODE_ENV !== Environments.Development.toString()) {
    app.useGlobalFilters(new ExceptionsHandler());
  }

  app.useGlobalInterceptors(new ResponseInterceptor());

  var databaseService = new DatabaseService();
  await databaseService.connectAsync();

  await app.listen(process.env.PORT_API);
}
bootstrap();
