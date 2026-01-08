import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TasksController } from './tasks/tasks.controller';
import { LoggerMiddleware } from './middlware/request-logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
    AiModule, TasksModule, DatabaseModule],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {
   configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
  }
}
