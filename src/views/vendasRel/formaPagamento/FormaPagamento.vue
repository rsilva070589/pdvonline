<template>

    <div v-if="!store.itensDetalhe" class="layout-px-spacing" style="margin-top: -100px;">
        <span style="font-size: 30px; color: black;">
               Cadastro de Cartão
            </span> 
    <div> 
    </div>
 

 
   

 
        <div v-if="store.editando">
        
            <div class="row layout-top-spacing"
                           > 
                     
          <div class="col-xl-10 col-lg-6 col-md-6 col-sm-10 col-10" style="margin-bottom: 24px">
                <div class="statbox panel box box-shadow">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                <h4>Cadastro de Cartões</h4>
                            </div>
                        </div>   
                    </div>
                    <div class="panel-body">
                        <div > 
                        
                            <div class="row">
                              
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="DESCRICAO">DESCRICAO</label>
                                    <div>
                                        <input  v-model="store.cadastroCartao.DESCRICAO" type="text" id="DESCRICAO" class="form-control" placeholder="DESCRICAO" />
                                    </div>
                                </div>
                                <div class="form-group col-md-8">
                                    <label class="col-form-label pt-0" for="PERCENTUAL">PERCENTUAL</label>
                                    <div>
                                        <input v-model="store.cadastroCartao.PERCENTUAL"  type="number" id="PERCENTUAL" class="form-control" placeholder="PERCENTUAL" />
                                    </div>
                                </div>
                            </div>
                                              

                            <button @click="confirmar(store.cadastroCartao.ID)" type="" class="btn btn-primary mt-3">CONFIRMAR</button>
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
                      store.cadastroCartao = [];
                      store.cadastroCartao.ID=0">

    <svg version="1.1" id="Capa_1" width="30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 50 50" xml:space="preserve">
        <circle style="fill:#43B05C;" cx="25" cy="25" r="25"/>
        <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="25" y1="13" x2="25" y2="38"/>
        <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="37.5" y1="25" x2="12.5" y2="25"/>
    </svg>
</div>
        
<div v-if="!store.editando"
    style="padding: 10px 45px 0px 0px; width: 500px;">
    
        <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                <thead role="rowgroup" class="">
                    <tr role="row" class="">
                        <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                        <th role="columnheader" scope="col" aria-colindex="2" class=""><div>TIPO</div></th>
                        <th role="columnheader" scope="col" aria-colindex="3" class=""><div>%</div></th> 
                    </tr>
                </thead>
                <tbody v-for="(item, i) in store.formasPagamentos" :key="item.name" role="rowgroup">
                    <tr role="row" class="">
                        <td aria-colindex="1" role="cell" class="">{{ item.ID }}</td>
                        <td aria-colindex="2" role="cell" class="">{{ item.DESCRICAO }}</td>
                        <td aria-colindex="3" role="cell" class="">{{ item.PERCENTUAL}}</td> 
                        <td>
                    
                            <span @click="selectItemCopy(item)">
                                <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 467 512.22"><path fill-rule="nonzero" d="M131.07 372.11c.37 1 .57 2.08.57 3.2 0 1.13-.2 2.21-.57 3.21v75.91c0 10.74 4.41 20.53 11.5 27.62s16.87 11.49 27.62 11.49h239.02c10.75 0 20.53-4.4 27.62-11.49s11.49-16.88 11.49-27.62V152.42c0-10.55-4.21-20.15-11.02-27.18l-.47-.43c-7.09-7.09-16.87-11.5-27.62-11.5H170.19c-10.75 0-20.53 4.41-27.62 11.5s-11.5 16.87-11.5 27.61v219.69zm-18.67 12.54H57.23c-15.82 0-30.1-6.58-40.45-17.11C6.41 356.97 0 342.4 0 326.52V57.79c0-15.86 6.5-30.3 16.97-40.78l.04-.04C27.51 6.49 41.94 0 57.79 0h243.63c15.87 0 30.3 6.51 40.77 16.98l.03.03c10.48 10.48 16.99 24.93 16.99 40.78v36.85h50c15.9 0 30.36 6.5 40.82 16.96l.54.58c10.15 10.44 16.43 24.66 16.43 40.24v302.01c0 15.9-6.5 30.36-16.96 40.82-10.47 10.47-24.93 16.97-40.83 16.97H170.19c-15.9 0-30.35-6.5-40.82-16.97-10.47-10.46-16.97-24.92-16.97-40.82v-69.78zM340.54 94.64V57.79c0-10.74-4.41-20.53-11.5-27.63-7.09-7.08-16.86-11.48-27.62-11.48H57.79c-10.78 0-20.56 4.38-27.62 11.45l-.04.04c-7.06 7.06-11.45 16.84-11.45 27.62v268.73c0 10.86 4.34 20.79 11.38 27.97 6.95 7.07 16.54 11.49 27.17 11.49h55.17V152.42c0-15.9 6.5-30.35 16.97-40.82 10.47-10.47 24.92-16.96 40.82-16.96h170.35z"/></svg>
                            </span>


                            <span @click="selectItemEdit(item)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </span>
                        
                            <span @click="deleteItem(item)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </span>
                                                
                        </td>                       
                    </tr>

                    
                </tbody>
            </table>
    </div>
    </div>
