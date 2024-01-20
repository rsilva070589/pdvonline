import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/index.vue'; 
import store from '../store';
import Dre from '../views/relatorios/Dre.vue'
import Terminal from '../views/relatorios/Terminal.vue'
import Comissao from '../views/relatorios/Comissao.vue'

import Vendas from '../views/vendasRel/vendasRel.vue'
import Produtos from '../views/itens/Itens.vue'
import FormaPagamento from '../views/formaPagamento/FormaPagamento.vue'
import GerenciarVendas from '../views/gerencia/GerenciaVendas.vue'

// Vue.use(VueRouter);
// import { createApp } from 'vue';
// const app = createApp();
// app.use(createRouter);

const routes = [
    { path: '/', name: 'Home', component: Home },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "auth-login" */ '../views/auth/login.vue'),
        meta: { layout: 'auth' },
    },
    { path: '/dre', name: 'Dre', component: Dre },
    { path: '/terminal', name: 'terminal', component: Terminal },
    { path: '/comissao', name: 'comissao', component: Comissao },
    { path: '/vendas', name: 'RelVendas', component: Vendas },
    { path: '/Produtos', name: 'Produtos', component: Produtos },
    { path: '/FormaPgto', name: 'FormaPgto', component: FormaPagamento },
    { path: '/gervendas', name: 'Gervendas', component: GerenciarVendas },

 
]

const router = new createRouter({
    // mode: 'history',
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.layout && to.meta.layout == 'auth') {
        store.commit('setLayout', 'auth');
    } else {
        store.commit('setLayout', 'app');
    }
    next(true);
});

export default router;