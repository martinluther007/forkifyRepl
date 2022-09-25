// import icons from 'url:../../img/icons.svg';
import View from './View';
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for that query';
  _successMessage = '';
  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(ingredient => this._generateMarkupForResults(ingredient))
      .join('');
  }

  _generateMarkupForResults(result) {
    return ` <li class="preview">
  <a class="preview__link" href="#${result.id}">
    <figure class="preview__fig">
      <img src="${result.image}" alt="${result.title}" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">${result.title}</h4>
      <p class="preview__publisher">${result.publisher}</p>
    </div>
  </a>
</li>`;
  }
}

export default new ResultView();
