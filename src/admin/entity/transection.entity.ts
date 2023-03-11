import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";


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

    @ManyToOne(() => UserEntity, (client) => client.transections)
    client: UserEntity
}