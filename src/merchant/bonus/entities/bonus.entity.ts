import { Auth } from 'src/merchant/auth/entities/auth.entity';
import { Payment } from 'src/merchant/payment/entities/payment.entity';
import { Refferel } from 'src/merchant/refferel/entities/refferel.entity';
import { ManyToOne, OneToOne,JoinColumn, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('merchant_bonus_commission')
export class Bonus {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    type:string;

    @ManyToOne(() => Auth, (auth) => auth.Bonus)
    auth: Auth;

    @Column({type: 'float', default: 0})
    amount:string;

    @OneToOne(() => Refferel)
    @JoinColumn()
    Refferel: Refferel

    @OneToOne(() => Payment)
    @JoinColumn()
    Payment: Payment    

    @CreateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    created_at:Date;

    @UpdateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    updated_at:Date;
    
}
