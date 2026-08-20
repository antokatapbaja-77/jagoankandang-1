const productGrid = document.querySelector('#product-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
let products = [];

function renderProducts(filter = 'Semua') {
  const visibleProducts = filter === 'Semua'
    ? products
    : products.filter((product) => product.category === filter);

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.alt}" loading="lazy" />
        <span class="product-category">${product.category}</span>
      </div>
      <div class="product-details">
        <p>${product.capacity}</p>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <strong>${product.price}</strong>
          <a href="https://wa.me/6282230008555?text=Halo%20Jagoan%20Kandang%2C%20saya%20ingin%20bertanya%20tentang%20${encodeURIComponent(product.name)}" target="_blank" rel="noreferrer" aria-label="Tanyakan ${product.name}">↗</a>
        </div>
      </div>
    </article>
  `).join('');
}

fetch('data.json')
  .then((response) => {
    if (!response.ok) throw new Error('Katalog tidak tersedia');
    return response.json();
  })
  .then((data) => {
    products = data;
    renderProducts();
  })
  .catch(() => {
    productGrid.innerHTML = '<p class="loading">Katalog belum dapat dimuat. Silakan hubungi kami untuk pilihan kandang.</p>';
  });

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderProducts(button.dataset.filter);
  });
});

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
