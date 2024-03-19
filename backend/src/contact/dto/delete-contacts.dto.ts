import { IsNotEmpty } from 'class-validator';

export class DeleteContactsDTO {
  @IsNotEmpty()
  contact_ids: string[];
}
