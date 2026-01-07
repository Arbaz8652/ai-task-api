import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { Priority } from "src/enum/priority.enum";
import { Topic } from "src/enum/topic.enum";


export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsEnum(Topic)
    @IsOptional()
    topic?: Topic;

    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

    @IsDateString()
    @IsOptional()
    dueDate?: string;
}