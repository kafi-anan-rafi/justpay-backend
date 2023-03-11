import { IsString,IsDate, Length, IsBoolean } from "class-validator";

export class LoginForm{

    @IsString()
    username : string;

    @Length(8,12)
    password:string;
}