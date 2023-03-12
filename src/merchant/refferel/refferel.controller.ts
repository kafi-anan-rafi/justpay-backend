import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefferelService } from './refferel.service';
import { CreateRefferelDto } from './dto/create-refferel.dto';
import { UpdateRefferelDto } from './dto/update-refferel.dto';

@Controller('refferel')
export class RefferelController {
  constructor(private readonly refferelService: RefferelService) {}

  @Post()
  create(@Body() createRefferelDto: CreateRefferelDto) {
    return this.refferelService.create(createRefferelDto);
  }

  @Get()
  findAll() {
    return this.refferelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refferelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefferelDto: UpdateRefferelDto) {
    return this.refferelService.update(+id, updateRefferelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refferelService.remove(+id);
  }
}
