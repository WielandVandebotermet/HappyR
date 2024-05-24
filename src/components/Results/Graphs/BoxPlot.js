import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BoxPlot = ({ data, maxValues, title, Height, Width, legendPadding }) => {
  const svgRef = useRef();
  const initialCategory = Object.keys(maxValues)[0];

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const titlePadding = 20; // Padding for the title

  useEffect(() => {
    const svg = d3.select(svgRef.current);
  
    // Remove previous y-axis
    svg.selectAll(".y-axis").remove();
    svg.selectAll(".x-axis").remove();

    // Remove previous box plot elements
    svg.selectAll(".box-plot").remove();
  
    // Filter data based on selected category
    const filteredData = Object.keys(data).map((name) => data[name][selectedCategory]);
 
    const filteredMax = maxValues[selectedCategory];

    // Calculate quartiles, median, min, and max
    const q1 = d3.quantile(filteredData.sort(d3.ascending), 0.25);
    const median = d3.quantile(filteredData.sort(d3.ascending), 0.5);
    const q3 = d3.quantile(filteredData.sort(d3.ascending), 0.75);
    const interQuantileRange = q3 - q1;
    const min = Math.max(d3.min(filteredData), q1 - 1.5 * interQuantileRange);
    const max = Math.min(d3.max(filteredData), q3 + 1.5 * interQuantileRange);

    // Define chart dimensions
    const width = Math.min(Width, 800); // Limit width to 800 for smaller screens
    const height = Math.min(Height, window.innerHeight * 0.6); // Adjust height based on available screen height
    const margin = { top: 40, right: 30, bottom: 60, left: 70 }; // Adjust margins for smaller screens

    // Define scales with extra space at the edges
    const xScale = d3.scaleLinear()
      .domain([0, filteredMax * 1.1]) // Add extra space at the top of the x-axis
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
      .domain([selectedCategory])
      .range([height - margin.bottom, margin.top])
      .padding(0.1);
  
    // Draw box plot
    svg.append("line")
      .attr("class", "box-plot")
      .attr("y1", yScale(selectedCategory))
      .attr("y2", yScale(selectedCategory))
      .attr("x1", xScale(min))
      .attr("x2", xScale(q1))
      .attr("stroke", "black");
  
    svg.append("rect")
      .attr("class", "box-plot")
      .attr("x", xScale(q1))
      .attr("y", yScale(selectedCategory) - 20)
      .attr("width", xScale(q3) - xScale(q1))
      .attr("height", 40)
      .attr("fill", "white")
      .attr("stroke", "black");
  
    svg.append("line")
      .attr("class", "box-plot")
      .attr("y1", yScale(selectedCategory) - 20)
      .attr("y2", yScale(selectedCategory) + 20)
      .attr("x1", xScale(median))
      .attr("x2", xScale(median))
      .attr("stroke", "black");
  
    svg.append("line")
      .attr("class", "box-plot")
      .attr("y1", yScale(selectedCategory) - 20)
      .attr("y2", yScale(selectedCategory) + 20)
      .attr("x1", xScale(max))
      .attr("x2", xScale(max))
      .attr("stroke", "black");
  
    svg.append("line")
      .attr("class", "box-plot")
      .attr("y1", yScale(selectedCategory) - 10)
      .attr("y2", yScale(selectedCategory) + 10)
      .attr("x1", xScale(min))
      .attr("x2", xScale(min))
      .attr("stroke", "black");
  
     // Add y-axis
    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Add x-axis
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

  
  }, [data, selectedCategory, Width, Height, title]);
  
  return (
    <div style={{ textAlign: "center" }}>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {Object.keys(maxValues).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <svg ref={svgRef} width={Width} height={Height}></svg>
    </div>
  );
};

export default BoxPlot;
