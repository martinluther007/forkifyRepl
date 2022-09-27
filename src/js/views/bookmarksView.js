import previewView from './previewView';
import View from './View';
class ResultView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMessage = '';

  addhandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join('');
  }
}

export default new ResultView();
