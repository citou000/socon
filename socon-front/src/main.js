// main.js
function setVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
window.addEventListener('resize', setVH);
setVH();

// main.js
import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Toast, { toastOptions } from './plugins/toast';

// Create Vue app instance
const app = createApp(App);
// Use Vue Router
app.use(router);
app.use(createPinia());
app.use(Toast, toastOptions);
// Mount the app
app.mount('#app');
