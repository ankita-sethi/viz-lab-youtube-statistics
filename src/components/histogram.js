import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box } from '@mui/material';

const Histogram = ({ data, width, height, isSideways, xAxisName, yAxisName }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 50, left: 80 };
        const effectiveWidth = width - margin.left - margin.right;
        const effectiveHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleLinear()
            .domain(d3.extent(data.map(d => parseFloat(d))))
            .range(isSideways ? [0, effectiveHeight] : [0, effectiveWidth]);

        const bins = d3.bin()
            .domain(xScale.domain())
            .value(d => d)(data);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(bins, bin => bin.length)])
            .range(isSideways ? [0, effectiveWidth] : [effectiveHeight, 0]);

        const chart = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xAxis = chart.append("g")
            .attr("transform", isSideways ? `translate(0,${0})` : `translate(0,${effectiveHeight})`)
            .call(isSideways ? d3.axisLeft(xScale) : d3.axisBottom(xScale));

        const yAxis = chart.append("g")
            .call(isSideways ? d3.axisTop(yScale) : d3.axisLeft(yScale));

        // Append X axis name
        xAxis.append("text")
            .attr("fill", "white")
            .attr("x", isSideways ? effectiveHeight /2 : effectiveWidth / 2)
            .attr("y", isSideways ? -12 : margin.bottom - 15)
            .attr("text-anchor", "middle")
            .text(xAxisName);

        // Append Y axis name
        yAxis.append("text")
            .attr("fill", "white")
            .attr("transform", isSideways ? "rotate(-90)" : "rotate(-90)")
            .attr("y", isSideways ? -50 : -45)
            .attr("x", isSideways ? -effectiveWidth / 3 : -250)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text(yAxisName);

        if (isSideways) {
            chart.selectAll("rect")
                .data(bins)
                .join("rect")
                .attr("x", 0)
                .attr("y", d => xScale(d.x0))
                .attr("width", d => yScale(d.length))
                .attr("height", d => xScale(d.x1) - xScale(d.x0) - 1)
                .style("fill", "red");
        } else {
            chart.selectAll("rect")
                .data(bins)
                .join("rect")
                .attr("x", d => xScale(d.x0))
                .attr("y", d => yScale(d.length))
                .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
                .attr("height", d => effectiveHeight - yScale(d.length))
                .style("fill", "red");
        }

    }, [data, width, height, isSideways, xAxisName, yAxisName]);

    return (
        <Box sx={{ width, height }}>
            <svg ref={svgRef} width={width} height={height} color={'white'}></svg>
        </Box>
    );
};

export default Histogram;