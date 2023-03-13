import { Bonus } from 'src/merchant/bonus/entities/bonus.entity';
import { Faq } from 'src/merchant/faq/entities/faq.entity';
import { Helptoken } from 'src/merchant/helptoken/entities/helptoken.entity';
import { Offer } from 'src/merchant/offer/entities/offer.entity';
import { Payment } from 'src/merchant/payment/entities/payment.entity';
import { Refferel } from 'src/merchant/refferel/entities/refferel.entity';
import { OneToMany, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('merchant')
export class Auth extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique: true})
    email:string;

    @Column({unique: true})
    phone:string;

    @Column()
    password:string;

    @Column()
    profile_image:string;

    @Column({type: 'float', default: 0})
    balance:string;

    @CreateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    created_at:Date;

    @UpdateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    updated_at:Date;

    @OneToMany(() => Faq, (Faq) => Faq.auth)
    Faq: Faq[]

    @OneToMany(() => Helptoken, (Helptoken) => Helptoken.auth)
    Helptoken: Helptoken[]

    @OneToMany(() => Bonus, (Bonus) => Bonus.auth)
    Bonus: Bonus[]

    @OneToMany(() => Payment, (Payment) => Payment.auth)
    Payment: Payment[]

    @OneToMany(() => Refferel, (Refferel) => Refferel.auth)
    Refferel: Refferel[]

    @OneToMany(() => Offer, (Offer) => Offer.auth)
    Offer: Offer[]
}
