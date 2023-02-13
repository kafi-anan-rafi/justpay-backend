import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModuleOptions } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [AdminModule, AuthModuleOptions, TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: '123456789',
     database: 'JustPay',
     autoLoadEntities: true,
     synchronize: true,
   }
   ),],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
