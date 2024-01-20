<template>
 
 
  <div v-if="store.alertLogin" @click="store.alertLogin=false"
    style="z-index: 1080" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body toast-danger   justify-content-between"
    style="text-align: center;"> 
       Usuário ou Senha Incorretos!  
    </div>
  </div>
 
    
        <div class="form auth-boxed" @click="store.alertLogin=false">
            <div class="form-container outer">
                <div class="form-form">
                    <div class="form-form-wrap">
                        <div class="form-container">
                            <div class="form-content">
                                <h1 class="">Login</h1>
                                <p class="">Entre com seu email e senha</p>
    
                                <form class="text-start">
                                   
                                    <div class="form">
                                        <div id="username-field" class="field-wrapper input">
                                            <label for="username">EMAIL</label>
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
                                                class="feather feather-user"
                                            >
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            <input type="text" 
                                                    class="form-control" 
                                                    placeholder="email" 
                                                    v-model="storeLogin.email" />
                                        </div>
    
                                        <div id="password-field" class="field-wrapper input mb-2">
                                            <div class="d-flex justify-content-between">
                                                <label for="password">SENHA</label>
                                                <router-link to="" class="forgot-pass-link">Esqueceu a senha?</router-link>
                                            </div>
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
                                                class="feather feather-lock"
                                            >
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                            <input :type="pwd_type" 
                                                    class="form-control" 
                                                    placeholder="Password"
                                                    v-model="storeLogin.senha" />
                                            <svg
                                                @click="set_pwd_type"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                id="toggle-password"
                                                class="feather feather-eye"
                                            >
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        </div>
                                    
    
                                      
                                      
                                      
                                    </div> 
                                </form> 
                           
                                    <div class="form " style="justify-content: space-between;">
                                            <div class="field-wrapper ">
                                                <div @click="getLogin()"  class="btn btn-primary mb-4 form-control active w-300">Log In</div>
                                                
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
        import { ref } from 'vue';
        import '@/assets/sass/authentication/auth-boxed.scss';
        import { indexStore, useUserStore } from '../../store/indexStore' 
        import { useRouter } from "vue-router"; 
        import { useMeta } from '@/composables/use-meta';
        import axios from 'axios';
        
      
        useMeta({ title: 'Login' });
        const store = indexStore();  
        const storeLogin = useUserStore();  
        
     
    const router = useRouter()
        const pwd_type = ref('password');
    
        const set_pwd_type = () => {
            if (pwd_type.value === 'password') {
                pwd_type.value = 'text';
            } else {
                pwd_type.value = 'password';
            }
        };
    
        const getLogin = ()=> {
           
                let data = JSON.stringify({
                "email": storeLogin.email,
                "senha": storeLogin.senha
                });
    
                let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: store.baseApiHTTPS+'/acesso',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy'
                },
                data : data
                };
    
                axios.request(config)
                .then((response) => {

                 if (response.data[0]){
                    console.log(JSON.stringify(response.data[0]));  
                    storeLogin.empresas = response.data[0]                
                // storeLogin.empresas.dadosempresa.push(response.data)
                    router.push('/') 
                 }else{
                    store.alertLogin=true
                 }   

             
                })
                .catch((error) => {
                    store.alertLogin=true
                console.log(error);
                });
                
    
        }
    </script>
