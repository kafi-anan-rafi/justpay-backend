import { PartialType } from '@nestjs/mapped-types';
import { CreateHelptokenDto } from './create-helptoken.dto';

export class UpdateHelptokenDto extends PartialType(CreateHelptokenDto) {}
