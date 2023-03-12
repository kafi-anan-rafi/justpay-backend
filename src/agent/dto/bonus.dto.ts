import { IsDate, IsNumber, IsPhoneNumber } from "class-validator";

export class BonusDto {
  @IsNumber()
  agent_id: number;

  @IsNumber()
  type: number;

  @IsNumber()
  amount: number

  @IsDate()
  created_at: string;

  @IsDate()
  updated_at: string;
}