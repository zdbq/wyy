// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
// 引入组件
import Top from '../components/Top.vue'
import Navigation from '../components/Navigation.vue'
import Yhgl from '../components/Yhgl.vue'
import Pzgl from '../components/Pzgl.vue'
import Jsgl from '../components/Jsgl.vue'
import Gdjm from '../components/Gdjm.vue'
import Ssym from '../components/Ssym.vue'
import Bfym from '../components/Bfym.vue'
import Bfymb from '../components/Bfymb.vue'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/top',
            name:'Top',
            component: Top,
            children: [
                {
                    path: 'navigation',
                    name:'Navigation',
                    component: Navigation,
                    children:[
                        {
                            path: 'yhgl',
                            name:'Yhgl',
                            component: Yhgl,
                        },
                        {
                            path: 'pzgl',
                            name:'Pzgl',
                            component: Pzgl
                        },
                        {
                            path: 'jsgl',
                            name:'Jsgl',
                            component: Jsgl,
                            children:[
                                {
                                    path: 'ssym',
                                    name:'Ssym',
                                    component: Ssym,
                                }
                            ]
                        },
                    ]
                },
            ]
        },
        {
            path: '/gdjm',
            name:'Gdjm',
            component: Gdjm,
        },
        {
            path: '/bfym',
            name:'Bfym',
            component: Bfym,
        },
        {
            path: '/bfymb',
            name:'Bfymb',
            component: Bfymb,
        },
    ]
})