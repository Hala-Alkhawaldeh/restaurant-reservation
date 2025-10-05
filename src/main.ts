import './index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';

import App from './App.vue';
import router from './router';



const app = createApp(App);

app.use(createPinia());
const head = createHead();
app.use(head);
app.use(router);

app.mount('#app');
