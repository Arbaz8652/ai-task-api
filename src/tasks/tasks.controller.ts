import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { ListTasksDto } from "./dto/list-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller('api/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Body() taskData: Partial<Task>) {
        return this.tasksService.createTask(taskData);
    }

    @Get()
    list(@Query() query: ListTasksDto) {
        return this.tasksService.listTasks(query);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateTaskDto
    ) {
        return this.tasksService.updateTask(id, dto);
    }

    @Patch(':id/complete')
    markComplete(@Param('id') id: string) {
        return this.tasksService.markTaskComplete(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tasksService.deleteTask(id)
    }
}