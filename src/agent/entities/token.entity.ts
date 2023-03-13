import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AgentEntity } from "./agent.entity";

@Entity('agent_token')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  message: string;

  @Column()
  created_at: string;

  @Column({ nullable: true })
  updated_at: string;

  @Column({ nullable: true })
  response: string;

  @ManyToOne(() => AgentEntity, (agent) => agent.tokens)
  agent: AgentEntity
}