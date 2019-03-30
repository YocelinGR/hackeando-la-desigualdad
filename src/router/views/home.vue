<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'

export default {
  page: {
    title: 'Home',
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
      <VContainer>
        <VLayout column justify-space-between fill-height>
          <h1>Home</h1>
        </VLayout>
      </VContainer>
    </VLayout>
  </Layout>
</template>
