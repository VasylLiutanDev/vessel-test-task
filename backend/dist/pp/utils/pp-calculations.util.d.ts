import { Decimal } from 'decimal.js';
interface PPFactors {
    a: Decimal;
    b: Decimal;
    c: Decimal;
    d: Decimal;
    e: Decimal;
}
export declare function calculatePPSCCBaseline(factors: PPFactors, year: number, dwt: Decimal): Decimal;
export declare function calculateDeviation(actual: Decimal, baseline: Decimal): {
    value: Decimal;
    percentage: number;
};
export {};
