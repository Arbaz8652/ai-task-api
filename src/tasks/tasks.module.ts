import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
// import { AiController } from 'src/ai/ai.controller';
// import { LoggerMiddleware } from 'src/middlware/request-logger';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksRepository, TasksService],
  exports: [TasksService],
})
export class TasksModule {
  // configure(consumer: MiddlewareConsumer) {
  //     consumer
  //       .apply(LoggerMiddleware)
  //       .forRoutes(TasksController);
  //   }
}
