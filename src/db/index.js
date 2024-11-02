import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove} from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACCtcd3lHWmCOzEjdEkuHiVChM9OPZ5Sw",
  authDomain: "e-commerce-2e835.firebaseapp.com",
  projectId: "e-commerce-2e835",
  storageBucket: "e-commerce-2e835.appspot.com",
  messagingSenderId: "300471620069",
  appId: "1:300471620069:web:1ee99df1e0403a7cb89f0c",
  measurementId: "G-K4JSXYBCQC",
  databaseURL: "https://e-commerce-2e835-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const storage = getStorage();

export {
    app, 
    db,
    ref, 
    set,
    onValue,
    remove,
    storage,
    getStorage,
    storageRef,
    uploadBytesResumable, 
    getDownloadURL,
    
}