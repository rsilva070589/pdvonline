<template>
    <div class="layout-px-spacing" style="margin-top: 0px; margin-left: -20px;">
        <div style="display: flex;">        
        <div>
            <h2 class="text-2xl font-medium mx-2" data-testid="statements-title-txt">Ticket Médio de Vendas</h2>
        </div>
        <div >
        <input class="form-control" style="height: 44px; width: 110px;  margin: 3px;" playload="mm/yyyy" type="text" v-model="store.mesSelecionado">
        </div>        
        <div class="btn btn-primary" style="height: 40px; width: 100px; margin: 3px;" @click="GetVendas()">
         Buscar
        </div> 
    </div>             
 
 
<Progress v-if="store.recursos.progress" />
 

<div v-if="!store.recursos.progress">
    <div 
        
        style="display: flex;
        flex-wrap: wrap; 
                        margin: 15px 0px 15px 0px;
                    ">

           <div 
           v-if="storeLogin.empresas.acessos.filter(f=> f.cod_acesso == 'A0001').length > 0"
           class="card" style="padding: 10px; width: 200px;height: 120px;border-radius: 10px;
                                    align-items: center; margin: 0px 20px 15px 0px;">
            <span style="font-size: 25px; color: black;">
                Total Mês
            </span> 
            <div style="font-size: 25px; color: forestgreen">
                R$ {{ totalMes()}}
            </div>
         </div>

         <div 
         v-if="storeLogin.empresas.acessos.filter(f=> f.cod_acesso == 'A0001').length > 0"
         class="card" style="padding: 10px;  width: 200px; height: 120px; 
                                 border-radius: 10px; align-items: center;
                                 margin: 0px 20px 15px 0px;
                                 background-color: ;
                                 ">
            <span style="font-size: 22px; color: black; ">
                Lucro Mês
            </span> 
            <div style="font-size: 22px; color: forestgreen">
                R$ {{ lucroMes()}}
                <span style="font-size: 15px; color: blue;">{{formataDinheiro(store.lucroMes * 100 / store.vendasMes)}}%</span> 
            </div>
            
         </div> 

         <div class="card" style="padding: 10px;  width: 200px; height: 120px; 
                                 border-radius: 10px; align-items: center;
                                 margin: 0px 20px 15px 0px;
                                 background-color: ;
                                 ">
            <span style="font-size: 25px; color: black; ">
                Consumo 
            </span> 
            <div style="font-size: 25px; color: rgb(206, 19, 44)">
               - R$ {{ consumoMes()}}
             
            </div>
            
         </div> 

         <div class="card" style="padding: 10px;  width: 200px; height: 120px; 
                                 border-radius: 10px; align-items: center;
                                 margin: 0px 20px 15px 0px;
                                 background-color: ;
                                 ">
            <span style="font-size: 25px; color: black; ">
                Total do Dia
            </span> 
            <div style="font-size: 25px; color: forestgreen">
                R$ {{ vendasHoje()}}
            </div>
            
         </div> 

         <div 
         v-if="storeLogin.empresas.acessos.filter(f=> f.cod_acesso == 'A0001').length > 0"
            class="card" style="padding: 10px; width: 200px;height: 
                                120px;border-radius: 10px; align-items: center;
                                margin: 0px 20px 15px 0px;
                                
                                ">
            <span style="font-size: 25px; color: black;">
                Lucro do Dia
            </span> 
             
            <div style="font-size: 25px; color: forestgreen">
                R$ {{ lucroHoje()}} 
                <span style="font-size: 15px; color: blue;">{{formataDinheiro(store.lucroHoje * 100 / store.vendasHoje)}}%</span> 
            </div>
           
         </div>
       
         <select class="form-control" style="height: 44px; width: 130px;" v-model="store.displayVendasCategoria">
            <option>Esconder</option>  
            <option>Diario</option>
            <option>Mensal</option>                                                     
        </select>
         </div> 

<div v-if="store.displayVendasCategoria == 'Diario'"   style="display: flex;
        flex-wrap: wrap; 
                        margin: 15px 0px 15px 0px;
                    ">
                  
   <div v-for="c,index in store.itensCategoria" :key="index"  style="display: inline-flex;">
        <div class="card" style="padding: 5px; width: 120px;height: 80px;border-radius: 10px;
                                    align-items: center; margin: 0px 20px 15px 0px; ">
            <span style="font-size:20px; color: black;">
                {{ c.DESCRICAO }}
            </span> 
            <div style="font-size: 25px; color: forestgreen">
                  {{ VendasCategoriaDiario(c.DESCRICAO) }}
            </div>
         </div>
    </div>
    
</div>

 
<div v-if="store.displayVendasCategoria == 'Mensal'" style="display: flex;
        flex-wrap: wrap; 
                        margin: 15px 0px 15px 0px;
                    ">
                  
            <div v-for="c,index in store.itensCategoria" :key="index"  style="display: inline-flex;">
            <div class="card" style="padding: 5px; width: 120px;height: 80px;border-radius: 10px;
                                    align-items: center; margin: 0px 20px 15px 0px; ">
            <span style="font-size:20px; color: black;">
                {{ c.DESCRICAO }}
            </span> 
            <div style="font-size: 25px; color: forestgreen">
                  {{ VendasCategoriaMes(c.DESCRICAO) }}
            </div>
         </div>
    </div>
