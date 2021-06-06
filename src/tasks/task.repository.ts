import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { FilterTaskDto } from './dto/filter-task.dto';

// manage Entity
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.description = description;
    task.title = title;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }

  async getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const { status, search } = filterTaskDto;
    const query = this.createQueryBuilder('tasks');
    if (status) {
      query.andWhere('tasks.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'tasks.title LIKE :search OR tasks.description LIKE :search ',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
}
