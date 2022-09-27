import icons from 'url:../../img/icons.svg';
import View from './View';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = btn.dataset.goto * 1;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.currentPage;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //    page 1 and they're other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateRightPaginationButton(currentPage);
    }
    //    last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateLeftPaginationButton(currentPage);
    }
    //    other page
    if (currentPage < numPages) {
      return `${
        this._generateLeftPaginationButton(currentPage) +
        this._generateRightPaginationButton(currentPage)
      }`;
    }

    //    page 1 and no other pages
    return '';
  }
  _generateLeftPaginationButton(currentPage) {
    return `<button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
  }
  _generateRightPaginationButton(currentPage) {
    return `<button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }
}

export default new PaginationView();
