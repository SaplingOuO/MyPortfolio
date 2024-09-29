import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Carousel3d from 'vue3-carousel-3d'
import "vue3-carousel-3d/dist/index.css"
import store from './store/store.js'

const app = createApp(App)

app.use(router)
app.use(Carousel3d)
app.use(store)
app.mount('#app')
