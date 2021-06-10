import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterTaskDto, user);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    //  i am user 2 i dont have task1.
    // try get task1 with credetial is user2
    // we should response not found instead of forbidden
    // cuz we dont want share the exist of task 1.

    if (!found) {
      throw new NotFoundException({
        message: 'Task not found',
        success: false,
      });
    }

    return found;
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    // 1 query
    // const results = await this.taskRepository.delete(id);
    const results = await this.taskRepository.delete({ id, userId: user.id });
    if (results.affected === 0) {
      throw new NotFoundException({
        susscess: false,
        message: 'Task not found',
      });
    }
  }

  // async deleteTaskById(id: number): Promise<void> {
  //   try {
  //     // 2query
  //     const task = await this.getTaskById(id);
  //     const response = await this.taskRepository.remove(task);
  //     console.log(response);
  //   } catch (error) {
  //     throw new NotFoundException(error);
  //   }
  // }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
