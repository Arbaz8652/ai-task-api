import { Body, Controller, Post } from "@nestjs/common";
import { AiService } from "./ai.service";
import { TasksService } from "src/tasks/tasks.service";
import { ActionType } from "src/enum/action-type.enum";
import { validateAiCommand } from "./ai.validator";

@Controller('api/ai')
export class AiController {
    constructor(
        private readonly aiService: AiService,
        private readonly tasksService: TasksService
    ) { }

    @Post('command')
    async handleCommand(@Body('message') message: string) {
        const command = await this.aiService.parseCommand(message);

        validateAiCommand(command);

        switch (command.action) {
            case ActionType.CREATE_TASK:
                return this.tasksService.createTask({
                    title: command.payload.title,
                    topic: command.payload.topic,
                    priority: command.payload.priority,
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
                return {
                    error: 'INVALID_COMMAND',
                    reason: command.payload.reason,
                };
        }
    }
}