import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskmanagement',
  // entities: [__dirname + '/../**/*.entity.{ts,js}'],
  // entities: ['dist/**/*.entity.js'],
  // entities: ['dist/**/**/*.entity{.ts,.js}'],
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true, // in product is not recommend setting for true
};
