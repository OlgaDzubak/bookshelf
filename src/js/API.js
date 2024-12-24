import axios from "axios";
import { getCookie } from "./help_functions";

export class bookshelf_API {

    // приватні властивості для запиту 
    #BASE_URL = 'https://bookshelf-server-4bkr.onrender.com/';

    //методи для регістрації та авторизації (auth/signup, auth/signin)
    setAuthHeader = (token) => {
      axios.defaults.headers.common.Authorization = `Bearer ${token ? token : ""}`; 
      axios.defaults.withCredentials = true;
    }
    
    clearAuthHeader = () => { 
      axios.defaults.headers.common.Authorization = '';
    }
    
    rewriteAccessTokenCookie = (newAccessToken) => {
      const accessToken = getCookie("accessToken");  
      if (newAccessToken != accessToken){
        let date = new Date(Date.now() + (24 * 60 * 60 * 1000));
        date = date.toUTCString();
        document.cookie = `accessToken=${newAccessToken}; expires=${date}; secure`;
      }
    }

    async signUp (credentials, abortCtrl){
      try{
        const {data} = await axios.post(`${this.#BASE_URL}auth/signup`, credentials, {signal: abortCtrl.signal});
        
        this.setAuthHeader(data.accessToken);
        this.rewriteAccessTokenCookie(data.accessToken);

        return data;

      }catch(error){
        return error.response.data.message;
      };
    };

    async signIn(credentials, abortCtrl){
      try{
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(`${this.#BASE_URL}auth/signin`, credentials, {signal: abortCtrl.signal});
        
        this.setAuthHeader(data.accessToken);
        this.rewriteAccessTokenCookie(data.accessToken);

        return data;

      }catch(error){
        return error.message;
      }
    } 

    async refreshUser(abortCtrl){
      try{
        const accessToken = getCookie("accessToken");  
        this.setAuthHeader(accessToken);
        const {data} = await axios.get(`${this.#BASE_URL}users/current`, {signal: abortCtrl.signal});  
       
        this.rewriteAccessTokenCookie(data.accessToken);
        return data;

      }catch(error){
        return error.message;
      }
    }

    async updateUser(formData, abortCtrl){

      try{
        const accessToken = getCookie("accessToken");  
        
        this.setAuthHeader(accessToken);
        axios.defaults.headers.patch['Content-Type'] = 'multipart/form-data';
        
        const {data} = await axios.patch(`${this.#BASE_URL}users/update`, formData, { signal: abortCtrl.signal});
        
        this.rewriteAccessTokenCookie(data.accessToken);

        return data;   
      }catch(error){
        return error.response.data.message;
      }
    }
 
    async logout(abortCtrl){
      try{

        const accessToken = getCookie("accessToken");
        this.setAuthHeader(accessToken);
        const {data} = await axios.post(`${this.#BASE_URL}auth/signout`, {signal: abortCtrl.signal});
        this.clearAuthHeader();

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
      //this.setAuthHeader(getCookie("bookshelfAccessToken"));
      return axios.get(`${this.#BASE_URL}books/category?q=${category}&per_page=${per_page}`, {signal: abortCtrl.signal})
    }

    getBookById(book_Id, abortCtrl) { 
      //this.setAuthHeader(getCookie("bookshelfAccessToken"));
      return axios.get(`${this.#BASE_URL}books/${book_Id}`, {signal: abortCtrl.signal});     
    }

    
    getShoppingList(abortCtrl){

      this.setAuthHeader(getCookie("accessToken"));
      const response = axios.get(`${this.#BASE_URL}books/shoppinglist`, {signal: abortCtrl.signal});

      return response;
      
    }

    async addToShoppingList(bookId ,abortCtrl){

        const accessToken = getCookie("accessToken"); 
        this.setAuthHeader(accessToken);
        const {data} = await axios.post(`${this.#BASE_URL}books/shoppinglist/add/${bookId}`, {signal: abortCtrl.signal});
        this.rewriteAccessTokenCookie(data.accessToken);
        
        return data;
    }

    async removeFromShoppingList(bookId ,abortCtrl){

        const accessToken = getCookie("accessToken"); 
        this.setAuthHeader(accessToken);
        const {data} = await axios.delete(`${this.#BASE_URL}books/shoppinglist/remove/${bookId}`, {signal: abortCtrl.signal});
        rewriteAccessTokenCookie(data.accessToken);
        
        return data;
    }
   
}
