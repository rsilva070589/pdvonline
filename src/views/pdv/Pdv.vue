<template>
<div style="height: 78vh; ">
    <div style="position: fixed; margin-left: 99%;">
      <router-link class="button is-light" to="/Produtos">   
        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class=""
                    >
                        <circle cx="12" cy="12" r="3"></circle>
                        <path
                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                        ></path>
                    </svg>
        </router-link> 
    </div>
 
    <div  style="height: 77.5vh; padding: 0px 00px 0px 40px;">        
        <ListagemProdVenda />
    </div>

    <div style="">
            <RodapeTotal />
    </div>
</div>

 
</template>

<script setup>
 import NavCaixa from './NavCaixa.vue';
 import RodapeTotal from './RodapeTotal.vue';
 import ListagemProdVenda from './ListagemProdVenda.vue';
 import { indexStore, useUserStore } from '../../store/indexStore' 
const store = indexStore(); 
const storeLogin = useUserStore();

function login (){ 
          switch (storeLogin.empresas?.login || false) {
          case true:
              console.log('usuario logado')  
              break;
          case 'true':
              console.log('usuario logado')  
              break; 
          default:
              console.log('precisa fazer login')    
              router.push('/auth/login')           
          } 
    }


</script>

<style>
  .conteudo { 
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    overflow-x: auto;
}
</style>