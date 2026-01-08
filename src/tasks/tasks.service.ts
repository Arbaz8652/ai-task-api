import { Priority } from "src/enum/priority.enum";
import { Status } from "src/enum/status.enum";
import { Topic } from "src/enum/topic.enum";
import { Task } from "./task.entity";
import { TasksRepository } from "./tasks.repository";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class TasksService {
    constructor(private readonly taskRepo: TasksRepository) { }

    async createTask(taskData: Partial<Task>): Promise<Task> {
        return this.taskRepo.create(taskData);
    }

    async listTasks(filters?: {
        status?: string;
        topic?: Topic;
        priority?: Priority;
    }): Promise<Task[]> {
        return this.taskRepo.findAll(filters);
    }

    async updateTask(
        taskId: string,
        updates: Partial<Pick<Task, 'title' | 'topic' | 'priority' | 'dueDate'>>,
    ) {
        return this.taskRepo.update(taskId, updates);
    }

    async markTaskComplete(taskId: string): Promise<Task> {
        return this.taskRepo.markComplete(taskId);
    }

    async deleteTask(taskId: string): Promise<void> {
        return this.taskRepo.delete(taskId);
    }

    /**
     * Used ONLY by AI command resolver later
     */

    async resolveTaskByIdentifier(identifier: string) {
        const matches = await this.taskRepo.findByTitleKeywordStrict(identifier);

        if (matches.length === 0) {
            throw new BadRequestException(
                `No task found matching "${identifier}"`,
            );
        }

        if (matches.length > 1) {
            throw new BadRequestException({
                error: 'AMBIGUOUS_TASK',
                message: 'Multiple tasks match your request',
                candidates: matches.map(t => ({
                    id: t.id,
                    title: t.title,
                    status: t.status,
                })),
            });
        }

        return matches[0];
    }

}