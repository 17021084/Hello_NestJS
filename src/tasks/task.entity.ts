import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity({ name: 'Tasks' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('enum', {
    enum: Object.values(TaskStatus), // This is possible since exported enums become objects. See http://bit.ly/2mnKqTR
    name: 'status',
  })
  status: TaskStatus;
}
