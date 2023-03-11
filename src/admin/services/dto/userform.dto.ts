import { IsNotEmpty, IsInt, IsString,IsDate, Length, IsBoolean } from "class-validator";

export class UserForm{

    @IsString()
    name : string;

    @IsInt()
    @Length(11)
    phone:string;

    @IsDate()
    dob: string;

    @IsString()
    uname : string;

    @Length(8,12)
    pass : string

    balance : number;

    @IsBoolean()
    createStatus: boolean;

    @IsBoolean()
    updateStatus: boolean;

    @IsBoolean()
    deleteStatus: boolean;
}