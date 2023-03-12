import { Body, Controller, Delete, FileTypeValidator, Get, InternalServerErrorException, MaxFileSizeValidator, Param, 
ParseFilePipe, Post, Put, Req, Res, Session, UnauthorizedException, UploadedFile, UseGuards,
UseInterceptors, 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/admin/entity/user.entity';
import { CruduserService } from 'src/admin/services/cruduser/cruduser.service';
import { LoginForm } from 'src/admin/services/dto/login.dto';
import { UserForm } from 'src/admin/services/dto/userform.dto';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { diskStorage } from 'multer';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { RoleAssignService } from 'src/admin/services/role-assign/role-assign.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cruduserService: CruduserService,
    private readonly roleAssignService: RoleAssignService,
    @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>) {}

        
@Post('signup')
@UseInterceptors(FileInterceptor('myfile',
        {storage:diskStorage({
          destination: './uploads',
          filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
          }
        })
        
        }))
  async signup(@Session() session, @Body() mydto: UserForm,@UploadedFile( new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 16000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) 
  
  file: Express.Multer.File) {
    mydto.filename = file.filename;
    const username = session.username;
      if(username == 'ricky'){
    return await this.cruduserService.insertUser(mydto);}
    else { throw new UnauthorizedException('invalid actions');}
  }

  @UseGuards(LocalAuthGuard)
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


  @Put(':id')
  async updateuser(@Session() session,@Param('id') id: number, @Body() mydto: UserForm) {
    const username = session.username;
    const useraccount = await this.userRepo.findOneBy({id});
    if(username != null){
      if (useraccount.updateStatus == false) {
        throw new UnauthorizedException(`User with id ${id} not allowed to perform create operation.`);
      }
      else{
           return await this.cruduserService.updateUser(id, mydto);
      }}
      else{throw new UnauthorizedException('You need to login first')}
  }

  @Delete(':id')
  async deleteUser(@Session() session,@Param('id') id: number) {
    const username = session.username;
    const useraccount = await this.userRepo.findOneBy({id});
    if(username != null){
      if (useraccount.updateStatus == false) {
        throw new UnauthorizedException(`User with id ${id} not allowed to perform create operation.`);
      }
      else{
        await this.cruduserService.deleteUser(id);
        return { message: `User with id ${id} deleted successfully.` };
      }}
      else{throw new UnauthorizedException('You need to login first')}
  }

  
  @Get(':id')
  async getuser(@Session() session,@Param('id') id: number) {
   const useraccount = await this.userRepo.findOneBy({id});
   const username = session.username;
   if(username != null){
    if (useraccount.createStatus == false) {
      throw new UnauthorizedException(`User with id ${id} not allowed to perform view operation.`);
    }
    else{
    return await this.cruduserService.getUser(id);
    }}
    else{throw new UnauthorizedException('You need to login first')}
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Session() session) {
    if (session.destroy()) {
      return { message: 'you are logged out' };
    } else {
      throw new UnauthorizedException('invalid actions');
    }
}

//Role assign

@Post(':id/view')
    async createrole(@Session() session, @Param('id') id: number) {
      const username = session.username;
      if(username == 'rayan'){
    await this.roleAssignService.createRole(id);
    return'View role assigned sucessfuly!';}
    else{throw new UnauthorizedException('invalid actions');}
  }

  @Put(':id/update')
    async updaterole(@Param('id') id: number) {
    await this.roleAssignService.updateRole(id);
    return'Role assigned sucessfuly!';
  }

  @Put(':id/delete')
    async deleterole(@Param('id') id: number) {
    await this.roleAssignService.deleteRole(id);
    return'Role assigned sucessfuly!';
  }
}

