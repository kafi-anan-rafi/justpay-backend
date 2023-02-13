import { IsNotEmpty, IsInt, IsString,IsDate, Length } from "class-validator";

export class ClientForm{

    @IsString()
    name : string;

    @IsInt()
    @Length(11)
    phone :string;

    @IsDate()
    dob : string;

    @IsString()
    uname : string;

    @Length(8,12)
    pass : string

    @IsString()
    balance : number;

}