import React, { useEffect, useRef } from "react";
import { select, axisBottom, axisLeft, scaleBand, scaleLinear } from "d3";

// Component for rendering the left axis
function AxisLeft({ scale }) {
  const ref = useRef(null);

  // Effect to update the axis when the scale changes
  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}

// Component for rendering the bottom axis
function AxisBottom({ scale, transform }) {
  const ref = useRef(null);

  // Effect to update the axis when the scale changes
  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

// Component for rendering the bars
function Bars({ data, height, scaleX, scaleY }) {
  return (
    <>
      {data.map(({ value, label }) => (
        <rect
          key={`bar-${label}`}
          x={scaleX(label)}
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill="teal"
        />
      ))}
    </>
  );
}

// Main BarChart component
export function BarChart({ data }) {
  // Define margins and dimensions
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // Create scales for x and y axes
  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);
  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);

  return (
    // SVG container for the chart
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      {/* Group for positioning and applying margins */}
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Render the bottom axis */}
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        {/* Render the left axis */}
        <AxisLeft scale={scaleY} />
        {/* Render the bars */}
        <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
      </g>
    </svg>
  );
}

// Export the BarChart component
export default BarChart;
