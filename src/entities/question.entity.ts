import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";
import { Type } from "./type.entity";
import { Expose } from "class-transformer";
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

    @ManyToOne(() => Type, (type) => type.questions)
    @JoinColumn({
        name: "typeId",
        referencedColumnName: "id"
    })
    type: Type;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];
}