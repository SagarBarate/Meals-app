console.log('favorite');


const favMeal = () => {
    let favorite = JSON.parse(localStorage.getItem('fav') || '[]');
    console.log(favorite);
    generateRandomMeals(favorite); 
  };
  favMeal();
  

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
  removeButton.addEventListener('click', () => {
    removeMealFromLocalStorage(meal);
    card.remove();
  });
  card.appendChild(removeButton);

    // Button for opening YouTube link
    const youtubeButton = document.createElement('button');
    youtubeButton.textContent = 'Open YouTube';
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