
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Line, Circle, Text as SvgText } from 'react-native-svg';
import { colors } from '../styles/commonStyles';

export type Point = { x: number; y: number };
export type Series = Point[];

interface GrowthChartProps {
  width: number;
  height: number;
  p15: Series;
  p50: Series;
  p85: Series;
  point?: Point;
}

function toPath(points: Series, xScale: (x: number) => number, yScale: (y: number) => number): string {
  if (!points.length) return '';
  const [first, ...rest] = points;
  let d = `M ${xScale(first.x)} ${yScale(first.y)}`;
  rest.forEach((p) => {
    d += ` L ${xScale(p.x)} ${yScale(p.y)}`;
  });
  return d;
}

export default function GrowthChart({ width, height, p15, p50, p85, point }: GrowthChartProps) {
  const padding = 32;
  const minX = 0;
  const maxX = 24;
  const allYs = [...p15, ...p50, ...p85].map((p) => p.y);
  const minY = Math.min(...allYs, 2);
  const maxY = Math.max(...allYs, 16);

  const xScale = (x: number) =>
    padding + ((x - minX) / (maxX - minX)) * (width - padding * 2);
  const yScale = (y: number) =>
    height - padding - ((y - minY) / (maxY - minY)) * (height - padding * 2);

  const gridX = Array.from({ length: 7 }, (_, i) => (i * 4)); // every 4 months
  const gridY = Array.from({ length: 8 }, (_, i) => minY + (i * (maxY - minY)) / 7);

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        {/* Grid */}
        {gridX.map((gx, idx) => (
          <Line key={'gx' + idx} x1={xScale(gx)} y1={yScale(minY)} x2={xScale(gx)} y2={yScale(maxY)} stroke="#2b3a55" strokeWidth={1} />
        ))}
        {gridY.map((gy, idx) => (
          <Line key={'gy' + idx} x1={xScale(minX)} y1={yScale(gy)} x2={xScale(maxX)} y2={yScale(gy)} stroke="#2b3a55" strokeWidth={1} />
        ))}
        {/* Axes labels */}
        <SvgText x={xScale(0)} y={yScale(minY) + 20} fontSize="10" fill={colors.text}>0</SvgText>
        <SvgText x={xScale(24) - 8} y={yScale(minY) + 20} fontSize="10" fill={colors.text}>24 mo</SvgText>
        <SvgText x={xScale(0) - 24} y={yScale(minY) - 2} fontSize="10" fill={colors.text}>{minY.toFixed(0)} kg</SvgText>
        <SvgText x={xScale(0) - 24} y={yScale(maxY) + 4} fontSize="10" fill={colors.text}>{maxY.toFixed(0)} kg</SvgText>

        {/* Percentile paths */}
        <Path d={toPath(p15, xScale, yScale)} stroke="#ffb74d" strokeWidth={2} fill="none" />
        <Path d={toPath(p50, xScale, yScale)} stroke="#64B5F6" strokeWidth={2} fill="none" />
        <Path d={toPath(p85, xScale, yScale)} stroke="#81c784" strokeWidth={2} fill="none" />

        {/* Legend */}
        <SvgText x={xScale(1)} y={yScale(maxY) + 12} fontSize="10" fill="#ffb74d">P15</SvgText>
        <SvgText x={xScale(4)} y={yScale(maxY) + 12} fontSize="10" fill="#64B5F6">P50</SvgText>
        <SvgText x={xScale(7)} y={yScale(maxY) + 12} fontSize="10" fill="#81c784">P85</SvgText>

        {/* Point */}
        {point && (
          <Circle cx={xScale(point.x)} cy={yScale(point.y)} r={4} fill={colors.accent} />
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 10,
  },
});
