import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";
import { Expose } from "class-transformer";

@Entity({ name: 'type' })
export class Type {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column('varchar')
    @Expose()
    name: string;

    @Column('varchar')
    @Expose()
    image: string;

    @OneToMany(() => Question, (question) => question.type)
    questions: Question[];
}