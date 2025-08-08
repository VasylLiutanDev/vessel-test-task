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
exports.PPService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const decimal_js_1 = require("decimal.js");
const pp_calculations_util_1 = require("./utils/pp-calculations.util");
let PPService = class PPService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getReferences() {
        return this.prisma.pPReference.findMany({
            orderBy: [
                { vesselType: 'asc' },
                { traj: 'asc' },
            ],
        });
    }
    async getReferenceById(id) {
        const reference = await this.prisma.pPReference.findUnique({
            where: { id },
        });
        if (!reference) {
            throw new common_1.NotFoundException(`PP reference with ID ${id} not found`);
        }
        return reference;
    }
    async calculateDeviation(dto) {
        // Get vessel information
        const vessel = await this.prisma.vessel.findUnique({
            where: { id: dto.vesselId },
            select: { id: true, name: true, vesselType: true },
        });
        if (!vessel) {
            throw new common_1.NotFoundException(`Vessel with ID ${dto.vesselId} not found`);
        }
        // Get the latest emission log for the vessel
        const where = { vesselId: dto.vesselId };
        if (dto.startDate || dto.endDate) {
            where.AND = [];
            if (dto.startDate) {
                where.AND.push({
                    fromUtc: {
                        gte: new Date(dto.startDate),
                    },
                });
            }
            if (dto.endDate) {
                where.AND.push({
                    toUtc: {
                        lte: new Date(dto.endDate),
                    },
                });
            }
        }
        const latestEmission = await this.prisma.emissionLog.findFirst({
            where,
            orderBy: {
                toUtc: 'desc',
            },
            select: {
                toUtc: true,
                totW2wco2: true,
            },
        });
        if (!latestEmission) {
            throw new common_1.NotFoundException(`No emission data found for vessel ${vessel.name}`);
        }
        // Get PP reference data for the vessel type
        const ppReference = await this.prisma.pPReference.findFirst({
            where: {
                vesselType: vessel.vesselType,
                traj: 'MIN', // Using minimum baseline for calculation
            },
        });
        if (!ppReference) {
            throw new common_1.NotFoundException(`PP reference data not found for vessel type ${vessel.vesselType}`);
        }
        // Get vessel's DWT (deadweight tonnage)
        // Note: In a real application, this would come from the vessel's details
        // For now, we'll use a default value or you can add this to the vessel model
        const defaultDWT = new decimal_js_1.Decimal(100000); // Default DWT in tons
        // Calculate baseline emissions
        const year = new Date(latestEmission.toUtc).getFullYear();
        const baselineEmissions = (0, pp_calculations_util_1.calculatePPSCCBaseline)({
            a: new decimal_js_1.Decimal(ppReference.a),
            b: new decimal_js_1.Decimal(ppReference.b),
            c: new decimal_js_1.Decimal(ppReference.c),
            d: new decimal_js_1.Decimal(ppReference.d),
            e: new decimal_js_1.Decimal(ppReference.e),
        }, year, defaultDWT);
        // Calculate deviation
        const actualEmissions = new decimal_js_1.Decimal(latestEmission.totW2wco2);
        const { percentage: deviationPercentage } = (0, pp_calculations_util_1.calculateDeviation)(actualEmissions, baselineEmissions);
        return {
            vesselId: vessel.id,
            vesselName: vessel.name,
            date: latestEmission.toUtc.toISOString().split('T')[0],
            actualEmissions: actualEmissions.toNumber(),
            baselineEmissions: baselineEmissions.toNumber(),
            deviation: deviationPercentage,
        };
    }
    async calculateAllDeviations() {
        // Get all vessels
        const vessels = await this.prisma.vessel.findMany({
            select: { id: true, name: true, vesselType: true },
        });
        // Calculate deviation for each vessel
        const deviations = [];
        for (const vessel of vessels) {
            try {
                const deviation = await this.calculateDeviation({
                    vesselId: vessel.id,
                });
                deviations.push(deviation);
            }
            catch (error) {
                console.error(`Error calculating deviation for vessel ${vessel.id}:`, error.message);
                // Skip this vessel if there's an error
            }
        }
        return deviations;
    }
};
exports.PPService = PPService;
exports.PPService = PPService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PPService);
//# sourceMappingURL=pp.service.js.map