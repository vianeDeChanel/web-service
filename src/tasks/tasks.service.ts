import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(): Task[] {
    return this.tasks;
  }

  findByTitle(title: string): Task {
    const task = this.tasks.find((item) => item.title === title);

    if (!task) {
      throw new NotFoundException(`Task with title "${title}" not found`);
    }

    return task;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: this.nextId++,
      ...createTaskDto,
    };

    this.tasks.push(task);
    return task;
  }

  updatePartially(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.tasks.find((item) => item.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    Object.assign(task, updateTaskDto);
    return task;
  }

  remove(id: number): void {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    this.tasks.splice(taskIndex, 1);
  }
}
