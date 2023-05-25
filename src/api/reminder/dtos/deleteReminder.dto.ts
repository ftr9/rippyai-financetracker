import { IsString, IsNotEmpty } from 'class-validator';
export class deleteReminderDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
