import { App } from 'vue'
import * as VueRouter from 'vue-router'

import routes from '@/routes'

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})


const setup = (app: App) => {
    app.use(router)
}

export { setup }

export default router