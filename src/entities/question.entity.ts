import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";
import { Category } from "./category.entity";
import { Answer } from "./answer.entity";
import { BaseIdentity } from "src/shared/interface/baseIdentity.entity";

@Entity({ name: "question" })
export class Question extends BaseIdentity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar")
    name: string;

    @Column("varchar", { default: "https://i.imgur.com/Ekd3MLm.jpg" })
    image: string;

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