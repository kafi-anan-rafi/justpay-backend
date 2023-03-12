import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("agent_balance")
export class BalanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agent_id: number;

  @Column()
  balance: number

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}