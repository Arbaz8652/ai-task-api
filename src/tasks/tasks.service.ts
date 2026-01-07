import { Priority } from "src/enum/priority.enum";
import { Status } from "src/enum/status.enum";
import { Topic } from "src/enum/topic.enum";
import { Task } from "./task.entity";
import { TasksRepository } from "./tasks.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TasksService {
    constructor(private readonly taskRepo: TasksRepository) { }

    createTask(taskData: Partial<Task>): Promise<Task> {
        return this.taskRepo.create(taskData);
    }

    listTasks(filters?: {
        status?: string;
        topic?: Topic;
        priority?: Priority;
    }): Promise<Task[]> {
        return this.taskRepo.findAll(filters);
    }

    updateTask(
        taskId: string,
        updates: Partial<Pick<Task, 'title' | 'topic' | 'priority' | 'dueDate'>>,
    ) {
        return this.taskRepo.update(taskId, updates);
    }

    markTaskComplete(taskId: string): Promise<Task> {
        return this.taskRepo.markComplete(taskId);
    }

    deleteTask(taskId: string): Promise<void> {
        return this.taskRepo.delete(taskId);
    }

    /**
     * Used ONLY by AI command resolver later
     */
    resolveTaskByIdentifier(identifier: string): Promise<Task> {
        return this.taskRepo.findByTitleKeyword(identifier);
    }

}