</div>
  
        
        <div v-if="!store.editando">
            <div  >
              
                <div class="panel br-0 p-0 mt-0" >
                    <div class="custom-table">
                        <v-client-table :data="store.itensRelVendas" :columns="columns1" :options="table_option1">
                        
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
    import {indexStore, useUserStore} from '../../store/indexStore' 
    import { onMounted, ref } from 'vue';
    import axios from 'axios'
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Multiple Tables' });
    const store      = indexStore(); 
    const storeLogin = useUserStore();
    const code_arr = ref([]);
    //table 1
   
    store.recursos.progress = true

    var arredonda = function(numero, casasDecimais) {   
    casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 0;
    numero = typeof numero !== 'undefined' ?  numero : 0;
    return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
    };


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

    function vendasHoje(dtfilter) { 
        var arr =  store.itensRelVendas.filter(f => f.DATA==dataAtualFormatada(new Date()) && f.TIPO_VENDA=='NORMAL') 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].VLR; 
        }  
        store.vendasHoje = sum
        return formataDinheiro(sum)
      }
   
      function lucroHoje(dtfilter) { 
        var arr =  store.itensRelVendas.filter(f => f.DATA==dataAtualFormatada(new Date()) && f.TIPO_VENDA=='NORMAL') 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].LUCRO; 
        }  
        store.lucroHoje = sum
        return formataDinheiro(sum)
      }
 
      function totalMes(dtfilter) { 
        var arr =  store.itensRelVendas.filter(f =>   f.TIPO_VENDA=='NORMAL') 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].VLR; 
        }  
        store.vendasMes = sum
        return formataDinheiro(sum)
      }

      function lucroMes(dtfilter) { 
        var arr =  store.itensRelVendas.filter(f => f.TIPO_VENDA=='NORMAL') 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].LUCRO; 
        }  
        store.lucroMes = sum
        return formataDinheiro(sum)
      }

      function consumoMes(dtfilter) { 
        var arr =  store.itensRelVendas.filter(f => f.MES == dataAtualMes(new Date()) && f.TIPO_VENDA=='CONSUMO-INTERNO') 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].CUSTO; 
        }  
         
        return formataDinheiro(sum)
      }


      function VendasCategoriaDiario(c) {
     

        var arr =  store.itensRelVendas.filter(f => f.DATA==dataAtualFormatada(new Date()) && f.CATGO==c && f.TIPO_VENDA=='NORMAL') 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].VLR; 
        }  
        return formataDinheiro(sum)
         
      }

      function VendasCategoriaMes(c) { 

        var arr =  store.itensRelVendas.filter(f => f.CATGO==c && f.TIPO_VENDA=='NORMAL') 
        var sum = 0; 
        for(var i =0;i<arr.length;i++){ 
          sum+=arr[i].VLR; 
        }  
        return formataDinheiro(sum)         
      }
   
      function percHoje () {
            let lucro =  lucroHoje()   // vendasHoje()
            var soma = (lucro * 100)
            return soma
      }

      var columns1 = []
   
      if(storeLogin.empresas.acessos.filter(f=> f.cod_acesso == 'A0001').length > 0){
         columns1 =  ['ID','DATA','CATGO','PRODUTO','NOME','QTDE','VLR','CUSTO','LUCRO','PERC_LUCRO','FORMA_PGTO' ]

      }else{
        columns1 =  ['ID','DATA','CATGO','PRODUTO','NOME','QTDE','VLR','FORMA_PGTO' ]
      }
   

    //table 2
    
    const items1 = store.itensRelVendas;
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
        sortable: ['ID','DATA','CATGO','PRODUTO','NOME','QTDE','VLR','CUSTO','LUCRO','PERC_LUCRO','FORMA_PGTO' ],
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
        store.mesSelecionado = dataAtualMes(new Date())
     

       store.itensCategoria = []

       const getCagetorias = () => {
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
                store.recursos.progress = false
        })
        .catch((error) => {
        console.log(error);
        });
       }

       
       getCagetorias()


        
       

    }
    //table 2
    const view_row1 = (item) => {
        alert('ID: ' + item1.value.ID + ', Name: ' + item1.value.NOMENCLATURA);
    };
 
    store.displayVendasCategoria = 'Diario'

    const GetVendas = ()=> {
        
            store.itensRelVendas = []
            store.recursos.progress = true
            let data = JSON.stringify({
            "SCHEMA":   storeLogin.empresas?.schema,
            "MES":         store.mesSelecionado
            });

            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: store.baseApiHTTPS+'/relvendas',
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
                store.recursos.progress = false
            })
            })
            .catch((error) => {
            console.log(error);
            });
 
        }


</script>

<style>
</style>
