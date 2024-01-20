<template>



 <div style="margin-top: -100px;">

    <div style="font-size: 30px;">
        Extrato Financeiro
    </div>
 
    <div  style="display: flex;  " v-if="!store.editando">
        <div style="margin-top: 35px;"
        v-if="!store.editando"
         @click="store.editando = true; 
                store.editando1 = false;
                      store.cadastroProduto = [];
                      store.cadastroFinanceiro.ID=0;
                      limpaCadastro()">

    <svg version="1.1" id="Capa_1" width="30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 50 50" xml:space="preserve">
        <circle style="fill:#43B05C;" cx="25" cy="25" r="25"/>
        <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="25" y1="13" x2="25" y2="38"/>
        <line style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="37.5" y1="25" x2="12.5" y2="25"/>
    </svg>
    </div>

        <div  >
            <Filtros /> 
        </div> 
        <div v-if="store.filtro.dataInicial && store.filtro.dataFinal" style="margin-top: 17px;">
            <div style="background-color: rgb(153, 193, 134);
                    margin-top: 35px;
                    height: 35px;
                    "
            class="btn btn-primary mt-3"
            @click="getVendas(tomorrow(store.filtro.dataInicial),tomorrow(store.filtro.dataFinal))"
                    >
            buscar
        </div>
        </div>  
        
    </div>


    <div  
        v-if="!store.editando"
        class="conteudo"
        style="padding: 10px 45px 0px 0px; 
                 width: 750px; 
            max-height: 70vh;">
    
        <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                <thead role="rowgroup" class="">
                    <tr role="row" class="">
                        <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                        <th role="columnheader" scope="col" aria-colindex="2" class=""><div>DATA</div></th>
                        <th role="columnheader" scope="col" aria-colindex="3" class=""><div>CONTA</div></th>
                        <th role="columnheader" scope="col" aria-colindex="4" class=""><div>ORIGEM</div></th>
                        <th role="columnheader" scope="col" aria-colindex="5" class=""><div>FINALIDADE</div></th>
                        <th role="columnheader" scope="col" aria-colindex="6" class="" style="text-align: center;">R$</th> 
                        <th role="columnheader" scope="col" aria-colindex="5" class=""><div>#</div></th>
                        <th role="columnheader" scope="col" aria-colindex="7" class=""><div>OBS</div></th>
                        <th role="columnheader" scope="col" aria-colindex="7" class=""><div>ACTION</div></th>
                    </tr>
                </thead>
                <tbody v-for="(item, IndexID) in store.itensRelFinanceiro" :key="IndexID" role="rowgroup">
                    <tr role="row" >
                        <td aria-colindex="1" role="cell" class=""><div :class="(item.CREDITO_DEBITO =='C' ) ? 'credito' : 'debito'">{{ item.ID }}</div> </td>
                        <td aria-colindex="2" role="cell" class=""><div :class="(item.CREDITO_DEBITO =='C') ? 'credito' : 'debito'"> {{ dataFormatada(item.DATA) }}</div> </td>
                        <td aria-colindex="3" role="cell" class=""><div :class="(item.CREDITO_DEBITO =='C') ? 'credito' : 'debito'">{{ item.CONTA }}</div> </td>
                        <td aria-colindex="4" role="cell" class=""><div :class="(item.CREDITO_DEBITO =='C') ? 'credito' : 'debito'">{{ item.ORIGEM }}</div> </td>
                        <td aria-colindex="5" role="cell" class=""><div :class="(item.CREDITO_DEBITO =='C') ? 'credito' : 'debito'">{{ item.FINALIDADE }}</div> </td> 
                        <td aria-colindex="6" role="cell" class=""><div :class="(item.CREDITO_DEBITO =='C') ? 'credito' : 'debito'">{{ item.VALOR }}</div>  </td> 
                        <td aria-colindex="7" role="cell" class=""><div :class="(item.CREDITO_DEBITO =='C') ? 'credito' : 'debito'">{{ item.CREDITO_DEBITO }}</div> </td>
                        <td aria-colindex="8" role="cell" class=""><div :class="(item.CREDITO_DEBITO =='C') ? 'credito' : 'debito'">{{ item.OBS }}</div> </td>
                        <td>
                            
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
    <div v-if="store.itensRelFinanceiro && !store.editando"
                 style="text-align: center; font-size: 20px; color: blue;">
                <span style="align-items: center;">Saldo {{  formataDinheiro(somaValor(store.itensRelFinanceiro?.map(x => parseFloat(x.VALOR)))) }}</span>
            </div>
   
    <div v-if="store.editando">
            <div class="row layout-top-spacing"
                           > 
          <div class="col-xl-10 col-lg-6 col-md-6 col-sm-10 col-10" style="margin-bottom: 24px">
                <div class="statbox panel box box-shadow">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                <h4>Inserir Itens Financeiros</h4>
                            </div>
                        </div>   
                    </div>
                    <div class="panel-body">
                        <div > 
                        
                  

                            <div class="row">
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="DATA">DATA</label>
                                    <div>
                                       
                                        <input  v-if="!store.editando1" type="date" v-model="store.cadastroFinanceiro.DATA"  data-date-format="DD MM YYYY"
                                                class="form-control"
                                                @click="store.dataErrada=false"         
                                                >

                                       <div v-if="store.editando1" style="font-size: 23px;">
                                        {{ store.cadastroFinanceiro.DATA }}
                                       </div>
                                    </div>
                                </div>

                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="CONTA">CONTA</label>
                                    <div>
                                        <select class="form-control" style="height: 44px; width: 130px;"
                                        v-model="store.cadastroFinanceiro.CONTA"   
                                        >  
                                            <option v-for="c, indexC in store.categorias?.filter(f => f.TIPO=='CONTA')" :key="indexC"
                                            :value="c.ID"
                                            >
                                                {{c.DESCRICAO}}
                                            </option>   
                                        </select>
                                    </div>
                                </div>
                           
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="ORIGEM">ORIGEM</label>
                                    <div>
                                        <select class="form-control" style="height: 44px; width: 130px;"
                                        v-model="store.cadastroFinanceiro.ORIGEM"   
                                        >  
                                            <option v-for="c, indexC in store.categorias?.filter(f => f.TIPO=='ORIGEM')" :key="indexC"
                                            :value="c.ID"
                                            >
                                                {{c.DESCRICAO}}
                                            </option>   
                                        </select>
                                    </div>
                                </div>


                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="FINALIDADE">FINALIDADE</label>
                                    <div>
                                        <select class="form-control" style="height: 44px; width: 130px;"
                                        v-model="store.cadastroFinanceiro.FINALIDADE"   
                                        >  
                                            <option v-for="c, indexC in store.categorias?.filter(f => f.TIPO=='FINALIDADE')" :key="indexC"
                                            :value="c.ID"
                                            >
                                                {{c.DESCRICAO}}
                                            </option>   
                                        </select>
                                    </div>  
                                </div> 
                            </div>       
 

                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="col-form-label pt-0" for="OBS">OBS</label>
                                    <div>
                                        <input v-model="store.cadastroFinanceiro.OBS"  type="text" id="OBS" class="form-control" placeholder="OBS" />
                                    </div>
                                </div>
                               
                              

                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="password">VALOR</label>
                                    <div>
                                        <input v-model="store.cadastroFinanceiro.VALOR"  type="text" id="VALOR" class="form-control" placeholder="VALOR" />
                                    </div>
                                </div> 
                             
                                
                                
                            </div>  
                            
                            <button v-if="store.cadastroFinanceiro.DATA
                                        && store.cadastroFinanceiro.CONTA
                                        && store.cadastroFinanceiro.ORIGEM
                                        && store.cadastroFinanceiro.FINALIDADE
                                        && store.cadastroFinanceiro.OBS
                                        && store.cadastroFinanceiro.VALOR 
                                        " 
                            @click="confirmar(store.cadastroFinanceiro.ID)" type="" class="btn btn-primary mt-3">CONFIRMAR</button>
                            <button style="margin-left: 10px;" @click="store.editando = false " type="" class="btn btn-danger mt-3">CANCELAR</button>
                      
                        </div>
                    </div>
                </div>
            </div>

             
        </div>
    </div>
