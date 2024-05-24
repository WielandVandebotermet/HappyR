import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

const StackableBarChart = ({
  data,
  maxValues,
  title,
  Width,
  legendPadding,
}) => {
  const svgRef = useRef();
  const legendRef = useRef();
  const titlePadding = 10; // Padding for the title

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const legend = d3.select(legendRef.current);

    // Extract category names and stack the data
    const categories = Object.keys(maxValues);
    setCategories(categories);

    const stack = d3.stack().keys(categories);
    const stackedData = stack(
      Object.entries(data).map(([name, values]) => ({ name, ...values }))
    );

    // Calculate the sum of all max values for the y-axis domain
    const maxY = Object.values(maxValues)
      .map((value) => parseInt(value, 10))
      .reduce((acc, curr) => acc + curr, 0);

    // Define chart dimensions
    const margin = { top: 20, right: 30, bottom: 60, left: 70 }; // Adjust margins for smaller screens

    // Calculate height dynamically based on the number of categories
    const barHeight = 30; // Fixed height for each category bar
    const availableHeight = window.innerHeight * 0.6 - margin.top - margin.bottom; // Adjust as needed
    const minHeight = 400; // Minimum height for the graph
    const height = Math.max(
      Math.min(barHeight * categories.length, availableHeight),
      minHeight
    );

    // Calculate width relative to available screen width
    const availableWidth = window.innerWidth * 0.8; // Adjust as needed
    const width = Math.min(Width, availableWidth); // Limit width to Width or availableWidth, whichever is smaller

    // Define scales with extra space at the edges
    const xScale = d3
      .scaleBand()
      .domain(Object.keys(data))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxY * 1.1]) // Add extra space at the top of the y-axis
      .range([height - margin.bottom, margin.top]);

    // Define color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(categories)
      .range(d3.schemeCategory10);

    // Draw stacked bars
    svg.selectAll("*").remove(); // Clear existing elements
    svg.attr("width", width).attr("height", height);

    svg
      .selectAll("g")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("fill", (d) => colorScale(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.data.name))
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth());

    // Add legend
    const legendItems = legend
      .selectAll(".legend-item")
      .data(categories)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr(
        "transform",
        (d, i) => `translate(0, ${i * barHeight + legendPadding + 5})`
      ); // Add legend padding here

    legendItems
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d) => colorScale(d));

    legendItems
      .append("text")
      .attr("x", 15)
      .attr("y", 10) // Adjust vertical position to center the text within the legend item
      .text((d) => d);

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Add title with padding
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2 + titlePadding) // Position in the middle of top margin with padding
      .attr("text-anchor", "middle")
      .style("font-size", "1.5em") // Increased font size for title
      .text(title);
  }, [data, maxValues, title, Width, legendPadding]);

  return (
    <div style={{ textAlign: "center" }}>
      <svg ref={svgRef}></svg>
      <svg
        ref={legendRef}
        width={Width / 2}
        height={categories ? categories.length * 30 : 100} // Adjust legend height
      ></svg>
    </div>
  );
};

export default StackableBarChart;
