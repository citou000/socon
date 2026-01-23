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
import { useAuth } from '@/store/auth';

// Create Vue app instance
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

async function bootstrap() {
  const auth = useAuth();
  app.use(router);
  app.use(Toast, toastOptions);
  app.mount('#app');
  await auth.init();
}

bootstrap();
