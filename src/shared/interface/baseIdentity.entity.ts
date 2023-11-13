import { ApiHideProperty } from "@nestjs/swagger";
import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class BaseIdentity extends BaseEntity{
    @CreateDateColumn({
        type: 'datetime',
    })
    @ApiHideProperty()
    createdAt: Date;

    @UpdateDateColumn({
        type: 'datetime',
    })
    @ApiHideProperty()
    updatedAt: Date;

    @DeleteDateColumn({
        type: "datetime"
    })
    @ApiHideProperty()
    deletedAt?: Date;
}