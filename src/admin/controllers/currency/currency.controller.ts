import { Controller, Get, Post, Body, Patch, Param, Session, UnauthorizedException } from '@nestjs/common';
import { CurrencyEntity } from 'src/admin/entity/currency.entity';
import { CurrencyService } from 'src/admin/services/currency/currency.service';
import { CurrencyDTO } from 'src/admin/services/dto/currency.dto';
import { ExchangeDTO } from 'src/admin/services/dto/exchange.dto';


@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Post()
  async createCurrency(@Session() session, @Body() currencyDTO: CurrencyDTO): Promise<CurrencyEntity> {
    const username = session.username;
    if(username != null){
    return await this.currencyService.createCurrency(currencyDTO);
  } else{throw new UnauthorizedException('You need to login first')}
}

  @Get()
  async getAllCurrencies(@Session() session,): Promise<CurrencyEntity[]> {
    const username = session.username;
    if(username != null){
    return await this.currencyService.getAllCurrencies();
  }  else{throw new UnauthorizedException('You need to login first')}
}

  @Get(':name')
  async getCurrencyByName(@Session() session,@Param('name') name: string): Promise<CurrencyEntity> {
    const username = session.username;
    if(username != null){
    return await this.currencyService.getCurrencyByName(name);
  }  else{throw new UnauthorizedException('You need to login first')}
  }

  @Patch(':name')
  async updateCurrencyRate(
    @Param('name') name: string,
    @Body('exchangeRate') newRate: number, @Session() session,
  ): Promise<CurrencyEntity> {
    const username = session.username;
    if(username != null){
    return await this.currencyService.updateCurrencyRate(name, newRate);
  }  else{throw new UnauthorizedException('You need to login first')}
}
  

  @Post('exchange')
  async exchangeCurrency(@Session() session,@Body() exchangeDTO: ExchangeDTO): Promise<any> {
    const username = session.username;
    if(username != null){
    return await this.currencyService.exchangeCurrency(exchangeDTO);
  }  else {throw new UnauthorizedException('You need to login first')}
}
}
