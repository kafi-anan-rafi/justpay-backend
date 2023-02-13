import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("transection")
export class TransectionEntity{
    @PrimaryGeneratedColumn()
    transectionid: number;

    @Column()
    senderid: number;

    @Column()
    reciverid: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;
}