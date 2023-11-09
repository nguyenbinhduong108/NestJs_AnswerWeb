import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity({name: 'answer'})
export class Answer{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    title: string;

    @Column('varchar')
    answerA: string;

    @Column('varchar')
    answerB: string;

    @Column('varchar')
    answerC: string;

    @Column('varchar')
    answerD: string;

    @Column("varchar", {default: 'aksjdlasjd'})
    image: string;

    @ManyToOne(() => Question, (question) => question.answers)
    @JoinColumn({
        name: "questionId",
        referencedColumnName: "id"
    })
    question: Question;
}