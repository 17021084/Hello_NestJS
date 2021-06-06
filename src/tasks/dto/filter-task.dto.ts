import { IsIn, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class FilterTaskDto {
  @IsOptional()
  search: string;

  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS]) //validate incoming request
  status: TaskStatus;
}
