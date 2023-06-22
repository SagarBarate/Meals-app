const search =document.getElementById('search');

const submit =document.getElementById('submit');
const random =document.getElementById('random');
const mealEl =document.getElementById('meals');
const favMeal= document.getElementById('favList');
let favorite= [];
const resultHeading= document.getElementsByClassName('result-heading');
const single_mealEl= document.getElementById('single-meal');


//search Meals:
// The searchMeal function handles the search functionality when the user submits a search term.
// It retrieves the search term from the input field with the id search.
// It then performs a fetch request to the MealDB API using the search term.
// The received data is used to display the search results in the mealEl container.
// If no results are found, an appropriate message is displayed.
function searchMeal(e)
{
  e.preventDefault();
  
    //clear single meal 
    single_mealEl.innerHTML="";

    //get search Meal
    const term = search.value;
    
    const mealCardsContainer = document.getElementById('meal-display');
    mealCardsContainer.style.display = 'none';


    //check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    ).then(res => res.json()) //part of the code is a method chain in JavaScript using promises. It is used to handle the response received from the API after making the fetch request.
    .then(data => {
        resultHeading.innerHTML = `<h2> Search Result for ${term}`;
        if(data.meals == null){
            resultHeading.innerHTML=`<h2> There are no result for ${term}`;

        }
        else{
            mealEl.innerHTML = data.meals.map(

            meal=> `
            <div class= "meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" >
            <div class="meal-info" data-mealID="${meal.idMeal}">
            
            <h3> ${meal.strMeal}<h3>
            
            </div>
            </div>
            
            `
            )
            .join("");
            }

        });
    }
    else{
        alert("Please insert meal in the search box");
    }

}

// fetch meal by idFetch Meal by ID:
// The getMealById function fetches a meal by its ID from the MealDB API.
// It takes the meal ID as a parameter.
// After fetching the meal, it checks if the meal is already present in the favorite list stored in the browser's localStorage.
// If the meal is not already present, it adds the meal to the favorite list.

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      let fav = data.meals[0];
      let favorite = JSON.parse(localStorage.getItem('fav') || '[]');

      const index = fav.idMeal;

      const present = checkIdInMeals(favorite, index);

      if(present){
        alert('All ready present in the list');
      }
      else{
        favorite.push(fav);
        localStorage.setItem('fav', JSON.stringify(favorite));
      }
      
    })
    .catch(error => {
      console.log('Error fetching meal:', error);
    });

}

function checkIdInMeals(meals, idMeal) {
  for (let meal of meals) {
    if (meal.idMeal === idMeal) {
      return true;
    }
  }
  return false;
}





  



// showing random images of the food
// window.addEventListener("load", (event) => {
//   // console.log("page is fully loaded");
//   fetch(`https:www.themealdb.com/api/json/v1/1/categories.php`)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//       if(data.meals == null){
//         resultHeading.innerHTML=`<h2> There are no result for`;

//       }
//       else{
//         mealEl.innerHTML = data.meals.map(
//         meal=> `
//         <div class= "meal">
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//         <div class="meal-info" data-mealID="${meal.idMeal}">
//         <h3> ${meal.strMeal}<h3>
//         </div>
//         </div>
//         `
//         )
//         .join("");
//         }
      

//     })

//     .catch((error) =>{
//       console.log('error',error)
//     })


// });


window.addEventListener('load', () => {
  generateRandomMeals();
});

// Random Meals:
// The getRandomMeals function fetches a specified number of random meals from the MealDB API.
// It takes the number of meals as a parameter.
// After fetching the meals, it calls the displayMeals function to display the fetched meals in the mealsContainer.

function getRandomMeals(numberOfMeals) {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meals = data.meals.slice(0, numberOfMeals);
      displayMeals(meals);
    })
    .catch(error => {
      console.log('Error fetching random meals:', error);
    });
}

// Display Meals:
// The displayMeals function takes an array of meals as a parameter.
// It clears the mealsContainer and then iterates through the meals.
// For each meal, it creates a new div element with the meal's information (name, image, instructions) and appends it to the mealsContainer.

function displayMeals(meals) {
  const mealsContainer = document.getElementById('meals');
  mealsContainer.innerHTML = '';

  meals.forEach(meal => {
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal');
    mealElement.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p>${meal.strInstructions}</p>
    `;
    mealsContainer.appendChild(mealElement);
  });
}


  // event listener for form submission
  submit.addEventListener('submit', searchMeal);
  
  // event listener for mealEl
  mealEl.addEventListener("click", (e) => {
    const mealInfo = e.target.closest(".meal-info");
    if (mealInfo) {
      const mealID = mealInfo.getAttribute("data-mealid");
      getMealById(mealID);
    }
  });
  
// Generate Random Meals on Page Load:
// The code sets up a load event listener to generate random meals when the page is loaded.
// The generateRandomMeals function is called, which fetches random meals and creates meal cards using the createMealCard function.
// The number of meals to generate can be adjusted by changing the numberOfMeals variable.

  function generateRandomMeals() {
    const mealCardsContainer = document.getElementById('meal-cards');
    mealCardsContainer.innerHTML = ''; // Clear existing cards
  
    const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const numberOfMeals = 6; // Change this value to generate more or fewer meal cards
  
    for (let i = 0; i < numberOfMeals; i++) {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          const meal = data.meals[0];
          const mealCard = createMealCard(meal);
          mealCardsContainer.appendChild(mealCard);
        })
        .catch(error => console.log(error));

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
  
    return card;
  }
  