"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmissionsByDateDto = exports.EmissionsByVesselDto = exports.GetEmissionsQueryDto = exports.EmissionLogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class EmissionLogDto {
}
exports.EmissionLogDto = EmissionLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Унікальний ідентифікатор запису' }),
    __metadata("design:type", Number)
], EmissionLogDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID судна' }),
    __metadata("design:type", Number)
], EmissionLogDto.prototype, "vesselId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID логу', type: 'string' }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", BigInt)
], EmissionLogDto.prototype, "logId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Початкова дата та час' }),
    __metadata("design:type", Date)
], EmissionLogDto.prototype, "fromUtc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Кінцева дата та час' }),
    __metadata("design:type", Date)
], EmissionLogDto.prototype, "toUtc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Викиди CO2 від головного двигуна (тонни)' }),
    __metadata("design:type", Number)
], EmissionLogDto.prototype, "met2wco2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Викиди CO2 від допоміжного двигуна (тонни)' }),
    __metadata("design:type", Number)
], EmissionLogDto.prototype, "aet2wco2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Сумарні викиди CO2 (тонни)' }),
    __metadata("design:type", Number)
], EmissionLogDto.prototype, "totT2wco2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Еквівалентні викиди CO2 від головного двигуна (тонни)' }),
    __metadata("design:type", Number)
], EmissionLogDto.prototype, "mew2wco2e", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Еквівалентні викиди CO2 від допоміжного двигуна (тонни)' }),
    __metadata("design:type", Number)
], EmissionLogDto.prototype, "aew2wco2e", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Сумарні еквівалентні викиди CO2 (тонни)' }),
    __metadata("design:type", Number)
], EmissionLogDto.prototype, "totW2wco2", void 0);
class GetEmissionsQueryDto {
}
exports.GetEmissionsQueryDto = GetEmissionsQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Початкова дата (ISO строка)', required: false }),
    __metadata("design:type", String)
], GetEmissionsQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Кінцева дата (ISO строка)', required: false }),
    __metadata("design:type", String)
], GetEmissionsQueryDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID судна', required: false }),
    __metadata("design:type", Number)
], GetEmissionsQueryDto.prototype, "vesselId", void 0);
class EmissionsByVesselDto {
}
exports.EmissionsByVesselDto = EmissionsByVesselDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID судна' }),
    __metadata("design:type", Number)
], EmissionsByVesselDto.prototype, "vesselId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Назва судна' }),
    __metadata("design:type", String)
], EmissionsByVesselDto.prototype, "vesselName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Загальні викиди CO2 (тонни)' }),
    __metadata("design:type", Number)
], EmissionsByVesselDto.prototype, "totalEmissions", void 0);
class EmissionsByDateDto {
}
exports.EmissionsByDateDto = EmissionsByDateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Дата' }),
    __metadata("design:type", String)
], EmissionsByDateDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Загальні викиди CO2 (тонни)' }),
    __metadata("design:type", Number)
], EmissionsByDateDto.prototype, "totalEmissions", void 0);
//# sourceMappingURL=emission.dto.js.map