import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("agent_cash_out")
export class CashOutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agent_phone: string;

  @Column()
  user_phone: string;

  @Column()
  amount: number;

  @Column()
  cashout_time: string;

  @Column()
  transaction_id: string;

  @Column()
  cashout_charge: number;
}