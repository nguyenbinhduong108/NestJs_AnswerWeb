import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";
import { Category } from "./category.entity";
import { Answer } from "./answer.entity";

@Entity({ name: "question" })
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar")
    name: string;

    @ManyToOne(() => Account, (account) => account.questions)
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
}