import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("agent_refer")
export class ReferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agent_phone: string;

  // @Column({nullable: true})
  @Column()
  amount: number;
  
  @Column()
  created_at: string
  
  @Column()
  updated_at: string
}
