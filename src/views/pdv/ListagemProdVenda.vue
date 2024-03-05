<template> 
  {{store.CaixaProdutos}}
 
<div style="display: flex; 
        justify-content: space-between; font-size: 40px; ">

<div 
style="   padding: 5px; 
          margin-left: -25px;
          max-width: 400px; 
          font-size: 20px;">

  <input style="max-width: 100%; max-height: 50px;"
          type="text" v-model="store.produtoSearch" placeholder="Busca Item..."/> 
  
  <div
  class="conteudo"
  style="  height: 60.5vh; "
  >
  <div v-if="store.produtoSearch == ''"> 
    <img 
      style="width: 330px; height: 350px;    "  
      src="https://cdn-icons-png.flaticon.com/512/8146/8146003.png"
      class="lazy" alt="">
  </div> 

   <div v-if="store.produtoSearch != ''"   style=" font-size: 17px;  color: black;"    
    v-for=" (p,index) in store.produtos.filter(f => f.SITUACAO=='ATIVADO').filter(b => b.NOME.toLowerCase().includes(store.produtoSearch.toLocaleLowerCase()))" :key="index"
    > 
    
      <div  style="display: flex; 
           justify-content: space-between;  " 
          @click="incluirProduto(p.CODIGO_BARRAS)" 
          >
       <div>{{ p.NOME }}</div> 
       <div>R$  {{ store.formataDinheiro(p.VALOR)}} </div>  
      </div> 
   
    </div>
  </div>
  
  
  

</div> 
  

   
  <div class="conteudo"
   style="background-color: white;  
              min-width: 70%; 
              height: 77.0vh;
              padding-right: 0px;">
    <div style="display: flex;  
        justify-content: space-between;  
        "  
        v-for=" (p,index) in store.CaixaProdutos" :key="index"
        >
 
        <div>{{p.QTDE}} </div>
        <div>{{p.NOME}}</div>
     
    <div style="font-size: 40px;  ">
       R$ {{store.formataDinheiro(p.VALOR,2)  }}
    </div>

    <div style=" ">
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
    </div>
    
    
  </div> 
 
  <div style="font-size: 30px; ">
Qtde: 
<input    type="number" 
          ref="myinput"
          style="width: 80px;"
          v-focus
          v-model="store.CaixaProdutos.QTDE" 
          placeholder="novo produto"
               
  />
  Desconto
  <input    type="number" 
          ref="myinput"
          style="width: 100px;"
          v-focus
          v-model="store.CaixaProdutos.DESCONTO" 
          placeholder="novo produto"
               
  />
 Codigo de Barras
<input     type="text" 
              ref="myinput"
              v-focus
              style="width: 200px;"
              :value='store.CaixaProdutos.codProduto' 
              @input='evt=>incluirProduto(evt.target.value)'
              placeholder="novo produto"
               
  />


</div>
    <div 
       style="background-color: rgb(0, 132, 255); color: rgb(3, 0, 0); 
              padding: 10px; text-align: center; display: flex;
              margin: 10px;
              justify-content: center;
              font-size: 20px;
              " 
      v-if="store.recursos.telaCaixaConfirmar">

 

      <div>
       <select v-model="store.formaPagamento">
        <option v-for="pg, indexPg in store.formasPagamentos" :key="indexPg"
                :value="pg.ID">  
          {{pg.DESCRICAO}}
        </option> 
       </select>
      </div>

 
    <div>
      Valor do Dinheiro: <input style="text-align: center;width: 70px; padding: 5px;" v-model="store.vendaCaixa.valorPago"  
                          type="number" 
                          placeholder="valor Dinheiro">  
    </div> 

    <div style="font-size: 23px; padding: 5px;" v-if="store.vendaCaixa.valorPago > 0">
      TROCO: {{store.formataDinheiro(store.vendaCaixa.valorPago - somaCaixa(),2) }}
    </div>

    <div style="padding:8px;">
      <button @click="addVenda">VENDER</button>
    </div>
   
   
  </div>

  </div>

  

