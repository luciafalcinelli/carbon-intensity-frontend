import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/router.js';
import 'bootstrap/dist/css/bootstrap.min.css';

 // Path to your router file

createApp(App).use(router).mount('#app');
