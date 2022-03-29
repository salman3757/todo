import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//VueX Store
import store from './store.js';

//PrimeVue UI Library
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/nova-vue/theme.css'     //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'         
import ToastService from 'primevue/toastservice';

import axios from 'axios';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(store);

app.use(ToastService);

//Set API Base url as a Global Property, to access it in any component 
app.config.globalProperties.BASE_URL = 'http://54.144.155.145/api';

//Get token from local storage and set Axios default header for making the ap calls using the token
//used to get token after page is refreshed
const token = localStorage.getItem("token");
if(token){
    axios.defaults.headers.common['Authorization'] = "Bearer" +token
}

app.mount("#app");
