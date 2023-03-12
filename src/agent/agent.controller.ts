import { Controller, Get, Post, UseGuards, Param, Body, Delete, Patch, Query, ParseIntPipe, Session, MaxFileSizeValidator, FileTypeValidator, ParseFilePipe, UploadedFile, UnauthorizedException, UseInterceptors, NotFoundException } from '@nestjs/common';
import { AgentService } from './services/agent.service';
import { SignupAgentDto } from './dto/signup-agent.dto';
import { SigninAgentDto } from './dto/signin-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { TokenService } from './services/token.service';
import { AddTokenDto } from './dto/add-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { OfferService } from './services/offer.service';
import { ReferService } from './services/refer.service';
import { CashInService } from './services/cashin.service';
import { CashOutService } from './services/cashout.service';
import { CashInDto } from './dto/cash-in.dto';
import { CashOutDto } from './dto/cash-out.dto';
import { WithdrawService } from './services/withdraw.service';
import { WithdrawDto } from './dto/withdraw.dto';
import { BonusService } from './services/bonus.service';
import { BonusDto } from './dto/bonus.dto';
import { BonusEntity } from './entities/bonus.entity';
import { SessionGuard } from './session.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BalanceService } from './services/balance.service';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { AddBalanceDto } from './dto/add-balance.dto';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService,
    private readonly tokenService: TokenService,
    private readonly offerService: OfferService,
    private readonly referService: ReferService,
    private readonly cashInService: CashInService,
    private readonly cashOutService: CashOutService,
    private readonly withdrawService: WithdrawService,
    private readonly bonusService: BonusService,
    private readonly balanceService: BalanceService,
  ) { }

  // PROFILE SECTION
  @Post('signup')
  @UseInterceptors(FileInterceptor('myfile', {
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
      }
    })
  }))
  signup(@Body() signupAgentDto: SignupAgentDto, @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 200000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File) {
    signupAgentDto.filename = file.filename;
    signupAgentDto.created_at = new Date().toLocaleString();
    return this.agentService.signup(signupAgentDto);
  }

  @Get('signin')
  async signin(@Session() session, @Body() agent: SigninAgentDto) {
    const result = await this.agentService.signin(agent)
    if (result.status) {
      session.email = agent.email;
      session.agentId = result.agentId;
      return { message: "success" };
    }
    else {
      return { message: "invalid credentials" };
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

  // @Post('/sendemail')
  // sendEmail(@Body() mydata) {
  // return this.agentService.sendEmail(mydata);
  // }

  @Get('profile/:id')
  viewProfile(@Param('id') id: number) {
    return this.agentService.viewProfile(id);
  }

  @Patch('profile/:id')
  // @UseGuards(SessionGuard)
  updateProfile(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.updateProfile(+id, updateAgentDto);
  }

  // DASHBOARD
  @Get('info/balance/:id')
  getbalance(@Param('id') id: number) {
    return this.balanceService.getBalance(id);
  }

  @Get('info/cashout/:id')
  totalCashout(@Param('id', ParseIntPipe) id: number, @Query() paginationQuery) {
  }

  @Get('info/bonus/:id')
  totalBonusMoney(@Param('id') id: number) {
    return this.bonusService.totalBonusMoney(id);
  }

  @Get('info/refer/:id')
  totalReferMoney(@Param('id') id: number) {
    return this.referService.totalReferMoney(id);
  }

  // Cash In, Cash Out & Withdraw
  @Post('cashin/:id')
  cashIn(@Body() amount: CashInDto) {
    return this.cashInService.cashIn(amount);
  }

  @Post('cashout/:id')
  cashOut(@Body() amount: CashOutDto) {
    return this.cashOutService.cashOut(amount);
  }

  @Post('withdraw/:id')
  async withdraw(@Param() id: number, @Body() amount: number) {
    const balance = await this.balanceService.getBalance(id);
    // return this.withdrawService.withdraw(balance, amount);
  }

  @Post("balance")
  // @UseGuards(SessionGuard)
  addBalance(@Session() session, balanceDto: AddBalanceDto) {
    console.log(session);
    balanceDto.agent_id = session.agentId
    return this.balanceService.addBalance(balanceDto);
  }

  @Patch("balance/:id")
  updateBalance(@Param() id: number, updateBalanceDto: UpdateBalanceDto) {
    return this.balanceService.updateBalance(id, updateBalanceDto);
  }

  // Bonus
  @Post("bonus/cashin/:id")
  cashInBonus(@Body() amount: BonusDto) {
    const newAmount = new BonusEntity()

    // set Admin ID from sesstion
    // newAmount.agentId = amount
    newAmount.created_at = new Date();
    newAmount.type = 1;
    // newAmount.updatedAt = amount.updatedAt;
    newAmount.amount = amount.amount;

    // return this.bonusService.cashInBonus(newAmount);
  }

  @Get("bonus/cashout/:id")
  cashOutBonus(@Body() amount: BonusDto) {
    const newAmount = new BonusEntity()

    // set Admin ID from sesstion
    // newAmount.agentId = amount
    newAmount.created_at = new Date();
    newAmount.type = 2;
    // newAmount.updatedAt = amount.updatedAt;
    newAmount.amount = amount.amount;

    // return this.bonusService.cashOutBonus(newAmount);
  }

  // Referrel

  @Post('refer/user')
  referUser() {
    return this.referService.referUser();
  }

  @Post('refer/agent')
  referAgent() {
    return this.referService.referAgent();
  }


  // Offer Page
  @Get('offer')
  offer() {
    return this.offerService.offer();
  }


  // Help Token
  @Get('token/:id')
  getAllToken(@Session() session, @Param() id: number) {
    return this.tokenService.getAllToken(id);
  }

  @Post('token')
  async addToken(@Body() token: AddTokenDto) {
    token.created_at = new Date().toLocaleString();
    const admin = await this.viewProfile(token.agent_id)
    if (admin) {
      return this.tokenService.addToken(token);
    } else {
      throw new NotFoundException("User not found")
    }
  }

  @Patch('token/:id')
  updateToken(@Param() id: number, @Body() token: UpdateTokenDto) {
    return this.tokenService.updateToken(id, token);
  }

  @Delete("token/:id")
  deleteToken(@Param() id: number) {
    return this.tokenService.deleteToken(+id);
  }

}