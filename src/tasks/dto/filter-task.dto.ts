import { TaskStatus } from '../task.model';

export class FilterTaskDto {
  search?: string;
  status?: TaskStatus;
}
