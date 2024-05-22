import axios from "axios";

export class booksAPI {

  // приватні властивості для запиту 
    #BASE_URL = 'https://books-backend.p.goit.global/books/';

    //методи классу
    getBookById(book_Id, abortCtrl) { return axios.get(`${this.#BASE_URL}${book_Id}`, {signal: abortCtrl.signal}); }
    getTopBooks(abortCtrl) {return axios.get(`${this.#BASE_URL}top-books`, {signal: abortCtrl.signal});}
    getCategoryList(abortCtrl) { return axios.get(`${this.#BASE_URL}category-list`, {signal: abortCtrl.signal}); }
    getBooksByCategory(category, abortCtrl) { return axios.get(`${this.#BASE_URL}category?category=${category}`, {signal: abortCtrl.signal}) };
}
