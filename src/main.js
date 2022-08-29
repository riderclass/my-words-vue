import { createApp } from 'vue'
import App from './App.vue'
import router from '@/components/router/router';
import directives from '@/directives';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCndIRjN0XzBRjvakMoJNN2d4YrP_bgO2I",
  authDomain: "my-words-vue.firebaseapp.com",
  projectId: "my-words-vue",
  storageBucket: "my-words-vue.appspot.com",
  messagingSenderId: "992613575932",
  appId: "1:992613575932:web:0ca19c5793534b55cb7b79"
};

initializeApp(firebaseConfig)

const app = createApp(App)

directives.forEach(directive => {
    app.directive(directive.name, directive);
 })

app
.use(router)
.mount('#app');