<template> 
    <div class="layout-px-spacing" style="margin-top: 0px;">
        <h2 class="text-2xl font-medium mx-2" data-testid="statements-title-txt">Demanda Mensal de Produtos</h2>
        <div> 
</div>
 
 
<Progress v-if="store.recursos.progress" />

<div v-if="!store.recursos.progress">
 
 <div style="font-size: 17px;">
 Estoque para os proximos:
                                        <select  v-model="store.tipoDemanda">
                                            <option disabled value="">Selecione</option> 
                                            <option>PROXIMO-ACABAR</option>
                                            <option>ITENS-ZERADOS</option>                                                                            
                                        </select>
 </div>

 <div  
        v-if="!store.editando"
        class="conteudo"
        style="padding: 10px 45px 0px 0px; 
                 width: 750px; 
            max-height: 80vh;">
    
        <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                <thead role="rowgroup" class="">
                    <tr role="row" class="">
                        <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                        <th role="columnheader" scope="col" aria-colindex="2" class=""><div>codigo</div></th>
                        <th role="columnheader" scope="col" aria-colindex="3" class=""><div>NOME</div></th>
                        <th role="columnheader" scope="col" aria-colindex="4" class=""><div>QTDE-ESTOQUE</div></th>
                        <th role="columnheader" scope="col" aria-colindex="5" class=""><div>QTDE-VENDAS</div></th>                     
                    </tr>
                </thead>
                <tbody v-for="(item, IndexID) in store.itensRelDemanda.filter(f=> f.tipo == store.tipoDemanda)" :key="IndexID" role="rowgroup">
                    <tr role="row" >
                        <td aria-colindex="1" role="cell" class=""> {{IndexID }}   </td>
                        <td aria-colindex="2" role="cell" class=""> {{item.codigo_barras }}   </td>
                        <td aria-colindex="2" role="cell" class=""> {{item.nome }}   </td>
                        <td aria-colindex="2" role="cell" class=""> {{item.qtde_estoque }}   </td>
                        <td aria-colindex="2" role="cell" class=""> {{item.qtde_vendas }}   </td>    
                            
                       
                                      
                    </tr> 
                    
                </tbody>
            </table> 
    </div>

    
</div>
       
    </div>
</template>

<script setup>
    import Progress from '@/components/Progress.vue';
    import {indexStore,useUserStore} from '../../store/indexStore' 
    import { onMounted, ref } from 'vue';
    import axios from 'axios'
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Multiple Tables' });
    const store = indexStore(); 
    const code_arr = ref([]);
    const storeLogin = useUserStore();
    //table 1

    store.recursos.progress = true

    store.tipoDemanda = ''

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

 
      
 
    onMounted(() => {
        bind_data();
    });

    const bind_data = async  () => {
        store.itensRelDemanda = []
 
   // var result = await axios.get('http://localhost:4141/demanda') 
      
   //"SCHEMA": storeLogin.empresas?.schema 
        //table 2 

      const getDemanda = ()=> {
        let data = JSON.stringify({
         "SCHEMA": "MERCEARIABRAGATTO"
            });

            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: store.baseApiHTTPS+'/demanda',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };

            axios.request(config)
            .then((response) => { 
            store.itensRelDemanda = response.data
            store.recursos.progress = false
            })
            .catch((error) => {
            console.log(error);
            });
      }
      getDemanda()
         
 
        

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
