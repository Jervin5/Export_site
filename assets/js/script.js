'use strict';


/** Navbar toggle functionality */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector("[data-overlay]");
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");

  // Check if elements are present on the page
  if (overlay && navOpenBtn && navbar && navCloseBtn) {
    // Open the navbar on hamburger click
    navOpenBtn.addEventListener("click", () => {
      navbar.classList.add("active");
      overlay.classList.add("active");
    });

    // Close the navbar on close button or overlay click
    navCloseBtn.addEventListener("click", () => {
      navbar.classList.remove("active");
      overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
      navbar.classList.remove("active");
      overlay.classList.remove("active");
    });
  } else {
    console.warn("Navbar elements not found on this page");
  }
});


/** Product filter **/
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(".product-item");

  if (filterButtons.length && products.length) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        products.forEach(product => {
          if (filter === "all" || product.classList.contains(filter)) {
            product.style.display = "block";
          } else {
            product.style.display = "none";
          }
        });
      });
    });
  }
});

  const heroData = [
    {
      title: "Discover What's New <strong>This Season</strong>",
      text: "Fresh arrivals, exclusive deals, and handpicked favorites — everything you need to elevate your everyday. Shop the latest now!",
      button: "Explore Now",
      background: "./assets/images/banner.jpg",
      link: "#productList",
      showContent: true
    },
    {
      title: "Ship Your Products <strong>Across the Globe</strong>",
      text: "Seamlessly export goods to international markets. Reliable logistics, competitive rates, and global reach — take your business worldwide.",
      button: "Start Exporting",
      background: "./assets/images/export_11.jpg",
      link: "export.html",
      showContent: true
    },
    {
      title: "Amplify Your Brand <strong>with Smart Marketing</strong>",
      text: "Drive more traffic, increase conversions, and grow your audience with data-driven digital strategies tailored for success.",
      button: "Boost Now",
      background: "./assets/images/digital-marketing.jpg",
      link: "digital-marketing.html",
      showContent: true
    }
  ];

  let currentIndex = 0;

  const heroSection = document.getElementById("hero-section");
  const heroTitle = document.getElementById("hero-title");
  const heroText = document.getElementById("hero-text");
  const heroButtonSpan = document.getElementById("hero-button").querySelector("span");
  const heroButtonLink = document.getElementById("hero-button").querySelector("a");

  function updateHeroContent(index) {
    const content = heroData[index];
    if (!content.showContent) return;

    heroTitle.innerHTML = content.title;
    heroText.textContent = content.text;
    heroButtonSpan.textContent = content.button;
    heroSection.style.backgroundImage = `url('${content.background}')`;
    heroButtonLink.setAttribute("href", content.link);
  }

  setInterval(() => {
    currentIndex = (currentIndex + 1) % heroData.length;
    updateHeroContent(currentIndex);
  }, 5000); // Switch every 5 seconds

  // Initial load
  updateHeroContent(currentIndex);

///product page

function selectSize(btn) {
  document.querySelectorAll('.sizes button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectColor(btn) {
  document.querySelectorAll('.colors button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

window.onload = function () {
  const data = JSON.parse(localStorage.getItem('selectedProduct'));
  if (data) {
    document.querySelector('.product-image img').src = data.image;
    document.querySelector('.product-image img').alt = data.title;
    document.querySelector('.product-info h1').textContent = data.title;
    document.querySelector('.price').textContent = data.price;
    document.querySelector('.category').innerHTML = `<strong>Category:</strong> ${data.category}`;
    document.querySelector('.description').textContent = data.description;
  }
}

//index page product click 

function storeProduct(title, image, price, category) {
  const product = {
    title,
    image,
    price,
    category,
    description: 'Comfortable cotton nightwear for women. Soft fabric, perfect for daily use.'
  };
  localStorage.setItem('selectedProduct', JSON.stringify(product));
}


//pagination

const itemsPerPage = 4; // Number of items to display per page
let currentPage = 1; // Current page
let currentFilter = 'all'; // Default filter is 'all'
const filterButtons = document.querySelectorAll('.filter-btn'); // Filter buttons
const productList = document.querySelectorAll('.product-item'); // All product items
const paginationContainer = document.getElementById('pagination'); // Pagination container

// Function to show the filtered products for the current page
function showPage(page) {
  currentPage = page;
  const filteredItems = getFilteredItems(); // Get filtered items based on the selected filter
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage); // Calculate total pages
  
  // Show the filtered items for the current page
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  
  // Hide all items first
  productList.forEach(item => {
    item.style.display = 'none';
  });

  // Show only the items for the current page
  filteredItems.forEach((item, index) => {
    if (index >= start && index < end) {
      item.style.display = 'block';
    }
  });
  
  renderPagination(totalPages); // Render pagination buttons
}

// Function to get filtered products based on the selected filter
function getFilteredItems() {
  if (currentFilter === 'all') {
    return [...productList]; // Return all items when 'All' filter is selected
  }
  return [...productList].filter(item => item.classList.contains(currentFilter)); // Filter by category
}

// Function to render pagination buttons
function renderPagination(totalPages) {
  paginationContainer.innerHTML = ''; // Clear the current pagination

  // Create "Previous" button
  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Previous';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => showPage(currentPage - 1);
  paginationContainer.appendChild(prevBtn);

  // Create page number buttons
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);

  if (startPage > 1) {
    addPageButton(1); // Add "1" button
    if (startPage > 2) paginationContainer.appendChild(createDots());
  }

  for (let i = startPage; i <= endPage; i++) {
    addPageButton(i); // Add page buttons like "1", "2", "3"
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) paginationContainer.appendChild(createDots());
    addPageButton(totalPages); // Add the last page number
  }

  // Create "Next" button
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => showPage(currentPage + 1);
  paginationContainer.appendChild(nextBtn);
}

// Function to add page buttons
function addPageButton(page) {
  const btn = document.createElement('button');
  btn.textContent = page;
  btn.className = page === currentPage ? 'active' : '';
  btn.onclick = () => showPage(page);
  paginationContainer.appendChild(btn);
}

// Function to create dots between page numbers
function createDots() {
  const dots = document.createElement('span');
  dots.textContent = '...';
  return dots;
}

// Function to handle filter button clicks
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter; // Set the selected filter
    currentPage = 1; // Reset to the first page
    showPage(currentPage); // Show filtered items
    updateActiveFilter(button); // Update the active filter button style
  });
});

// Function to update active filter button style
function updateActiveFilter(activeButton) {
  filterButtons.forEach(button => {
    button.classList.remove('active');
  });
  activeButton.classList.add('active');
}

// Function to handle "All" button click (reset pagination and display)
function handleAllFilterClick() {
  currentFilter = 'all'; // Set the filter to 'all'
  currentPage = 1; // Reset the page to 1
  showPage(currentPage); // Display the first 4 items and update pagination
}

// Initialize the page with products and pagination
showPage(currentPage);

// Detect when the "All" button is clicked and reset pagination
const allFilterButton = document.querySelector('[data-filter="all"]');
allFilterButton.addEventListener('click', handleAllFilterClick);


//home slider

let currentSlide = 0;
  const slides = document.querySelectorAll(".carousel-slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 5000); // 5 seconds