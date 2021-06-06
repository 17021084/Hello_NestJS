import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';

// manage Entity
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
