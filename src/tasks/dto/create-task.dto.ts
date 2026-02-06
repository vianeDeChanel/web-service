import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Réviser le cours de REST' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '2026-02-06T09:00:00.000Z' })
  @Type(() => Date)
  @IsDate()
  startedAt: Date;

  @ApiProperty({ example: false })
  @IsBoolean()
  isCompleted: boolean;
}
