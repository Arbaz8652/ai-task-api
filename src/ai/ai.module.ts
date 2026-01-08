import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { TasksModule } from 'src/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiCommandLog } from './ai-command-log.entity';
import { AiLoggerService } from './ai-logger.service';
import { LoggerMiddleware } from 'src/middlware/request-logger';

@Module({
    imports:[TasksModule, TypeOrmModule.forFeature([AiCommandLog])],
    controllers:[AiController],
    providers:[AiService, AiLoggerService]
})
export class AiModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AiController);
  }
}
