import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
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

  @Put('/:id/merge/:duplicateContactId')
  @UseGuards(AuthGuard)
  async mergeContacts(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('duplicateContactId', new ParseUUIDPipe())
    duplicateContactId: string,
    @Req() req: Request,
  ): Promise<HttpResponse> {
    const user = req['user'];
    const result = await this.contactService.mergeContacts(
      id,
      duplicateContactId,
      user?.id,
    );

    return httpResponse({
      status: HttpStatus.OK,
      message: 'Contacts have been merged',
      data: result,
    });
  }

  @Delete('/:id/preferences/:preferenceId')
  @UseGuards(AuthGuard)
  async deletePreference(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('preferenceId', new ParseUUIDPipe()) preferenceId: string,
    @Req() req: Request,
  ): Promise<HttpResponse> {
    const user = req['user'];
    const result = await this.contactService.deletePreference(
      id,
      preferenceId,
      user?.id,
    );

    return httpResponse({
      status: HttpStatus.OK,
      message: 'Successfully deleted',
      data: result,
    });
  }
}
