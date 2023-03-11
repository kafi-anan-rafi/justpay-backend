import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyEntity } from 'src/admin/entity/currency.entity';
import { ExchangeEntity } from 'src/admin/entity/exchange.entity';
import { Repository } from 'typeorm';
import { CurrencyDTO } from '../dto/currency.dto';
import { ExchangeDTO } from '../dto/exchange.dto';


@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private currencyRepo: Repository<CurrencyEntity>,
    @InjectRepository(ExchangeEntity)
    private exchangeRepo: Repository<ExchangeEntity>,
  ) {}

  async createCurrency(currencyDTO: CurrencyDTO): Promise<CurrencyEntity> {
    const currency = new CurrencyEntity();
    currency.name = currencyDTO.name;
    currency.code = currencyDTO.code;
    currency.exchangeRate = currencyDTO.rate;
    currency.sign = currencyDTO.sign;
    return await this.currencyRepo.save(currency);
  }

  async getAllCurrencies(): Promise<CurrencyEntity[]> {
    return await this.currencyRepo.find();
  }

  async getCurrencyByName(name: string): Promise<CurrencyEntity> {
    return await this.currencyRepo.findOneBy({ name: name });
  }

  async updateCurrencyRate(name: string, newRate: number): Promise<CurrencyEntity> {
    const currency = await this.currencyRepo.findOneBy({ name: name });
    currency.exchangeRate = newRate;
    return await this.currencyRepo.save(currency);
  }

  async exchangeCurrency(exchangeDTO: ExchangeDTO): Promise<ExchangeEntity> {
    const fromCurrency = await this.currencyRepo.findOneBy({ name: exchangeDTO.fromCurrency });
    const toCurrency = await this.currencyRepo.findOneBy({ name: exchangeDTO.toCurrency });
  
    const usdAmount = exchangeDTO.amount / toCurrency.exchangeRate;
  
    const exchange = new ExchangeEntity();
    exchange.fromCurrency = exchangeDTO.fromCurrency;
    exchange.toCurrency = exchangeDTO.toCurrency;
    exchange.amount = exchangeDTO.amount;
    exchange.result =  usdAmount * fromCurrency.exchangeRate;
    return await this.exchangeRepo.save(exchange);
  }
  
}
