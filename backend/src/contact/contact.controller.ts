import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateContactDTO } from './dto/create-contact.dto';
import httpResponse, { HttpResponse } from 'src/utils/helpers/httpResponse';
import { Request } from 'express';

@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async createContact(
    @Body() data: CreateContactDTO,
    @Req() req: Request,
  ): Promise<HttpResponse> {
    const user = req['user'];
    const result = await this.contactService.createNewContact(data, user?.id);

    return httpResponse({
      status: HttpStatus.CREATED,
      data: result,
      message: 'A new contact has been added successfully!',
    });
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getMyContacts(@Req() req: Request): Promise<HttpResponse> {
    const user = req['user'];
    const result = await this.contactService.getMyContacts(user?.id);

    return httpResponse({
      status: HttpStatus.OK,
      data: result,
    });
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getSingleContact(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: Request,
  ): Promise<HttpResponse> {
    const user = req['user'];

    const result = await this.contactService.getOneContact(id, user?.id);

    return httpResponse({
      status: HttpStatus.OK,
      data: result,
    });
  }
}
