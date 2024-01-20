<template>

<div style="margin-top: 0px;">
    <div v-if="store.itensDetalhe">
        <ItensDetalhe />
    </div> 
     <div v-if="!store.itensDetalhe" class="layout-px-spacing" style="margin-top: 0px;">

        <div> 
    </div>
    <div   v-if="!store.editando" style="display: flex;
                flex-wrap: wrap; 
                        margin: 15px 0px 15px 0px;
                    ">

         <div class="card" style="padding: 10px; width: 250px;height: 120px;border-radius: 10px;
                                    align-items: center; margin: 0px 20px 15px 0px;">
            <span style="font-size: 30px; color: black;">
                Estoque Atual
            </span> 
            <div style="font-size: 30px; color: forestgreen">
                  {{ totalEstoque() }}
            </div>
         </div>
 
  </div>
 
<div  v-if="!store.editando"   >
 
    <div v-for="c,index in store.itensCategoria" :key="index"  style="display: inline-flex;">
        <div class="card" style="padding: 5px; width: 120px;height: 80px;border-radius: 10px;
                                    align-items: center; margin: 0px 20px 15px 0px; ">
            <span style="font-size:20px; color: black;">
                {{ c.DESCRICAO }}
            </span> 
            <div style="font-size: 25px; color: forestgreen">
                  {{ totalEstoqueCategoria(c.DESCRICAO) }}
            </div>
         </div>
    </div>
    
       
       

</div>
   

 
        <div v-if="store.editando">
        
            <div class="row layout-top-spacing"
                           > 
                     
          <div class="col-xl-10 col-lg-6 col-md-6 col-sm-10 col-10" style="margin-bottom: 24px">
                <div class="statbox panel box box-shadow">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                <h4>Cadastro de Itens</h4>
                            </div>
                        </div>   
                    </div>
                    <div class="panel-body">
                        <div > 
                        
                            <div class="row">
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="CATEGORIA">CATEGORIA</label>
                                    <div>
                                        <select class="form-control" style="height: 44px; width: 130px;"
                                        v-model="store.cadastroProduto.CATEGORIA"                                      
                                        
                                        > 
                                       
                                            <option v-for="c, indexC in store.itensCategoria" :key="indexC"
                                            :value="c.ID"
                                            >
                                                {{c.DESCRICAO}}
                                            </option>   
                                        
                                                 
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="CODIGO_BARRAS">CODIGO_BARRAS</label>
                                    <div>
                                        <input  v-model="store.cadastroProduto.CODIGO_BARRAS" type="text" id="CODIGO_BARRAS" class="form-control" placeholder="CODIGO_BARRAS" />
                                    </div>
                                </div>
                                <div class="form-group col-md-8">
                                    <label class="col-form-label pt-0" for="NOME">NOME</label>
                                    <div>
                                        <input v-model="store.cadastroProduto.NOME"  type="text" id="NOME" class="form-control" placeholder="NOME" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-12">
                                    <label class="col-form-label pt-0" for="FOTO">FOTO</label>
                                    <div>
                                        <input  v-model="store.cadastroProduto.FOTO" type="text" id="FOTO" class="form-control" placeholder="FOTO" />
                                    </div>
                                </div>                           
                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="col-form-label pt-0" for="NOME">DESCRICAO</label>
                                    <div>
                                        <input v-model="store.cadastroProduto.DESCRICAO"  type="text" id="DESCRICAO" class="form-control" placeholder="DESCRICAO" />
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="password">SITUACAO</label>
                                    <div>
                                        <select class="form-control"   v-model="store.cadastroProduto.SITUACAO">
                                            <option disabled value="">Selecione</option>
                                            <option>ATIVADO</option>
                                            <option>DESATIVADO</option>                                            
                                        </select>
                                    </div>
                                </div>
                              
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="password">CUSTO</label>
                                    <div>
                                        <input v-model="store.cadastroProduto.VALOR_CUSTO"  type="text" id="VALOR_CUSTO" class="form-control" placeholder="VALOR_CUSTO" />
                                    </div>
                                </div> 
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="password">PRECO_VENDA</label>
                                    <div>
                                        <input v-model="store.cadastroProduto.VALOR"  type="text" id="VALOR" class="form-control" placeholder="VALOR" />
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="password">QTDE_ESTOQUE</label>
                                    <div>
                                        <input v-model="store.cadastroProduto.QTDE_ESTOQUE"  type="number" id="QTDE_ESTOQUE" class="form-control" placeholder="QTDE_ESTOQUE" />
                                    </div>
                                </div> 
                            </div>
                          
                   

                        

                            <button @click="confirmar(store.cadastroProduto.ID)" type="" class="btn btn-primary mt-3">CONFIRMAR</button>
                            <button style="margin-left: 10px;" @click="store.editando = false " type="" class="btn btn-danger mt-3">CANCELAR</button>
                      
                        </div>
                    </div>
                </div>
            </div>

             
        </div>
        </div>
 
