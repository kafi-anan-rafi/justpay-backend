import { Auth } from 'src/merchant/auth/entities/auth.entity';
import { ManyToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('merchant_faq')
export class Faq { 
    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(() => Auth, (auth) => auth.Faq)
    auth: Auth

    @Column({type: 'text'})
    question:string;

    @Column({type: 'text'})
    answer:string;

    @CreateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    created_at:Date;

    @UpdateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    updated_at:Date;
}

