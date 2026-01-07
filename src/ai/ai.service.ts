import { Injectable } from "@nestjs/common";
import { AiCommands } from "./types/ai-command.type";
import { Action } from "rxjs/internal/scheduler/Action";
import { ActionType } from "src/enum/action-type.enum";
import { Priority } from "src/enum/priority.enum";
import { Topic } from "src/enum/topic.enum";

@Injectable()
export class AiService {
  async parseCommand(message: string): Promise<AiCommands> {
    /**
     * Call LLM here
     * temperature: 0
     * max_tokens: LOW
     */

    return fakeAiCall('SYSTEM_PROMPT', message);
  }
}
async function fakeAiCall(_: string, user: string): Promise<AiCommands> {
  if (user.toLowerCase().includes('add')) {
    return {
      action: ActionType.CREATE_TASK,
      payload: {
        title: 'Optimize DB queries',
        topic: Topic.BACKEND,
        priority: Priority.LOW,
        due_date: '2026-01-10',
      },
    };
  }

  return {
    action: ActionType.INVALID_COMMAND,
    payload: { reason: 'Unclear intent' },
  };
}
