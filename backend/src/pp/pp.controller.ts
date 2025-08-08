import { Controller, Get, Query, Param, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { PPService } from './pp.service';
import { PPReferenceDto, DeviationDto, CalculateDeviationDto } from './dto/pp.dto';

@ApiTags('poseidon-principles')
@Controller('poseidon-principles')
@UseInterceptors(ClassSerializerInterceptor)
export class PPController {
  constructor(private readonly ppService: PPService) {}

  @Get('references')
  @ApiOperation({ summary: 'Отримати всі довідкові дані Poseidon Principles' })
  @ApiResponse({ status: 200, description: 'Повертає список довідкових даних', type: [PPReferenceDto] })
  async getReferences(): Promise<PPReferenceDto[]> {
    return this.ppService.getReferences();
  }

  @Get('references/:id')
  @ApiOperation({ summary: 'Отримати довідкові дані за ідентифікатором' })
  @ApiParam({ name: 'id', description: 'Ідентифікатор довідкових даних' })
  @ApiResponse({ status: 200, description: 'Повертає довідкові дані за вказаним ідентифікатором', type: PPReferenceDto })
  @ApiResponse({ status: 404, description: 'Довідкові дані не знайдено' })
  async getReferenceById(@Param('id', ParseIntPipe) id: number): Promise<PPReferenceDto> {
    return this.ppService.getReferenceById(id);
  }

  @Get('deviations')
  @ApiOperation({ summary: 'Розрахувати відхилення для всіх суден' })
  @ApiResponse({ status: 200, description: 'Повертає відхилення для всіх суден', type: [DeviationDto] })
  async calculateAllDeviations(): Promise<DeviationDto[]> {
    return this.ppService.calculateAllDeviations();
  }

  @Get('deviations/calculate')
  @ApiOperation({ summary: 'Розрахувати відхилення для конкретного судна' })
  @ApiResponse({ status: 200, description: 'Повертає розраховане відхилення', type: DeviationDto })
  @ApiResponse({ status: 404, description: 'Судно або дані не знайдено' })
  @ApiQuery({ name: 'vesselId', required: true, description: 'ID судна' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Початкова дата (ISO строка)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Кінцева дата (ISO строка)' })
  async calculateDeviation(
    @Query() dto: CalculateDeviationDto,
  ): Promise<DeviationDto> {
    return this.ppService.calculateDeviation(dto);
  }

  @Get('deviations/vessel/:vesselId')
  @ApiOperation({ summary: 'Отримати відхилення для конкретного судна' })
  @ApiResponse({ status: 200, description: 'Повертає відхилення для вказаного судна', type: DeviationDto })
  @ApiResponse({ status: 404, description: 'Судно або дані не знайдено' })
  @ApiParam({ name: 'vesselId', description: 'ID судна' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Початкова дата (ISO строка)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Кінцева дата (ISO строка)' })
  async getVesselDeviation(
    @Param('vesselId', ParseIntPipe) vesselId: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<DeviationDto> {
    return this.ppService.calculateDeviation({
      vesselId,
      startDate,
      endDate,
    });
  }
}
