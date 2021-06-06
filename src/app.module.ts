import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmConfig } from './config/typeorm.config';
import { getMetadataArgsStorage } from 'typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    }),
    TasksModule,
  ],
})
export class AppModule {}
