<template>
  <VTabs
      v-model="active"
      color="#673ab7"
      dark
      slider-color="white"
      centered
      grow
    >
      <VTab
        v-for="(item, index) in items"
        :key="index"
        ripple
        v-on="next()"
      >
        {{ item }}

      </VTab>
  </VTabs>
</template>

<script>
export default {
  data(){
    return {
      active: null,
      items: [
        'ACCESO',
        'INGRESOS',
        'MÁS INFO'
      ],
    }
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
      this.$emit('next', this.active)
    }
  }
}
</script>
