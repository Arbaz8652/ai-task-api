import { BadRequestException } from "@nestjs/common";
import { AiCommands } from "./types/ai-command.type";
import { ActionType } from "src/enum/action-type.enum";


export function validateAiCommand(command: AiCommands) {
    if (!command.action) {
        throw new BadRequestException('Missing action');
    }
    if (!Object.values(ActionType).includes(command.action)) {
        throw new BadRequestException('Invalid action');
    }

    if (!command.payload) {
        throw new BadRequestException('Missing payload');
    }
}