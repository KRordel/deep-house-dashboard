import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vuetify({autoImport: true}),
    ],
    rollupOptions: {
        external: ['vuetify'],
        output: {
            globals: {
                vue: 'Vue',
                vuetify: 'Vuetify',
            },
        },
    },
})
