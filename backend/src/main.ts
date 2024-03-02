import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log('ENV___', process.env.DATABASE_URL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();
