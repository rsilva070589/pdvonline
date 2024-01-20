<template>
 <div style="margin-top: -90px;">
        <div style="font-size: 35px;">
            Fechamento Caixa
        </div> 
 
    <div style="display: flex;  ">
        <div  >
            <Filtros /> 
        </div> 
        <div    v-if="store.filtro.dataInicial && store.filtro.dataFinal"
                style="margin-top: 17px;">
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

    <div v-if="!store.editando"
    style="padding: 10px 45px 0px 0px; width: 500px;">
    
        <table style="background-color: white;" role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                <thead role="rowgroup" class="">
                    <tr role="row" class="">
                        <th role="columnheader" scope="col" aria-colindex="1" class=""><div>#</div></th>
                        <th role="columnheader" scope="col" aria-colindex="2" class=""><div>TIPO</div></th>
                        <th role="columnheader" scope="col" aria-colindex="3" class="" style="text-align: center;"><div>R$</div></th> 
                    </tr>
                </thead> 
                <tbody v-for="(item, i) in store.formasPagamentos" :key="item.name" role="rowgroup">
                    <tr role="row" class="">
                        <td aria-colindex="1" role="cell" class="">{{ item.ID }}</td>
                        <td aria-colindex="2" role="cell" class="">{{ item.DESCRICAO }}</td>
                        <td aria-colindex="3" role="cell" style="text-align: right;">{{ formataDinheiro(somaValor(store.itensRelVendas.filter(f => f.FORMA_PGTO==item.ID && f.TIPO_VENDA=='NORMAL').map(x => x.VLR)))}}</td> 
                        <td>
                    </td>                       
                    </tr>

                </tbody>
            </table>
            <div style="text-align: right; font-size: 20px; color: blue;">
                Total: {{ formataDinheiro(somaValor(store.itensRelVendas.filter(f => f.TIPO_VENDA=='NORMAL').map(x => x.VLR))) }}
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
    useMeta({ title: 'Multiple Tables' });
    const store = indexStore(); 
    const code_arr = ref([]); 

 
  onMounted(() => {
        bind_data();
    });

    const bind_data = async  () => { 

       store.formasPagamentos = []
       var result = await axios.get(store.baseApiHTTPS+'/formapagamento')  
       result.data.map(x=> {
        const itens ={
            ID: x.id, 
            DESCRICAO: x.descricao
       }
       store.formasPagamentos.push(itens)
       }) 
        store.recursos.progress = false

    }

    function getVendas(dataIni, dataFim){
        store.itensRelVendas = []

        let data = JSON.stringify({
        "DATAINI": dataIni,
        "DATAFIM": dataFim
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
                    TIPO_VENDA: x.tipo_venda
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
    

     
    
</script>