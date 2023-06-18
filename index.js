const search =document.getElementById('search');
const submit =document.getElementById('submit');
const random =document.getElementById('random');
const mealEl =document.getElementById('meals');

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

    //check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    ).then(res => res.json())                     //part of the code is a method chain in JavaScript using promises. It is used to handle the response received from the API after making the fetch request.
    .then(data => {
        resultHeading.innerHTML = `<h2> Search Result for ${term}`;
        if(data.meals == null){
            resultHeading.innerHTML=`<h2> There are no result for ${term}`;

        }
        else{
            mealEl.innerHTML = data.meals.map(
            meal=> `
            <div class= "meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
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
        console.log(data);
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
  