import { IsEmail, IsNotEmpty } from "class-validator";


export class signinDto {
    
    @IsNotEmpty({message:"Email can not be empty!"})
    @IsEmail()
    email:string;

    @IsNotEmpty({message:"Password can not be empty!"})
    password:string;
}
