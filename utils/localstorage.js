import { useState } from "react";

export function useLocalStorage(key, initialValue) {
 const [storedValue, setStoredValue] = useState(() => {
  console.log(key);
  
   try {
     if (typeof window !== 'undefined') {
       const item = localStorage.getItem(key);
       return item ? JSON.parse(item) : initialValue;
     }
     return initialValue;
   } catch (error) {
     console.error(error);
     return initialValue;
   }
 });

 const setValue = (value) => {
   try {
     if (typeof window !== 'undefined') {
       const valueToStore = value instanceof Function 
         ? value(storedValue) 
         : value;
       
       setStoredValue(valueToStore);
       localStorage.setItem(key, JSON.stringify(valueToStore));
     }
   } catch (error) {
     console.error(error);
   }
 };

 return [storedValue, setValue];
}