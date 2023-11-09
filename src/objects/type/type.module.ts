import { Module } from "@nestjs/common";
import { TypeController } from "./type.controller";
import { TypeService } from "./type.service";
import { Type } from "src/entities/type.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Type])],
    controllers: [TypeController],
    providers: [TypeService],
})
export class TypeModule{}