import { Auth } from 'src/merchant/auth/entities/auth.entity';
import { ManyToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('merchant_offer')
export class Offer {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Auth, (auth) => auth.Offer)
    auth: Auth;
    
    @Column({type: 'integer'})
    product_id:string;

    @Column({type: 'float', default: 0})
    balance:string;

    @CreateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    created_at:Date;

    @UpdateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    updated_at:Date;
}
