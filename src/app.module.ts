import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService} from '@nestjs/jwt'; 
import { UserEntity } from './admin/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { SessionModule } from 'nestjs-session';
import { AgentModule } from './agent/agent.module';
import { MailerModule } from "@nestjs-modules/mailer";
import { PaymentModule } from './merchant/payment/payment.module';
import { FaqModule } from './merchant/faq/faq.module';
import { OfferModule } from './merchant/offer/offer.module';
import { BonusModule } from './merchant/bonus/bonus.module';
import { RefferelModule } from './merchant/refferel/refferel.module';
import { HelptokenModule } from './merchant/helptoken/helptoken.module';
import { AuthModule as MerchantAuth } from './merchant/auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthService } from './admin/auth/auth.service';
import { JwtStrategy } from './admin/auth/jwt.strategy';


@Module({
  imports: [ AdminModule, AgentModule,
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     ignoreTLS: true,
    //     secure: true,
    //     auth: {
    //       user: 'your email address',
    //       pass: 'your app password'
    //     },
    //   }
    // }),
    SessionModule.forRoot({ session: { secret: 'my-secret' } }),
    PassportModule.register({}),
    AdminModule,
    TypeOrmModule.forFeature([ UserEntity]),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'root',
    //   database: 'JustPay',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }), 
    
    MerchantAuth, TypeOrmModule.forRoot(typeOrmConfig), PaymentModule, FaqModule, OfferModule, 
    HelptokenModule, RefferelModule, BonusModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService,JwtService,JwtStrategy],
})
export class AppModule {}
