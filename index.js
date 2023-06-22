const search =document.getElementById('search');

const submit =document.getElementById('submit');
const random =document.getElementById('random');
const mealEl =document.getElementById('meals');
const favMeal= document.getElementById('favList');
let favorite= [];
const resultHeading= document.getElementsByClassName('result-heading');
const single_mealEl= document.getElementById('single-meal');


//search meals
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

// fetch meal by id
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
  