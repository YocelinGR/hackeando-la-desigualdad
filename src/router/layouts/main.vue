<template>
  <VApp id="inspire">
    <VNavigationDrawer v-model="drawerRight" fixed right clipped app>
      <VList dense>
        <VListTile @click.stop="right = !right">
          <VListTileAction>
            <VIcon>exit_to_app</VIcon>
          </VListTileAction>
          <VListTileContent>
            <VListTileTitle>Open Temporary Drawer</VListTileTitle>
          </VListTileContent>
        </VListTile>
      </VList>
    </VNavigationDrawer>
    <VToolbar color="blue-grey" dark fixed app clipped-right>
      <VToolbarSideIcon @click.stop="drawer = !drawer"></VToolbarSideIcon>
      <VToolbarTitle>{{ toolbarTitle }}</VToolbarTitle>
      <VSpacer></VSpacer>
      <VToolbarSideIcon @click.stop="drawerRight = !drawerRight">
        <VIcon>more_vert</VIcon>
      </VToolbarSideIcon>
    </VToolbar>
    <VNavigationDrawer v-model="drawer" fixed app>
      <VList dense>
        <VListTile @click.stop="left = !left">
          <VListTileAction>
            <VIcon>exit_to_app</VIcon>
          </VListTileAction>
          <VListTileContent>
            <VListTileTitle>
              <RouterLink :to="{ name: 'certificados' }"
                >Certificados</RouterLink
              >
            </VListTileTitle>
          </VListTileContent>
        </VListTile>
      </VList>
    </VNavigationDrawer>
    <VNavigationDrawer v-model="left" temporary fixed></VNavigationDrawer>
    <VContent>
      <slot />
    </VContent>
    <VNavigationDrawer
      v-model="right"
      right
      temporary
      fixed
    ></VNavigationDrawer>
    <VFooter color="blue-grey" class="white--text" app>
      <span>Vuetify</span>
      <VSpacer></VSpacer>
      <span>&copy; 2017</span>
    </VFooter>
  </VApp>
</template>
<script>
export default {
  props: {
    source: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
      toolbarTitle: 'Toolbar',
    }
  },
  watch: {
    $meta: (newVal) => {},
  },
  mounted() {
    this.toolbarTitle = this.$meta().refresh().titleChunk
  },
}
</script>
<style lang="scss" module>
// @import '@design';

// .container {
//   min-width: $size-content-width-min;
//   max-width: $size-content-width-max;
//   margin: 0 auto;
// }
</style>
