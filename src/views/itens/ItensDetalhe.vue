<template>
    <div class="layout-px-spacing" style="margin-top: 0px;">
    <h4>Historico de Vendas do Item</h4>
      
  <div style="padding: 10px;">
    <h3 style="color: red;">{{ store.ItensSelecionadoDemanda.NOME }} - {{  store.ItensSelecionadoDemanda.CODIGO_BARRAS }}</h3> 
  </div>

  <div class="panel br-0 p-0 mt-0">
                    <div class="custom-table">
                        <v-client-table :data="store.itensHistorico" :columns="columns1" :options="table_option1">
                        
                            <template #progress="props">
                                <div class="progress">
                                    <div
                                        role="progressbar"
                                        aria-valuemin="0"
                                        :aria-valuemax="props.row.progress.count"
                                        aria-valuenow="100"
                                        class="progress-bar"
                                        :class="'bg-' + props.row.progress.class"
                                        :style="{ width: props.row.progress.count + '%' }"
                                    ></div>
                                </div>
                            </template>
                            <template #salary="props"> ${{ props.row.salary }} </template>
                            <template #actions="props">
                                <div class="me-2 custom-dropdown dropdown btn-group">
                                    <a class="btn dropdown-toggle btn-icon-only" href="#" role="button" id="pendingTask" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            style="width: 24px; height: 24px"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-more-horizontal"
                                        >
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="19" cy="12" r="1"></circle>
                                            <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </a>

                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item" @click="view_row1(props.row)"> view </a>
                                        </li>
                                        <li @click="selectItemEdit(props.row)">
                                            <a href="javascript:void(0);" class="dropdown-item"> Edit </a>
                                        </li>
                                        <li @click="deleteItem(props.row)">
                                            <a href="javascript:void(0);" class="dropdown-item"> Delete </a>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                        </v-client-table>
                    </div>
                </div>
      
      <div>
      <button @click="store.itensDetalhe = false" >Voltar</button>
      </div>
    </div>
     
</template>

<script setup>
    import {indexStore} from '../../store/indexStore' 
    import { onMounted, ref } from 'vue';
    import axios from 'axios'
    import { useMeta } from '@/composables/use-meta';
   
    useMeta({ title: 'Multiple Tables' });
    const store = indexStore(); 
    const code_arr = ref([]);
    //table 1
   
    
    //table 2
    const columns1 = ref(['MES', 'COD_PRODUTO', 'NOME' ,'QTDE','VALOR','CUSTO','LUCRO']);
    const items1 = store.itensHistorico;
    const table_option1 = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table ',
        columnsClasses: { actions: 'actions text-center' },
        sortable: [],
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        sortable: ['MES', 'COD_PRODUTO', 'NOME', 'QTDE', 'VALOR','CUSTO','LUCRO' ],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: false,
    });

    onMounted(() => {
    
            bind_data();
      
    });

 
 
 
    const bind_data = async  () => { 
        store.itensHistorico =  []
            var result = await axios.get(store.baseApiHTTPS+'/mercadohistorico/'+store.ItensSelecionadoDemanda.CODIGO_BARRAS)  
        //table 2
        console.log(result.data)
        store.itensHistorico =  result.data
    

    }
 

 
 
 

 

  
 function totalEstoque() {
    if (store.itensCadastro){
        var somarProduto = store.itensCadastro.map(p =>{
                return (p.VALOR_CUSTO * p.QTDE_ESTOQUE)
              } )
             

  let totalProd = 0
  for(let i in somarProduto) {
           totalProd += somarProduto[i] 
    }
    
          return formataDinheiro(totalProd,2)
    }

}
  
function formataDinheiro(item) {
         let venda = item;
         if (!!venda && venda.toString().includes(",")) {
           venda = venda.toString().replace(",", ".");
         }
         return parseFloat(venda)
           .toFixed(2)
           .replace(".", ",")
           .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    }

</script>
