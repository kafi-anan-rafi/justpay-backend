import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/admin/entity/user.entity';
import { CruduserService } from 'src/admin/services/cruduser/cruduser.service';
import { LoginForm } from 'src/admin/services/dto/login.dto';
import { UserForm } from 'src/admin/services/dto/userform.dto';
import { AuthService } from 'src/auth/auth.service';
import { DeactivateAuthGuard } from 'src/auth/deactivate.guard';
import { Repository } from 'typeorm';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly cruduserService: CruduserService,
    @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Session() session, @Body() loginDto: LoginForm) {
    {
      if(this.authService.login(loginDto))
      {
        session.username = loginDto.username;     
        console.log(session.username);
        return {message:"success"};      
      }
  }
}

@UseGuards(AuthGuard('local'))
@Post('insertuser')
  async insertuser(@Body() mydto: UserForm) {
    return await this.cruduserService.insertUser(mydto);
  }

  @UseGuards(AuthGuard('local'))
  @Put(':id')
  async updateuser(@Param('id') id: number, @Body() mydto: UserForm) {
    return await this.cruduserService.updateUser(id, mydto);
  }

  @UseGuards(AuthGuard('local'))
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.cruduserService.deleteUser(id);
    return { message: `User with id ${id} deleted successfully.` };
  }

  @UseGuards(AuthGuard('local'))
  @Get(':id')
  async getuser(@Param('id') id: number) {
    const useraccount = await this.userRepo.findOneBy({id});
    if (useraccount.createStatus == false) {
      throw new UnauthorizedException(`User with id ${id} not allowed to perform create operation.`);
    }
    else{
    return await this.cruduserService.getUser(id);
    }
  }
  

  @Post('logout')
  @UseGuards(new DeactivateAuthGuard('local'))
  async logout(@Session() session) {
    if(session.destroy())
    {
      return {message:"you are logged out"};
    }
    else
    {
      throw new UnauthorizedException("invalid actions");
    }
  }
}

