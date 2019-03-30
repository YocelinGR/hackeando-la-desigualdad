<template>
  <Layout>
    <VLayout justify-space-between align-space-between>
      <VContainer text-xs-center column class="minusPaddingTop">
        <h1>Great! You´re almost done.</h1>

        <VLayout align-space-between justify-start>
          <VContainer column class="minusPaddingTop">
            <VFlex>
              <VImg
                src="https://picsum.photos/350/165?random"
                aspect-ratio="1"
              ></VImg>
            </VFlex>
          </VContainer>
         </VLayout>

         <VLayout align-space-between justify-start>
          <VContainer column class="minusPaddingTop">
            <VList subheader>
              <VListTile
                v-for="(item, index) in items"
                :key="index"
                caption
              >
                <VListTileAvatar>
                  <VAvatar color="black" size="24">
                    <span class="white--text" caption>{{ index + 1 }}</span>
                  </VAvatar>
                </VListTileAvatar>

                <VListTileContent>
                  {{ item }}
                </VListTileContent>
              </VListTile>
            </VList>
          </VContainer>
         </VLayout>
      </VContainer>
    </VLayout>
    <VBottomNav
          :active.sync="bottomNav"
          color="#019ae8"
          value="true"
          absolute
          class="white--text"
        >
          <VBtn flat color="#019ae8">
            <span></span>
          </VBtn>
          <VBtn flat color="#019ae8" class="white--text">
            <RouterLink to="/tabsView" href="#" class="white--text font-weight-bold">Done</RouterLink>
          </VBtn>
        </VBottomNav>
  </Layout>
</template>

<script>

import Layout from '@layouts/main'
import appConfig from '@src/app.config'

export default {
  name: "BottomBar",
  page: {
    title: '',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    Layout,
   },
   data() {
     return {
       bottomNav: 0,
       items: ['To finish setting up Great Simple, visit www.greatsimple.io',
               'Install the Great Simple app for your computer']
     }
   },
}
</script>

<style>
  .theme--light.v-bottom-nav .v-btn:not(.v-btn--active) {
    color: white !important;
  }
  .theme--light.v-list {
    background: transparent;
}
.v-list__tile__content {
  font-size: 14px;
}
.v-image__image, .v-image__placeholder {
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
}
 .minusPaddingTop {
  padding-top: 0px !important;
}
</style>
