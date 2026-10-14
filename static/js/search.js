(() => {
  const form = document.getElementById('search-form');
  const indexURL = new URL('../index.json', document.currentScript.src);
  let search;

  const ready = fetch(indexURL)
    .then(response => response.json())
    .then(pages => {
      search = new Fuse(pages, {
        keys: ['title', 'content'],
        shouldSort: true,
        minMatchCharLength: 2,
        threshold: 0,
        ignoreLocation: true,
      });
    });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    await ready;
    const query = String(new FormData(form).get('q') || '').trim();
    displayResults(query, query ? search.search(query) : []);
  });
})();

function displayResults(query, results) {
  const container = document.getElementById('search-result');
  container.style.display = 'block';
  container.nextElementSibling.style.display = 'none';
  container.replaceChildren();

  const count = document.createElement('div');
  count.className = 'border-gray-light py-3 mt-6';
  count.textContent = `${results.length} results for "${query}"`;
  container.appendChild(count);

  const list = document.createElement('ul');
  for (const { item } of results) {
    const row = document.createElement('li');
    row.className = 'col-12 d-flex width-full py-4 border-top color-border-secondary public source';
    const content = document.createElement('div');
    content.className = 'col-12';
    const title = document.createElement('h3');
    title.className = 'wb-break-all mb-2';
    const link = document.createElement('a');
    link.href = item.relpermalink;
    link.textContent = item.title;
    title.appendChild(link);
    const description = document.createElement('div');
    description.className = 'post-description text-gray';
    description.textContent = item.summary || '';
    content.append(title, description);
    row.appendChild(content);
    list.appendChild(row);
  }
  container.appendChild(list);
}
