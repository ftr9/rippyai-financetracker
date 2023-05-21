import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class addExpenseDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