</div>
 
</template>

<script setup>
 import Progress from '@/components/Progress.vue';
    import {indexStore} from '../../store/IndexStore' 
    import { onMounted, ref } from 'vue';
    import axios from 'axios'
    import { useMeta } from '@/composables/use-meta';
    import Filtros from './Filtros.vue'
import { formatDate } from '@fullcalendar/vue3';
    useMeta({ title: 'Multiple Tables' });
    const store = indexStore(); 
    const code_arr = ref([]); 

 
  onMounted(() => {
        bind_data();
        store.cadastroFinanceiro = {}
        store.categoria = []
    });

    const bind_data = async  () => { 
        store.itensRelFinanceiro = []
        store.categorias = []
       var result = await axios.get(store.baseApiHTTPS+'/categoria')  
       result.data.map(x=> {
        const itens ={
            ID: x.id, 
            DESCRICAO: x.descricao,
            TIPO: x.tipo,
            CREDITO_DEBITO: x.credito_debito
       }
       store.categorias.push(itens)
       }) 
        store.recursos.progress = false

    }

    function getVendas(dataIni, dataFim){
        store.itensRelFinanceiro = []

        let data = JSON.stringify({
        "DATAINI": dataIni,
        "DATAFIM": dataFim
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: store.baseApiHTTPS+'/periodofinanceiro',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
            response.data.map(x =>{
                const dados = { 
                    ID: x.id,
                    DATA: x.data,
                    CONTA: x.conta,
                    ORIGEM: x.origem,
                    FINALIDADE: x.finalidade,
                    OBS: x.obs,
                    VALOR: x.valor,
                    CREDITO_DEBITO: x.credito_debito
                } 
                store.itensRelFinanceiro.push(dados)
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

        function dataFormatadaFiltro(d){ 
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

 function editItem(id){        
        console.log('Editando Item ID: '+id)
        console.log('NOMENCLATURA '+ store.cadastroProduto.NOMENCLATURA)

        let valor = store.cadastroFinanceiro.VALOR
         if (store.categorias?.filter(f=> f.ID == store.cadastroFinanceiro.FINALIDADE && f.TIPO == 'FINALIDADE').map(x => x.CREDITO_DEBITO) == 'D'){
        valor = valor *-1 
        }


        
    var data = 
    JSON.stringify (   {  
            "DATA":         store.cadastroFinanceiro.DATA, 
            "CONTA":        store.cadastroFinanceiro.CONTA, 
            "ORIGEM":       store.cadastroFinanceiro.ORIGEM, 
            "FINALIDADE":   store.cadastroFinanceiro.FINALIDADE, 
            "OBS":          store.cadastroFinanceiro.OBS, 
            "VALOR":        valor
            } 
             )

    var config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: store.baseApiHTTPS+'/financeiro/'+id,
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
    let valor = store.cadastroFinanceiro.VALOR
    if (store.categorias?.filter(f=> f.ID == store.cadastroFinanceiro.FINALIDADE && f.TIPO == 'FINALIDADE').map(x => x.CREDITO_DEBITO) == 'D'){
        valor = valor *-1 
        }


var data = JSON.stringify( 
            {  
            "DATA":         store.cadastroFinanceiro.DATA, 
            "CONTA":        store.cadastroFinanceiro.CONTA, 
            "ORIGEM":       store.cadastroFinanceiro.ORIGEM, 
            "FINALIDADE":   store.cadastroFinanceiro.FINALIDADE, 
            "OBS":          store.cadastroFinanceiro.OBS, 
            "VALOR":        valor
            } 
 );

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: store.baseApiHTTPS+'/financeiro',
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

 function selectItemEdit (props) {
        store.editando = true
        store.editando1 = true
        console.log(props)      
        store.cadastroFinanceiro.ID =props.ID,   
        store.cadastroFinanceiro.DATA = dataFormatadaFiltro(props.DATA), 
        store.cadastroFinanceiro.CONTA= store.categorias?.filter(f=> f.DESCRICAO == props.CONTA).map(x => x.ID)[0]  , 
        store.cadastroFinanceiro.ORIGEM=store.categorias?.filter(f=> f.DESCRICAO == props.ORIGEM).map(x => x.ID)[0], 
        store.cadastroFinanceiro.FINALIDADE=store.categorias?.filter(f=> f.DESCRICAO == props.FINALIDADE).map(x => x.ID)[0], 
        store.cadastroFinanceiro.OBS=props.OBS, 
        store.cadastroFinanceiro.VALOR=''
    }

    function limpaCadastro(){
        store.editando = true
        console.log('limpando cadastro')
        
        store.cadastroFinanceiro.DATA ='', 
        store.cadastroFinanceiro.CONTA='', 
        store.cadastroFinanceiro.ORIGEM='', 
        store.cadastroFinanceiro.FINALIDADE='', 
        store.cadastroFinanceiro.OBS='', 
        store.cadastroFinanceiro.VALOR=''
    }
   



 function deleteItem(props){
    store.editando = false
    store.cadastroProduto.ID=0
    
    var data =   {"ID" : props.ID}  

                var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url:  store.baseApiHTTPS+'/financeiro/'+props.ID,
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
 

<style>    
.credito {
 color: rgb(1, 98, 6) 
}
.debito {
 color: red 
} 
.conteudo { 
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    overflow-x: auto;
}

</style>

 