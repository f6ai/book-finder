import { elements } from '../models/base';

const limitTextLenght = (text, limit) => {
    const newText = [];
    if (text.length > limit) {
        text.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newText.push(cur);
            }
            return acc + cur.length;
        }, 0);
        // return the result
        return `${newText.join(' ')} ...`;
    }
    return text;
}

const limitAuthors = (arr) => {
    if (arr.length <= 2) {
        return arr;
    } else {
        return arr[0];
    }
};

const renderBook = obj => {
    const book = obj.volumeInfo;
    const keys = Object.keys(book);
    const dataKeys = Object.keys(obj);
    const markup = 
    `<div class="section-results__item">
        <div class="result__img"><img id="result__img" src="${keys.includes('imageLinks') ? book.imageLinks.thumbnail : '../../img/no-img.png'}" alt="Cover picture of ${book.title}"></div>
        <div class="result__text">
            <h2 class="result__text--title">${limitTextLenght(book.title, 35)}</h2>
            <h3 class="result__text--author">${keys.includes('authors') ? limitAuthors(book.authors) : ' '}</h3>
            <p class="result__text--description">${dataKeys.includes('searchInfo') ? limitTextLenght(obj.searchInfo.textSnippet, 200) : limitTextLenght(book.description, 200)}</p>
            <p class="result__text--review"><span>Reviewed: </span>${isNaN(book.averageRating) ? 'N/A' : book.averageRating}</p>
            
            <div class="result__btn">
                <a href="${book.canonicalVolumeLink}" class="result__btn--details btn btn--details" target="_blank">More &rarr;</a>
            </div>
        </div>
    </div>`

    elements.sectionResult.insertAdjacentHTML('beforeend', markup);
};

export const clearResults = () => {
    elements.sectionResult.innerHTML = '';
};

export const clearBtnAndInfo = () => {
    elements.sectionPages.innerHTML = '';
};

const renderButtonsAndInfo = (page, numResults, resPerPage) => {
    const totalPages = Math.ceil(numResults / resPerPage);
    const markup = `
        <div class="pages" id="pages">
            <a href="#" class="btn btn--prev" id="prev" data-goto=${page - 1}>&larr; Previous </a>
            <a href="#" class="btn btn--next" id="next" data-goto=${page + 1}>Next &rarr;</a>
        </div>
        <div class="pages--text" id="pages--text"><p>${page} / ${totalPages} pages</p></div>
        `;
    elements.sectionPages.insertAdjacentHTML('afterbegin', markup);
};

export const renderResults = (books, page = 1, resPerPage = 6) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    books.slice(start, end).forEach(renderBook);
    // render pagination buttons
    renderButtonsAndInfo(page, books.length, resPerPage);
};