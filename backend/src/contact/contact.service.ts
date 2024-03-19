import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateContactDTO } from './dto/create-contact.dto';
import { Contact, ContactPreference } from '@prisma/client';
import { isEmpty } from 'lodash';
import async from 'async';
import { UpdateContactDTO } from './dto/update-contact.dto';
import { DeleteContactsDTO } from './dto/delete-contacts.dto';

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

  async getMyContacts(userId: string, search = '') {
    const foundContacts = await this.db.contact.findMany({
      where: {
        user_id: userId,
        status: 'ACTIVE',
        OR: !isEmpty(search)
          ? [
              {
                first_name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                last_name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ]
          : undefined,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        created_at: true,
        preferences: {
          select: {
            id: true,
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
        const duplicates = await this.getDuplicates(contact, userId);

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
            id: true,
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

  async getDuplicates(contact: Contact, userId: string) {
    const foundSimilarContacts = await this.db.contact.findMany({
      where: {
        user_id: userId,
        status: 'ACTIVE',
        NOT: {
          id: contact.id,
        },
        OR: [
          {
            first_name: {
              contains: contact.first_name,
              mode: 'insensitive',
            },
          },
          {
            last_name: {
              contains: contact.last_name,
              mode: 'insensitive',
            },
          },
          {
            first_name: {
              contains: contact.last_name,
              mode: 'insensitive',
            },
          },
          {
            last_name: {
              contains: contact.first_name,
              mode: 'insensitive',
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

  async mergeContacts(
    mainContactId: string,
    duplicateContactId: string,
    userId: string,
  ) {
    const baseContact = await this.db.contact.findFirst({
      where: {
        id: mainContactId,
        user_id: userId,
      },
    });

    if (!baseContact) {
      throw new NotFoundException('No base contact found');
    }

    const duplicateContacts = await this.getDuplicates(baseContact, userId);

    const foundDuplicate = duplicateContacts.find(
      (contact) => contact.id === duplicateContactId,
    );

    if (!foundDuplicate) {
      throw new NotFoundException('No duplicate contact found');
    }

    const duplicatePreferences = await this.db.contactPreference.findMany({
      where: {
        contact_id: foundDuplicate.id,
      },
    });

    const basePreferences = await this.db.contactPreference.findMany({
      where: {
        contact_id: baseContact.id,
      },
    });

    const newContactPreferences = await this.mergeContactPreferences(
      basePreferences as ContactPreference[],
      duplicatePreferences as ContactPreference[],
    );

    await this.db.contactPreference.deleteMany({
      where: {
        OR: [
          {
            contact_id: foundDuplicate.id,
          },
          {
            contact_id: baseContact.id,
          },
        ],
      },
    });

    await this.db.contact.update({
      where: {
        id: foundDuplicate.id,
      },
      data: {
        status: 'INACTIVE',
      },
    });

    const mappedPreferences = newContactPreferences.map((preference) => ({
      type: preference.type,
      value: preference.value,
      contact_id: baseContact.id,
    }));

    await this.db.contactPreference.createMany({
      data: mappedPreferences,
    });

    const newContact = await this.db.contact.findFirst({
      where: {
        id: baseContact.id,
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

    return newContact;
  }

  async mergeContactPreferences(
    basePreferences: ContactPreference[],
    duplicatePreferences: ContactPreference[],
  ): Promise<ContactPreference[]> {
    const newPreferences = [...basePreferences, ...duplicatePreferences];
    const uniquePreferences = [];
    const seen = {};
    newPreferences.forEach((preference) => {
      const objectKey = preference.value;
      if (!seen[objectKey]) {
        uniquePreferences.push(preference);
        seen[objectKey] = true;
      }
    });
    return uniquePreferences;
  }

  async deletePreference(
    contactId: string,
    preferenceId: string,
    userId: string,
  ) {
    const foundContact = await this.db.contact.findFirst({
      where: {
        id: contactId,
        user_id: userId,
      },
      select: {
        id: true,
        preferences: {
          where: {
            id: preferenceId,
          },
        },
      },
    });

    if (isEmpty(foundContact.preferences)) {
      throw new NotFoundException('Preference not found');
    }

    await this.db.contactPreference.delete({
      where: {
        id: preferenceId,
      },
    });

    const freshContact = await this.getOneContact(contactId, userId);

    return freshContact;
  }

  async updateContact(
    contactId: string,
    userId: string,
    body: UpdateContactDTO,
  ) {
    const contact = await this.db.contact.findFirst({
      where: {
        id: contactId,
        user_id: userId,
      },
      select: {
        id: true,
        preferences: true,
      },
    });

    if (!contact) {
      throw new NotFoundException(
        'The contact you are trying to update does not exist!',
      );
    }

    const { preferences, ...rest } = body;

    if (!isEmpty(rest)) {
      await this.db.contact.update({
        where: {
          id: contactId,
        },
        data: {
          ...rest,
        },
      });
    }

    if (!isEmpty(preferences)) {
      const mergedPreferences = await this.mergeContactPreferences(
        contact.preferences,
        preferences as any,
      );

      const mappedPreferences = mergedPreferences.map((preference) => ({
        type: preference.type,
        value: preference.value,
        contact_id: contact.id,
      }));

      await this.db.contactPreference.deleteMany({
        where: {
          contact_id: contactId,
        },
      });
      await this.db.contactPreference.createMany({
        data: mappedPreferences,
      });
    }

    const finalContact = await this.getOneContact(contactId, userId);
    return finalContact;
  }

  async deleteContact(contactId: string, userId: string) {
    const contact = await this.db.contact.findFirst({
      where: {
        id: contactId,
        user_id: userId,
      },
    });

    if (!contact) {
      throw new NotFoundException(
        'The contact you are trying to delete does not exist',
      );
    }

    // Clear all the contact preferences
    await this.db.contactPreference.deleteMany({
      where: {
        contact_id: contact.id,
      },
    });

    // DELETE i.e Deactivate
    await this.db.contact.update({
      where: {
        id: contactId,
      },
      data: {
        status: 'INACTIVE',
      },
    });
  }

  async bulkDeleteContacts(userId: string, data: DeleteContactsDTO) {
    const foundContacts = await this.db.contact.findMany({
      where: {
        id: {
          in: data.contact_ids,
        },
        user_id: userId,
      },
    });

    if (foundContacts.length === 0) {
      throw new NotFoundException(
        'The contacts you are trying to delete are not found!',
      );
    }

    const result = await this.db.contactPreference.deleteMany({
      where: {
        contact_id: {
          in: data.contact_ids,
        },
      },
    });

    if (result.count > 0) {
      await this.db.contact.deleteMany({
        where: {
          id: {
            in: data.contact_ids,
          },
          user_id: userId,
        },
      });
    }
  }
}
