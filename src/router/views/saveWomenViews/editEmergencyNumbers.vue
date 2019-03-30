<template>
  <VApp>
    <VLayout align-space-around justify-space-between fill-height>
      <VContainer text-xs-center colum>
        <h1>Confiamos en ellos como tu lo haces</h1>
        <p>Recuerda que siempre que lo necesites, notificaremos a:</p>
        <p v-if="arrayEnabledAlert">Lo sentimos, solo puedes tener 5 contactps de emergencia</p>
        <VCard v-for="(contact, index) in contacts" :key="index">
        <VList two-line>

           <VListTile>
            <VListTileAction>
              <VIcon color="indigo">face</VIcon>
            </VListTileAction>

            <VListTileContent>
              <VListTileTitle>{{contact.name}}</VListTileTitle>
              <VListTileSubTitle>Nombre</VListTileSubTitle>
            </VListTileContent>
          </VListTile>

          <VDivider inset></VDivider>

          <VListTile>
            <VListTileAction>
              <VIcon color="indigo">phone</VIcon>
            </VListTileAction>

            <VListTileContent>
              <VListTileTitle>{{contact.phone}}</VListTileTitle>
              <VListTileSubTitle>Teléfono</VListTileSubTitle>
            </VListTileContent>
          </VListTile>

          <VDivider inset></VDivider>

          <VListTile>
            <VListTileAction>
              <VIcon color="indigo">mail</VIcon>
            </VListTileAction>

            <VListTileContent>
              <VListTileTitle>{{contact.email}}</VListTileTitle>
              <VListTileSubTitle>Personal</VListTileSubTitle>
            </VListTileContent>
          </VListTile>

          <VDivider inset></VDivider>

          <VListTile>
            <VListTileAction>
              <VIcon color="indigo">fingerprint</VIcon>
            </VListTileAction>

            <VListTileContent>
              <VListTileTitle>{{contact.relativesData}}</VListTileTitle>
              <VListTileSubTitle>Relación</VListTileSubTitle>
            </VListTileContent>
          </VListTile>

          <VListTile>
            <VListTileAction>
              <VIcon color="indigo">date_range</VIcon>
            </VListTileAction>

            <VListTileContent>
              <VListTileTitle>{{contact.notes}}</VListTileTitle>
              <VListTileSubTitle>Notas</VListTileSubTitle>
            </VListTileContent>
          </VListTile>
        </VList>
      </VCard>
      </VContainer>
    </VLayout>
    <VBtn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <VIcon>add</VIcon>
    </VBtn>
    <VDialog v-model="dialog" width="800px">
      <VCard>
        <VCardTitle
          class="grey lighten-4 py-4 title"
        >
          Añade un contacto
        </VCardTitle>
        <VContainer grid-list-sm class="pa-4">
          <VLayout row wrap>
            <VFlex xs12 align-center justify-space-between>
              <VLayout align-center>
                <VAvatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </VAvatar>
                <VTextField
                  v-model="newUser.name"
                  placeholder="Nombre"
                ></VTextField>
              </VLayout>
            </VFlex>
            <VFlex xs12>
              <VTextField
                v-model="newUser.relativesData"
                prepend-icon="business"
                placeholder="Relación"
              ></VTextField>
            </VFlex>
            <VFlex xs12>
              <VTextField
                v-model="newUser.email"
                prepend-icon="mail"
                placeholder="Email"
              ></VTextField>
            </VFlex>
            <VFlex xs12>
              <VTextField
                v-model="newUser.phone"
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000000 - 0000"
                mask="phone"
              ></VTextField>
            </VFlex>
            <VFlex xs12>
              <VTextField
                v-model="newUser.notes"
                prepend-icon="notes"
                placeholder="Notas"
              ></VTextField>
            </VFlex>
          </VLayout>
        </VContainer>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn flat color="red" @click="dialog = false">Cerrar</VBtn>
          <VBtn flat color="green" @click="saveData">Guardar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <!-- Bottom bar -->
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
export default {
  data (){
    return{
      dialog: false,
      drawer: null,
      contacts: [],
      newUser: {
        name: '',
        relativesData: '',
        email: '',
        phone: '',
        notes: ''
      },
      arrayEnabledAlert : false,
    }
  },
  mounted(){
    if(localStorage.Contacs){
      let localContacts = JSON.parse(localStorage.Contacs);
      console.log(localContacts);
      for(let index =0; index<= localContacts.length; index++){
        this.contacts.push({
          "name": localContacts[index].name,
          "relativesData": localContacts[index].relativesData,
          "email": localContacts[index].email,
          "phone": localContacts[index].phone,
          "notes": localContacts[index].notes
        });
      }
    }
  },
  methods:{
    saveData(){
      console.log('saveData');
      let sizeContactArray = JSON.parse(localStorage.Contacs).length;
      let newContacData = this.newUser;
      if(sizeContactArray<= 5){
        console.log(JSON.stringify(newContacData));
        console.log(sizeContactArray);
        this.arrayEnabledAlert = false;
        this.contacts.push({
          "name": newContacData.name,
          "relativesData": newContacData.relativesData,
          "email": newContacData.email,
          "phone": newContacData.phone,
          "notes": newContacData.notes
        });
        localStorage.Contacs = JSON.stringify(this.contacts);
        newContacData.name = '';
        newContacData.relativesData = '';
        newContacData.email = '';
        newContacData.phone = '';
        newContacData.notes = '';
      } else {
        this.arrayEnabledAlert = true;
      }
    }
  }
}
</script>
<style>
.v-btn--bottom:not(.v-btn--absolute) {
    bottom: 80px;
}


</style>
