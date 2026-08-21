const overlay = document.getElementById('sidebarOverlay');

function openNav() {
    document.getElementById('sidebar').style.transform = "translateX(0)";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";

    document.documentElement.style.overflowY = "hidden";
    document.body.style.userSelect = "none";
}

function closeNav() {
    document.getElementById('sidebar').style.transform = "translateX(100%)";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";

    document.documentElement.style.overflowY = "auto";
    document.body.style.userSelect = "auto";
}

overlay.addEventListener('click', () => {
    closeNav();
});

const sidebarLink = document.querySelectorAll('.sidebar-links a');

sidebarLink.forEach(link => {
    link.addEventListener('click', closeNav);
})

// Fetch JSON data

async function loadProductPage() {
  const titleEl = document.getElementById('main-title');
  if (!titleEl) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  try {
    const response = await fetch('data/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();

    const product = products.find(p => p.id === productId);

    if (!product) {
      titleEl.textContent = 'Product not found';
      return;
    }

    // Populate elements
    titleEl.textContent = product['main-title'];
    document.getElementById('description').textContent = product.description;
    document.getElementById('price').textContent = product.price;

    const imgEl = document.getElementById('product-image');
    if (imgEl) {
      imgEl.src = product['product-image'];
      imgEl.alt = product['main-title'];
    }
  } catch (error) {
    console.error('Error fetching JSON:', error);
    titleEl.textContent = 'Failed to load content';
  }
}

loadProductPage();