// scripts/clean-db.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Connection } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const connection = app.get(Connection);

  await Promise.all([
    connection.collection('organizations').deleteMany({}),
    connection.collection('users').deleteMany({}),
    connection.collection('roles').deleteMany({}),
    connection.collection('rolepermissions').deleteMany({}),
  ]);

  console.log('🧹 All collections cleaned.');
  await app.close();
}
bootstrap();
