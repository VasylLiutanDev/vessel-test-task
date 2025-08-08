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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PPController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pp_service_1 = require("./pp.service");
const pp_dto_1 = require("./dto/pp.dto");
let PPController = class PPController {
    constructor(ppService) {
        this.ppService = ppService;
    }
    async getReferences() {
        return this.ppService.getReferences();
    }
    async getReferenceById(id) {
        return this.ppService.getReferenceById(id);
    }
    async calculateAllDeviations() {
        return this.ppService.calculateAllDeviations();
    }
    async calculateDeviation(dto) {
        return this.ppService.calculateDeviation(dto);
    }
    async getVesselDeviation(vesselId, startDate, endDate) {
        return this.ppService.calculateDeviation({
            vesselId,
            startDate,
            endDate,
        });
    }
};
exports.PPController = PPController;
__decorate([
    (0, common_1.Get)('references'),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати всі довідкові дані Poseidon Principles' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає список довідкових даних', type: [pp_dto_1.PPReferenceDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PPController.prototype, "getReferences", null);
__decorate([
    (0, common_1.Get)('references/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати довідкові дані за ідентифікатором' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ідентифікатор довідкових даних' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає довідкові дані за вказаним ідентифікатором', type: pp_dto_1.PPReferenceDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Довідкові дані не знайдено' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PPController.prototype, "getReferenceById", null);
__decorate([
    (0, common_1.Get)('deviations'),
    (0, swagger_1.ApiOperation)({ summary: 'Розрахувати відхилення для всіх суден' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає відхилення для всіх суден', type: [pp_dto_1.DeviationDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PPController.prototype, "calculateAllDeviations", null);
__decorate([
    (0, common_1.Get)('deviations/calculate'),
    (0, swagger_1.ApiOperation)({ summary: 'Розрахувати відхилення для конкретного судна' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає розраховане відхилення', type: pp_dto_1.DeviationDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Судно або дані не знайдено' }),
    (0, swagger_1.ApiQuery)({ name: 'vesselId', required: true, description: 'ID судна' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Початкова дата (ISO строка)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'Кінцева дата (ISO строка)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pp_dto_1.CalculateDeviationDto]),
    __metadata("design:returntype", Promise)
], PPController.prototype, "calculateDeviation", null);
__decorate([
    (0, common_1.Get)('deviations/vessel/:vesselId'),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати відхилення для конкретного судна' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає відхилення для вказаного судна', type: pp_dto_1.DeviationDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Судно або дані не знайдено' }),
    (0, swagger_1.ApiParam)({ name: 'vesselId', description: 'ID судна' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Початкова дата (ISO строка)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'Кінцева дата (ISO строка)' }),
    __param(0, (0, common_1.Param)('vesselId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], PPController.prototype, "getVesselDeviation", null);
exports.PPController = PPController = __decorate([
    (0, swagger_1.ApiTags)('poseidon-principles'),
    (0, common_1.Controller)('poseidon-principles'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [pp_service_1.PPService])
], PPController);
//# sourceMappingURL=pp.controller.js.map