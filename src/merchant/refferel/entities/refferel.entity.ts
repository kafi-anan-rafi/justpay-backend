import { Auth } from 'src/merchant/auth/entities/auth.entity';
import { ManyToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('merchant_refferel')
export class Refferel {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Auth, (auth) => auth.Refferel)
    auth: Auth;

    @Column({type: 'integer',unique:true})
    new_merchant_id:string;

    @CreateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    created_at:Date;

    @UpdateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    updated_at:Date;
}
