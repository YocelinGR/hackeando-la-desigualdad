<template>
  <Layout>
    <TabsTop @next="nextTab"></TabsTop>
        <AccessTab v-if="activeTab===0"></AccessTab>
        <Earned v-if="activeTab===1">Seguridad</Earned>
        <div v-if="activeTab===2">Más info</div>
  </Layout>
</template>

<script>

  import Layout from '@layouts/main'
  import appConfig from '@src/app.config'
  import TabsTop from '../../components/tabsTop'
  import AccessTab from '../../components/accessTab'
  import Earned from '../../components/earn'

export default {
  name: "TabsView",
  page: {
    title: 'Así cuidamos tu información',
    meta: [{ name: 'description', content: appConfig.description}]
  },
  components: {
    Layout,
    TabsTop,
    AccessTab,
    Earned },
  data(){
    return {
      activeTab: 0
    }
  },
  methods: {
    nextTab(indexTab) {
      this.activeTab = indexTab
      console.log(this.activeTab)
    }
  }

}
</script>
