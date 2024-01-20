<template> 

<div v-if="!storeLogin.empresas.login">
    usuario nao logado
 </div>
    {{     login() }}
 
 <div v-if="storeLogin.empresas">
    <PDV></PDV>
 </div>
    
    
  
</template>
 
<script setup>
    import '@/assets/sass/widgets/widgets.scss';
    import { computed, ref } from 'vue';
    import { useStore } from 'vuex';
    import { indexStore, useUserStore } from './../store/indexStore' 
    import ApexChart from 'vue3-apexcharts';    
    import { useMeta } from '@/composables/use-meta';
    import axios from 'axios';
    import { useRouter } from "vue-router"; 
    import Progress from '@/components/Progress.vue';
    import Filtros from './relatorios/Filtros.vue'
    import PDV from './pdv/Pdv.vue'
    
    useMeta({ title: 'Dashboard' });
    const storeLogin = useUserStore()  
    const router = useRouter() 
    const store = indexStore(); 
    

    
      
    store.carregando = false 
    store.esconderFiltroEmpresa = false
    

    function login (){ 
          switch (storeLogin.empresas.login) {
          case true:
              console.log('usuario logado') 
             
              break; 
          default:
              console.log('precisa fazer login') 
              router.push('/auth/login')           
          } 
    }



  

  function logout(){ 
    storeLogin.empresas.sucess =false
    console.log( storeLogin.empresas.sucess ) 
    router.push('/auth/login') 
  }

   

    store.filtro= { 
        empresa: 'CENTRAL',
        dataInicial:  dataFormatada(new Date()),
        dataFinal:    dataFormatada(new Date())
    }

    function filtros(){
        store.dataErrada = false
        if(storeLogin.empresas?.sucess && store.filtro.dataFinal >= store.filtro.dataInicial){
            store.relLoja = []
            store.relVendedores = []
            store.relAnual = []
            store.relContas = []
            store.Progress = true
        getTypeRel(storeLogin.empresas.databasecliente,store.filtro.empresa,store.filtro.dataInicial,store.filtro.dataFinal,1)
        getTypeRel(storeLogin.empresas.databasecliente,store.filtro.empresa,store.filtro.dataInicial,store.filtro.dataFinal,2)
        getTypeRel(storeLogin.empresas.databasecliente,store.filtro.empresa,store.filtro.dataInicial,store.filtro.dataFinal,3)
        getTypeRel(storeLogin.empresas.databasecliente,store.filtro.empresa,store.filtro.dataInicial,store.filtro.dataFinal,4)
        if(store.detectar_mobile()){
                    window.scrollTo(0, 310);
                    console.log('window.scrollTo')
                }
        } else{
            store.dataErrada = true
        }
    }

    filtros()
    
    async function getTypeRel (DataBaseCliente,ComboEmpresas,DataInicial,DataFinal,TypeRel) {
            let data = JSON.stringify({
            "databasecliente": DataBaseCliente,
            "comboempresas": ComboEmpresas,
            "datainicial": DataInicial,
            "datafinal": DataFinal,
            "typerel": TypeRel
            });

            console.log('TypeRel: '+TypeRel +' DataInicial: '+DataInicial+' DataInicial: '+DataFinal)

            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url:  store.ulrprincipal+'/evento/report',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy'
            },
            data : data
            };

            await axios.request(config)
            .then((response) => {   
                if(TypeRel == 1){ 
                    store.relLoja = response.data.dados 
                }
                if(TypeRel == 2){
                    
                    store.relVendedores = response.data.dados
                }
                if(TypeRel == 3){ 
                    store.relAnual = response.data.dados 
                } 
                if(TypeRel == 4){ 
                    store.relContas = response.data.dados 
                } 
               
                store.Progress = false
                return response  
            
            })
            .catch((error) => {
            console.log(error);
            store.Progress = false
            });

         
    } 
 

    function dataFormatada(d){ 
    var data =  new Date(d),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-"+diaF;
    }
  


    
    function somaValor(array) { 
        if(array) {
            var arr =  array     
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i]; 
        }   
        }
   
        return (sum)
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

 
  
    //Simple Bar
   
       //Simple Bar
       const options_5 = computed(() => {
        return {
            chart:      { toolbar: { show: false }, zoom: { enabled: false }, }, 
            dataLabels: { enabled: false }, stroke: { curve: 'straight' },
            title:      { align: 'left', style: { fontWeight: 'normal' } },
            grid:       { row: { colors: ['#f1f2f3', 'transparent'], opacity: 0.5 } },
            xaxis:      { categories: store.relVendedores.map(x => x.loginfuncionario)  },
        };
    });
      //Simple Bar
    

    //unique visitors
   
    const unique_visitor_options = computed(() => {
        
        return {
            chart: { height: 350,      type: 'bar'},
            dataLabels: { enabled: !store.detectar_mobile(), formatter: function (val) {return "R$ " +formataDinheiro(val) },
              offsetY: -20,
              style: {
                fontSize: '11px',
                colors: ["#888EA8"]
              }              
            },
             
            colors: ['#5c1ac3'],
            
           

            plotOptions: {
              bar: {
                columnWidth: '90%',
                borderRadius: 0,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            legend: { position: 'bottom', horizontalAlign: 'center', fontSize: '14px', markers: { width: 12, height: 12 }, itemMargin: { horizontal: 7, vertical: 8 } },
            grid: { borderColor:  '#e0e6ed' },
            xaxis: {
                categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                axisBorder: { show: true, color:   '#e0e6ed' },
                
            },
            yaxis: {
                tickAmount: 6,
            },
            fill: {
                type: 'gradient',
                gradient: { shade:  'light', type: 'vertical', shadeIntensity: 0.3, inverseColors: false, opacityFrom: 1, opacityTo: 0.8, stops: [0, 100] },
            },
            tooltip: {
                theme:  'light',
                y: {
                    formatter: function (val) {
                        return val;
                    },
                },
            },
        };
    });


// vendas por empresa
 
 
const chartOptions = computed(() => {

    return {
        chart: {
              height: 350,
              type: 'bar',
              events: {
                click: function(chart, w, e) {
                  // console.log(chart, w, e)
                }
              }
            },
            colors: ['#5c1ac3', '#ffbb44','#A52A2A','#5F9EA0','#8B008B','#483D8B','#2F4F4F','#DCDCDC'],
            plotOptions: {
              bar: {
                columnWidth: '80%',
                distributed: true,
              }
            },
            
            dataLabels: { enabled: !store.detectar_mobile(), formatter: function (val) {return "R$ " +formataDinheiro(val) },
            offsetY: -20,
            style: {fontSize: '11px',colors: ["#888EA8"]
              } },
            legend: {
              show: false
            }, 
            plotOptions: { 
              bar: {
                columnWidth: '80%',
                distributed: true,
                borderRadius: 0,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
              
            },
            
            xaxis:      { categories: store.relLoja.map(x => x.identificacaointegracao) }
    }
             
          })

 //Statistics
 const total_visit_series = ref([{ data: [21, 9, 36, 12, 44, 25, 59, 41, 66, 25] }]);
    const total_visit_options = computed(() => {
     
        return {
            chart: { sparkline: { enabled: true }, dropShadow: { enabled: true, top: 3, left: 1, blur: 3, color: '#009688', opacity: 0.7 } },
            stroke: { curve: 'smooth', width: 2 },
            markers: { size: 0 },
            colors: ['#009688'],
            grid: { padding: { top: 0, bottom: 0, left: 0 } },
            tooltip: {
                theme:   'light',
                x: { show: false },
                y: {
                    title: {
                        formatter: function formatter() {
                            return '';
                        },
                    },
                },
            },
            responsive: [{ breakPoint: 576, options: { chart: { height: 95 }, grid: { padding: { top: 45, bottom: 0, left: 0 } } } }],
        };
    });   
    
    const paid_visit_series = ref([{ data: [22, 19, 30, 47, 32, 44, 34, 55, 41, 69] }]);
    const paid_visit_options = computed(() => {
         
        return {
            chart: { sparkline: { enabled: true }, dropShadow: { enabled: true, top: 1, left: 1, blur: 2, color: '#e2a03f', opacity: 0.7 } },
            stroke: { curve: 'smooth', width: 2 },
            markers: { size: 0 },
            colors: ['#e2a03f'],
            grid: { padding: { top: 0, bottom: 0, left: 0 } },
            tooltip: {
                theme:  'light',
                x: { show: false },
                y: {
                    title: {
                        formatter: function formatter() {
                            return '';
                        },
                    },
                },
            },
            responsive: [{ breakPoint: 576, options: { chart: { height: 95 }, grid: { padding: { top: 35, bottom: 0, left: 0 } } } }],
        };
    });


  

const options_7 = computed(() => {
     
     return {
        chart: { toolbar: { show: false } },
        colors: ['#2a37ff','#ffa500','#ff2717'],
        labels: ['Pagas','A Vencer', 'Vencidas'],
        responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }]
     };
 });   

    


</script>

<style>    
 
.filtrosWebButton { 
 min-height: 43px;   
 margin-top: 23px; 
}
.filtrosMobileButton { 
 margin-top: -20px;    
 min-height:  43px;    
}
 
</style>

