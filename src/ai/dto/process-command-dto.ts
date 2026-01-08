import { IsString } from "class-validator";


export class ProcessCommandDto {
    @IsString()
    message: string;
}