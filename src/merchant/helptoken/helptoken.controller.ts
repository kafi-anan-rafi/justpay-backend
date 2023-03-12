import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HelptokenService } from './helptoken.service';
import { CreateHelptokenDto } from './dto/create-helptoken.dto';
import { UpdateHelptokenDto } from './dto/update-helptoken.dto';

@Controller('helptoken')
export class HelptokenController {
  constructor(private readonly helptokenService: HelptokenService) {}

  @Post()
  create(@Body() createHelptokenDto: CreateHelptokenDto) {
    return this.helptokenService.create(createHelptokenDto);
  }

  @Get()
  findAll() {
    return this.helptokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helptokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHelptokenDto: UpdateHelptokenDto) {
    return this.helptokenService.update(+id, updateHelptokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helptokenService.remove(+id);
  }
}
