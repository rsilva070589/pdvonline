<template>
    <div    
    style="display:  flex; height: 75px; margin: 3px;" > 
 
          <div class="form-group col-md-4" 
           v-bind:class="(store.detectar_mobile()) ? 'filtrosMobile' : 'filtrosWeb'" 
           style="min-width: 200px; padding: 3px;"
           v-bind:style="[store.esconderFiltroEmpresa ? {'margin-top': '0px' } : '' ]"
          >
              <label class="col-form-label"
          
              >Data Inicial</label>              
              <input type="date" v-model="store.filtro.dataInicial"  data-date-format="DD MM YYYY"
              class="mb-4 form-control flatpickr active w-100" 
              @click="store.dataErrada=false"
              v-bind:class="(store.detectar_mobile()) ? 'filtrosMobile' : 'filtrosWeb'"
              style=" margin-top: -15px; "
          
              >
          </div> 
  
          <div class="form-group col-md-4"
              v-bind:class="(store.detectar_mobile()) ? 'filtrosMobile' : 'filtrosWeb'"
              style="min-width: 200px; padding: 3px;"
          >
              <label class="col-form-label"
           
              >Data Final</label>            
              <input 
              @click="store.dataErrada=false"
                  type="date" data-date-format="DD MM YYYY" v-model="store.filtro.dataFinal"  
                  class="mb-4 form-control flatpickr active w-100"
                  v-bind:class="(store.detectar_mobile()) ? 'filtrosMobile' : 'filtrosWeb'"
                  style=" margin-top: -15px;"
                  >  
          </div>  
          

         
   
    </div>
     
</template>

<script setup> 
 import {indexStore} from '../../store/IndexStore'  
  import   axios from 'axios';
  const store      = indexStore();  
  
  function dataFormatada(d){ 
        var data =  new Date(d),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
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

</style>