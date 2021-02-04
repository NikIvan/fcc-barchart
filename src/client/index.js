document.addEventListener('DOMContentLoaded', () => {
  app().catch(err => console.error(err));
});

const width = 507;
const height = 500;
const dataUrl = '/api/v1/data';

// 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

async function app() {
  let data;

  try {
    const response = await fetch(dataUrl);
    data = await response.json();
  } catch (e) {
    console.error(e);
  }

  console.log(data);
}
