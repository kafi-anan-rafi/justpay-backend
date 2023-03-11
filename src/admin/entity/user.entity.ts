import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Double } from "typeorm";
import { TransectionEntity } from "./transection.entity";

@Entity("user")
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    dob: string;

    @Column()
    uname: string;

    @Column()
    pass: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    balance: number;

   @Column({ default: false })
   createStatus: boolean;

   @Column({ default: false })
   updateStatus: boolean;

   @Column({ default: false })
   deleteStatus: boolean;

   @OneToMany(() => TransectionEntity, (transection) => transection.client)
    transections: TransectionEntity[]
}