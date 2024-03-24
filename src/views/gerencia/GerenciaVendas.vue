<template> 
    <div style="margin-top: -50px;">
           <div style="font-size: 35px;">
               Gerencia de Vendas
           </div> 
    
       <div style="display: flex;  ">
           <div  >
               <Filtros /> 
           </div> 
           <div    v-if="store.filtro.dataInicial && store.filtro.dataFinal"
           style=" 
                            margin-top: 18px;
                            height: 35px;                       
                            "
                  >
               <div 
                   class="btn btn-primary mt-3"
                   @click="getVendas(tomorrow(store.filtro.dataInicial),tomorrow(store.filtro.dataFinal))"
                           >
                   buscar
               </div>
           </div> 
           
           
       </div>
   
       <div v-if="store.itensRelVendas.length > 0" class="conteudo"
        style="padding: 10px 45px 0px 0px; 
                 width: 1000px; 
            max-height: 70vh;"
        >
        <div v-if="!store.editando" 
       style="padding: 10px 45px 0px 0px; width: 900px;">
       
           <table  style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                   <thead role="rowgroup" class="">
                       <tr role="row" class="">
                           <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                           <th role="columnheader" scope="col" aria-colindex="2" class=""><div>ID</div></th>
                           <th role="columnheader" scope="col" aria-colindex="3" class=""><div>DATA</div></th>
                           <th role="columnheader" scope="col" aria-colindex="4" class="" style="text-align: center;"><div>R$</div></th> 
                           <th role="columnheader" scope="col" aria-colindex="5" class=""><div>PGTO</div></th>
                           <th role="columnheader" scope="col" aria-colindex="5" class=""><div>TIPO</div></th>
                           <th role="columnheader" scope="col" aria-colindex="5" class=""><div>actions</div></th>
                       </tr>
                   </thead> 
                   <tbody v-for="(item, i) in store.itensRelVendas" :key="item.name" role="rowgroup">
                       <tr role="row" class="">
                        <td aria-colindex="1" role="cell" class="">{{ i }}</td>
                           <td aria-colindex="2" role="cell" class="">{{ item.ID }}</td>
                           <td aria-colindex="3" role="cell" class="">{{ dataFormatada(item.DATA) }}</td>
                           <td aria-colindex="4" role="cell" style="text-align: right;">{{ formataDinheiro( item.VLR) }}</td> 
                           <td aria-colindex="5" role="cell" class="">{{ store.formasPagamentos?.filter(f => f.ID == item.FORMA_PGTO).map(x => x.DESCRICAO)[0]  }}</td>
                           <td aria-colindex="6" role="cell" class="">{{ item.TIPO_VENDA }}</td>
                           <td>
                            <td>
                                <span @click="selectItemEdit(item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                </span>
                            
                                <span @click="deleteItem(item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </span>
                              </td>    
                       </td>                       
                       </tr>
   
                   </tbody>
               </table> 
       </div>   
       </div>
       <div style="text-align: center; font-size: 20px; color: blue;">
                   Total: {{ formataDinheiro(somaValor(store.itensRelVendas.filter(f => f.TIPO_VENDA=='NORMAL').map(x => x.VLR))) }}
               </div> 
   </div>
   
   
   </template>
   
   <script setup>
       import Progress from '@/components/Progress.vue';
       import {indexStore,useUserStore} from '../../store/indexStore' 
       import { onMounted, ref } from 'vue';
       import axios from 'axios'
       import { useMeta } from '@/composables/use-meta';
       import Filtros from './Filtros.vue'
       useMeta({ title: 'Multiple Tables' });
       const store = indexStore(); 
       const code_arr = ref([]); 
       const storeLogin = useUserStore();
    
     onMounted(() => {
        store.itensRelVendas = []
           bind_data();
       });
   
       const bind_data = async  () => { 
   
          store.formasPagamentos = []
          const getFormasPgto = ()=> {
                let data = JSON.stringify({
            "SCHEMA": storeLogin.empresas?.schema 
            });

            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: store.baseApiHTTPS+'/GetFormapagamento',
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
                        DESCRICAO: x.descricao,
                        PERCENTUAL: x.taxa         
                }
                store.formasPagamentos.push(itens)
                }) 
            })
            .catch((error) => {
            console.log(error);
            });
            }

            getFormasPgto()


           store.recursos.progress = false
   
       }
   
       function getVendas(dataIni, dataFim){
           store.itensRelVendas = []
   
           let data = JSON.stringify({
           "DATAINI": dataIni,
           "DATAFIM": dataFim,
           "SCHEMA": storeLogin.empresas?.schema 
           });
   
           let config = {
           method: 'post',
           maxBodyLength: Infinity,
           url: store.baseApiHTTPS+'/periodovendas',
           headers: { 
               'Content-Type': 'application/json'
           },
           data : data
           };
   
           axios.request(config)
           .then((response) => {
               response.data.filter(f => f.tipo_venda=='NORMAL').map(x =>{
                   const dados = { 
                       ID: x.id,
                       DATA: x.data,
                       CATGO: x.categoria,
                       PRODUTO: x.cod_produto,
                       NOME: x.nome,
                       QTDE: x.qtde,
                       NOME: x.nome, 
                       VLR: x.valor,
                       CUSTO: x.custo,
                       LUCRO: arredonda(x.lucro,2),
                       PERC_LUCRO: arredonda(x.perc_lucro,2),
                       FORMA_PGTO: x.forma_pgto,
                       MES: x.mes,
                       TIPO_VENDA: x.tipo_venda,
                       ITENS: x.itens
                   } 
                   store.itensRelVendas.push(dados)
               })
           })
           .catch((error) => {
           console.log(error);
           }); 
       }
   
       var arredonda = function(numero, casasDecimais) {   
       casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 0;
       numero = typeof numero !== 'undefined' ?  numero : 0;
       return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
       };
   
       function somaValor(array) { 
               var arr =  array     
               var sum = 0; 
               for(var i =0;i<arr.length;i++){ 
                 sum+=arr[i]; 
               }  
                
               return sum
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
   
      function dataFormatada(d){ 
           var data =  new Date(d),
               dia  = data.getDate().toString(),
               diaF = (dia.length == 1) ? '0'+dia : dia,
               mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
               mesF = (mes.length == 1) ? '0'+mes : mes,
               anoF = data.getFullYear();
           return diaF+"/"+mesF+"/"+anoF;
           }
   
    function tomorrow  (dt)  {
     
     // Creating the date instance
     let d = new Date(dt);
   
     // Adding one date to the present date
     d.setDate(d.getDate() + 1);
   
     let year = d.getFullYear()
     let month = String(d.getMonth() + 1)
     let day = String(d.getDate())
     let mes = null
   
     // Adding leading 0 if the day or month
     // is one digit value
     month = month.length == 1 ? 
         month.padStart('2', '0') : month;
   
      //   if(month == '01'){ mes = 'Jan' }
      //   if(month == '02'){ mes = 'Feb' }
      //   if(month == '03'){ mes = 'Mar' }
      //   if(month == '04'){ mes = 'Apr' }
      //   if(month == '05'){ mes = 'May' }
      //   if(month == '06'){ mes = 'Jun' }
      //   if(month == '07'){ mes = 'Jul' }
      //   if(month == '08'){ mes = 'Aug' }
      //   if(month == '09'){ mes = 'Sept' }
      //   if(month == '10'){ mes = 'Oct' }
      //   if(month == '11'){ mes = 'Nov' }
      //  if(month == '12'){ mes = 'Dec' }        
   
   
     day = day.length == 1 ? 
         day.padStart('2', '0') : day;
   
     // Printing the present date 
     return(`${day}/${month}/${year}`);
     }
       
     function deleteItem(props){
        console.log(props)
    store.editando = false
    store.cadastroProduto.ID=0
 
    
    
    var data =   {"ID" : props.ID, "SCHEMA": storeLogin.empresas?.schema, "ITENS": props.ITENS }  

                var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url:  store.baseApiHTTPS+'/vendas' ,
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
                };

                axios(config)
                .then(function (response) {
                    getVendas(tomorrow(store.filtro.dataInicial),tomorrow(store.filtro.dataFinal))
 
                })
                .catch(function (error) {
                console.log(error);
                });
 
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