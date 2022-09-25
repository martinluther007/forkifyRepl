import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { loadRecipe, loadSearchResults, state } from './models';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
if (module.hot) {
  module.hot.accept();
}
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// subscriber function
const controlRecipes = async () => {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    // renderSpinner
    recipeView.renderSpinner();
    // load recipe from model
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
    console.log(state.search.results);
    resultsView.render(state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// coding for about 4 years now, I have gained experience in relevant web development technologies and also gained versatility and the ability to pick up and solve complex problems as required, thus I believe I am a good fit for your company and would love to apply myself to the growth of your company.
