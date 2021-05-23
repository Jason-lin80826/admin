
import store from 'store';
const key = 'User-key'
const storgeUtils = {
   set(value) {
     // localStorage.setItem(key, JSON.stringify(value))
     store.set(key, value);
   },
   get() {
     // return JSON.parse(localStorage.getItem(key) || '{}')
     return store.get(key) || {};
   },
   remove() {
     // localStorage.removeItem(key)
     store.remove(key);
   },
   clearAll() {
     store.clearAll();
   },
 };
 export default storgeUtils