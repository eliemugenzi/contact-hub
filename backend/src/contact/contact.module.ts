import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ContactService, DatabaseService, JwtService],
  controllers: [ContactController],
})
export class ContactModule {}
