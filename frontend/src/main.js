import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // or wherever your router file is

const app = createApp(App);
app.use(router);
app.mount('#app');
