document.addEventListener('DOMContentLoaded', () => {
  const fetchButton = document.getElementById('fetchNews');
  const topicsSelect = document.getElementById('topics');
  const newsContainer = document.getElementById('newsContainer');

  fetchButton.addEventListener('click', fetchNews);

  async function fetchNews() {
    const selectedTopics = Array.from(topicsSelect.options)
      .filter(option => option.selected)
      .map(option => option.value);

    const apiKey = ''; // Replace with your GNews API key
    const apiUrl = `https://gnews.io/api/v4/search?lang=en&q=${selectedTopics.join('+')}&token=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      newsContainer.innerHTML = '';

      data.articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const articleLink = document.createElement('a');
        articleLink.href = article.url;
        articleLink.target = '_blank';
        articleLink.textContent = article.title;

        const source = document.createElement('p');
        source.textContent = `Source: ${article.source.name}`;

        articleDiv.appendChild(articleLink);
        articleDiv.appendChild(source);
        newsContainer.appendChild(articleDiv);
      });
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }
});
