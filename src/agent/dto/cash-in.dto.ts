import { IsString, IsEmail, IsOptional } from "class-validator";

export class CashInDto {

  @IsEmail()
  agent_email: string;

  @IsEmail()
  user_email: string;

  @IsString()
  amount: number;

  @IsOptional()
  @IsString()
  cashin_time: string;

  @IsOptional()
  @IsString()
  transaction_id: string;
}