// code using vanilla fetch
// code using ffetch
import ffetch from '../../scripts/ffetch.js';

// async function queryDemo() {
//   const offset = 0;
//   const limit = 20;
//   const api = new URL('/query-index.json?sheet=default');
//   api.searchParams.append('offset', JSON.stringify(offset));
//   api.searchParams.append('limit', JSON.stringify(limit));
//   const response = await fetch(api, {});
//   const result = await response.json();
//   const table = document.createElement('table');
//   result.data.forEach(async (post) => {
//     const tr = document.createElement('tr');
//     tr.innerHTML = `<td>${post.title}</td><td>${post.description}</td>`;
//     table.append(tr);
//   });
//   return table;
// }

async function queryDemo() {
  const limit = 20;
  const entries = ffetch('/query-index.json').sheet('default').limit(limit);
  const table = document.createElement('table');
  // eslint-disable-next-line no-restricted-syntax
  for await (const post of entries) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${post.title}</td><td>${post.description}</td>`; // post fields correspond to spreadsheet headers
    table.append(tr);
  }
  return table;
}

export default async function decorate(block) {
  const table = await queryDemo();
  [...block.children].forEach((row) => {
    const image = row.getElementsByTagName('img')[0];
    row.innerHTML = `<div><img src="${image.src}" alt="${image.alt}"><br/><p>$(row.innerText}</p></div>`;
  });
  block.append(table);
}
