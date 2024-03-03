import { NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DatabaseService } from 'src/database/database.service';

export class CheckContactOwnership implements NestMiddleware {
  constructor(private readonly db: DatabaseService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const user = req['user'];
    const { contactId } = req.params;
    const foundContact = await this.db.contact.findFirst({
      where: {
        user_id: user?.id,
        id: contactId,
      },
    });

    if (!foundContact) {
      throw new NotFoundException(
        'The contact you are looking for is not found!',
      );
    }

    req['contact'] = foundContact;
    next();
  }
}
