import { Auth } from 'src/merchant/auth/entities/auth.entity';
import { ManyToOne,BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('merchant_help_token')
export class Helptoken {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    user_id:string;

    @ManyToOne(() => Auth, (auth) => auth.Faq)
    auth: Auth;

    @Column()
    subject:string;

    @Column({type: 'text'})
    body:string;

    @Column({type: 'integer', default: 0})
    status:string;

    @CreateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    created_at:Date;

    @UpdateDateColumn({type: "timestamp", default:() => "CURRENT_TIMESTAMP(6)"})
    updated_at:Date;
}
