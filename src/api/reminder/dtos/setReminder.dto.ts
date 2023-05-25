import { IsNotEmpty, IsString } from 'class-validator';
import { addReminderDto } from './addReminder.dto';

export class setReminderDto extends addReminderDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
