import { IsNumber, IsDate, IsOptional } from "class-validator";

export class AddBalanceDto {
  // @IsOptional()
  @IsNumber()
  agent_id: number;

  @IsNumber()
  balance: number;

  @IsOptional()
  @IsDate()
  created_at: string;

  @IsOptional()
  @IsDate()
  updated_at: string;
}