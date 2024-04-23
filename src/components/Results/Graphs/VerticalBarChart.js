import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const VerticalBarChart = ({ data, maxValues }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define chart dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };

    // Define scales
    const xScale = d3.scaleBand()
      .domain(Object.keys(data))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, maxValues])
      .range([height - margin.bottom, margin.top]);

    // Define color scale
    const colorScale = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(d3.schemeCategory10);

    // Draw bars
    svg.selectAll("rect")
      .data(Object.entries(data))
      .enter().append("rect")
      .attr("x", d => xScale(d[0]))
      .attr("y", d => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d[1]))
      .attr("fill", d => colorScale(d[0]));

    // Add percentage labels inside bars if there's enough space
    svg.selectAll("text")
      .data(Object.entries(data))
      .enter().append("text")
      .text(d => {
        const percentage = Math.round((d[1] / maxValues) * 100);
        return percentage < 10 ? "" : `${percentage}%`; // Only show if percentage is >= 10%
      })
      .attr("x", d => xScale(d[0]) + xScale.bandwidth() / 2)
      .attr("y", d => {
        const barHeight = height - margin.bottom - yScale(d[1]);
        return barHeight < 20 ? yScale(d[1]) - 10 : yScale(d[1]) + 20; // Adjust position based on bar height
      })
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-size", "16px");

    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
  }, [data, maxValues]);

  return (
    <svg ref={svgRef} width="600" height="400"></svg>
  );
};

export default VerticalBarChart;
