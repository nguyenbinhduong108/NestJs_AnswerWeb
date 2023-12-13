import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";
import { Category } from "./category.entity";
import { Answer } from "./answer.entity";
import { BaseIdentity } from "src/shared/interface/baseIdentity.entity";
import { Expose } from "class-transformer";

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
}