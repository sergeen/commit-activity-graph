import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const CommitActivityChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 1000;
    const cellSize = 17;
    const height = cellSize * 10 + 40;
    const legendWidth = 200;
    const legendHeight = cellSize;
    const legendPosY = height - 40;
    const legendPosX = width - legendWidth;

    const formatValue = d3.format(',d');
    const formatDate = d3.utcFormat('%x');
    const formatDay = i => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i];
    const formatMonth = d3.utcFormat('%b');

    const timeWeek = d3.utcSunday;
    const countDay = i => i;

    const chartData = data.flatMap(d =>
      d.days.map((value, i) => ({
        date: new Date(d.week * 1000).setUTCDate(new Date(d.week * 1000).getUTCDate() + i),
        value: value,
      }))
    );

    let maxCommitValue = 0;
    const color = (value) => {
      const ratio = value / maxCommitValue;
      if (ratio >= 0.75) return '#166032';
      if (ratio >= 0.50) return '#18994D';
      if (ratio >= 0.25) return '#79C87D';
      if (ratio > 0) return '#C7E398';
      if (ratio === 0) return '#EAEDF0';
    };

    chartData.forEach(d => maxCommitValue = Math.max(maxCommitValue, d.value));

    const years = [chartData];

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');

    const year = svg.selectAll('g')
      .data(years)
      .join('g')
      .attr('transform', `translate(40.5, ${cellSize * 1.5})`);

    year.append('g')
      .attr('text-anchor', 'end')
      .selectAll('text')
      .data([1, 3, 5])
      .join('text')
      .attr('x', -5)
      .attr('y', i => (countDay(i) + 0.5) * cellSize)
      .attr('dy', '0.31em')
      .text(formatDay);

    year.append('g')
      .selectAll('rect')
      .data(values => values)
      .join('rect')
      .attr('width', cellSize - 1)
      .attr('height', cellSize - 1)
      .attr('x', d => timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 0.5)
      .attr('y', d => countDay(new Date(d.date).getUTCDay()) * cellSize + 0.5)
      .attr('fill', d => color(d.value))
      .append('title')
      .text(d => `${formatDate(new Date(d.date))}\nValue: ${formatValue(d.value)}`);

    const month = year.append('g')
      .selectAll('g')
      .data(values => d3.utcMonths(d3.utcMonth(values[0].date), values.at(-1).date))
      .join('g');

    month.filter((d, i) => i)
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', 3);

    month.append('text')
      .attr('x', d => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2)
      .attr('y', -5)
      .text(formatMonth);

    const legendData = [
      { label: 'Less', value: 0 },
      { label: '', value: 0.25 },
      { label: '', value: 0.50 },
      { label: '', value: 0.75 },
      { label: 'More', value: 1 }
    ];

    const legend = svg.append('g')
      .attr('transform', `translate(${legendPosX}, ${legendPosY})`);

    legend.selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * legendHeight + 10)
      .attr('y', 0)
      .attr('width', legendHeight - 1)
      .attr('height', legendHeight - 1)
      .attr('fill', d => color(d.value * maxCommitValue));

    legend.selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * legendHeight + (legendHeight))
      .attr('y', legendHeight + 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .text(d => d.label);

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default CommitActivityChart;
