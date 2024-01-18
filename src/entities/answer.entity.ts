import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";
import { BaseIdentity } from "src/shared/interface/baseIdentity.entity";

@Entity({name: 'answer'})
export class Answer extends BaseIdentity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    title: string;

    @Column('simple-array')
    answers: Array<string>;

    @Column('varchar')
    trueAnswer: string;

    @Column("varchar", {default: 'https://i.imgur.com/oJN9YcQ.jpg'})
    image: string;

    @ManyToOne(() => Question, (question) => question.answers, { onDelete: "CASCADE" })
    @JoinColumn({
        name: "questionId",
        referencedColumnName: "id"
    })
    question: Question;
}