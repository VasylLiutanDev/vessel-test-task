import { ApiProperty } from '@nestjs/swagger';

export class PPReferenceDto {
  @ApiProperty({ description: 'Унікальний ідентифікатор запису' })
  id!: number;

  @ApiProperty({ description: 'ID рядка' })
  rowId!: number;

  @ApiProperty({ description: 'Категорія' })
  category!: string;

  @ApiProperty({ description: 'Тип судна' })
  vesselType!: number;

  @ApiProperty({ description: 'Розмір' })
  size!: string;

  @ApiProperty({ description: 'Траєкторія' })
  traj!: string;

  @ApiProperty({ description: 'Коефіцієнт a' })
  a!: number;

  @ApiProperty({ description: 'Коефіцієнт b' })
  b!: number;

  @ApiProperty({ description: 'Коефіцієнт c' })
  c!: number;

  @ApiProperty({ description: 'Коефіцієнт d' })
  d!: number;

  @ApiProperty({ description: 'Коефіцієнт e' })
  e!: number;
}

export class DeviationDto {
  @ApiProperty({ description: 'ID судна' })
  vesselId!: number;

  @ApiProperty({ description: 'Назва судна' })
  vesselName!: string;

  @ApiProperty({ description: 'Дата' })
  date!: string;

  @ApiProperty({ description: 'Фактичні викиди CO2 (тонни)' })
  actualEmissions!: number;

  @ApiProperty({ description: 'Базові викиди CO2 (тонни)' })
  baselineEmissions!: number;

  @ApiProperty({ description: 'Відхилення (%)' })
  deviation!: number;
}

export class CalculateDeviationDto {
  @ApiProperty({ description: 'ID судна', required: true })
  vesselId!: number;

  @ApiProperty({ description: 'Початкова дата (ISO строка)', required: false })
  startDate?: string;

  @ApiProperty({ description: 'Кінцева дата (ISO строка)', required: false })
  endDate?: string;
}
