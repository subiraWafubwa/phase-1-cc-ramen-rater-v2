// index.js

// Base URL for the API
const BASE_URL = 'http://localhost:3000';

// Callbacks
const handleClick = (ramen) => {
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  // Update the details section with the ramen information
  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

const addSubmitListener = (form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Create a new ramen object from the form data
    const newRamen = {
      name: event.target.querySelector('#new-name').value,
      restaurant: event.target.querySelector('#new-restaurant').value,
      image: event.target.querySelector('#new-image').value,
      rating: event.target.querySelector('#new-rating').value,
      comment: event.target.querySelector('#new-comment').value,
    };

    // Add the new ramen to the #ramen-menu
    const ramenMenuDiv = document.getElementById('ramen-menu');
    const newImg = document.createElement('img');
    newImg.src = newRamen.image;
    newImg.alt = newRamen.name;
    newImg.addEventListener('click', () => handleClick(newRamen));
    ramenMenuDiv.appendChild(newImg);

    // Reset the form
    form.reset();
  });
};

const displayRamens = async () => {
  const ramenMenuDiv = document.getElementById('ramen-menu');

  try {
    const response = await fetch(`${BASE_URL}/ramens`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const ramens = await response.json();
    
    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenuDiv.appendChild(img);
    });
  } catch (error) {
    console.error('Error fetching ramens:', error);
  }
};

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    const ramenForm = document.getElementById('new-ramen');
    if (ramenForm) {
      addSubmitListener(ramenForm);
    }
  });
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
