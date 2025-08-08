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
exports.EmissionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EmissionsService = class EmissionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { startDate, endDate, vesselId } = query;
        const where = {};
        if (startDate || endDate) {
            where.AND = [];
            if (startDate) {
                where.AND.push({
                    fromUtc: {
                        gte: new Date(startDate),
                    },
                });
            }
            if (endDate) {
                where.AND.push({
                    toUtc: {
                        lte: new Date(endDate),
                    },
                });
            }
        }
        if (vesselId) {
            where.vesselId = Number(vesselId);
        }
        return this.prisma.emissionLog.findMany({
            where,
            select: {
                id: true,
                vesselId: true,
                logId: true,
                fromUtc: true,
                toUtc: true,
                met2wco2: true,
                aet2wco2: true,
                totT2wco2: true,
                mew2wco2e: true,
                aew2wco2e: true,
                totW2wco2: true,
            },
            orderBy: {
                fromUtc: 'asc',
            },
        });
    }
    async findOne(id) {
        const emission = await this.prisma.emissionLog.findUnique({
            where: { id },
            select: {
                id: true,
                vesselId: true,
                logId: true,
                fromUtc: true,
                toUtc: true,
                met2wco2: true,
                aet2wco2: true,
                totT2wco2: true,
                mew2wco2e: true,
                aew2wco2e: true,
                totW2wco2: true,
            },
        });
        if (!emission) {
            throw new common_1.NotFoundException(`Emission log with ID ${id} not found`);
        }
        return emission;
    }
    async getEmissionsByVessel(query) {
        const { startDate, endDate } = query;
        const where = {};
        if (startDate || endDate) {
            where.AND = [];
            if (startDate) {
                where.AND.push({
                    fromUtc: {
                        gte: new Date(startDate),
                    },
                });
            }
            if (endDate) {
                where.AND.push({
                    toUtc: {
                        lte: new Date(endDate),
                    },
                });
            }
        }
        const emissions = await this.prisma.emissionLog.groupBy({
            by: ['vesselId'],
            where,
            _sum: {
                totW2wco2: true,
            },
            orderBy: {
                _sum: {
                    totW2wco2: 'desc',
                },
            },
        });
        // Get vessel names
        const vesselIds = emissions.map(e => e.vesselId);
        const vessels = await this.prisma.vessel.findMany({
            where: {
                id: { in: vesselIds },
            },
            select: {
                id: true,
                name: true,
            },
        });
        const vesselMap = new Map(vessels.map(v => [v.id, v.name]));
        return emissions.map(e => ({
            vesselId: e.vesselId,
            vesselName: vesselMap.get(e.vesselId) || `Vessel ${e.vesselId}`,
            totalEmissions: e._sum.totW2wco2 || 0,
        }));
    }
    async getEmissionsByDate(query) {
        const { startDate, endDate, vesselId } = query;
        const where = {};
        if (vesselId) {
            where.vesselId = Number(vesselId);
        }
        if (startDate || endDate) {
            where.AND = [];
            if (startDate) {
                where.AND.push({
                    fromUtc: {
                        gte: new Date(startDate),
                    },
                });
            }
            if (endDate) {
                where.AND.push({
                    toUtc: {
                        lte: new Date(endDate),
                    },
                });
            }
        }
        // Get all logs with the date part only
        const logs = await this.prisma.emissionLog.findMany({
            where,
            select: {
                fromUtc: true,
                totW2wco2: true,
            },
            orderBy: {
                fromUtc: 'asc',
            },
        });
        // Group by day and sum emissions
        const emissionsByDate = logs.reduce((acc, log) => {
            const dateKey = log.fromUtc.toISOString().split('T')[0];
            if (!acc[dateKey]) {
                acc[dateKey] = 0;
            }
            // Ensure totW2wco2 is treated as a number
            acc[dateKey] += Number(log.totW2wco2) || 0;
            return acc;
        }, {});
        // Convert to array of DTOs with proper typing
        return Object.entries(emissionsByDate).map(([date, totalEmissions]) => ({
            date,
            totalEmissions: Number(totalEmissions) || 0,
        }));
    }
};
exports.EmissionsService = EmissionsService;
exports.EmissionsService = EmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmissionsService);
//# sourceMappingURL=emissions.service.js.map