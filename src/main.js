import {createApp} from 'vue';
import App from './App.vue';

import setupInit from '@/init';

const app = createApp(App);

app.use(setupInit);

app.mount('#app');
