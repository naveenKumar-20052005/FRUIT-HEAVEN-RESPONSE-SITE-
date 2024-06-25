
let slideIndex = 0;

function moveSlide(n) {
  const slides = document.getElementsByClassName("slide");
  slideIndex += n;
  if (slideIndex >= slides.length) { slideIndex = 0; }
  if (slideIndex < 0) { slideIndex = slides.length - 1; }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}
moveSlide(0); // Show first slide by default



document.getElementById('menu-toggle').addEventListener('click', function() {
  var navMenu = document.getElementById('nav-menu');
  navMenu.classList.toggle('active');
});

// ====================================



// script.js
const products = [
  { name: 'Pineapple', description: 'A sweet yellow fruit', id: 'pineapple', price: 15.00},
  { name: 'Watermelon', description: 'A green fruit', id: 'watermelon' , price: 9.00 },
  { name: 'Orange', description: 'A small orange fruit', id: 'orange', price: 29.00 },
  { name: 'Apple', description: 'A small red fruit', id: 'apple', price: 39.00 },
  { name: 'Strawberry', description: 'A small red fruit', id: 'strawberry', price: 49.00 },
  { name: 'Green Graps', description: 'A small Green fruit', id: 'grap' , price: 12.00, Image:'./images/fruits/1718006782123.jpg'},
  { name: 'Grapes', description: 'A small Gray fruit', id: 'grapes', price: 14.00 },
  { name: 'Banana', description: 'A small Yellow fruit', id: 'banana', price: 20.00 },
];

let cart = [];

function toggleSearchBar() {
  const searchBar = document.getElementById('search-bar');
  const suggestionsList = document.getElementById('suggestions-list');
  searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
  if (searchBar.style.display === 'block') searchBar.focus();
  else suggestionsList.style.display = 'none';
}

function showSuggestions() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const suggestionsList = document.getElementById('suggestions-list');
  suggestionsList.innerHTML = products.filter(p => p.name.toLowerCase().includes(query))
      .map(p => `<li onclick="scrollToProduct('${p.id}')">${p.name}</li>`).join('');
  suggestionsList.style.display = query ? 'block' : 'none';
}

function handleSearch(event) {
  if (event.key === 'Enter') {
      const product = products.find(p => p.name.toLowerCase() === event.target.value.toLowerCase());
      if (product) scrollToProduct(product.id);
  }
}

function scrollToProduct(productId) {
  const productElement = document.getElementById(productId);
  if (productElement) {
      productElement.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('search-bar').value = '';
      document.getElementById('suggestions-list').style.display = 'none';
  }
}

function addToCart(productName) {
  const product = products.find(p => p.name === productName);
  if (product) {
      cart.push(product);
      updateCart();
      localStorage.setItem('cart', JSON.stringify(cart)); // Store cart data in local storage
  }
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}



window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function addToCart(productName, price) {
  // Assuming you want to display the product name and price in the popup
  var popupMessage = document.createElement('div');
  popupMessage.classList.add('popup-message');
  popupMessage.textContent = `Added ${productName} to cart for $${price.toFixed(2)}`;

  // Append the popup to the body
  document.body.appendChild(popupMessage);

  // Display the popup
  popupMessage.style.display = 'block';

  // Hide the popup after 3 seconds (adjust as needed)
  setTimeout(function() {
    popupMessage.style.display = 'none';
    // Clean up the popup after hiding (optional)
    document.body.removeChild(popupMessage);
  }, 3000); // 3000 milliseconds = 3 seconds

  // Add the product to the cart array (assuming a global or accessible 'cart' variable)
  addToCartArray(productName, price);

  // Store updated cart data in localStorage
  updateLocalStorageCart();
}

function addToCartArray(productName, price) {
  // Implement your logic to add the product to the cart array here
  const product = { name: productName, price: price };
  cart.push(product); // Assuming 'cart' is a global variable or accessible
  updateCart(); // Update the cart display or count
}

function updateLocalStorageCart() {
  // Store cart data in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart data from localStorage on page load (optional)
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart(); // Update cart display after loading from localStorage
  }
}

// Call loadCartFromLocalStorage on page load to load existing cart data
document.addEventListener('DOMContentLoaded', function() {
  loadCartFromLocalStorage();
});





function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function openForm(formId) {
  document.getElementById(formId).style.display = 'block';
}

function closeForm(formId) {
  document.getElementById(formId).style.display = 'none';
  clearErrors(formId);
}

function clearErrors(formId) {
  const form = document.getElementById(formId);
  const errors = form.querySelectorAll('.error');
  errors.forEach(error => {
      error.style.display = 'none';
  });
}

function validateLogin() {
  let valid = true;
  clearErrors('loginForm');
  
  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');
  
  if (!validateEmail(email.value)) {
      showError('loginEmailError', 'Please enter a valid email');
      valid = false;
  }

  if (password.value.length < 6) {
      showError('loginPasswordError', 'Password must be at least 6 characters long');
      valid = false;
  }

  if (valid) {
      showPopup('Login Successful');
      closeForm('loginForm');
  }

  return valid;
}

function validateCreate() {
  let valid = true;
  clearErrors('createForm');
  
  const email = document.getElementById('createEmail');
  const password = document.getElementById('createPassword');
  const confirmPassword = document.getElementById('confirmPassword');
  
  if (!validateEmail(email.value)) {
      showError('createEmailError', 'Please enter a valid email');
      valid = false;
  }

  if (password.value.length < 6) {
      showError('createPasswordError', 'Password must be at least 6 characters long');
      valid = false;
  }

  if (password.value !== confirmPassword.value) {
      showError('confirmPasswordError', 'Passwords do not match');
      valid = false;
  }

  if (valid) {
      showPopup('Account Created');
      closeForm('createForm');
  }

  return valid;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function showPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => {
      popup.remove();
  }, 3000);
}





