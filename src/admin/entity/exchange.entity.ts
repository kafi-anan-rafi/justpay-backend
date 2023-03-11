import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("Exchange")
export class ExchangeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fromCurrency: string;

   @Column()
    toCurrency: string;

    @Column()
    amount: number;

    @Column({type:'float'})
    result: number;
}
