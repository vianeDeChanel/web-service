import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les tasks' })
  @ApiOkResponse({ type: Task, isArray: true })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get('title/:title')
  @ApiOperation({ summary: 'Récupérer une task par son title' })
  @ApiParam({ name: 'title', type: String })
  @ApiOkResponse({ type: Task })
  findByTitle(@Param('title') title: string): Task {
    return this.tasksService.findByTitle(title);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle task' })
  @ApiCreatedResponse({ type: Task })
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier partiellement une task' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Task })
  updatePartially(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.updatePartially(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une task par son id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiNoContentResponse({ description: 'Task supprimée' })
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.tasksService.remove(id);
  }
}
