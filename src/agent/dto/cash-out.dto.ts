import { IsNumber, IsOptional, IsString, IsEmail } from "class-validator";

export class CashOutDto {
  @IsEmail()
  agent_email: string;

  @IsEmail()
  user_email: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  cashout_time: string;

  @IsOptional()
  @IsString()
  transaction_id: string;

  @IsOptional()
  @IsNumber()
  cashout_charge: number;
}