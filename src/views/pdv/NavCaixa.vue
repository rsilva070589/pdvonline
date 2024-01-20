<template> 
  

  <div style="background-color: rgb(0, 132, 255); height: 78px;  
              display: flex; 
              justify-content: space-between; 
              padding: 0px 350px 0px 5px;
              ">
    <div>

      <span style="color: black; padding: 10%;">Tipo Venda</span>
      
       <select v-model="store.tipoVenda">
        <option value="NORMAL">           Normal            </option>
        <option VALUE="CONSUMO-INTERNO">  Consumo Interno   </option> 
       </select>
 
      </div>

      <div >
          <h1 style="color: rgb(5, 0, 0);               
          ">
                MERCEARIA BRAGATTO - CAIXA
          </h1>
      </div>
  </div>


  
</template>

<script setup>

import {indexStore, useUserStore} from '../../store/indexStore'  
const store = indexStore(); 

store.tipoVenda = 'NORMAL'

</script>

<style>

</style>