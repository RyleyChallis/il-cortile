async function loadArticlePage() {
  const titleEl = document.getElementById('main-title');
  if (!titleEl) return;

  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('id');

  try {
    const response = await fetch('data/article.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const articles = await response.json();

    const article = articles.find(a => a.id === articleId);

    if (!article) {
      titleEl.textContent = 'Article not found';
      return;
    }

    titleEl.textContent = article.mainTitle;

    const setContent = (id, value) => {
      const el = document.getElementById(id);
      if (el && value) el.textContent = value;
    };

    setContent('main-caption', article.mainCaption);
    setContent('text-one', article.textOne);
    setContent('text-two', article.textTwo);
    setContent('text-three', article.textThree);
    setContent('text-four', article.textFour);
    setContent('final-text', article.finalText);

    const heroImg = document.getElementById('hero-image');
    if (heroImg) {
      heroImg.src = article.heroImage;
      heroImg.alt = article.mainTitle;
    }

    const imgOne = document.getElementById('image-one');
    if (imgOne && article.imageOne) imgOne.src = article.imageOne;

    const imgTwo = document.getElementById('image-two');
    if (imgTwo && article.imageTwo) imgTwo.src = article.imageTwo;

  } catch (error) {
    console.error('Error fetching JSON:', error);
    titleEl.textContent = 'Failed to load content';
  }
}

loadArticlePage();