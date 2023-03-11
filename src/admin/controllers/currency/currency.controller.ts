import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CurrencyEntity } from 'src/admin/entity/currency.entity';
import { ExchangeEntity } from 'src/admin/entity/exchange.entity';
import { CurrencyService } from 'src/admin/services/currency/currency.service';
import { CurrencyDTO } from 'src/admin/services/dto/currency.dto';
import { ExchangeDTO } from 'src/admin/services/dto/exchange.dto';


@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Post()
  async createCurrency(@Body() currencyDTO: CurrencyDTO): Promise<CurrencyEntity> {
    return await this.currencyService.createCurrency(currencyDTO);
  }

  @Get()
  async getAllCurrencies(): Promise<CurrencyEntity[]> {
    return await this.currencyService.getAllCurrencies();
  }

  @Get(':name')
  async getCurrencyByName(@Param('name') name: string): Promise<CurrencyEntity> {
    return await this.currencyService.getCurrencyByName(name);
  }

  @Patch(':name')
  async updateCurrencyRate(
    @Param('name') name: string,
    @Body('exchangeRate') newRate: number,
  ): Promise<CurrencyEntity> {
    return await this.currencyService.updateCurrencyRate(name, newRate);
  }

  @Post('exchange')
  async exchangeCurrency(@Body() exchangeDTO: ExchangeDTO): Promise<any> {
    return await this.currencyService.exchangeCurrency(exchangeDTO);
  }
}
