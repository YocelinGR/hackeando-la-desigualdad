<template>
 <Layout>
      <VLayout justify-space-between fill-height align-space-between>
        <VContainer class="light-blue--text" text-xs-center column>
            <p v-if="errors.length" data-testid="errors">
              <b>Ops!, parece que algo no anda bien: </b>
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </p>
            <VTextField
                v-model="userEmail"
                placeholder="Email"
                prepend-inner-icon="mail"
                required
                data-testid="email">
            ></VTextField>
            <VTextField
                v-model="userPassword"
                placeholder="Contraseña"
                prepend-inner-icon="lock"
                required
                type="password"
                data-testid="password">
            ></VTextField>
            <VLayout justify-space-between fill-height align-space-between column>
                  <span data-testid="securityLevel">{{ secureLength }}</span>
                    <ul class="progressbar">
                        <li :class="{ active: progressBar > 14 }"></li>
                        <li :class="{ active: progressBar > 28 }"></li>
                        <li :class="{ active: progressBar > 42 }"></li>
                        <li :class="{ active: progressBar > 56 }"></li>
                        <li :class="{ active: progressBar > 70 }"></li>
                        <li :class="{ active: progressBar > 84 }"></li>
                        <li :class="{ active: progressBar > 90 }"></li>
                    </ul>
                <VProgressLinear
                  background-color="deep-purple lighten-5"
                  color="deep-purple lighten-2"
                  :value="progressBar"
                ></VProgressLinear>
                <VBtn id= "logUp" block color="#2699fb" class="white--text font-weight-thin caption" data-testid="test1" @click ="checkForm">CREAR CUENTA</VBtn>
                <p>¿Ya eres usuario? <RouterLink to="/login" href="#" class="light-blue--text font-weight-bold">Inicia sesión</RouterLink></p>
            </VLayout>
        </VContainer>
      </VLayout>
 </Layout>
</template>

<script>
import Layout from '@layouts/main'
import appConfig from '@src/app.config'

export default {
  name: 'Logup',
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
  computed: {
    progressBar(){
      let percentage = (this.userPassword.length * 100)/ 20;
      return percentage
    },
    secureLength(){
      if(this.progressBar < 40) {
        return 'Débil'
      }
      else if(this.progressBar >= 40 && this.progressBar < 80){
        return 'Segura'
      }
      else if(this.progressBar >= 80){
        return 'Fuerte'
      }
      else {
        return 'No evalueble'
      }
    },
},
  methods: {
    checkForm: function (e) {
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
        this.$router.push({name:'confirm-user-data', params: { validUser: this.validUser }});
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
  ul{
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .progressbar li {
      list-style-type: none;
      float: left;
      text-align: center;
      text-transform: uppercase;
      width: 8px;
      height: 8px;
      content: '';
      border: 2px solid #c5e0fa;
      display: block;
      text-align: center;
      margin: 0 auto 7px auto;
      border-radius: 50%;
      background-color: #c5e0fa;
      padding: 3px;
      margin: 3px;
  }
  .progressbar li.active {
      border-color: #f0e772;
      background-color: #f0e772;
  }
</style>
