import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  addBookmark,
  getSearchResultsPage,
  loadRecipe,
  loadSearchResults,
  removeBookmark,
  state,
  updateServings,
  uploadRecipe,
} from './models';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_TIME } from './config';

if (module.hot) {
  module.hot.accept();
}

// subscriber function
const controlRecipes = async () => {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    // renderSpinner
    recipeView.renderSpinner();
    // load recipe from model

    // update resultsView
    resultsView.update(getSearchResultsPage());
    // bookmarksView.update(state.bookmarks);
    await loadRecipe(id);

    // rendering the recipe to views
    recipeView.render(state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    // loadspinner in results query
    resultsView.renderSpinner();
    // get search string from search view
    const query = searchView.getQuery();
    if (!query) return;
    await loadSearchResults(query);
    // render results
    resultsView.render(getSearchResultsPage());
    // render pagination
    paginationView.render(state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = goToPage => {
  // render new results
  resultsView.render(getSearchResultsPage(goToPage));
  // render new pagination
  paginationView.render(state.search);
};

const controlServings = newServings => {
  // update the recipe servings in state
  updateServings(newServings);
  // update the view
  // recipeView.render(state.recipe);
  recipeView.update(state.recipe);
};

const controlAddBookmark = () => {
  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  else {
    removeBookmark(state.recipe.id);
  }
  recipeView.update(state.recipe);
  // render bookmarks
  bookmarksView.render(state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(state.bookmarks);
};

const controlAddRecipe = async newRecipe => {
  try {
    //
    addRecipeView.renderSpinner();
    await uploadRecipe(newRecipe);
    // render recipe
    recipeView.render(state.recipe);

    // render success
    addRecipeView.renderSuccess();

    // rerender bookmark view
    bookmarksView.render(state.bookmarks);
    // change id in url
    window.history.pushState(null, '', `#${state.recipe.id}`);

    // close form
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_TIME);
  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  }
  // upload recipe
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addhandlerRender(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// coding for about 4 years now, I have gained experience in relevant web development technologies and also gained versatility and the ability to pick up and solve complex problems as required, thus I believe I am a good fit for your company and would love to apply myself to the growth of your company.
