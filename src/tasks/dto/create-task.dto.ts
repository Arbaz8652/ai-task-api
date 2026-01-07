import { IsDateString, IsEnum, IsObject, IsOptional, IsString } from "class-validator";
import { Task } from "../task.entity";
import { Topic } from "src/enum/topic.enum";
import { Priority } from "src/enum/priority.enum";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsEnum(Topic)
    topic: Topic;

    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

    @IsDateString()
    @IsOptional()
    dueDate?: string
}