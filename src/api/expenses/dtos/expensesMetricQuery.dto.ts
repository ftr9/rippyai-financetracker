import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class expensesMetricQueryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  to: string;
}
