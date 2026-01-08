import { Body, Controller, Post, UnprocessableEntityException } from "@nestjs/common";
import { AiService } from "./ai.service";
import { TasksService } from "src/tasks/tasks.service";
import { ActionType } from "src/enum/action-type.enum";
import { validateAiCommand } from "./ai.validator";
import { Priority } from "src/enum/priority.enum";
import { ProcessCommandDto } from "./dto/process-command-dto";

@Controller('api/ai')
export class AiController {
    constructor(
        private readonly aiService: AiService,
        private readonly tasksService: TasksService
    ) { }

    @Post('command')
    async handleCommand(@Body() processCommandDto: ProcessCommandDto) {
        const payload = Object.assign({}, processCommandDto);

        const command = await this.aiService.parseCommand(payload.message);
        console.log(command)
        validateAiCommand(command);

        switch (command.action) {
            case ActionType.CREATE_TASK:
                return this.tasksService.createTask({
                    title: command.payload.title,
                    topic: command.payload.topic,
                    priority: command.payload.priority || Priority.MEDIUM,
                    dueDate: command.payload.due_date ?? null,
                });

            case ActionType.MARK_COMPLETE: {
                const task = await this.tasksService.resolveTaskByIdentifier(
                    command.payload.task_id,
                );
                return this.tasksService.markTaskComplete(task.id);
            }

            case ActionType.DELETE_TASK: {
                const task = await this.tasksService.resolveTaskByIdentifier(
                    command.payload.task_id,
                );
                await this.tasksService.deleteTask(task.id);
                return { success: true };
            }

            case ActionType.LIST_TASKS:
                return this.tasksService.listTasks(command.payload);

            case ActionType.INVALID_COMMAND:
                throw new UnprocessableEntityException(
                    'The command could not be processed.',
                );
        }
    }
}