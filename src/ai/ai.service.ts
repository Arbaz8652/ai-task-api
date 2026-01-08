import { BadRequestException, Injectable } from "@nestjs/common";
import { AiCommands } from "./types/ai-command.type";
import { BASEPROMPT } from "./prompts/system.prompt";
import OpenAI from 'openai';
import { AiLoggerService } from "./ai-logger.service";
import { ActionType } from "src/enum/action-type.enum";

@Injectable()
export class AiService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  constructor(private readonly aiLogger: AiLoggerService) { }

  async parseCommand(message: string): Promise<AiCommands> {
    try {
      const result = await this.executeCommand(message);

      await this.aiLogger.log({
        userMessage: message,
        aiCommand: result,
        action: result.action,
        status: 'SUCCESS',
      }); 

      return result;
    } catch (err) {
      await this.aiLogger.log({
        userMessage: message,
        aiCommand: null,
        action: null,
        status: 'FAILED',
        errorMessage: err.message,
      });

      return {
        action: ActionType.INVALID_COMMAND,
        payload: { reason: 'Unclear intent' },
      };
    }
  }


  async executeCommand(message: string): Promise<AiCommands> {
    const response = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL!,
      temperature: 0, // 🚨 deterministic
      max_tokens: 300,
      messages: [
        { role: 'system', content: BASEPROMPT },
        { role: 'user', content: message },
      ],
    });
    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new BadRequestException('Empty AI response');
    }

    try {
      return JSON.parse(content);
    } catch {
      throw new BadRequestException(
        'AI returned invalid JSON. Command rejected.',
      );
    }
  }
}
// async function fakeAiCall(_: string, user: string): Promise<AiCommands> {
//   if (user.toLowerCase().includes('add')) {
//     return {
//       action: ActionType.CREATE_TASK,
//       payload: {
//         title: 'Optimize DB queries',
//         topic: Topic.BACKEND,
//         priority: Priority.LOW,
//         due_date: '2026-01-10',
//       },
//     };
//   }

//   return {
//     action: ActionType.INVALID_COMMAND,
//     payload: { reason: 'Unclear intent' },
//   };
// }


