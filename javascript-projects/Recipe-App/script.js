const meals = document.getElementById("meals");
const favMeals = document.getElementById("fav-meals");


getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const randomMeals = await resp.json();
    const randomMeal = randomMeals.meals[0];
    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;
}

async function getMealBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term)
}

function addMeal(randomMeal, random = false) {
    const meal = document.createElement("div");
    meal.innerHTML = 
    `<div class="meal">
        <div class="meal-header">
            <br><span class="random">Random Recipe</span>
            <img id="random-meal-img" src="${randomMeal.strMealThumb}" alt="${randomMeal.Meal}">
        </div>
        <div class="meal-body">
            <h4 id="random-meal-title">${randomMeal.strMeal}</h4>
            <button id="random-button">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    </div>`;
    meals.appendChild(meal);
    const btn = document.getElementById("random-button")
    btn.addEventListener("click",  (e)=> {
        if (e.target.classList.contains("active")) {
            removeMealLs(randomMeal.idMeal);
            e.target.classList.remove("active");
        } else {
            addMealLs(randomMeal.idMeal);
            e.target.classList.toggle("active");
        }
    });
};

function addMealLs(mealId) {
   const mealIds = getMealFromLs();
   localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
};

function removeMealLs(mealId) {
    const mealIds = getMealFromLs();
    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)))
};

function getMealFromLs() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
};

async function fetchFavMeals() {
    const mealIds = getMealFromLs();

    for (i=0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        let meal = await getMealById(mealId);
        addFavMeal(meal);
    }
}

function addFavMeal(randomMeal) {
    const meals = document.createElement("li");
    meals.innerHTML = 
    `<li><img src="${randomMeal.strMealThumb}" alt=""><figcaption>${randomMeal.strMeal}</figcaption></li>`
    favMeals.appendChild(meals);
};

localStorage.clear()