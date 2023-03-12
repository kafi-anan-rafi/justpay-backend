import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("agent_bonus")
export class BonusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agent_id: number;

  @Column()
  type: number;

  @Column()
  amount: number

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}