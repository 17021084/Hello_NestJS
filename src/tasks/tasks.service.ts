import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  filterTasks(filterTaskDto: FilterTaskDto): Task[] {
    const { search, status } = filterTaskDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = this.tasks.filter((tsk) => tsk.status === status);
    }
    if (search) {
      tasks = this.tasks.filter(
        (tsk) => tsk.title.includes(search) || tsk.description.includes(search),
      );
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((tsk) => tsk.id === id); // it will refer to the item
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((tsk) => tsk.id !== id);
  }

  updateTaskStatus(id: string, patchTaskDto: PatchTaskDto): Task {
    const status: TaskStatus = patchTaskDto.status;
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
