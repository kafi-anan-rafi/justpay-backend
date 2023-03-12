import { IsEmail, IsNotEmpty, Length, MaxLength, min, MinLength } from "class-validator";


export class CreateAuthDto {
    @IsNotEmpty({message:"Name can not be empty!"})
    name:string;

    @IsNotEmpty({message:"Email can not be empty!"})
    @IsEmail()
    email:string;

    @IsNotEmpty({message:"Phone can not be empty!"})
    @MinLength(11)
    @MaxLength(11)
    phone:string;

    @IsNotEmpty({message:"Password can not be empty!"})
    password:string;

    //@IsNotEmpty({message:"Profile image can not be empty!"})
    profile_image:string;

    balance:string;
}
