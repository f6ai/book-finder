import axios from 'axios';
import { apiKey } from '../config';

export const getBooks = async (query, author, isbn, lang) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?&key=${apiKey}&q=${query}+inauthor:${author}&isbn:${isbn}&langRestrict=${lang}&maxResults=20&printType=books`);
        const itemsArr = response.data.items;
        return itemsArr;
    } catch(e) {
        console.log(e.response);
    }
};
