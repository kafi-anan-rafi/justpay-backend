import { Body, Controller, Delete, FileTypeValidator, Get, InternalServerErrorException, MaxFileSizeValidator, Param, 
ParseFilePipe, ParseIntPipe, Patch, Post, Put, Req, Res, Session, UnauthorizedException, UploadedFile, UseGuards,
UseInterceptors,
UsePipes,
ValidationPipe, 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/admin/entity/user.entity';
import { CruduserService } from 'src/admin/services/cruduser/cruduser.service';
import { LoginForm } from 'src/admin/services/dto/login.dto';
import { UserForm } from 'src/admin/services/dto/userform.dto';
import { Repository } from 'typeorm';
import { diskStorage } from 'multer';
import { RoleAssignService } from 'src/admin/services/role-assign/role-assign.service';
import { MailerService } from "@nestjs-modules/mailer/dist";
import { TransectionService } from 'src/admin/services/transection/transection.service';
import { TransectionForm } from 'src/admin/services/dto/transectionform.dto';
import { AuthService } from 'src/admin/auth/auth.service';
import { LocalAuthGuard } from 'src/admin/auth/local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cruduserService: CruduserService,
    private readonly roleAssignService: RoleAssignService,
    private readonly transectionService: TransectionService,
    private mailerService: MailerService,   
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>) {}

//CRUD         
@Post(':id/signup')
@UseInterceptors(FileInterceptor('myfile',
        {storage:diskStorage({
          destination: './uploads',
          filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
          }
        })
        
        }))
  async signup(@Session() session, @Param('id') id: number, @Body() mydto: UserForm,@UploadedFile( new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 16000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) 
  
  file: Express.Multer.File) {
    mydto.filename = file.filename;
    const username = session.username;
    const useraccount = await this.userRepo.findOneBy({id});
    if(username != null){
      if (useraccount.createStatus == false) {
        throw new UnauthorizedException(`User with id ${id} not allowed to perform create operation.`);
      }
      else{
            return await this.cruduserService.insertUser(mydto);}}
      else {  
            throw new UnauthorizedException('You need to login first');}
  }

  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe)
  @Post('login')
  async login(@Session() session, @Body() loginDto: LoginForm) {
    {
      const username = session.username;
      if(username == null){
      if(this.authService.login(loginDto))
      {
        session.username = loginDto.username; 
        console.log(session.username);
        return {message:"success"};      
      }}
      else return { message: "You are already logged in!" };
  }
}


  @Put(':id')
  async updateuser(@Session() session,@Param('id',ParseIntPipe) id: number, @Body() mydto: UserForm) {
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
  async deleteUser(@Session() session,@Param('id',ParseIntPipe) id: number) {
    const username = session.username;
    const useraccount = await this.userRepo.findOneBy({id});
    if(username != null){
      if (useraccount.deleteStatus == false) {
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

  @Post("mail")
  async sendEmail(@Body() mydata){
    await this.mailerService.sendMail({
           to: mydata.email,
           subject: mydata.subject,
           text: mydata.text, 
         });
         console.log(mydata);
         
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


//Transection

@Post('transfer')
    transfer (@Session() session, @Body()transferdto:TransectionForm):Promise <any>{
      const username = session.username;
   if(username != null){
    return this.transectionService.moneyTransfer(transferdto);
}  else{throw new UnauthorizedException('You need to login first')}   
    } 


//Role assign

@Post(':id/view')
    async createrole(@Session() session, @Param('id') id: number) {
      const username = session.username;
      if(username == 'ricky'){
    await this.roleAssignService.createRole(id);
    return'View role assigned sucessfuly!';}
    else{throw new UnauthorizedException('invalid actions');}
  }

  @Put(':id/update')
    async updaterole(@Session() session, @Param('id') id: number) {
      const username = session.username;
      if(username == 'ricky'){
    await this.roleAssignService.updateRole(id);
    return'Role assigned sucessfuly!';
  }
}

  @Put(':id/delete')
    async deleterole(@Session() session, @Param('id') id: number) {
      const username = session.username;
      if(username == 'ricky'){
    await this.roleAssignService.deleteRole(id);
    return'Role assigned sucessfuly!';
  }
}

  @Post(':id/Rview')
    async removeCreate(@Session() session, @Param('id') id: number) {
      const username = session.username;
      if(username == 'ricky'){
    await this.roleAssignService.RemoveCreate(id);
    return'View role deletd sucessfuly!';}
    else{throw new UnauthorizedException('invalid actions');}
  }

  @Post(':id/Rupdate')
    async removeUpdate(@Session() session, @Param('id') id: number) {
      const username = session.username;
      if(username == 'ricky'){
    await this.roleAssignService.RemoveUpdate(id);
    return'Update role deletd sucessfuly!';}
    else{throw new UnauthorizedException('invalid actions');}
  }

  @Post(':id/Rdelete')
    async removeDelete(@Session() session, @Param('id') id: number) {
      const username = session.username;
      if(username == 'ricky'){
    await this.roleAssignService.RemoveDelete(id);
    return'Delete role deletd sucessfuly!';}
    else{throw new UnauthorizedException('invalid actions');}
  }

}


