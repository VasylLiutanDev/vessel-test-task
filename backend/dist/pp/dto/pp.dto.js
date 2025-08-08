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
exports.CalculateDeviationDto = exports.DeviationDto = exports.PPReferenceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PPReferenceDto {
}
exports.PPReferenceDto = PPReferenceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Унікальний ідентифікатор запису' }),
    __metadata("design:type", Number)
], PPReferenceDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID рядка' }),
    __metadata("design:type", Number)
], PPReferenceDto.prototype, "rowId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Категорія' }),
    __metadata("design:type", String)
], PPReferenceDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Тип судна' }),
    __metadata("design:type", Number)
], PPReferenceDto.prototype, "vesselType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Розмір' }),
    __metadata("design:type", String)
], PPReferenceDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Траєкторія' }),
    __metadata("design:type", String)
], PPReferenceDto.prototype, "traj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Коефіцієнт a' }),
    __metadata("design:type", Number)
], PPReferenceDto.prototype, "a", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Коефіцієнт b' }),
    __metadata("design:type", Number)
], PPReferenceDto.prototype, "b", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Коефіцієнт c' }),
    __metadata("design:type", Number)
], PPReferenceDto.prototype, "c", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Коефіцієнт d' }),
    __metadata("design:type", Number)
], PPReferenceDto.prototype, "d", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Коефіцієнт e' }),
    __metadata("design:type", Number)
], PPReferenceDto.prototype, "e", void 0);
class DeviationDto {
}
exports.DeviationDto = DeviationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID судна' }),
    __metadata("design:type", Number)
], DeviationDto.prototype, "vesselId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Назва судна' }),
    __metadata("design:type", String)
], DeviationDto.prototype, "vesselName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Дата' }),
    __metadata("design:type", String)
], DeviationDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Фактичні викиди CO2 (тонни)' }),
    __metadata("design:type", Number)
], DeviationDto.prototype, "actualEmissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Базові викиди CO2 (тонни)' }),
    __metadata("design:type", Number)
], DeviationDto.prototype, "baselineEmissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Відхилення (%)' }),
    __metadata("design:type", Number)
], DeviationDto.prototype, "deviation", void 0);
class CalculateDeviationDto {
}
exports.CalculateDeviationDto = CalculateDeviationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID судна', required: true }),
    __metadata("design:type", Number)
], CalculateDeviationDto.prototype, "vesselId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Початкова дата (ISO строка)', required: false }),
    __metadata("design:type", String)
], CalculateDeviationDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Кінцева дата (ISO строка)', required: false }),
    __metadata("design:type", String)
], CalculateDeviationDto.prototype, "endDate", void 0);
//# sourceMappingURL=pp.dto.js.map