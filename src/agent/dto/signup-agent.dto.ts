import { IsDate, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Matches } from "class-validator";

export class SignupAgentDto {
  @IsEmail()
  email: string;

  @Length(4, 20, { message: "Name should be 4-20 character long" })
  name: string;

  @IsString()
  @Length(5, 50, { message: "Address length must be 5-50 character long" })
  address: string;

  @IsString()
  @IsPhoneNumber("BD", { message: 'Enter a valid Bangladeshi phone number' })
  phone: string;

  @Matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: "Password must contain minimum 8 characters, at least 1 letter, 1 number and 1 special character" })
  password: string;

  @IsOptional()
  @IsDate()
  created_at: string;

  @IsOptional()
  @IsDate()
  updated_at: string;

  // @IsString()
  filename: string
}