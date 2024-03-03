import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseService } from './database/database.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, ContactModule],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
