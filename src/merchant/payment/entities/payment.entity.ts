import { Auth } from 'src/merchant/auth/entities/auth.entity';
import { ManyToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('merchant_payment')
export class Payment {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Auth, (auth) => auth.Payment)
    auth: Auth;

    @Column({type: 'integer'})
    user_id:string;

    @Column()
    payment_email:string;

    @Column()
    trx:string;

    @Column({type: 'float', default: 0})
    amount:string;

    @Column()
    invoice_name:string;
    
    @CreateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    created_at:Date;

    @UpdateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    updated_at:Date;
}
