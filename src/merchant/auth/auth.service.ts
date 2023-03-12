import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { signinDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth)
  private AuthRepository:Repository<Auth>,
  private mailerService: MailerService
  ){}

  async signup(merchantInfo:CreateAuthDto) {

    const merchantaccount =new Auth();
    merchantaccount.name = merchantInfo.name;
    merchantaccount.email = merchantInfo.email;
    merchantaccount.phone = merchantInfo.phone;
    merchantaccount.profile_image = merchantInfo.profile_image;
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(merchantInfo.password,salt);
    merchantaccount.password = hassedpassed;
    const emaildata = {
      email:merchantaccount.email,
      subject: "Successfully created justpay merchant account",
      text: "Hello "+merchantInfo.name+"\n\n You have Successfully created your merchent account! \n\n Thank you"
    };
    this.sendEmail(emaildata)
    return await this.AuthRepository.save(merchantaccount);
    
  }

  async signin(merchantInfo:signinDto) {
    const merchantData = await this.AuthRepository.findOneBy({email: merchantInfo.email});
    //console.log(merchantInfo);
    if(merchantData!=null){
      //console.log(merchantData);
      const isMatch = await bcrypt.compare(merchantInfo.password,merchantData.password);
      if(isMatch){
        return {status:true,id:merchantData.id};
      }
    }
    return {status:false};
  }

  async sendEmail(emaildata) {
    return   await this.mailerService.sendMail({
      to: emaildata.email,
      subject: emaildata.subject,
      text: emaildata.text, 
    });
  }

}
