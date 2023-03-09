import type { App } from 'vue'
import { createPinia } from 'pinia'

// Setup Pinia
// https://pinia.esm.dev/
export const install = (app: App) => {
    const pinia = createPinia()
    app.use(pinia)
}

