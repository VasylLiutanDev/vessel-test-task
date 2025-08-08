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
exports.VesselService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VesselService = class VesselService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.vessel.findMany({
            select: {
                id: true,
                name: true,
                imoNumber: true,
                vesselType: true,
            },
        });
    }
    async findOne(id) {
        const vessel = await this.prisma.vessel.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                imoNumber: true,
                vesselType: true,
            },
        });
        if (!vessel) {
            throw new common_1.NotFoundException(`Vessel with ID ${id} not found`);
        }
        return vessel;
    }
    async create(createVesselDto) {
        return this.prisma.vessel.create({
            data: {
                name: createVesselDto.name,
                imoNumber: createVesselDto.imoNumber,
                vesselType: createVesselDto.vesselType,
            },
            select: {
                id: true,
                name: true,
                imoNumber: true,
                vesselType: true,
            },
        });
    }
    async update(id, updateVesselDto) {
        try {
            return await this.prisma.vessel.update({
                where: { id },
                data: updateVesselDto,
                select: {
                    id: true,
                    name: true,
                    imoNumber: true,
                    vesselType: true,
                },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Vessel with ID ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.prisma.vessel.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Vessel with ID ${id} not found`);
            }
            throw error;
        }
    }
};
exports.VesselService = VesselService;
exports.VesselService = VesselService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VesselService);
//# sourceMappingURL=vessel.service.js.map