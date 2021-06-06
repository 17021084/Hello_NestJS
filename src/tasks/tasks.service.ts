import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // filterTasks(filterTaskDto: FilterTaskDto): Task[] {
  //   const { search, status } = filterTaskDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = this.tasks.filter((tsk) => tsk.status === status);
  //   }
  //   if (search) {
  //     tasks = this.tasks.filter(
  //       (tsk) => tsk.title.includes(search) || tsk.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

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

  // deleteTaskById(id: string): void {
  //   this.getTaskById(id);
  //   this.tasks = this.tasks.filter((tsk) => tsk.id !== id);
  // }
  // updateTaskStatus(id: string, patchTaskDto: PatchTaskDto): Task {
  //   const status: TaskStatus = patchTaskDto.status;
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
