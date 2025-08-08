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
exports.VesselController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vessel_service_1 = require("./vessel.service");
const vessel_dto_1 = require("./dto/vessel.dto");
let VesselController = class VesselController {
    constructor(vesselService) {
        this.vesselService = vesselService;
    }
    async findAll() {
        return this.vesselService.findAll();
    }
    async findOne(id) {
        return this.vesselService.findOne(id);
    }
    async create(createVesselDto) {
        return this.vesselService.create(createVesselDto);
    }
    async update(id, updateVesselDto) {
        return this.vesselService.update(id, updateVesselDto);
    }
    async remove(id) {
        return this.vesselService.remove(id);
    }
};
exports.VesselController = VesselController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати всі судна' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає список усіх суден', type: [vessel_dto_1.VesselDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VesselController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Отримати судно за ідентифікатором' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ідентифікатор судна' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Повертає судно за вказаним ідентифікатором', type: vessel_dto_1.VesselDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Судно не знайдено' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VesselController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Створити нове судно' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Судно успішно створено', type: vessel_dto_1.VesselDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Невірні вхідні дані' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vessel_dto_1.CreateVesselDto]),
    __metadata("design:returntype", Promise)
], VesselController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Оновити інформацію про судно' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ідентифікатор судна' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Інформацію про судно оновлено', type: vessel_dto_1.VesselDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Судно не знайдено' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, vessel_dto_1.UpdateVesselDto]),
    __metadata("design:returntype", Promise)
], VesselController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Видалити судно' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ідентифікатор судна' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Судно успішно видалено' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Судно не знайдено' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VesselController.prototype, "remove", null);
exports.VesselController = VesselController = __decorate([
    (0, swagger_1.ApiTags)('vessels'),
    (0, common_1.Controller)('vessels'),
    __metadata("design:paramtypes", [vessel_service_1.VesselService])
], VesselController);
//# sourceMappingURL=vessel.controller.js.map