/// <reference types="vite/client" />
// vue单文件后缀的声明扩充
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
