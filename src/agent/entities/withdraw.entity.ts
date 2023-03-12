import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("agent_withdraw")
export class WithdrawEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agent_phone: string;

  @Column()
  admin_id: string;

  @Column()
  amount: number

  @Column()
  withdraw_time: string;

  @Column()
  transaction_id: string
}