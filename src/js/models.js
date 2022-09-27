import { API_URL, RES_PER_PAGE, API_KEY } from './config';
// import { getJson, sendJson } from './helpers';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
};

const creatRecipeObject = data => {
  const { recipe } = data.data;
  //   update state with data in our model
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    // conditionally add properties to objects
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    // loading the recipe to update state
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    // create a new object based
    state.recipe = creatRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async query => {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    const { recipes } = data.data;
    state.search.results = recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
      ...(recipe.key && { key: recipe.key }),
    }));
    state.search.currentPage = 1;
  } catch (error) {
    throw error;
  }
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const getSearchResultsPage = (page = state.search.currentPage) => {
  state.search.currentPage = page;
  let start = (page - 1) * state.search.resultsPerPage;
  let end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
    // new Qty = oldQty * new servings/ old servings
  });
  state.recipe.servings = newServings;
};

export const addBookmark = recipe => {
  // Add bookmark
  state.bookmarks.push(recipe);
  // mark recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const removeBookmark = id => {
  // find index
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  // remove the bookmark
  state.bookmarks.splice(index, 1);
  // remove recipe as bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = () => {
  const bookmarkStorage = localStorage.getItem('bookmarks');
  if (bookmarkStorage) state.bookmarks = JSON.parse(bookmarkStorage);
};

init();

const clearBookmarks = () => {
  localStorage.clear('bookmarks');
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingredient => {
        const ingArray = ingredient[1].split(',').map(el => el.trim());
        if (ingArray.length !== 3)
          throw new Error('Please use the correct format');
        const [quantity, unit, description] = ingArray;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = creatRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

// clearBookmarks()
