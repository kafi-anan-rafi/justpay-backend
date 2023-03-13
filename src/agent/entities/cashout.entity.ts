import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("agent_cash_out")
export class CashOutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agent_email: string;

  @Column()
  user_email: string;

  @Column()
  amount: number;

  @Column()
  cashout_time: string;

  @Column()
  transaction_id: string;

  @Column()
  cashout_charge: number;
}