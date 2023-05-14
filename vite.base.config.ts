import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
import { ViteAliases } from 'vite-aliases'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {}
    },
    resolve: {
        //配置文件扩展名
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
      },    
    plugins: [
        vue(),
        // 配置'@'别名
        ViteAliases(),
        viteMockServe(),
        // 按需引入 自动引入element-plus组件
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),

        // 配置cdn加速
        importToCDN({
            modules: [
                {
                    name: 'lodash',
                    var: '_',
                    path: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js'
                },
                {
                    name: 'vue',
                    var: 'Vue',
                    path: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.global.prod.min.js'
                },
                {
                    name: 'vuex',
                    var: 'Vuex',
                    path: 'https://cdnjs.cloudflare.com/ajax/libs/vuex/4.0.2/vuex.global.prod.min.js'
                },
                {
                    name: 'vue-router',
                    var: 'VueRouter',
                    path: 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.0.12/vue-router.global.prod.min.js'
                },
                // {
                //     name: 'element-plus',
                //     var: 'elementPlus',
                //     path: 'https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.1/index.full.js'
                // },
                {
                    name: 'axios',
                    var: 'axios',
                    path: 'https://cdn.bootcdn.net/ajax/libs/axios/1.3.4/axios.min.js'
                }
            ]
        })
    ],
    // resolve: {
    //     alias: {
    //         '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    //     }
    // },
    base: './', // 设置打包路径
    server: {
        port: 4000, // 设置服务启动端口号
        open: true, // 设置服务启动时是否自动打开浏览器
        cors: true // 允许跨域

        // 设置代理，根据我们项目实际情况配置
        // proxy: {
        //   '/api': {
        //     target: 'http://xxx.xxx.xxx.xxx:8000',
        //     changeOrigin: true,
        //     secure: false,
        //     rewrite: (path) => path.replace('/api/', '/')
        //   }
        // }
    },
    build: {
        // 构建生产包时的一些配置策略
        rollupOptions: {
            // 配置rollup的一些构建策略
            output: {
                // 控制输出
                // 在rollup里面, hash代表将你的文件名和文件内容进行组合计算得来的结果
                assetFileNames: '[hash].[name].[ext]'
            }
        },
        assetsInlineLimit: 4096000, // 4000kb 小于xxx会被打包成base64编码
        outDir: 'dist', // 配置输出目录
        assetsDir: 'static', // 配置输出目录中的静态资源目录
        emptyOutDir: true // 清除输出目录中的所有文件
    }
})
