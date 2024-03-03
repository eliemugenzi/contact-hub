import { Type } from 'class-transformer';
import { ContactPreferenceType } from '@prisma/client';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateContactDTO {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @Type(() => ContactPreferenceDTO)
  @ValidateNested({ each: true })
  preferences: ContactPreferenceDTO[];
}

export class ContactPreferenceDTO {
  @IsEnum(ContactPreferenceType)
  type: ContactPreferenceType;

  @IsNotEmpty()
  value: string;
}
