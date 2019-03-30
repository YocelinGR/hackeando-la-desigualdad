<template>
  <Layout>
      <VLayout align-space-around justify-space-between fill-height>
          <VContainer text-xs-center data-testid="logUpView" column>
            <VAvatar color="white">
              <VIcon x-large>account_circle</VIcon>
            </VAvatar>
            <VTextField v-model="userEmail" solo-inverted></VTextField>
            <VTextField v-model="userPassword" solo-inverted data-testid="event" @keyup.enter="login"></VTextField>
            <p v-if="errors.length" data-testid="errors">
              <b>Ops!, parece que algo no anda bien: </b>
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </p>
            <VLayout align-space-around justify-space-between fill-height>
              <VContainer column>
                <VBtn block color="#019ae8" class="white--text font-weight-thin caption">
                  <img src="../../assets/images/new-google.png" text-xs-left/>
                  Iniciar sesión con Google</VBtn>
                <hr>
                <VBtn block color="#512da8" class="white--text">
                  <RouterLink to="/logup" href="#" class="white--text font-weight-bold" data-testid="btn-link">
                    CREAR UNA CUENTA CON CORREO
                  </RouterLink>
                </VBtn>
                <h4>Inicia sesión con tu <b>correo</b></h4>
                <p>¿Quieres saber cómo cuidamos tu información?</p>
                <a href="#">Conócela aquí</a>
              </VContainer>
            </VLayout>
          </VContainer>
      </VLayout>
  </Layout>
</template>

<script>

import Layout from '@layouts/main'
import appConfig from '@src/app.config'

export default {
  name: 'LogInOptions',
  page: {
    title: '',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  data(){
    return {
      validUser: {
        validEmail: "johndoe@mail.com",
        validPassword: "johndoe",
        validPhone: '5555462293',
      },
      userEmail: "",
      userPassword: "",
      errors: [],
    }
  },
  methods: {
    login: function (e) {
      if( this.userEmail && this.userPassword){
        this.validateUser();
      }

      this.errors = [];

      if(!this.userEmail) {
        this.errors.push('El correo es requerido.');
      }
      if(!this.userPassword) {
        this.errors.push('Contraseña requerida.');
      }

      e.preventDefault();
    },
    validateUser: function (e) {
      if(this.userEmail === this.validUser.validEmail && this.userPassword === this.validUser.validPassword){
        this.$router.push({name:'home', params: { validUser: this.validUser }});
      } else {
        this.errors = [];
        if(this.userEmail !== this.validUser.validEmail) {
           const re = /\S+@\S+\.\S+/;
           const valid = re.test(this.userEmail);
          if(!valid){
            this.errors.push(`${this.userEmail} parece no ser un correo.`);
          } else {
            this.errors.push('Correo no valido.');
          }
        }
        if(this.userPassword !== this.validUser.validPassword) {
          this.errors.push('Contraseña no valida.');
        }

        e.preventDefault();
      }
    },
  }
}
</script>

<style>
  div.v-input__slot {
    border-radius: 28px !important;
  }
  img {
    position: absolute;
    top: -12px;
    left: -16px;
    width: 36px;
    background-color: white;
  }
  ul{
    list-style-type: none;
  }
</style>
