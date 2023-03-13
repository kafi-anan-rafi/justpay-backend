import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, BadRequestException, UseInterceptors, Session, UnauthorizedException } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from '../session.gurd';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { signinDto } from './dto/signin.dto';


@Controller('merchant/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('profile_image', {
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
      }
    })
  }))
  async create(@Body() merchantInfo: CreateAuthDto, @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1000000000 }),
      new FileTypeValidator({ fileType: 'image' }),
    ],
  }),) file: Express.Multer.File) {
    merchantInfo.profile_image = file.filename;
    //console.log(merchantInfo);
    return await this.authService.signup(merchantInfo).catch((e) => {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }

      if (/(phone)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          'Account with this phone already exists.',
        );
      }
      return e;
    });
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signin(@Session() session, @Body() merchantInfo: signinDto) {
    //console.log(merchantInfo);
    if (session.email) {
      return { message: 'Already logedin!' };
    }
    else {
      const logged = await this.authService.signin(merchantInfo);
      if (logged.status) {
        session.email = await merchantInfo.email;
        session.user_id = logged.id;
        //console.log(session.user_id);
        return { message: 'success' };
      }
      else {
        return { message: 'Invalid Email or Password' };
      }
    }

  }

  @Get('signout')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: "you are logged out" };
    }
    else {
      throw new UnauthorizedException("invalid actions");
    }
  }

}
