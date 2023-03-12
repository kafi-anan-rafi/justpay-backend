import { IsNumber, IsString } from "class-validator";

export class CashOutDto {

  @IsString()
  agent_phone: string;

  @IsString()
  user_phone: string;

  @IsNumber()
  amount: number;

  @IsString()
  cashout_time: string;

  @IsString()
  transaction_id: string;

  @IsNumber()
  cashout_charge: number;
}