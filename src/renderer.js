import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import './index.css';
//Pages
import App from './App.vue';
import Login from './routes/Login.vue';
import Chat from './routes/Chat.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/chat', component: Chat }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


createApp(App).use(router).mount('#app');
// go to login
router.push('/login')

window.electronAPI.loginUpdate((result) => {
  if (result === 0) {
    router.push('/chat')
  } else {
    alert("error: wrong token")
  }
  console.log(result);
});


