import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { FilterTaskDto } from './dto/filter-task.dto';
import { User } from 'src/auth/user.entity';

// manage Entity
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.description = description;
    task.title = title;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    // hide user when response saved task. this process will not affect to database
    delete task.user;
    return task;
  }

  async getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    const { status, search } = filterTaskDto;
    const query = this.createQueryBuilder('tasks');
    query.where('tasks.userId =:userId', { userId: user.id });
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
