<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'

export default {
  page: {
    title: 'Certificados SAT',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      valid: true,
      name: '',
      email: '',
    }
  },
}
</script>

<template>
  <Layout>
    <VLayout column justify-space-between fill-height>
      <VImg
        :aspect-ratio="16 / 9"
        :src="require('@src/assets/images/logo.png')"
      ></VImg>
      <VContainer>
        <VLayout column justify-space-between fill-height>
          <h1>Pedirle S.O.S. a mi contador</h1>
          <p
            >Escribe su nombre y correo electrónico. Le enviaremos tu solicitud
            via correo electrónico. Te notificaremos cuando esté lista tu
            información.</p
          >
          <VForm ref="form" v-model="valid" lazy-validation>
            <VTextField
              v-model="name"
              label="Nombre"
              prepend-inner-icon="person"
              required
            ></VTextField>
            <VTextField
              v-model="email"
              label="Email"
              prepend-inner-icon="email"
              required
            ></VTextField>
            <VBtn block color="secondary" dark>
              Enviar
            </VBtn>
          </VForm>
        </VLayout>
      </VContainer>
    </VLayout>
  </Layout>
</template>
