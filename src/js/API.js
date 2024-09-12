import axios from "axios";
import { getCookie } from "./help_functions";

export class bookshelf_API {

    // приватні властивості для запиту 
    #BASE_URL = 'https://bookshelf-server-4bkr.onrender.com/';

    //методи для регістрації та авторизації (auth/signup, auth/signin)
    setAuthHeader = (token) => { 
      axios.defaults.headers.common.Authorization = `Bearer ${token}`; 
      axios.defaults.withCredentials = true;
      // axios.defaults.headers.common[Access-Control-Allow-Origin] = 'https://olgadzubak.github.io/bookshelf';
      // axios.defaults.headers.common[Access-Control-Allow-Credentials] = true;
    }
    
    clearAuthHeader = () => { 
      axios.defaults.headers.common.Authorization = '';
    }
    
    signUp (credentials, abortCtrl){
      try{
        const {data} = axios.post(`${this.#BASE_URL}auth/signup`, credentials, {signal: abortCtrl.signal});
        this.setAuthHeader(data.token);
        return data;
      }catch(error){
        return error.message;
      };
    };

    async signIn(credentials, abortCtrl){
      try{
        const {data} = await axios.post(`${this.#BASE_URL}auth/signin`, credentials, {signal: abortCtrl.signal});
        return data;
      }catch(error){
        return error.message;
      }
    } 

    async refreshUser(accessToken, abortCtrl){
      try{
        this.setAuthHeader(accessToken);
        const {data} = await axios.get(`${this.#BASE_URL}users/current`, {signal: abortCtrl.signal});    
        return data;   
      }catch(error){
        return error.message;
      }
    }

 

    //методи для /books/

    getTopBooks(per_page, abortCtrl) { 
      //без авторизації
      return axios.get(`${this.#BASE_URL}books/top-books?per_page=${per_page}`, {signal: abortCtrl.signal}) 
    }

    getBookCategories() { 
      //без авторизації
      return axios.get(`${this.#BASE_URL}books/categories`) 
    }

    getBooksOfCategory(per_page, category, abortCtrl) { 
      //console.log(getCookie("bookshelfAccessToken"));
      this.setAuthHeader(getCookie("bookshelfAccessToken"));
      return axios.get(`${this.#BASE_URL}books/category?q=${category}&per_page=${per_page}`, {signal: abortCtrl.signal})
    }

    getBookById(book_Id, abortCtrl) { 
      this.setAuthHeader(getCookie("bookshelfAccessToken"));
      return axios.get(`${this.#BASE_URL}books/${book_Id}`, {signal: abortCtrl.signal}) 
    }
    
    getShoppingList(abortCtrl){ 
      this.setAuthHeader(getCookie("bookshelfAccessToken"));
      return axios.get(`${this.#BASE_URL}books/shoppinglist`, {signal: abortCtrl.signal});
    }
}
