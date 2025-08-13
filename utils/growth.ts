
/**
 * Simplified WHO-like percentiles for weight-for-age (0–24 months).
 * Values approximate typical curves for demonstration/MVP purposes.
 * For clinical use, replace with official WHO LMS or complete percentile data.
 */

export type CurvePoint = { x: number; y: number }; // x: months, y: kg
export type Curve = CurvePoint[];
export type CurveSet = { p15: Curve; p50: Curve; p85: Curve };

const boysP50: number[] = [
  3.3, 4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6,
  9.8, 10.0, 10.2, 10.4, 10.6, 10.8, 11.0, 11.2, 11.5, 11.8, 12.0, 12.2
];
const boysP15: number[] = [
  2.9, 3.9, 4.9, 5.7, 6.3, 6.8, 7.2, 7.5, 7.8, 8.0, 8.2, 8.4, 8.6,
  8.8, 9.0, 9.2, 9.4, 9.6, 9.8, 10.0, 10.2, 10.4, 10.6, 10.7, 10.8
];
const boysP85: number[] = [
  3.8, 5.1, 6.3, 7.2, 7.9, 8.5, 8.9, 9.3, 9.7, 10.0, 10.3, 10.5, 10.8,
  11.0, 11.3, 11.5, 11.8, 12.0, 12.3, 12.6, 12.9, 13.3, 13.6, 13.9, 14.2
];

const girlsP50: number[] = [
  3.2, 4.2, 5.2, 6.0, 6.6, 7.1, 7.5, 7.8, 8.1, 8.4, 8.6, 8.8, 9.0,
  9.2, 9.4, 9.6, 9.8, 10.0, 10.2, 10.4, 10.6, 10.8, 11.1, 11.3, 11.5
];
const girlsP15: number[] = [
  2.8, 3.7, 4.6, 5.3, 5.9, 6.3, 6.6, 6.9, 7.1, 7.3, 7.5, 7.7, 7.9,
  8.1, 8.3, 8.5, 8.7, 8.9, 9.1, 9.3, 9.5, 9.7, 9.9, 10.1, 10.2
];
const girlsP85: number[] = [
  3.7, 4.8, 5.9, 6.8, 7.5, 8.0, 8.5, 8.9, 9.2, 9.5, 9.8, 10.0, 10.2,
  10.5, 10.7, 10.9, 11.2, 11.4, 11.7, 11.9, 12.2, 12.5, 12.8, 13.0, 13.2
];

// Build curves for 0..24 months with integer steps
function buildCurve(vals: number[]): Curve {
  return vals.map((y, x) => ({ x, y }));
}

export const boyCurves: CurveSet = {
  p15: buildCurve(boysP15),
  p50: buildCurve(boysP50),
  p85: buildCurve(boysP85),
};

export const girlCurves: CurveSet = {
  p15: buildCurve(girlsP15),
  p50: buildCurve(girlsP50),
  p85: buildCurve(girlsP85),
};

export function interpolateCurve(curve: Curve): Curve {
  // Return original for integer points; intermediate points will be computed by consumer if needed
  return curve;
}

function linearInterpolate(x: number, x0: number, y0: number, x1: number, y1: number): number {
  if (x1 === x0) return y0;
  const t = (x - x0) / (x1 - x0);
  return y0 + t * (y1 - y0);
}

function getInterpolatedY(curve: Curve, x: number): number {
  if (x <= curve[0].x) return curve[0].y;
  if (x >= curve[curve.length - 1].x) return curve[curve.length - 1].y;

  const floor = Math.floor(x);
  const ceil = Math.ceil(x);
  const p0 = curve.find((p) => p.x === floor)!;
  const p1 = curve.find((p) => p.x === ceil)!;
  if (!p0 || !p1) return p0 ? p0.y : p1?.y ?? 0;
  if (floor === ceil) return p0.y;
  return linearInterpolate(x, p0.x, p0.y, p1.x, p1.y);
}

export function assessWeightForAge(ageMonths: number, weightKg: number, sex: 'male' | 'female') {
  const curves = sex === 'male' ? boyCurves : girlCurves;
  const p15 = getInterpolatedY(curves.p15, ageMonths);
  const p85 = getInterpolatedY(curves.p85, ageMonths);
  const p50 = getInterpolatedY(curves.p50, ageMonths);

  let classification: 'under' | 'within' | 'over' = 'within';
  if (weightKg > 0) {
    if (weightKg < p15) classification = 'under';
    else if (weightKg > p85) classification = 'over';
  }

  const label =
    classification === 'under' ? 'Under (below 15th centile)' :
    classification === 'over' ? 'Over (above 85th centile)' :
    'Within range';

  const color =
    classification === 'under' ? '#ffb74d' :
    classification === 'over' ? '#81c784' :
    '#64B5F6';

  return {
    p15,
    p50,
    p85,
    classification,
    label,
    color,
  };
}
