import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("client")
export class ClientEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    dob: string;

    @Column({ nullable: true })
    uname: string;

    @Column({ nullable: true })
    pass: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    balance: number;
}