import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAbo9bxAsDknzi-J5uOF-mkqzwKzmfZAY0",
  authDomain: "fir-auth-f5fe0.firebaseapp.com",
  projectId: "fir-auth-f5fe0",
  storageBucket: "fir-auth-f5fe0.appspot.com",
  messagingSenderId: "412036855411",
  appId: "1:412036855411:web:e8df6ec8da1799639ddc06"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;