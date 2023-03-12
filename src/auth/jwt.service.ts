import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
    private readonly secretOrPrivateKey = 'yourSecretKey';

    sign(payload: any): string {
      return jwt.sign(payload, this.secretOrPrivateKey);
    }
  
    verify(token: string): any {
      try {
        return jwt.verify(token, this.secretOrPrivateKey);
      } catch (err) {
        return null;
      }
    }
}
