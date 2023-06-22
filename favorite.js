console.log('favorite');

// The favMeal function is defined as an arrow function.
// It retrieves the favorite meals from the local storage by parsing the 'fav' key.
// If there are no favorite meals, an empty array is used as a fallback.
// The retrieved favorite meals are logged to the console.
// The generateRandomMeals function is called with the favorite meals as an argument.
const favMeal = () => {
    let favorite = JSON.parse(localStorage.getItem('fav') || '[]');
    console.log(favorite);
    generateRandomMeals(favorite); 
  };
  favMeal();
  


  // The generateRandomMeals function is defined with the favorite parameter representing an array of favorite meals.
  // The mealCardsContainer element is obtained by its ID ('meal-cards').
  // The inner HTML of mealCardsContainer is cleared to remove any existing meal cards.
  // A loop is used to iterate over each favorite meal.
  // Inside the loop, a meal card is created for each favorite meal using the createMealCard function.
  // The created meal card is appended to the mealCardsContainer.


  function generateRandomMeals(favorite) {
    const mealCardsContainer = document.getElementById('meal-cards');
    mealCardsContainer.innerHTML = ''; // Clear existing cards
  
    for (let i = 0; i < favorite.length; i++) {
        const meal = favorite[i];
        const mealCard = createMealCard(meal);
        mealCardsContainer.appendChild(mealCard);
        // console.log(i, meal);
    }
  }

// The createMealCard function is defined with the meal parameter representing a single meal object.
// A <div> element is created and assigned to the card variable.
// The CSS class "meal-card" is added to the card element.
// Further code is expected in the commented section, where image, title, category, instructions, removeButton, and youtubeButton elements are created and appended to the card element.
// Finally, the card element is returned.
  
  function createMealCard(meal) {
    const card = document.createElement('div');
    card.classList.add('meal-card');
  
    const image = document.createElement('img');
    image.src = meal.strMealThumb || '';
    image.alt = meal.strMeal || '';
    card.appendChild(image);
  
    const title = document.createElement('h3');
    title.textContent = meal.strMeal;
    card.appendChild(title);
  
    const category = document.createElement('p');
    category.textContent = `Category: ${meal.strCategory}`;
    card.appendChild(category);
  
    const instructions = document.createElement('p');
    instructions.textContent = meal.strInstructions;
    card.appendChild(instructions);
  
    
  // Button for removing the card
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-button');

  removeButton.addEventListener('click', () => {
    removeMealFromLocalStorage(meal);
    card.remove();
  });
  card.appendChild(removeButton);

    // Button for opening YouTube linkThe openYouTubeLink function is defined with the youtubeLink parameter representing a YouTube link.
   // When called, this function opens the provided YouTube link in a new browser tab or window.

    const youtubeButton = document.createElement('button');
    youtubeButton.classList.add('youtubeButton');
    youtubeButton.textContent = 'Youtube';
    youtubeButton.addEventListener('click', () => {
        console.log(meal.strYoutube);
          openYouTubeLink(meal.strYoutube);
    });
    card.appendChild(youtubeButton);

    return card;
  }


  function openYouTubeLink(youtubeLink) {
    window.open(youtubeLink, '_blank');
  }
  
// Function to remove the meal from local storage
function removeMealFromLocalStorage(meal) {
    const favoriteMeals = JSON.parse(localStorage.getItem('fav') || '[]');
    const index = favoriteMeals.findIndex((item) => item.idMeal === meal.idMeal);
    if (index !== -1) {
      favoriteMeals.splice(index, 1);
      localStorage.setItem('fav', JSON.stringify(favoriteMeals));
    }
  }


// Function to clear all the available items from the list
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', removeMealFromLocalStorage);

function removeMealFromLocalStorage() {
    const favoriteMeals = [];
    localStorage.setItem('fav', JSON.stringify(favoriteMeals));
    
    const mealCards = document.querySelectorAll('.meal-card');
    mealCards.forEach((card) => card.remove());
}