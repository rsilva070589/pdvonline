"use strict";(self["webpackChunkcork_vue3"]=self["webpackChunkcork_vue3"]||[]).push([[696],{1801:function(e,t,s){s.r(t),s.d(t,{default:function(){return q}});var r=s(6252),o=s(2262),a=s(9963),l=s(2079),n=s(2119),i=s(6296),c=s(6154);const d=(0,r._)("div",{class:"toast-body toast-danger justify-content-between",style:{"text-align":"center"}}," Usuário ou Senha Incorretos! ",-1),u=[d],h={class:"form-container outer"},p={class:"form-form"},w={class:"form-form-wrap"},f={class:"form-container"},v={class:"form-content"},m=(0,r._)("h1",{class:""},"Login",-1),_=(0,r._)("p",{class:""},"Entre com seu usuario e senha",-1),g={class:"text-start"},k={class:"form"},y={id:"username-field",class:"field-wrapper input"},x=(0,r._)("label",{for:"username"},"Usuario",-1),S=(0,r._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-user"},[(0,r._)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,r._)("circle",{cx:"12",cy:"7",r:"4"})],-1),U={id:"password-field",class:"field-wrapper input mb-2"},b={class:"d-flex justify-content-between"},C=(0,r._)("label",{for:"password"},"SENHA",-1),j=(0,r._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-lock"},[(0,r._)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),(0,r._)("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})],-1),L=["type"],H=(0,r._)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"},null,-1),V=(0,r._)("circle",{cx:"12",cy:"12",r:"3"},null,-1),A=[H,V],B={id:"username-field",class:"field-wrapper input"},E=(0,r._)("label",{for:"schema"},"Empresa",-1),N=(0,r._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-user"},[(0,r._)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,r._)("circle",{cx:"12",cy:"7",r:"4"})],-1),M={class:"form",style:{"justify-content":"space-between"}},z={class:"field-wrapper"};var D={__name:"login",setup(e){(0,i.j)({title:"Login"});const t=(0,l.D)(),s=(0,l.L)(),d=(0,n.tv)(),H=(0,o.iH)("password"),V=()=>{"password"===H.value?H.value="text":H.value="password"},D=()=>{let e=JSON.stringify({SCHEMA:s.schema,USUARIO:s.usuario,SENHA:s.senha}),r={method:"post",maxBodyLength:1/0,url:t.baseApiHTTPS+"/acesso",headers:{"Content-Type":"application/json",Authorization:"Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy"},data:e};c.Z.request(r).then((e=>{e.data[0]?(console.log(JSON.stringify(e.data[0])),s.empresas=e.data[0],d.push("/")):t.alertLogin=!0})).catch((e=>{t.alertLogin=!0,console.log(e)}))};return(e,l)=>{const n=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,o.SU)(t).alertLogin?((0,r.wg)(),(0,r.iD)("div",{key:0,onClick:l[0]||(l[0]=e=>(0,o.SU)(t).alertLogin=!1),style:{"z-index":"1080"},role:"alert","aria-live":"assertive","aria-atomic":"true"},u)):(0,r.kq)("",!0),(0,r._)("div",{class:"form auth-boxed",onClick:l[5]||(l[5]=e=>(0,o.SU)(t).alertLogin=!1)},[(0,r._)("div",h,[(0,r._)("div",p,[(0,r._)("div",w,[(0,r._)("div",f,[(0,r._)("div",v,[m,_,(0,r._)("form",g,[(0,r._)("div",k,[(0,r._)("div",y,[x,S,(0,r.wy)((0,r._)("input",{type:"text",class:"form-control",placeholder:"usuario","onUpdate:modelValue":l[1]||(l[1]=e=>(0,o.SU)(s).usuario=e)},null,512),[[a.nr,(0,o.SU)(s).usuario]])]),(0,r._)("div",U,[(0,r._)("div",b,[C,(0,r.Wm)(n,{to:"",class:"forgot-pass-link"},{default:(0,r.w5)((()=>[(0,r.Uk)("Esqueceu a senha?")])),_:1})]),j,(0,r.wy)((0,r._)("input",{type:H.value,class:"form-control",placeholder:"Password","onUpdate:modelValue":l[2]||(l[2]=e=>(0,o.SU)(s).senha=e)},null,8,L),[[a.YZ,(0,o.SU)(s).senha]]),((0,r.wg)(),(0,r.iD)("svg",{onClick:V,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",id:"toggle-password",class:"feather feather-eye"},A))]),(0,r._)("div",B,[E,N,(0,r.wy)((0,r._)("input",{type:"text",class:"form-control",placeholder:"schema","onUpdate:modelValue":l[3]||(l[3]=e=>(0,o.SU)(s).schema=e)},null,512),[[a.nr,(0,o.SU)(s).schema]])])])]),(0,r._)("div",M,[(0,r._)("div",z,[(0,r._)("div",{onClick:l[4]||(l[4]=e=>D()),class:"btn btn-primary mb-4 form-control active w-300"},"Log In")])])])])])])])])],64)}}};const Z=D;var q=Z}}]);
//# sourceMappingURL=auth-login.c526bce6.js.map