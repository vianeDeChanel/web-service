import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Préparer le rendu final' })
  title: string;

  @ApiProperty({ example: '2026-02-06T14:00:00.000Z' })
  startedAt: Date;

  @ApiProperty({ example: false })
  isCompleted: boolean;
}
