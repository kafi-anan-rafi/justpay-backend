import { IsNotEmpty, IsInt } from "class-validator";

export class TransectionForm{
    @IsNotEmpty()
    senderid : number;

    @IsNotEmpty()
    reciverid : number;

    @IsNotEmpty()
    @IsInt()
    amount : number;
}