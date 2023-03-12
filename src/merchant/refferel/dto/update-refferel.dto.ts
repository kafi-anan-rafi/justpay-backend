import { PartialType } from '@nestjs/mapped-types';
import { CreateRefferelDto } from './create-refferel.dto';

export class UpdateRefferelDto extends PartialType(CreateRefferelDto) {}
