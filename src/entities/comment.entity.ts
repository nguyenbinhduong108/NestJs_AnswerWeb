import { Expose } from "class-transformer";
import { BaseIdentity } from "src/shared/interface/baseIdentity.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";
import { Account } from "./account.entity";

@Entity({ name: 'comment' })
export class Comments extends BaseIdentity{
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column()
    @Expose()
    comment: string;

    @Column()
    @Expose()
    rating: number;

    @ManyToOne(() => Question, (question) => question.comments, {onDelete: 'CASCADE'})
    @JoinColumn({
        name: 'questionId',
        referencedColumnName: 'id'
    })
    question: Question;

    @ManyToOne(() => Account, (account) => account.comments, {onDelete: 'CASCADE'})
    @JoinColumn({
        name: 'accountId',
        referencedColumnName: 'id'
    })
    account: Account;

} 