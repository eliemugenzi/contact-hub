import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateContactDTO } from './dto/create-contact.dto';
import { Contact } from '@prisma/client';
import { isEmpty } from 'lodash';
import async from 'async';

@Injectable()
export class ContactService {
  constructor(private readonly db: DatabaseService) {}

  async createNewContact(body: CreateContactDTO, userId: string) {
    const { preferences, ...rest } = body;

    const newContact = await this.db.contact.create({
      data: {
        ...rest,
        user_id: userId,
      },
    });

    const preferenceMap = preferences.map((preference) => ({
      ...preference,
      contact_id: newContact.id,
    }));

    await this.db.contactPreference.createMany({
      data: preferenceMap,
    });

    return {
      ...newContact,
      preferences: preferenceMap,
    };
  }

  async getMyContacts(userId: string) {
    const foundContacts = await this.db.contact.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        created_at: true,
        preferences: {
          select: {
            type: true,
            value: true,
            created_at: true,
          },
        },
      },
    });

    const mappedContacts = await async.mapSeries(
      foundContacts,
      async (contact: any) => {
        const duplicates = await this.getDuplicates(contact);

        if (!isEmpty(duplicates)) {
          contact.duplicates = duplicates;
        }

        return contact;
      },
    );

    return mappedContacts;
  }

  async getOneContact(contactId: string, userId: string) {
    const foundContact = await this.db.contact.findFirst({
      where: {
        id: contactId,
        user_id: userId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        created_at: true,
        preferences: {
          select: {
            type: true,
            value: true,
            created_at: true,
          },
        },
      },
    });

    if (!foundContact) {
      throw new NotFoundException(
        'The contact you are looking for does not exist!',
      );
    }

    return foundContact;
  }

  async getDuplicates(contact: Contact) {
    const foundSimilarContacts = await this.db.contact.findMany({
      where: {
        NOT: {
          id: contact.id,
        },
        OR: [
          {
            first_name: {
              contains: contact.first_name,
            },
          },
          {
            last_name: {
              contains: contact.last_name,
            },
          },
          {
            first_name: {
              contains: contact.last_name,
            },
          },
          {
            last_name: {
              contains: contact.first_name,
            },
          },
        ],
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        created_at: true,
        preferences: {
          select: {
            type: true,
            value: true,
            created_at: true,
          },
        },
      },
    });

    return foundSimilarContacts;
  }
}
