
import {displayOrdredAmountInShoppingBag } from './help_functions';

const LOCALSTORAGE_KEY = 'orderedBookID';
const orderedBooksIDArray = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];

displayOrdredAmountInShoppingBag(orderedBooksIDArray);



