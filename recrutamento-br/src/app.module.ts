import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { DatabaseService } from './data/data-source/database-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
