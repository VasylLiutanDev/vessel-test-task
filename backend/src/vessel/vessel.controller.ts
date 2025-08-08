import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { VesselService } from './vessel.service';
import { VesselDto, CreateVesselDto, UpdateVesselDto } from './dto/vessel.dto';

@ApiTags('vessels')
@Controller('vessels')
export class VesselController {
  constructor(private readonly vesselService: VesselService) {}

  @Get()
  @ApiOperation({ summary: 'Отримати всі судна' })
  @ApiResponse({ status: 200, description: 'Повертає список усіх суден', type: [VesselDto] })
  async findAll(): Promise<VesselDto[]> {
    return this.vesselService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати судно за ідентифікатором' })
  @ApiParam({ name: 'id', description: 'Ідентифікатор судна' })
  @ApiResponse({ status: 200, description: 'Повертає судно за вказаним ідентифікатором', type: VesselDto })
  @ApiResponse({ status: 404, description: 'Судно не знайдено' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VesselDto> {
    return this.vesselService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Створити нове судно' })
  @ApiResponse({ status: 201, description: 'Судно успішно створено', type: VesselDto })
  @ApiResponse({ status: 400, description: 'Невірні вхідні дані' })
  async create(@Body() createVesselDto: CreateVesselDto): Promise<VesselDto> {
    return this.vesselService.create(createVesselDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Оновити інформацію про судно' })
  @ApiParam({ name: 'id', description: 'Ідентифікатор судна' })
  @ApiResponse({ status: 200, description: 'Інформацію про судно оновлено', type: VesselDto })
  @ApiResponse({ status: 404, description: 'Судно не знайдено' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVesselDto: UpdateVesselDto,
  ): Promise<VesselDto> {
    return this.vesselService.update(id, updateVesselDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити судно' })
  @ApiParam({ name: 'id', description: 'Ідентифікатор судна' })
  @ApiResponse({ status: 200, description: 'Судно успішно видалено' })
  @ApiResponse({ status: 404, description: 'Судно не знайдено' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.vesselService.remove(id);
  }
}
