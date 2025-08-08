import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmissionLogDto {
  @ApiProperty({ description: 'Унікальний ідентифікатор запису' })
  id!: number;

  @ApiProperty({ description: 'ID судна' })
  vesselId!: number;

  @ApiProperty({ description: 'ID логу', type: 'string' })
  @Type(() => String)
  logId!: bigint;

  @ApiProperty({ description: 'Початкова дата та час' })
  fromUtc!: Date;

  @ApiProperty({ description: 'Кінцева дата та час' })
  toUtc!: Date;

  @ApiProperty({ description: 'Викиди CO2 від головного двигуна (тонни)' })
  met2wco2!: number;

  @ApiProperty({ description: 'Викиди CO2 від допоміжного двигуна (тонни)' })
  aet2wco2!: number;

  @ApiProperty({ description: 'Сумарні викиди CO2 (тонни)' })
  totT2wco2!: number;

  @ApiProperty({ description: 'Еквівалентні викиди CO2 від головного двигуна (тонни)' })
  mew2wco2e!: number;

  @ApiProperty({ description: 'Еквівалентні викиди CO2 від допоміжного двигуна (тонни)' })
  aew2wco2e!: number;

  @ApiProperty({ description: 'Сумарні еквівалентні викиди CO2 (тонни)' })
  totW2wco2!: number;
}

export class GetEmissionsQueryDto {
  @ApiProperty({ description: 'Початкова дата (ISO строка)', required: false })
  startDate?: string;

  @ApiProperty({ description: 'Кінцева дата (ISO строка)', required: false })
  endDate?: string;

  @ApiProperty({ description: 'ID судна', required: false })
  vesselId?: number;
}

export class EmissionsByVesselDto {
  @ApiProperty({ description: 'ID судна' })
  vesselId!: number;

  @ApiProperty({ description: 'Назва судна' })
  vesselName!: string;

  @ApiProperty({ description: 'Загальні викиди CO2 (тонни)' })
  totalEmissions!: number;
}

export class EmissionsByDateDto {
  @ApiProperty({ description: 'Дата' })
  date!: string;

  @ApiProperty({ description: 'Загальні викиди CO2 (тонни)' })
  totalEmissions!: number;
}
