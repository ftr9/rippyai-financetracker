import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class getExpenseQueryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  page: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number;
}
