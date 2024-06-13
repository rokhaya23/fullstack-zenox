import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import CKEditor from '@ckeditor/ckeditor5-vue';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from "@/routes/routes";


const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
})
createApp(App).use(vuetify).use(CKEditor).use(router).mount('#app')
