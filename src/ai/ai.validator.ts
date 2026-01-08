import { BadRequestException } from '@nestjs/common';
import { ActionType } from 'src/enum/action-type.enum';

export function validateAiCommand(cmd: any) {
  if (!cmd || typeof cmd !== 'object') {
    throw new BadRequestException('Invalid AI response');
  }

  if (!Object.values(ActionType).includes(cmd.action)) {
    throw new BadRequestException(`Invalid action: ${cmd.action}`);
  }

  if (!cmd.payload || typeof cmd.payload !== 'object') {
    throw new BadRequestException('Invalid payload');
  }
}
