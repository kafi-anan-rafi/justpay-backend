import { IsNumber, IsEmail, IsString, IsDate, IsOptional } from "class-validator";

export class AddTokenDto {
  @IsNumber()
  agent_id: number;

  @IsString()
  message: string;

  @IsOptional()
  @IsDate()
  created_at: string;

  @IsOptional()
  @IsDate()
  updated_at: string;

  @IsOptional()
  @IsString()
  response: string;
}