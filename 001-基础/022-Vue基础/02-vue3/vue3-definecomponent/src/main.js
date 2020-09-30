import { createApp, defineComponent, h } from 'vue';
// import App from './App.vue'

const App = defineComponent({
    render(){
        const vnode = h('div', [h('p','Azir')]);
        console.log('vnode-->', vnode);
        return vnode;
    }
});
createApp(App).mount('#app');

/*
    这里将 App.vue 重写了
    Vue 的渲染机制
    将 .vue 文件中的 <template> 编译成 render 函数
    再通过 render 函数得到 vnode 虚拟节点树
    最终将 vnodeTree 渲染到真正的 dom 
    添加到 dom 容器里
*/ 

/*
    Vue 3 Template 的渲染、编辑 机制/过程，演示
    https://vue-next-template-explorer.netlify.app/  
*/ 