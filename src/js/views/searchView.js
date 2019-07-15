import { elements } from '../models/base';

const getLanguageInput = () => {
    const selItem = elements.selectLang;
    const value = selItem.options[selItem.selectedIndex].value;
    return value;
};

export const getInputs = () => ({
    query: elements.searchQuery.value,
    author: elements.searchAuthor.value,
    isbn: elements.searchISBN.value,
    lang: getLanguageInput()
});

export const clearInputAll = () => {
    elements.searchQuery.value = '';
    elements.searchAuthor.value = '';
    elements.searchISBN.value = '';
};

export const renderSpinner = () => {
    const markup = `
        <div class="spinner"></div>
    `;
    elements.sectionResult.insertAdjacentHTML('beforeend', markup);
};

export const clearSpinner = () => {
    const spinner = document.querySelector(`.spinner`);
    if (spinner) spinner.parentElement.removeChild(spinner);
};