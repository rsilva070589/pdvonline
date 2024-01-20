<template>
 

      <div  v-if="storeLogin.empresas?.sucess == 'true'"
      class="row align-items-center form-group " to="#breadcrumb"
      style="max-width: [{{store.detectar_mobile()}}] ? 50%;" > 

            <div v-if="!store.esconderFiltroEmpresa" class="form-group col-md-4">
            <label class="col-form-label">Empresa</label>
            
            <select   class="mb-4 form-control flatpickr active w-100 form-select"   
                    v-model="store.filtro.empresa"            
                    style=" margin-top: -15px;"
                    >
                    <option 
                    v-for="emp, indexEmp in storeLogin.empresas.dadosempresa"
                    :key="indexEmp"
                    :value="emp.identificacaointegracao">{{emp.identificacaointegracao}}
                    </option>               
            </select>
           </div> 

    
            <div class="form-group col-md-4" 
             v-bind:class="(store.detectar_mobile()) ? 'filtrosMobile' : 'filtrosWeb'" 
             style="min-width: 200px;"
             v-bind:style="[store.esconderFiltroEmpresa ? {'margin-top': '0px' } : '' ]"
            >
                <label class="col-form-label"
            
                >Data Inicial</label>              
                <input type="date" v-model="store.filtro.dataInicial"  data-date-format="DD MM YYYY"
                class="mb-4 form-control flatpickr active w-100" 
                @click="store.dataErrada=false"
                v-bind:class="(store.detectar_mobile()) ? 'filtrosMobile' : 'filtrosWeb'"
                style=" margin-top: -15px;"
            
                >
            </div> 
    
            <div class="form-group col-md-4"
                v-bind:class="(store.detectar_mobile()) ? 'filtrosMobile' : 'filtrosWeb'"
                style="min-width: 200px;"
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
    import { indexStore, useUserStore } from '../../store/indexStore'   
    import   axios from 'axios';
    const store      = indexStore(); 
    const storeLogin = useUserStore();
            
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