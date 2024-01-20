<template> 
 
 <div v-if="store.dataErrada" @click="store.dataErrada=false"
    style="z-index: 1080" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body toast-danger   justify-content-between"
    style="text-align: center;"> 
    Data Final não pode ser menor que a Data Incial...
    </div>
</div>
 
    <div v-if="storeLogin.empresas?.sucess == 'true'"  >  
        <div class="layout-px-spacing dash_2">
            <teleport to="#breadcrumb">
                <ul class="navbar-nav flex-row">
                    <li>
                        <div class="page-header">
                            <nav class="breadcrumb-one" aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="javascript:;">Relatorios</a></li>
                                    <li class="breadcrumb-item active" aria-current="page"><span>Dre</span></li>
                                </ol>
                            </nav>
                        </div>
                    </li>
                </ul>
            </teleport> 

         
            <div :style="[!store.detectar_mobile() ? {'display': 'flex' } : '']"> 
                <Filtros  />

                <div class="form-group col-md-2 align-items-center"
                v-bind:style="[!store.detectar_mobile() ? {'margin': '0px 0px 0px 10px' } : '' ]"
                >    
                <div class="btn btn-primary mb-4 form-control active w-250" 
                    v-bind:class="(store.detectar_mobile()) ? 'filtrosMobileButton' : 'filtrosWebButton'"                
                    @click="filtros()">
                    ATUALIZAR
                </div>
                </div>  

                </div>
       
            
      
         
     
    <Progress v-if="store.Progress"/> 
    
      <div v-if="   !store.Progress
                 && !store.dadosRel?.length > 0  
                 "
        style="text-align: ; font-size: 30px;"
        >
        Sem dados para exibir neste período...
      </div>
 
 <div style=" min-height: 440px;  display: flex;" v-bind:style="[store.detectar_mobile() ? {'justify-content': 'center' } : {'justify-content': 'left' }]">
      <div v-if="store.Progress == false" style="margin-top: -30px;">
        <div v-if="store.relLoja?.length > 0 && store.dadosRel.length > 0" style="color: blue; font-size: 20px; text-align: center">
     
     
        </div>
        <div v-if="!store.editando" style="display: flex; justify-content: center;">  
       
        <div  v-if="store.relMondado?.length > 0 && store.relMondado.length > 0"  class="table-light table-responsive" style="  background-color: #ffffff;" v-bind:style="[!store.detectar_mobile() ? {'width': '400px' } : '']">
        <div v-for="emp, indexEmp in store.relMondado">

        <div style="color: red; font-size: 20px; font-weight: bold;">
         {{ emp.EMPRESA }}   
        </div>
        

            <table role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                <thead role="rowgroup" class="">
                    <tr role="row" class="">
                        <th role="columnheader" scope="col" aria-colindex="1" class=""><div>Terminal</div></th>
                        <th role="columnheader" scope="col" aria-colindex="2" style="text-align: end;" class=""><div>Valor</div></th>                       
                    </tr>
                </thead>
                <tbody v-for="(item, i) in emp.REGISTRO" :key="item.cdterminal" role="rowgroup">
                    <tr role="row" class="">
                        <td aria-colindex="1" role="cell" class="" style=" font-weight: bold ;" >{{ item.cdterminal }}</td>
                        <td aria-colindex="2" role="cell" style="text-align: end; font-weight: bold ;"  > R$ {{ formataDinheiro(item.valor) }}  </td> 
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
 

      </div>
      <div  v-if="store.relLoja?.length > 0 && store.dadosRel.length > 0" style="padding: 5px; font-size: 20px;   display: flex; justify-content: center;">
                   <div style="background-color: #ffffff; padding: 5px;"  @click="proximo()">
                    
                    <div
                          style="background-color: #dadfdf; text-align: center; border-radius:50%; width: 50px; height: 50px;"> 
                          <div style="padding-top: 10px;">
                            &lt; 
                          </div> 
                          
                    </div> 
                </div>
                
            <div v-for="(item, i) in store.relLoja" :key="item.DADOS">
                <div style="background-color: #ffffff; padding: 5px;"  @click="selectEmpresa(i)">
                    <div :class=" (store.indexVendas == i) ? 'itemSelecionado' : 'itemNaoSelecionado'"
                          style="
                                 text-align:        center; 
                                 border-radius:50%; width: 50px; height: 50px;"> 
                          <div style="padding-top: 10px;">
                                    {{ i+1 }}  
                          </div> 
                          
                    </div> 
                </div>
            </div>
            <div style="background-color: #ffffff; padding: 5px;"  @click="anterior()">
                    <div  
                          style="background-color: #dadfdf; text-align: center; border-radius:50%; width: 50px; height: 50px;"> 
                          <div style="padding-top: 10px;">
                            &gt; 
                          </div>  
                    </div> 
                </div>
        </div>
     
  

    </div> 
            </div>
        </div>
    </div>    
    </template>
     
    <script setup>
        import '@/assets/sass/widgets/widgets.scss';
        import { onMounted, ref, computed } from 'vue';  
        import { indexStore, useUserStore } from '../../store/indexStore'  
        import { useMeta } from '@/composables/use-meta';
        import   axios from 'axios';
        import { useRouter } from "vue-router"; 
        import Progress from '@/components/Progress.vue';
        import funcoesGlobais from './funcoesGlobais'
        import Filtros from './Filtros.vue'
        
        useMeta({ title: 'Relatorios' });
        const storeLogin = useUserStore()  
        const router = useRouter() 
        const store = indexStore(); 
        login()
          
        store.myColor = '#FF00FF';
        store.carregando = false 
        store.dadosRel = []
        store.relMondado = []

        function login (){
    
            switch (storeLogin.empresas?.sucess) {
            case true:
                console.log('usuario logado')  
                break;
            case 'true':
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
    
   
        
    store.indexVendas = 0 


  store.filtro= { 
            empresa: 'CENTRAL',
            dataInicial:  dataFormatada(new Date()),
            dataFinal:    dataFormatada(new Date())
        }

    function filtros() {
    store.dataErrada = false
    if(storeLogin.empresas?.sucess && store.filtro.dataFinal >= store.filtro.dataInicial){
        store.relLoja = []
        store.relMondado = []
        store.relVendedores = []
        store.relAnual = []
        store.relContas = []
        store.Progress = true        
        getTypeRel(storeLogin.empresas.databasecliente,store.filtro.empresa,store.filtro.dataInicial,store.filtro.dataFinal,5)
    }else{
        store.dataErrada = true
    }
   }

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
                   
                    if(TypeRel == 5){ 
                        store.dadosRel = response.data.dados  
                        const arr = []

                        response.data.dados.map( x=> {
                            var dados = {
                                EMPRESA: x.nome,                              

                            }
                            if(arr.filter(f=> f.EMPRESA == x.nome).length == 0){
                                arr.push(dados)
                            }
                            
                        })

                        arr.map( x=> {
                            var dados = {
                                EMPRESA: x.EMPRESA,       
                                REGISTRO:  response.data.dados.filter(f=> f.nome==x.EMPRESA)

                            }
                            if(store.relMondado.filter(f=> f.EMPRESA == x.nome).length == 0){
                                store.relMondado.push(dados)
                            }
                            
                        })
                       
                        console.log(response.data.dados )
                        selectEmpresa(0)
                    }    
                   
                    store.Progress = false
                    return response  

                    
                
                })
                .catch((error) => {
                console.log(error);
                store.Progress = false
                });  
        } 
 
 
  function selectEmpresa (index) {
    store.indexVendas=index
 
            if(store.detectar_mobile()){ 
              window.scrollTo(0,270);

        }     
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

const anterior = ()=> {   
   if (store.indexVendas < store.relLoja?.length -1) {
     store.indexVendas = store.indexVendas +1
     selectEmpresa(store.indexVendas)
     console.log('index Empresa: '+store.indexVendas)
   }   
 }

 const proximo = ()=> {  
  if (store.indexVendas > 0) {
    store.indexVendas = store.indexVendas -1
    selectEmpresa(store.indexVendas)
    console.log('index Empresa: '+store.indexVendas)
  }  
}
     
    
    </script>
    
    <style>    
    .filtrosWeb { 
     min-height: 43px;        
    }
    .filtrosMobile { 
     margin-top: -30px;    
     min-height:  43px;    
    }
    .filtrosWebButton { 
     min-height: 43px;   
     margin-top: 23px;       
    }
    .filtrosMobileButton { 
     margin-top: -20px;    
     min-height:  43px;    
    }
    .itemSelecionado {
        background-color: rgb(156, 156, 235);
    }
    .itemNaoSelecionado {
        background-color: #dadfdf; 
    }
    </style>
    
    