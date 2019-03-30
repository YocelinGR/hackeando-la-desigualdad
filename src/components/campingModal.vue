<template>
  <div class="text-xs-center">
    <VDialog
      v-model="dialog"
      width="500"
    >
      <VCard>
        <VCardTitle
          primary-title
        >
          <VImg src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" alt="amping image" :aspect-ratio="16/9" class="modal">
            <VLayout pa-2 column fill-height class="lightbox white--text">
              <VSpacer></VSpacer>
              <VFlex shrink>
                <div class="subheading">You are in baby!</div>
              </VFlex>
            </VLayout>
          </VImg>
        </VCardTitle>

        <VCardText class="text-md-center">
          With so many different ways today to find information online, it can sometimes be hard to know where to go to first. I wan to look at the major.
        </VCardText>

        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn
            color="purple"
            flat
            @click="closeModal"
          >
            CONTINUE
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script>
export default {
  name: "CampingModal",
  props: {
    dialog: {
      type: Boolean,
    }
   },
   methods: {
     closeModal: function () {
       this.dialog = false
       this.$router.push({name:'bottom-bar'});
     }
   }
}
</script>

<style>
  .v-img .modal{
    width: 100% !important;
    height: 200px !important;
  }
  .v-card__title {
    padding: 0 !important;
  }

</style>
