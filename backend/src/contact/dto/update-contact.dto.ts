import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { ContactPreferenceType } from '@prisma/client';

export class UpdateContactDTO {
  first_name: string;
  last_name: string;

  @ValidateNested({ each: true })
  preferences: UpdateContactPreferenceDTO[];
}

export class UpdateContactPreferenceDTO {
  @IsEnum(ContactPreferenceType)
  @IsNotEmpty()
  type: ContactPreferenceType;

  @IsNotEmpty()
  value: string;
}
