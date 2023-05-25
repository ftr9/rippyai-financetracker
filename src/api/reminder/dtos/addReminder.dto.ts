import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsArray,
  IsPositive,
  ArrayMinSize,
} from 'class-validator';

export class addReminderDto {
  @IsNotEmpty()
  @IsString()
  borrowerName: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  purpose: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  dateValue: string[];
}
