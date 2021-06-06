import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

// customize validate data.
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('meta data', metadata);
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException({
        success: false,
        message: 'invalid status',
      });
    }

    return value;
  }
  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
