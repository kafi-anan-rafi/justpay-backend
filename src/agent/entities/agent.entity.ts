import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TokenEntity } from "./token.entity";

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

  @OneToMany(() => TokenEntity, (token) => token.id)
  tokens: TokenEntity[]
}
