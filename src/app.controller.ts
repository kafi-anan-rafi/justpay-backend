import { Controller, Get, Post, Request,UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { CONSTANTS } from './constants';
import { RoleGuard } from './role.guard';

@Controller('app')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  //authentication
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  Login(@Request()req): string {
    return this.authService.generateToken(req.user);
  }

  @Get("/merchant")
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.MERCHANT))
  merchantData(@Request()req) : string{
    return "This is private data for merchant";
  }

  @Get("/client")
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.CLIENT))
  clientdDeveloperData(@Request()req) : string{
    return "This is private data for client";
  }

  @Get("/agent")
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.AGENT))
  agentDeveloperData(@Request()req) : string{
    return "This is private data for agent";
  }
}

