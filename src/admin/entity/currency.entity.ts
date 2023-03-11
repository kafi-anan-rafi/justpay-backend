import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("currency")
export class CurrencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({type: 'float'})
  exchangeRate: number;

  @Column()
  sign: string;
}