</template>

<script setup>
    import {indexStore} from '../../store/indexStore' 
    import { onMounted, ref, computed } from 'vue';
    import axios from 'axios'
    import { useMeta } from '@/composables/use-meta';
    
    useMeta({ title: 'Multiple Tables' });
    const store = indexStore(); 
    const code_arr = ref([]);
    //table 1
   

    

    onMounted(() => {
        bind_data();
    });

    const bind_data = async  () => {
        store.formasPagamentos = []
       var result = await axios.get(store.baseApiHTTPS+'/formapagamento')  
       result.data.map(x=> {
        const itens ={
            ID: x.id,
            DESCRICAO: x.descricao,
            PERCENTUAL: x.taxa         
       }
       store.formasPagamentos.push(itens)
       })       
       console.log(store.formasPagamentos)
    
    }

    //table 2
    const columns1 = ref(['actions','ID', 'DESCRICAO', 'PERCENTUAL']);
    const item1 = store.formasPagamentos;
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
        sortable: ['ID', 'DESCRICAO', 'PERCENTUAL' ],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: false,
    });
    //table 2
    const view_row1 =  (item1) => {       
   
        
        store.ItensSelecionadoDemanda = item1 ;
         
        //table 2
        console.log(item1)
        store.itensHistorico =  []
    };

    function selectItemEdit (props) {
        store.editando = true
        console.log(props)
        
        store.cadastroCartao.ID = props.ID,
        store.cadastroCartao.DESCRICAO = props.DESCRICAO,
        store.cadastroCartao.PERCENTUAL = props.PERCENTUAL
    }


    function editItem(id){        
        console.log('Editando Item ID: '+id)
        console.log('DESCRICAO '+ store.cadastroCartao.DESCRICAO)
        
    var data = 
    JSON.stringify ( { 
                        "ID": id, 
                        "DESCRICAO":   store.cadastroCartao.DESCRICAO, 
                        "PERCENTUAL": store.cadastroCartao.PERCENTUAL
                    } 
             )

    var config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: store.baseApiHTTPS+'/cartao/'+id,
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
var data = JSON.stringify( 
            {  
            "DESCRICAO":   store.cadastroCartao.DESCRICAO        , 
            "PERCENTUAL": store.cadastroCartao.PERCENTUAL
            } 
 );

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: store.baseApiHTTPS+'/cartao',
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
    store.cadastroCartao.ID=0
    
     
    
 }

 function deleteItem(props){
    store.editando = false
    store.cadastroCartao.ID=0
    
    var data =   {"ID" : props.ID}  

                var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: store.baseApiHTTPS+'/cartao',
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

   
 
</script>
