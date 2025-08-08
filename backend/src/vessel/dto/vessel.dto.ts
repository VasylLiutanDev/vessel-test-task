import { ApiProperty } from '@nestjs/swagger';

export class VesselDto {
  @ApiProperty({ description: 'Унікальний ідентифікатор судна' })
  id!: number;

  @ApiProperty({ description: 'Назва судна' })
  name!: string;

  @ApiProperty({ description: 'IMO номер судна' })
  imoNumber!: number;

  @ApiProperty({ description: 'Тип судна' })
  vesselType!: number;
}

export class CreateVesselDto {
  @ApiProperty({ description: 'Назва судна', required: true })
  name!: string;

  @ApiProperty({ description: 'IMO номер судна', required: true })
  imoNumber!: number;

  @ApiProperty({ description: 'Тип судна', required: true })
  vesselType!: number;
}

export class UpdateVesselDto {
  @ApiProperty({ description: 'Назва судна', required: false })
  name?: string;

  @ApiProperty({ description: 'IMO номер судна', required: false })
  imoNumber?: number;

  @ApiProperty({ description: 'Тип судна', required: false })
  vesselType?: number;
}
