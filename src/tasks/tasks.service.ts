import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterTaskDto);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException({
        message: 'Task not found',
        success: false,
      });
    }

    return found;
  }

  async deleteTaskById(id: number): Promise<void> {
    // 1 query
    const results = await this.taskRepository.delete(id);
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

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
