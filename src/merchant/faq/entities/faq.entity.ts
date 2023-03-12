import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('merchant_fac')
export class Faq { 
    @PrimaryGeneratedColumn()
    id:number;

    // @Column()
    // name:string;

    // @Column({unique: true})
    // email:string;

    // @Column({unique: true})
    // phone:string;

    // @Column()
    // password:string;

    // @Column()
    // profile_image:string;

    // @Column({type: 'float', default: 0})
    // balance:string;

    @CreateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    created_at:Date;

    @UpdateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    updated_at:Date;
}

