import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";
import { Category } from "./category.entity";
import { Answer } from "./answer.entity";
import { BaseIdentity } from "src/shared/interface/baseIdentity.entity";
import { Expose } from "class-transformer";
import { Leaderboard } from "./leaderboard.entity";
import { Comments } from "./comment.entity";

@Entity({ name: "question" })
export class Question extends BaseIdentity{
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column("varchar")
    @Expose()
    name: string;

    @Column("varchar", { default: "https://i.imgur.com/Ekd3MLm.jpg" })
    @Expose()
    image: string;

    @Column('int')
    @Expose()
    timer: number;

    @Column('int', {default: 0})
    @Expose()
    quantity: number;

    @Column('int', {default: 0})
    @Expose()
    turn: number;

    @Column('int', {default: 1})
    level: number;

    @ManyToOne(() => Account, (account) => account.questions, {onDelete: "CASCADE"})
    @JoinColumn({
        name: "accountId",
        referencedColumnName: "id"
    })
    account: Account;

    @ManyToOne(() => Category, (category) => category.questions)
    @JoinColumn({
        name: "categoryId",
        referencedColumnName: "id",
    })
    category: Category;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];

    @OneToMany(() => Leaderboard,(leaderboard) => leaderboard.question)
    leaderboards: Leaderboard[];

    @OneToMany(() => Comments, (comments) => comments.question)
    comments: Comment[];
}