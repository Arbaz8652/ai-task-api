import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'ai_command_logs' })
export class AiCommandLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  userMessage: string;

  @Column({ type: 'jsonb', nullable: true })
  aiCommand: any;

  @Column({ type: 'text', nullable: true })
  action: string | null;

  @Column({ type: 'text' })
  status: 'SUCCESS' | 'FAILED';

  @Column({ type: 'text', nullable: true })
  errorMessage?: string;

  @CreateDateColumn()
  createdAt: Date;
}
