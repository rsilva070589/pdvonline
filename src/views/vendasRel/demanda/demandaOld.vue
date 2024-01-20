<template> 
    <div class="layout-px-spacing" style="margin-top: -100px;">
        <h2 class="text-2xl font-medium mx-2" data-testid="statements-title-txt">Demanda Mensal de Produtos</h2>
        <div> 
</div>
 
 
<Progress v-if="store.recursos.progress" />

<div v-if="!store.recursos.progress">
 
 <div style="font-size: 17px;">
 Estoque para os proximos:
 <select   style="height: 25px; width: 60px;" v-model="store.tipoDemanda">
                                           
                                            <option disabled value="">Selecione</option>
                                            <option>1</option>
                                            <option>3</option>     
                                            <option>5</option>  
                                            <option>7</option>   
                                            <option>10</option>   
                                            <option>15</option>       
                                            <option>20</option>  
                                            <option>30</option>     ]
                                            <option>45</option>   
                                            <option>90</option>    
                                            <option>180</option> 
                                            <option>365</option> 
                                            <option>100000</option>                                                                          
                                        </select>                                               
                                        </select>
 </div>


        <div v-if="!store.editando">
            <div  >
              
                <div class="panel br-0 p-0 mt-0">
                    <div class="custom-table">
                        <v-client-table :data="demandaFilter()" :columns="columns1" :options="table_option1">
                        
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
            </div>
        </div>
</div>
       
    </div>
</template>

<script setup>
    import Progress from '@/components/Progress.vue';
    import {indexStore} from '../../store/indexStore' 
    import { onMounted, ref } from 'vue';
    import axios from 'axios'
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Multiple Tables' });
    const store = indexStore(); 
    const code_arr = ref([]);
    //table 1

    store.recursos.progress = true

    store.diasDemanda = 3

    function dataAtualFormatada(dataFormat){
    var data = dataFormat,
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
    } 

    function dataAtualMes(dataFormat){
    var data = dataFormat,
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return mesF+"/"+anoF;
    } 
    
        const end=new Date()
        end.setHours(23,59,59,999)
        end.getTime()
 

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

    var arredonda = function(numero, casasDecimais) {
    casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 0;
    return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
  };

    function demandaFilter() { 
        var arr =  store.itensRelDemanda.filter(f => f.DIAS_RESTANTES < store.diasDemanda  ) 
        var itemZerado =  store.itensRelDemanda.filter(f => f.QTDE_ESTOQUE == 0  ) 
        console.log(arr)

        const arrayFiltro = []

        store.itensRelDemanda.map( x => {
            const dados = {
            "COD_PRODUTO": x.cod_produto,
            "NOME": x.nome,
            "DEMANDA_DIARIA": x.demanda_diaria,
            "QTDE_ESTOQUE": x.qtde_estoque,
            "DIAS_RESTANTES": x.dias_restantes,
            "QTDE_NECESSARIA": arredonda(x.demanda_diaria * store.diasDemanda),
            "COMPRAR_QTDE": arredonda((x.demanda_diaria * store.diasDemanda ) - x.qtde_estoque)
        }
        arrayFiltro.push(dados)
      
        
        })
        console.log(itemZerado)

         return arrayFiltro.filter(f => f.COMPRAR_QTDE > 0)
      }
   
      

    //table 2
    const columns1 = ref( ['COD_PRODUTO','NOME','DEMANDA_DIARIA','QTDE_ESTOQUE','DIAS_RESTANTES','QTDE_NECESSARIA','COMPRAR_QTDE']);
    const items1 =  demandaFilter();
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
        sortable: ['COD_PRODUTO','NOME','DEMANDA_DIARIA','QTDE_ESTOQUE','DIAS_RESTANTES'],
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
        store.itensRelDemanda = []
      var result = await axios.get(store.baseApiHTTPS+'/demanda') 
   // var result = await axios.get('http://localhost:4040/mercadodemanda') 
      
    
        //table 2 
        store.itensRelDemanda =  result.data
        store.recursos.progress = false

    }
   

 
 


</script>

<style>
</style>
