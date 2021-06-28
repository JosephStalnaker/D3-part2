import React, { useState, useEffect } from 'react';

import { csv, arc, pie } from 'd3';
const csvUrl = 'https://gist.githubusercontent.com/JosephStalnaker/539ae314a112da952df3e5b9af7eef48/raw/c0457df5300920603141bce472b4996a8b3d2a2a/cssNamedColors.csv'

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(width);

export const Visualization = () => {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      csv(csvUrl).then(setData);
    }, []);
  
    if (!data) {
      return <pre>Loading...</pre>;
    }
  
    const colorPie = pie().value(1);
  
    return (
      <svg width={width} height={height}>
        <g transform={`translate(${centerX},${centerY})`}>
          {colorPie(data).map(d => (
            <path fill={d.data['RGB hex value']} d={pieArc(d)} />
          ))}
        </g>
      </svg>
    );
  };