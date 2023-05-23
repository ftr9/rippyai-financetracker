import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsPositive,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';

export class addMonthlyPlanDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  income: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  savings: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  investment: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  expenseBudget: number;

  @IsNotEmpty()
  @IsArray({ message: 'please provide categories list' })
  @ArrayMinSize(1)
  categories: string[];
}
