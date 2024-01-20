<template>
    <!-- BEGIN FOOTER -->
    <div class="footer-wrapper">
        <div class="footer-section f-section-1">
            <p class="">  <a target="_blank" href="https://arrangic.com">
                Copyright © {{ dataFormatada(new Date) }} Agil Tec Sistemas</a>
                Todos direitos reservados</p>
        </div>
        <div class="footer-section f-section-2">
            <p class="">
                {{store.versao}}
           
            </p>
        </div>
    </div>
    <!-- END FOOTER -->
</template>

<script setup> 
    import { indexStore, useUserStore } from '../../store/indexStore' 
    const store = indexStore();

    function dataFormatada(d){ 
    var data =  new Date(d),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF 
    }
  
</script>