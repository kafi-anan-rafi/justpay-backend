import { PartialType } from "@nestjs/mapped-types";
import { AddBalanceDto } from './add-balance.dto';

export class UpdateBalanceDto extends PartialType(AddBalanceDto) { }