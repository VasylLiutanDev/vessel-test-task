import { Controller, Get, Query, Param, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { EmissionsService } from './emissions.service';
import { EmissionLogDto, GetEmissionsQueryDto, EmissionsByVesselDto, EmissionsByDateDto } from './dto/emission.dto';

@ApiTags('emissions')
@Controller('emissions')
@UseInterceptors(ClassSerializerInterceptor)
export class EmissionsController {
  constructor(private readonly emissionsService: EmissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Отримати всі записи про викиди' })
  @ApiResponse({ status: 200, description: 'Повертає список записів про викиди', type: [EmissionLogDto] })
  @ApiQuery({ name: 'startDate', required: false, description: 'Початкова дата (ISO string)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Кінцева дата (ISO string)' })
  @ApiQuery({ name: 'vesselId', required: false, description: 'ID судна' })
  async findAll(@Query() query: GetEmissionsQueryDto): Promise<EmissionLogDto[]> {
    return this.emissionsService.findAll(query);
  }

  @Get('by-vessel')
  @ApiOperation({ summary: 'Отримати сумарні викиди за судном' })
  @ApiResponse({ status: 200, description: 'Повертає сумарні викиди за кожне судно', type: [EmissionsByVesselDto] })
  @ApiQuery({ name: 'startDate', required: false, description: 'Початкова дата (ISO string)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Кінцева дата (ISO string)' })
  async getEmissionsByVessel(@Query() query: GetEmissionsQueryDto): Promise<EmissionsByVesselDto[]> {
    return this.emissionsService.getEmissionsByVessel(query);
  }

  @Get('by-date')
  @ApiOperation({ summary: 'Отримати викиди за датою' })
  @ApiResponse({ status: 200, description: 'Повертає викиди згруповані за датою', type: [EmissionsByDateDto] })
  @ApiQuery({ name: 'startDate', required: false, description: 'Початкова дата (ISO string)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Кінцева дата (ISO string)' })
  @ApiQuery({ name: 'vesselId', required: false, description: 'ID судна' })
  async getEmissionsByDate(@Query() query: GetEmissionsQueryDto): Promise<EmissionsByDateDto[]> {
    return this.emissionsService.getEmissionsByDate(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати запис про викиди за ідентифікатором' })
  @ApiParam({ name: 'id', description: 'Ідентифікатор запису про викиди' })
  @ApiResponse({ status: 200, description: 'Повертає запис про викиди за вказаним ідентифікатором', type: EmissionLogDto })
  @ApiResponse({ status: 404, description: 'Запис не знайдено' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EmissionLogDto> {
    return this.emissionsService.findOne(id);
  }
}