</div>
 
</template>

<script setup>
 
import {indexStore, useUserStore} from '../../store/indexStore' 
import axios from 'axios'
const store = indexStore(); 
const storeLogin = useUserStore();

store.CaixaProdutos.QTDE = 1
store.CaixaProdutos.DESCONTO=0
store.VendaEnviada = false
store.formaPagamento = false
store.produtos = []
store.produtoSearch = ''
const produtos = []
store.tipoVenda = 'NORMAL'
 
const getProdutos = (async () => { 
  let data = JSON.stringify({
  "SCHEMA": storeLogin.empresas?.schema
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: store.baseApiHTTPS+'/getProdutos',
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
            CATEGORIA: x.categoria,
            CODIGO_BARRAS: x.codigo_barras,
            DESCRICAO: x.descricao,
            FOTO: x.foto,
            NOME: x.nome,
            SITUACAO: x.situacao,
            VALOR: x.valor,
            VALOR_CUSTO: x.valor_custo,
            QTDE_ESTOQUE: x.qtde_estoque,
            ID: x.id
       }
       produtos.push(itens)
       store.produtos.push(itens)
       })
    })
    .catch((error) => {
      console.log(error);
    }); 

})
 
 getProdutos()

 store.formasPagamentos = [ ]

 const getFormasPgto = ()=> {
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
        const itens ={
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

getFormasPgto()
 
 const deleteItem = (index) => {
    console.log(index)
    store.CaixaProdutos.splice(index, 1);
    somaCaixa() 
 }
 
 
var incluirProduto = (codProduto) => {
 console.log(codProduto)
 
  const ItemSelectCaixa = p => p.CODIGO_BARRAS == codProduto
  const item  = produtos.filter(ItemSelectCaixa)
  let valorDesconto = store.CaixaProdutos.DESCONTO || 0 
  
console.log(item)
  if (item[0]?.CODIGO_BARRAS == codProduto) { 
    store.CaixaProdutos.push({
                COD_PRODUTO: codProduto,
                NOME: item[0]?.NOME,
                QTDE: store.CaixaProdutos.QTDE,
                VALOR: item[0]?.VALOR * store.CaixaProdutos.QTDE,
                DESCONTO: valorDesconto.toString().replace(',','.'),
                CUSTO:  item[0]?.VALOR_CUSTO * store.CaixaProdutos.QTDE,
                ID_PRODUTO: item[0].ID || 0
    })
   
    
    somaCaixa() 
     store.CaixaProdutos.QTDE=1
    store.CaixaProdutos.DESCONTO=0
   
  }

    
}


function somaCaixa() {
  var somarProduto = store.CaixaProdutos.map(p =>{
                return (p.VALOR - p.DESCONTO)
              } )

  let totalProd = 0
  for(let i in somarProduto) {
           totalProd += somarProduto[i] 
          }
          store.somaCaixa = totalProd
          return totalProd
}
 

const addVenda = async () => {
  if (store.CaixaProdutos.length > 0 &&  store.formaPagamento) { 
    
var data = {   
      SCHEMA: storeLogin.empresas?.schema  ,
      COD_CLIENTE: 999,
      COD_ENDERECO: 1,    
      VALOR: store.somaCaixa,
      TROCO: store.vendaCaixa.valorTroco, 
      DESCONTO: store.vendaCaixa.descontos,
      ITENS: store.CaixaProdutos,
      FORMA_PGTO: store.formaPagamento,
      TIPO_VENDA: store.tipoVenda
    }

console.log(data)

var config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: store.baseApiHTTPS+'/vendas',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

store.VendaEnviada=true

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  store.CaixaProdutos = []
  //window.location.href = window.location.href
})
.catch(function (error) {
  console.log(error);
});


}} 


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