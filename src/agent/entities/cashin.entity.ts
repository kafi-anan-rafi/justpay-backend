import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("agent_cash_in")
export class CashInEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agent_email: string;

  @Column()
  user_email: string;

  @Column()
  amount: number;

  @Column()
  cashin_time: string;

  @Column()
  transaction_id: string;
}