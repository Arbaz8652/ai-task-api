import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiCommandLog } from './ai-command-log.entity';

@Injectable()
export class AiLoggerService {
  constructor(
    @InjectRepository(AiCommandLog)
    private readonly repo: Repository<AiCommandLog>,
  ) {}

  log(input: {
    userMessage: string;
    aiCommand: any;
    action: string | null;
    status: 'SUCCESS' | 'FAILED';
    errorMessage?: string;
  }) {
    return this.repo.save(this.repo.create(input));
  }
}
