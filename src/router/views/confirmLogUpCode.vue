<template>
  <Layout>
        <VLayout justify-space-between fill-height align-space-between>
          <VContainer text-xs-center class="light-blue--text" column>
              <p>Escribe el código que te enviamos</p>
                <p v-if="errors.length" data-testid="errors">
                  <b>Ops!, parece que algo no anda bien: </b>
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </p>
                <VTextField
                    v-model="confirmCode"
                    max="4" required
                    data-testid="confirmCode"
                ></VTextField>
              <p>¿No recibiste el código? <a href="#" data-testid="changeCode" class="light-blue--text font-weight-bold" @click="sendCode()">Reenviar</a></p>
              <VLayout justify-space-between fill-height align-space-between>
                <VContainer column>
                  <VBtn block data-testid="generateCode" color="#2699fb" class="white--text font-weight-thin caption" @click ="createAccount()">CREAR CUENTA</VBtn>
                  <CampingModal :dialog="dialog"></CampingModal>
                </VContainer>
              </VLayout>
          </VContainer>
        </VLayout>
  </Layout>
</template>

<script>
import Layout from '@layouts/main'
import appConfig from '@src/app.config'
import CampingModal from '../../components/campingModal.vue'

export default {
  name: "ConfimLogUpCode",
  page: {
    title: 'Código de confirmación',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    Layout,
    CampingModal,
   },
  data() {
    return {
      code: "3457",
      confirmCode: "",
      errors: [],
      dialog: false
    }
  },
  watch: {
    code: function() {
      this.confirmCode = ''
      this.debouncedGetCode()
    }
  },
  created: function() {
    this.debouncedGetCode = this.sendCode
  },
  methods: {
    createAccount: function() {
      this.errors = [];
      if(this.confirmCode.length === 4) {
        if (this.confirmCode === this.code) {
          console.log("Success");
          this.dialog = true;
        } else {
          this.errors.push('Código invalido.');
          this.dialog = false;
        }
      } else {
        if (this.confirmCode.length === 0) {
          this.errors.push('El código es requerido.');
          this.dialog = false;
        } else {
          this.errors.push('El código debe tener 4 dígitos.');
          this.dialog = false;
        }
      }
    },
     sendCode: function () {
       this.errors = [];

       const newCode = Math.floor((Math.random() * 10000) + 1).toString();
       if(newCode.length === 4){
         this.code = newCode
         this.errors = []
       } else {
         this.code =  newCode + "1"
         this.errors = []
       }

     }
  }
}
</script>
<style>
  ul{
    list-style-type: none;
  }
</style>
