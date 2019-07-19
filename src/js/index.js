import { getBooks } from './models/search';
import { elements } from './models/base';
import {
  clearInputAll,
  getInputs,
  renderSpinner,
  clearSpinner
} from './views/searchView';
import * as resView from './views/resultsView';

let books;

// CONTROLLER
const controlSearch = async () => {
  // 1. get the queries
  const input = getInputs();
  // 2. prepare UI for the changes
  clearInputAll(); // clear the input fields
  resView.clearResults(); // clear the previous results
  resView.clearBtnAndInfo(); // clear the pagination buttons and page info text
  renderSpinner(); // render the loading spinner

  if (input.query) {
    try {
      // 3. search for the queries
      books = await getBooks(input.query, input.author, input.isbn, input.lang);
      // 4. render the result to the UI
      clearSpinner();
      resView.renderResults(books);
    } catch (err) {
      console.log(err);
      alert('Oops, something went wrong. Please try again later.');
    }
  }
};

elements.searchBtn.addEventListener('click', e => {
  e.preventDefault();
  controlSearch();
});

document.addEventListener('keypress', e => {
  if (event.keyCode === 13 || event.which === 13) {
    e.preventDefault();
    controlSearch();
  }
});

// PAGINATION CONTROLLER
elements.sectionPages.addEventListener('click', e => {
  const btnPrev = e.target.closest('.btn--prev');
  const btnNext = e.target.closest('.btn--next');
  if (btnPrev) {
    const goToPrevPage = parseInt(btnPrev.dataset.goto, 10);
    resView.clearResults();
    resView.clearBtnAndInfo();
    resView.renderResults(books, goToPrevPage);
  }
  if (btnNext) {
    const goToNextPage = parseInt(btnNext.dataset.goto, 10);
    resView.clearResults();
    resView.clearBtnAndInfo();
    resView.renderResults(books, goToNextPage);
  }
});
