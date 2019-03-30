<template>
  <VApp>
    <VLayout align-space-around justify-space-between full-height>
      <VContainer text-xs-center column>
      <form>
        <VTextField
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Nombre"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></VTextField>
        <VTextField
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></VTextField>
        <VTextField
          v-model="edad"
          :error-messages="nameErrors"
          :counter="2"
          label="Edad"
          required
          @input="$v.edad.$touch()"
          @blur="$v.edad.$touch()"
        ></VTextField>

        <VBtn @click="submit">Actualiza</VBtn>
        <VBtn @click="clear">Limpia</VBtn>
      </form>
      </VContainer>
      </VLayout>
      <VCard height="60px" class="bootom-bar">
              <VBottomNav
                :active.sync="bottomNav"
                :color="color"
                :value="true"
                absolute
                dark
                shift
              >
                <VBtn dark>
                  <span>Contactos</span>
                  <RouterLink to="/editNumbers" href="#" class="white--text font-weight-bold" data-testid="btn-link">
                    <VIcon>supervisor_account</VIcon>
                  </RouterLink>
                </VBtn>

                <VBtn dark>
                  <span>Alerta</span>
                  <RouterLink to="/panicButton" href="#" class="white--text font-weight-bold" data-testid="btn-link">
                    <VIcon>settings_phone</VIcon>
                  </RouterLink>
                </VBtn>

                <VBtn dark>
                  <span>Perfil</span>
                  <RouterLink to="/profile" href="#" class="white--text font-weight-bold" data-testid="btn-link">
                    <VIcon>face</VIcon>
                  </RouterLink>
                </VBtn>
              </VBottomNav>
            </VCard>
  </VApp>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
    },

    data: () => ({
      name: '',
      email: '',
      edad: '',
      myUser: {
        name: '',
        email: '',
        edad: '',
      }
    }),
    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    mounted(){
      if(localStorage.User){
        let localStorageUser = JSON.parse(localStorage.User);
        this.myUser.name = localStorageUser.name;
        this.myUser.email = localStorageUser.email;
        this.myUser.edad = localStorageUser.edad;
        this.name = localStorageUser.name;
        this.email = localStorageUser.email;
        this.edad = localStorageUser.edad;
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
        this.myUser.name = this.name;
        this.myUser.email = this.email;
        this.myUser.edad = this.edad;
        localStorage.User = JSON.stringify(this.myUser);
      },
      clear () {
        this.$v.$reset()
        this.name = '';
        this.email = '';
        this.edad = '';
      }
    }
  }
</script>
