import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService} from '@nestjs/jwt'; 
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './admin/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { SessionModule } from 'nestjs-session';
import { JwtStrategy } from './auth/jwt.strategy';


@Module({
  imports: [
    SessionModule.forRoot({ session: { secret: 'my-secret' } }),
    PassportModule.register({}),
    AdminModule,
    TypeOrmModule.forFeature([ UserEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'JustPay',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
  ],
  controllers: [AppController],
  providers: [AppService, AuthService,JwtService,JwtStrategy],
})
export class AppModule {
  
}
