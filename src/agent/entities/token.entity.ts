import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('agent_token')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  agent_id: number;

  // @Column()
  // agent_email: string;

  @Column()
  message: string;

  @Column()
  created_at: string;

  @Column({ nullable: true })
  updated_at: string;

  @Column({ nullable: true })
  response: string;
}