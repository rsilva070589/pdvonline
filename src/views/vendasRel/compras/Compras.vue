<template>



    <div style="margin-top: -110px;">
        <h2>Entrada de Notas</h2>
  
        <div class="panel-body">
                        <div >  
                            <div class="row">
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="CATEGORIA">Fornecedor</label>
                                    <div>
                                        <select class="form-control" style="height: 44px; width: 130px;" v-model="store.compras.FORNECEDOR">
                                            <option disabled value="">Selecione</option>
                                            <option>Tatico</option>
                                            <option>Dist-Silva</option>     
                                            <option>SIM</option>  
                                            <option>Costa</option>   
                                            <option>Atacadao</option>        
                                            <option>Batista</option>       
                                            <option>Max-Atacado</option>     
                                            <option>Acai</option>         
                                            <option>Barao</option>         
                                            <option>Canaa</option>       
                                            <option>Aviz - Walter Santos</option> 
                                            <option>Santa Marta</option>  
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="CODIGO_BARRAS">NOTA</label>
                                    <div>
                                        <input  v-model="store.compras.NOTA" type="text" id="NOTA" class="form-control" placeholder="NOTA" />
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="NOME">Data da Nota </label>
                                    <div>
                                        <input v-model="store.compras.DATA_EMISSAO"  type="date" id="DATA_EMISSAO" class="form-control" placeholder="DATA_EMISSAO" />
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="NOME">Valor da Nota</label>
                                    <div>
                                        <input v-model="store.compras.TOTAL_NOTA"  type="number" id="TOTAL_NOTA" class="form-control" placeholder="TOTAL_NOTA" />
                                    </div>
                                </div>
                            </div>
                             
                            <div class="row">
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="NOME">Codigo Barras</label>
                                    <div>
                                        <input v-model="store.compraItens.CODIGO_BARRAS"  type="text" id="CODIGO_BARRAS" class="form-control" placeholder="CODIGO_BARRAS" />
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="QTDE">QTDE</label>
                                    <div>
                                        <input v-model="store.compraItens.QTDE"  type="number" id="QTDE" class="form-control" placeholder="QTDE" />
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="password">Total do Item</label>
                                    <div>
                                        <input v-model="store.compraItens.VALOR_CUSTO"  type="number" id="VALOR_CUSTO" class="form-control" placeholder="VALOR_CUSTO" />
                                    </div>
                                    
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="col-form-label pt-0" for="password">Total do Item Lançados</label>
                                    <div style="font-size: 30px; text-align: center;">
                                        {{somarItens()}}
                                    </div>
                                    
                                </div>
                               
                            </div>
                          
                    
                            <button @click="incluiItemCompra()" type="" class="btn btn-primary mt-3">Incluir Item</button>
                             
                      
                        </div>
                    </div>
         
<div>
 
 </div> 

 <div class="conteudo" style="height: 40vh; padding: 0px 40px 0px 40px;">  
    <div class="table-responsive" style="padding: 10px;">
    <table role="table" aria-busy="false" aria-colcount="5" class="table table-bordered" id="__BVID__415">
        <thead role="rowgroup">
            <tr role="row">
                <th role="columnheader" scope="col" aria-colindex="1"><div>Codigo</div></th>
                <th role="columnheader" scope="col" aria-colindex="2"><div>Item Descricao</div></th>
                <th role="columnheader" scope="col" aria-colindex="3"><div>Qtde</div></th>
                <th role="columnheader" scope="col" aria-colindex="4" class=""><div>Custo</div></th>
                <th role="columnheader" scope="col" aria-colindex="5" aria-label="Action" class=""><div></div></th>
            </tr>
        </thead>
        <tbody role="rowgroup">
            <tr v-for="(item,index) in store.compras.ITENS" :key="item.CODIGO_BARRAS" role="row">
                <td aria-colindex="1" role="cell">{{ item.CODIGO_BARRAS }}</td>
                <td aria-colindex="2" role="cell">{{ item.NOME }}</td>
                <td aria-colindex="2" role="cell">{{ item.QTDE }}</td>
                <td aria-colindex="3" role="cell">{{ item.VALOR_CUSTO }}</td>
               
                <td aria-colindex="5" role="cell" class="text-center">
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
                        class="feather feather-trash-2 icon"
                        @click="deleteItem(index)"
                    >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </td>
            </tr>
        </tbody>
    </table>
    </div>    
</div>



 
 

 
    <button @click="enviarDados()" type="" class="btn btn-primary mt-3">Enviar Dados</button>
 
    </div>

 

</template>

<script setup>
  
 import axios from 'axios';
import index from 'vue3-json-excel';
import {indexStore} from '../../store/indexStore'  
 const store = indexStore();   


 var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dateFormat(d){
  var t = new Date(d);
  return t.getDate()+'/'+monthNames[t.getMonth()]+'/'+t.getFullYear();
}

 
    const bind_data = async  () => {
        store.itensCadastro = []
       var result = await axios.get(store.baseApiHTTPS+'/mercadoprodutos')    
        store.itensCadastro =  result.data
    }
    bind_data()

    const getItemDescricao = (codBarras) => {
        store.descricaoSelecionada = null
       store.itensCadastro.filter( f => f.CODIGO_BARRAS == codBarras).map(x => {
        store.descricaoSelecionada = x.NOME 
      })
      return store.descricaoSelecionada
      
    }


 const incluiItemCompra = ()=> { 

  var item = {
        "CODIGO_BARRAS": store.compraItens.CODIGO_BARRAS,
        "NOME"         : getItemDescricao(store.compraItens.CODIGO_BARRAS),
        "QTDE"         : store.compraItens.QTDE,
        "VALOR_CUSTO"  : store.compraItens.VALOR_CUSTO,
    }
  store.compras.ITENS.push(item)
  somarItens()
  store.compraItens = {
        CODIGO_BARRAS: null,
        QTDE: null,
        VALOR_CUSTO: null
       }

 }

 const deleteItem = (index) => {
    console.log(index)
    store.compras.ITENS.splice(index, 1);
 }

 


function enviarDados(){
    store.compras.DATA_EMISSAO =  dateFormat(store.compras.DATA_EMISSAO)  
    console.log('Cadastrando Novo Item')
    var axios = require('axios');
 
var data = JSON.stringify( 
    store.compras
 );

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: store.baseApiHTTPS+'/mercadocompras',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  bind_data()
  store.compras = { NOTA: null,
                    DATA_EMISSAO: null,
                    FORNECEDOR: null,
                    TOTAL_NOTA: null,
                    ITENS: []}
  store.compraItens = {
        CODIGO_BARRAS: null,
        QTDE: null,
        VALOR_CUSTO: null
       }
})
.catch(function (error) {
  console.log(error);
});

 } 
 
 function somarItens() {
    if (store.compras.ITENS){
        var somarProduto = store.compras.ITENS.map(p =>{
                return (p.VALOR_CUSTO)
              } )
             

  let totalProd = 0
  for(let i in somarProduto) {
           totalProd += somarProduto[i] 
    }
    
          return totalProd
    }

}
  
</script>

<style>
  .conteudo {
    
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    overflow-x: auto;
}
</style>