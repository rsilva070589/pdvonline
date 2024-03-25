<template>
 

<div style="margin-top: 0px">   
    <div style="display: flex;  ">
        <Filtros />
        <div     v-if="store.filtro.dataInicial && store.filtro.dataFinal"
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
    <div> 
</div>




    <div v-for="mes,indexMes in []" :key="indexMes">
        {{mes}} - {{ formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.DATA == mes).map(x => x.VALOR))) }}   
    </div>   

    <div style="max-width: 90%;" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing" v-if="store.relAnual"> 
                <div class="widget widget-unique-visitors">
                    <div class="widget-heading">
                        <h5>Vendas Total Mensal</h5>
                        <div class="task-action">
                            <div class="dropdown btn-group">
                                <a href="javascript:;" id="ddlVisitors" class="btn dropdown-toggle btn-icon-only" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
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
                               
                            </div>
                        </div>
                    </div>

                    <div class="widget-content">
                        <apex-chart  v-if="unique_visitor_options" height="350" type="bar" 
                            :options="unique_visitor_options" 
                            :series=" [{name: 'Vendas' ,data: store.relAnual?.map(x => x.total)},{name: 'Lucro' ,data: store.relAnualLucro?.map(x => x.total)}]  "
                            >
                        </apex-chart>

                    </div>
                </div>
            </div>
 
 
</div>
</template>

<script setup> 
    import Progress from '@/components/Progress.vue';   
    import { onMounted, ref, computed } from 'vue';
    import axios from 'axios'
    import { useMeta } from '@/composables/use-meta';
    // import Filtros from './Filtros.vue'
    import ApexChart from 'vue3-apexcharts';  
    import {indexStore, useUserStore} from '../../store/indexStore'
    import Filtros from './Filtros.vue'
    useMeta({ title: 'Multiple Tables' }); 
    const code_arr = ref([]); 
    const store = indexStore(); 
    const storeLogin = useUserStore();

    store.relAnual = []
    store.anoSelecionado = dataAno(new Date()) 
 

    onMounted(() => {
        bind_data(); 
    });

    const bind_data = async  () => { 
        getFormasPgto()
    }

    store.formasPagamentos = []

const getFormasPgto = () => {
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
          const itens = {
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

    function getVendas(dataIni, dataFim){
        store.itensRelVendas = []

        let data = JSON.stringify({
        "DATAINI": dataIni,
        "DATAFIM": dataFim,
        "SCHEMA": 'MERCEARIABRAGATTO'
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: store.baseApiHTTPS+'/dashboard',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
            response.data.filter(f=> f.tipo_venda=='NORMAL').map(x =>{
    
                const dados = { 
                    ID: x.id,
                    MES: x.data.substring(3,5),
                    ANO: x.data.substring(6,10),
                    CATGO: x.categoria,
                    PRODUTO: x.cod_produto, 
                    VALOR: x.valor,
                    CUSTO: x.custo,
                    LUCRO: arredonda(x.lucro,2), 
                    TIPO_VENDA: x.tipo_venda
                } 
                store.itensRelVendas.push(dados)
            })
            calculaMes()
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

  

        function dataAno(d){ 
        var data =  new Date(d),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return  anoF;
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

  function calculaMes(){
     store.relAnual = [
        {
            mes: 'janeiro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '01' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'fevereiro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '02' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'marco',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '03' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'abril',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '04' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'maio',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '05' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'junho',
            total: (somaValor(store.itensRelVendas.filter(f=> f.MES == '06' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'julho',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '07' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'agosto',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '08' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'setembro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '09' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'outubro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '10' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'novembro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '11' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        },
        {
            mes: 'desembro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '12' && f.ANO==store.anoSelecionado).map(x => x.VALOR)))
        }
    ]  
    store.relAnualLucro = [
        {
            mes: 'janeiro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '01' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'fevereiro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '02' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'marco',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '03' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'abril',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '04' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'maio',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '05' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'junho',
            total: (somaValor(store.itensRelVendas.filter(f=> f.MES == '06' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'julho',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '07' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'agosto',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '08' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'setembro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '09' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'outubro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '10' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'novembro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '11' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        },
        {
            mes: 'desembro',
            total: formataDinheiro(somaValor(store.itensRelVendas.filter(f=> f.MES == '12' && f.ANO==store.anoSelecionado).map(x => x.LUCRO)))
        }
    ]  
  }
   
 
const options_3 =  computed(() => {
    return {
        chart: { toolbar: { show: false } }, 
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, 
        colors: ['transparent'] },
        plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 8 }, },
        xaxis: { categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'], },
        yaxis: { title: { text: '$ (thousands)' } },
        fill: { opacity: 1 },
        tooltip: { y: { formatter: function (val) { return "$ " + val + " thousands" } } }
    }
  
})
 

  const unique_visitor_options = computed(() => {
        
       return {
        chart: { toolbar: { show: false } }, 
         dataLabels: { enabled: !store.detectar_mobile(), formatter: function (val) {return "R$ " +(val) },
              offsetY: -20,
              style: {
                fontSize: '11px',
                colors: ["#000000"]
              }              
            },
        stroke: { show: true, width: 2, 
        colors: ['transparent'] },
        plotOptions: { bar: { horizontal: false, columnWidth: '55%', borderRadius: 8 }, },
        xaxis: { categories: [ 'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro','Outubro','Novembro','Dezembro'], },
        yaxis: { title: { text: '$ (thousands)' } },
        fill: { opacity: 1 },
        tooltip: { y: { formatter: function (val) { return "$ " + val + " thousands" } } }
       }
    });


     
    
</script>