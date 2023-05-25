import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsPositive,
  ArrayMinSize,
  IsOptional,
  Min,
} from 'class-validator';

export class addMonthlyPlanDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  income: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  savings: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  investment: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  expenseBudget: number;

  @IsNotEmpty()
  @IsArray({ message: 'please provide categories list' })
  @ArrayMinSize(1)
  categories: string[];
}
