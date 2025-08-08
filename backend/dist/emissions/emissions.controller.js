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
exports.EmissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const emissions_service_1 = require("./emissions.service");
const emission_dto_1 = require("./dto/emission.dto");
let EmissionsController = class EmissionsController {
    constructor(emissionsService) {
        this.emissionsService = emissionsService;
    }
    async findAll(query) {
        return this.emissionsService.findAll(query);
    }
    async getEmissionsByVessel(query) {
        return this.emissionsService.getEmissionsByVessel(query);
    }
    async getEmissionsByDate(query) {
        return this.emissionsService.getEmissionsByDate(query);
    }
    async findOne(id) {
        return this.emissionsService.findOne(id);
    }
};
exports.EmissionsController = EmissionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати всі записи про викиди' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає список записів про викиди', type: [emission_dto_1.EmissionLogDto] }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Початкова дата (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'Кінцева дата (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'vesselId', required: false, description: 'ID судна' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [emission_dto_1.GetEmissionsQueryDto]),
    __metadata("design:returntype", Promise)
], EmissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-vessel'),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати сумарні викиди за судном' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає сумарні викиди за кожне судно', type: [emission_dto_1.EmissionsByVesselDto] }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Початкова дата (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'Кінцева дата (ISO string)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [emission_dto_1.GetEmissionsQueryDto]),
    __metadata("design:returntype", Promise)
], EmissionsController.prototype, "getEmissionsByVessel", null);
__decorate([
    (0, common_1.Get)('by-date'),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати викиди за датою' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає викиди згруповані за датою', type: [emission_dto_1.EmissionsByDateDto] }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Початкова дата (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'Кінцева дата (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'vesselId', required: false, description: 'ID судна' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [emission_dto_1.GetEmissionsQueryDto]),
    __metadata("design:returntype", Promise)
], EmissionsController.prototype, "getEmissionsByDate", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати запис про викиди за ідентифікатором' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ідентифікатор запису про викиди' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає запис про викиди за вказаним ідентифікатором', type: emission_dto_1.EmissionLogDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Запис не знайдено' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmissionsController.prototype, "findOne", null);
exports.EmissionsController = EmissionsController = __decorate([
    (0, swagger_1.ApiTags)('emissions'),
    (0, common_1.Controller)('emissions'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [emissions_service_1.EmissionsService])
], EmissionsController);
//# sourceMappingURL=emissions.controller.js.map