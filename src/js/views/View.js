import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    // creating a virtual dom
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    // update changed text
    newElements.forEach((newEl, i) => {
      const currentElement = currentElements[i];
      if (
        !newEl.isEqualNode(currentElement) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newEl.textContent;
      }
      // update changed attributes+
      if (!newEl.isEqualNode(currentElement))
        Array.from(newEl.attributes).forEach(attr =>
          currentElement.setAttribute(attr.name, attr.value)
        );
    });
  }
  renderSpinner() {
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }
  renderSuccess(message = this.s) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }
}
