import axios from "axios";
import { getCookie } from "./help_functions";

export class bookshelf_API {

    // приватні властивості для запиту 
    #BASE_URL = 'https://bookshelf-server-4bkr.onrender.com/';

    //методи для регістрації та авторизації (auth/signup, auth/signin)
    setAuthHeader = (token) => { 
      axios.defaults.headers.common.Authorization = `Bearer ${token}`; 
      console.log(axios.defaults.headers.common.Authorization);
      axios.defaults.withCredentials = true;
    }
    
    clearAuthHeader = () => { 
      axios.defaults.headers.common.Authorization = '';
    }
    
    async signUp (credentials, abortCtrl){
      try{
        const {data} = await axios.post(`${this.#BASE_URL}auth/signup`, credentials, {signal: abortCtrl.signal});
        
        // записуємо в кукі та в заголовки accessToken, отриманий з сервера
        this.setAuthHeader(data.accessToken);
        let date = new Date(Date.now() + (24 * 60* 60 * 1000));
        date = date.toUTCString();
        document.cookie = `accessToken=${data.accessToken}; expires=${date}; secure`; 
        
        return data;
      }catch(error){
        return error.response.data.message;
      };
    };

    async signIn(credentials, abortCtrl){
      try{
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(`${this.#BASE_URL}auth/signin`, credentials, {signal: abortCtrl.signal});
        
        // записуємо в кукі та в заголовки accessToken, отриманий з сервера
        this.setAuthHeader(data.accessToken);
        let date = new Date(Date.now() + (24 * 60* 60 * 1000));
        date = date.toUTCString();
        document.cookie = `accessToken=${data.accessToken}; expires=${date}; secure`;          
        
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

    async updateUser({accessToken, formData}, abortCtrl){

      try{
        this.setAuthHeader(accessToken);
        axios.defaults.headers.patch['Content-Type'] = 'multipart/form-data';
        const {data} = await axios.patch(`${this.#BASE_URL}users/update`, formData, { signal: abortCtrl.signal});
        return data;   
      }catch(error){
        return error.response.data.message;
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
      //this.setAuthHeader(getCookie("bookshelfAccessToken"));
      return axios.get(`${this.#BASE_URL}books/category?q=${category}&per_page=${per_page}`, {signal: abortCtrl.signal})
    }

    getBookById(book_Id, abortCtrl) { 
      //this.setAuthHeader(getCookie("bookshelfAccessToken"));
      return axios.get(`${this.#BASE_URL}books/${book_Id}`, {signal: abortCtrl.signal});     
    }

    
    getShoppingList(accessToken, abortCtrl){

      this.setAuthHeader(accessToken);
      const response = axios.get(`${this.#BASE_URL}books/shoppinglist`, {signal: abortCtrl.signal});

      return response;
      
    }

    async addToShoppingList(accessToken, bookId ,abortCtrl){

      this.setAuthHeader(accessToken);
      const response = await axios.post(`${this.#BASE_URL}books/shoppinglist/add/${bookId}`, {signal: abortCtrl.signal});

      return response;
    }


    async removeFromShoppingList(accessToken, bookId ,abortCtrl){

      this.setAuthHeader(accessToken);
      const response = await axios.delete(`${this.#BASE_URL}books/shoppinglist/remove/${bookId}`, {signal: abortCtrl.signal});

      return response;
    }
    
}
