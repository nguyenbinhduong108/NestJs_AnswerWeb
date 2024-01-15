import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';
import { Account } from './account.entity';

@Entity({ name: 'leaderboard' })
export class Leaderboard {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column()
    @Expose()
    result: number;

    @Column()
    @Expose()
    timer: number;

    @ManyToOne(() => Question, (question) => question.leaderboards, {onDelete: 'CASCADE'})
    @JoinColumn({
        name: 'questionId',
        referencedColumnName: 'id'
    })
    question: Question;

    @ManyToOne(() => Account, (account) => account.leaderboards, {onDelete: 'CASCADE'})
    @JoinColumn({
        name: 'accountId',
        referencedColumnName: 'id'
    })
    account: Account;
}
