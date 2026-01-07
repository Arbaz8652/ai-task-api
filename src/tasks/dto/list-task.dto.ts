import { IsEnum, IsOptional } from 'class-validator';
import { Priority } from 'src/enum/priority.enum';
import { Status } from 'src/enum/status.enum';
import { Topic } from 'src/enum/topic.enum';


export class ListTasksDto {
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsEnum(Topic)
  @IsOptional()
  topic?: Topic;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;
}
