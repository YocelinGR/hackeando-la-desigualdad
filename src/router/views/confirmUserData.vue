<template>
  <Layout>
        <VLayout justify-space-between fill-height align-center>
          <VContainer data-testid="confirm" class="ligth-blue--text" column>
            <VForm data-testid="confirmDataForm" text-xs-center>
              <VTextField
                    v-model="validUser.validEmail"
                    prepend-inner-icon="person"
                ></VTextField>
                <VTextField
                    v-model="validUser.validPassword"
                    prepend-inner-icon="person"
                ></VTextField>
                <VTextField
                    v-model="validUser.validPhone"
                    prepend-inner-icon="phone_iphone"
                ></VTextField>
            </VForm>
            <VLayout fill-height>
              <VContainer column>
                <VBtn block data-testid="confirmData" color="#2699fb" class="white--text font-weight-thin caption" @click ="confirmUser">CONTINUAR</VBtn>
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
  name: "ConfirmUserData",
  page: {
    title: 'Bienvenido',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      validUser: {
        validEmail: "",
        validPassword: "",
        validPhone: ""
      },
    }
  },
  created(){
    this.validUser = this.$route.params.validUser;
  },
  methods: {
    confirmUser: function () {
      this.$router.push({name:'confim-log-up-code', params: { validUser: this.validUser }});
    }
  },
}
</script>
<style>

</style>
