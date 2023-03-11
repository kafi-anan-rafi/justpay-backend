import { Module } from '@nestjs/common';
import { JwtModule, JwtService} from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/admin/controllers/auth/auth.controller';
import { UserEntity } from 'src/admin/entity/user.entity';
import { CruduserService } from 'src/admin/services/cruduser/cruduser.service';
import { AuthService } from './auth.service';
import { DeactivateAuthGuard } from './deactivate.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'your-secret-key',
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule.register({ session: true }),TypeOrmModule.forFeature([UserEntity]), 
    PassportModule.register({ defaultStrategy: 'local', session: true }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService, LocalAuthGuard, JwtService,JwtStrategy,CruduserService,DeactivateAuthGuard]
})
export class AuthModule {}
