import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { ILike, Repository } from "typeorm";
import { Status } from "src/enum/status.enum";


@Injectable()
export class TasksRepository {
    constructor(
        @InjectRepository(Task)
        private readonly repo: Repository<Task>,
    ) { }

    create(task: Partial<Task>): Promise<Task> {
        const newTask = this.repo.create(task);
        return this.repo.save(newTask);
    }

    findAll(filters = {}): Promise<Task[]> {
        return this.repo.find({
            where: filters,
            order: { createdAt: 'DESC' },
        });

    }

    findById(id: string): Promise<Task | null> {
        return this.repo.findOneBy({ id });
    }

    async deleteById(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    async updateById(id: string, updateData: Partial<Task>): Promise<Task | null> {
        const task = await this.findById(id);
        if (!task) {
            return null;
        }
        Object.assign(task, updateData);
        return this.repo.save(task);
    }

    async findByTitleKeyword(keyword: string): Promise<Task> {
        const task = this.repo.findOne({
            where: { title: ILike(`%${keyword}%`) }
        })
        if (!task) {
            throw new Error('Task not found');
        }
        return task as unknown as Task;
    }

    async update(id: string, updates: Partial<Task>): Promise<Task> {
        const task = await this.findById(id);
        if(!task){
            throw new NotFoundException('Task not found');
        }
        Object.assign(task, updates);
        return this.repo.save(task);
    }

    async markComplete(id: string): Promise<Task> {
        return this.update(id, { status: Status.DONE });
    }

    async delete(id: string): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Task not found');
        }
    }

}