import { IsNumber, IsString } from "class-validator";

export class CashInDto {
  @IsNumber()
  id: number;

  @IsString()
  agent_phone: string;

  @IsString()
  user_phone: string;

  @IsString()
  amount: number;

  @IsString()
  cashin_time: string;

  @IsString()
  transaction_id: string;
}