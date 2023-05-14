import { defineConfig, loadEnv } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'

// 策略模式
const envResolver = {
    build: () => {
        console.log('生产环境')
        return { ...viteBaseConfig, ...viteProdConfig }
    },
    serve: () => {
        console.log('开发环境')
        return { ...viteBaseConfig, ...viteDevConfig } // 新配置里是可能会被配置envDir .envA
    }
    // "serve": () =>  Object.assign({},viteBaseConfig,viteDevConfig)
}

export default defineConfig(({ command, mode }) => {
    // 是build 还是serve主要取决于我们敲的命令是开启开发环境还是生产环境
    // console.log("process", process.cwd());
    // 第二个参数不是必须要使用process.cwd(),当前env文件所在的目录 当前node工作目录
    // prefixes 默认值为".env"
    console.log('command', command) // server
    console.log('mode', mode) //development
    console.log('process.cwd()', process.cwd()) //development

    // const env = loadEnv(mode, process.cwd(), '')

    // console.log("env://////",env)
    // console.log("process://////", process)
    return envResolver[command]()
})
