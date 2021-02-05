import * as d3 from 'd3';

document.addEventListener('DOMContentLoaded', () => {
  app().catch(err => console.error(err));
});

const width = 507;
const height = 500;
const dataUrl = '/api/v1/data';
const color = 'steelblue';

async function app() {
  let data;

  try {
    const response = await fetch(dataUrl);
    data = await response.json();
  } catch (e) {
    console.error(e);
  }

  console.log(data);

  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + 100)
    .attr('height', height + 60);

  d3.select('.container')
    .selectAll('div')
    .data(data.data)
    .enter()
    .append('div')
    .style('background-color', color)
    .style('height', d => `${d[1]}px`)
    .style('width', '5px')
    .style('display', 'inline-block')
    .style('margin-left', (d, i) => i * 4)
  ;
    // .attr('x', 0)
    // .attr('y', (([date, value], i) => i * 5))
    // .attr('width', 5)
    // .attr('height', ([date, value]) => value);
}