<div
        v-if="!store.editando"
         @click="store.editando = true; 
                      store.cadastroProduto = [];
                      store.cadastroProduto.ID=0">

    <svg version="1.1" id="Capa_1" width="30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 50 50" xml:space="preserve">
        <circle style="fill:#43B05C;" cx="25" cy="25" r="25"/>
        <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="25" y1="13" x2="25" y2="38"/>
        <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="37.5" y1="25" x2="12.5" y2="25"/>
    </svg>
</div>
        
        <div v-if="!store.editando">
            <div  >
              
                <div class="panel br-0 p-0 mt-0">
                    <div class="custom-table">
                        <v-client-table :data="store.itensCadastro" :columns="columns1" :options="table_option1">
                        
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
    import {indexStore, useUserStore} from '../../store/indexStore' 
    import { onMounted, ref, computed } from 'vue';
    import axios from 'axios'
    import { useMeta } from '@/composables/use-meta';
    import ItensDetalhe from './ItensDetalhe.vue'
    useMeta({ title: 'Multiple Tables' });
    const store = indexStore(); 
    const storeLogin = useUserStore();
    const code_arr = ref([]);
    //table 1
   

    //table 2
    const columns1 = ref(['actions','ID', 'CATEGORIA','ID_CATEGORIA', 'CODIGO_BARRAS', 'NOME' ,'VALOR','VALOR_CUSTO','QTDE_ESTOQUE','SITUACAO']);
    const items1 = store.itensCadastro;
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
        sortable: ['ID', 'AMBIENTE', 'TIPO', 'NOMENCLATURA', 'VLR_UNITARIO','QTDE_ESTOQUE' ],
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
        store.itensCadastro = []

        const getProdutos = ()=> {
            let data = JSON.stringify({
            "SCHEMA": storeLogin.empresas?.schema 
            });

            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: store.baseApiHTTPS+'/getprodutos',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };

            axios.request(config)
            .then((response) => { 
                response.data.map(x=> {
                const itens ={
                    ID: x.id,
                    CATEGORIA: x.categoria,
                    ID_CATEGORIA: x.id_categoria,
                    CODIGO_BARRAS: x.codigo_barras,
                    DESCRICAO: x.descricao,
                    FOTO: x.foto,
                    NOME: x.nome,
                    SITUACAO: x.situacao,
                    VALOR: x.valor,
                    VALOR_CUSTO: x.valor_custo,
                    QTDE_ESTOQUE: x.qtde_estoque
            }
            store.itensCadastro.push(itens)
            })
            })
            .catch((error) => {
            console.log(error);
            });

        }
       

       store.itensCategoria = [];

       const getCategorias = ()=> {
        let data = JSON.stringify({
            "SCHEMA": storeLogin.empresas?.schema 
            });

            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: store.baseApiHTTPS+'/getCategorias',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };

            axios.request(config)
            .then((response) => {          
            response.data.map(x=> {
            const itens ={
            ID: x.id, 
            DESCRICAO: x.descricao
          }
       store.itensCategoria.push(itens)
       })
            })
            .catch((error) => {
            console.log(error);
            });

     
       }

       getCategorias()
       getProdutos()
      


        store.itensHistorico = []

    }
    //table 2
    const view_row1 =  (item1) => {       
   
        store.itensDetalhe = true;
        store.ItensSelecionadoDemanda = item1 ;
         
        //table 2
        console.log(item1)
        store.itensHistorico =  []
    };

    function selectItemEdit (props) {
        store.editando = true
        console.log(props)
        
        store.cadastroProduto.ID = props.ID,
        store.cadastroProduto.CATEGORIA = props.ID_CATEGORIA,
        store.cadastroProduto.CODIGO_BARRAS = props.CODIGO_BARRAS, 
        store.cadastroProduto.DESCRICAO = props.DESCRICAO, 
        store.cadastroProduto.FOTO = props.FOTO, 
        store.cadastroProduto.NOME = props.NOME, 
        store.cadastroProduto.SITUACAO = props.SITUACAO, 
        store.cadastroProduto.VALOR = props.VALOR,
        store.cadastroProduto.VALOR_CUSTO = props.VALOR_CUSTO,
        store.cadastroProduto.QTDE_ESTOQUE = props.QTDE_ESTOQUE
    }


    function editItem(id){        
        console.log('Editando Item ID: '+id)
        console.log('NOMENCLATURA '+ store.cadastroProduto.NOMENCLATURA)
        
    var data = 
    JSON.stringify ( { 
                        "ID": id, 
                        "CATEGORIA":   store.cadastroProduto.CATEGORIA     , 
                        "CODIGO_BARRAS": store.cadastroProduto.CODIGO_BARRAS, 
                        "DESCRICAO": store.cadastroProduto.DESCRICAO, 
                        "FOTO": store.cadastroProduto.FOTO, 
                        "NOME": store.cadastroProduto.NOME, 
                        "SITUACAO": store.cadastroProduto.SITUACAO, 
                        "VALOR": store.cadastroProduto.VALOR, 
                        "VALOR_CUSTO": store.cadastroProduto.VALOR_CUSTO,
                        "QTDE_ESTOQUE": store.cadastroProduto.QTDE_ESTOQUE
                    } 
             )

    var config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: store.baseApiHTTPS+'/produtos',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        bind_data()
        })
        .catch(function (error) {
        console.log(error);
        });

 }

 function createItem(){
    console.log('Cadastrando Novo Item')
    var axios = require('axios');
    console.log(store.cadastroProduto.AMBIENTE)
var data = JSON.stringify( 
            {  
            "CATEGORIA":   store.cadastroProduto.CATEGORIA     , 
            "ID_CATEGORIA":   store.cadastroProduto.ID_CATEGORIA     , 
            "CODIGO_BARRAS": store.cadastroProduto.CODIGO_BARRAS, 
            "DESCRICAO":        store.cadastroProduto.DESCRICAO, 
            "FOTO": store.cadastroProduto.FOTO, 
            "NOME": store.cadastroProduto.NOME, 
            "SITUACAO": store.cadastroProduto.SITUACAO, 
            "VALOR": store.cadastroProduto.VALOR, 
            "VALOR_CUSTO": store.cadastroProduto.VALOR_CUSTO,
            "QTDE_ESTOQUE": store.cadastroProduto.QTDE_ESTOQUE
            } 
 );

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: store.baseApiHTTPS+'/produtos',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  bind_data()
})
.catch(function (error) {
  console.log(error);
});

 }

 function confirmar (id) {
    console.log('Valor do ID: ' + id)
    if (id > 0) {
        editItem(id)
    }else{
        createItem()
    }
    store.editando = false
    store.cadastroProduto.ID=0
    
     
    
 }

 function deleteItem(props){
    store.editando = false
    store.cadastroProduto.ID=0
    
    var data =   {"ID" : props.ID}  

                var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: store.baseApiHTTPS+'/produtos',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
                };

                axios(config)
                .then(function (response) {
                console.log(JSON.stringify(response.data));
                bind_data()
                })
                .catch(function (error) {
                console.log(error);
                });

 }

 function totalEstoque1 () {
    store.itensCadastro
return 1000
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

   

function totalEstoqueCategoria(categoria) {
    if (store.itensCadastro){
var dados = store.itensCadastro 
        var somarProduto = store.itensCadastro.filter(f => f.CATEGORIA==categoria).map(p =>{
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
