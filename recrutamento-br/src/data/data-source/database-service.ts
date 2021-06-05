import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  async connectAsync(): Promise<void> {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async onApplicationShutdown(signal: string): Promise<void> {
    console.log('encerrando conexão com banco de dados...');
    await mongoose.connection.close();
  }
}
