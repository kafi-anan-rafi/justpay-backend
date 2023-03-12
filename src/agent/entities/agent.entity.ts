import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("agent_info")
export class AgentEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  filename: string

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: string;
}
