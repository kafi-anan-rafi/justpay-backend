import { Matches, IsPhoneNumber, IsEmail } from "class-validator";

export class SigninAgentDto {
  @IsEmail()
  email: string;

  @Matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: "Password must contain minimum 8 characters, at least 1 letter, 1 number and 1 special character" })
  password: string;
}