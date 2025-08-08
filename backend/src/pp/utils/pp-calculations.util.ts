import { Decimal } from 'decimal.js';

interface PPFactors {
  a: Decimal;
  b: Decimal;
  c: Decimal;
  d: Decimal;
  e: Decimal;
}

export function calculatePPSCCBaseline(
  factors: PPFactors,
  year: number,
  dwt: Decimal,
): Decimal {
  const { a, b, c, d, e } = factors;
  
  // Calculate the baseline using the formula: a * (dwt^e) + b * year^3 + c * year^2 + d * year
  const dwtTerm = a.mul(dwt.pow(e));
  const yearCubed = new Decimal(year).pow(3);
  const yearSquared = new Decimal(year).pow(2);
  
  const baseline = dwtTerm
    .plus(b.mul(yearCubed))
    .plus(c.mul(yearSquared))
    .plus(d.mul(year));
  
  return baseline;
}

export function calculateDeviation(
  actual: Decimal,
  baseline: Decimal,
): { value: Decimal; percentage: number } {
  if (baseline.isZero()) {
    return { value: new Decimal(0), percentage: 0 };
  }
  
  const deviation = actual.minus(baseline);
  const percentage = deviation.dividedBy(baseline).times(100).toNumber();
  
  return {
    value: deviation,
    percentage,
  };
}
