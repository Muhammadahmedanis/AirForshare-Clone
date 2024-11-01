import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCtgv1FPnNiCk4HFsdk6IVWHeTh94U9ra0",
  authDomain: "reactweb-917b9.firebaseapp.com",
  projectId: "reactweb-917b9",
  storageBucket: "reactweb-917b9.firebasestorage.app",
  messagingSenderId: "1095454474692",
  appId: "1:1095454474692:web:46866365c4fdafc732a491",
  measurementId: "G-CM3ZNENJCV",
  databaseURL: "https://reactweb-917b9-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export {
    app, 
    db,
    ref, 
    set,
    onValue,
    remove,
}