<template>
<div style="background-color: rgb(0, 132, 255); height: 78px;">


  <div style="color: rgb(19, 5, 5);
      text-align: right;
      padding: 0px 50px 0px 0px;
      font-size: 60px;
      bottom: 0;

  ">
 
        Total: R$ {{store.formataDinheiro(store.somaCaixa,2)}}
        <span style="font-size: 10px; 
                      color: green; 
                      background-color: white;"
              @click="store.recursos.telaCaixaConfirmar=true;
                  store.saldoPgto = store.somaCaixa
              "
              >
          Confirmar
        </span>
  </div>
 
</div>

  
</template>

<script setup>

import {indexStore} from '../../store/indexStore' 
const store = indexStore(); 

</script>

<style>

</style>