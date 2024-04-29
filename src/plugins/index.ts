import { App } from 'vue'
import { setup as router } from './router'
import { setup as pinia } from './pinia'

const modules = [router, pinia]

// 统一注册插件
const usePlugins = (app: App) => {
    modules.map(setup => setup(app))
}

export default usePlugins;