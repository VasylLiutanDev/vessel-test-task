"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePPSCCBaseline = calculatePPSCCBaseline;
exports.calculateDeviation = calculateDeviation;
const decimal_js_1 = require("decimal.js");
function calculatePPSCCBaseline(factors, year, dwt) {
    const { a, b, c, d, e } = factors;
    // Calculate the baseline using the formula: a * (dwt^e) + b * year^3 + c * year^2 + d * year
    const dwtTerm = a.mul(dwt.pow(e));
    const yearCubed = new decimal_js_1.Decimal(year).pow(3);
    const yearSquared = new decimal_js_1.Decimal(year).pow(2);
    const baseline = dwtTerm
        .plus(b.mul(yearCubed))
        .plus(c.mul(yearSquared))
        .plus(d.mul(year));
    return baseline;
}
function calculateDeviation(actual, baseline) {
    if (baseline.isZero()) {
        return { value: new decimal_js_1.Decimal(0), percentage: 0 };
    }
    const deviation = actual.minus(baseline);
    const percentage = deviation.dividedBy(baseline).times(100).toNumber();
    return {
        value: deviation,
        percentage,
    };
}
//# sourceMappingURL=pp-calculations.util.js.map