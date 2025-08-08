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
exports.UpdateVesselDto = exports.CreateVesselDto = exports.VesselDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class VesselDto {
}
exports.VesselDto = VesselDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Унікальний ідентифікатор судна' }),
    __metadata("design:type", Number)
], VesselDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Назва судна' }),
    __metadata("design:type", String)
], VesselDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IMO номер судна' }),
    __metadata("design:type", Number)
], VesselDto.prototype, "imoNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Тип судна' }),
    __metadata("design:type", Number)
], VesselDto.prototype, "vesselType", void 0);
class CreateVesselDto {
}
exports.CreateVesselDto = CreateVesselDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Назва судна', required: true }),
    __metadata("design:type", String)
], CreateVesselDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IMO номер судна', required: true }),
    __metadata("design:type", Number)
], CreateVesselDto.prototype, "imoNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Тип судна', required: true }),
    __metadata("design:type", Number)
], CreateVesselDto.prototype, "vesselType", void 0);
class UpdateVesselDto {
}
exports.UpdateVesselDto = UpdateVesselDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Назва судна', required: false }),
    __metadata("design:type", String)
], UpdateVesselDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IMO номер судна', required: false }),
    __metadata("design:type", Number)
], UpdateVesselDto.prototype, "imoNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Тип судна', required: false }),
    __metadata("design:type", Number)
], UpdateVesselDto.prototype, "vesselType", void 0);
//# sourceMappingURL=vessel.dto.js.map