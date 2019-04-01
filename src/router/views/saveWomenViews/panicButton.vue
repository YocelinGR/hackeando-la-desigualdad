<template>
  <VApp>
      <VLayout align-space-around justify-space-between fill-height>
          <VContainer text-xs-center column>
            <h1>Tu seguridad es lo más importante</h1>
            <p>Activa la alerta de emergencia oprimiento el botón de abajo si te sientes en peligro</p>
            <p>Nosotros enviaremos un mensaje a tus contactos de emergencia y a 911 para poder ayudarte</p>
            <div>
              <VBtn id="alerta" color="red" fab large dark @click="startAlert">
                <VIcon>touch_app</VIcon>
              </VBtn>
            </div>
            <VBtn v-if="danger" outline round color="indigo" @click="stopAlert">
              <VIcon left dark>verified_user</VIcon>
              Desactiva la alarma</VBtn>
          </VContainer>
      </VLayout>
        <!-- Modal alarm -->
         <VDialog v-model="dialog" persistent max-width="600px">
        <VCard>
          <VCardTitle>
            <span class="headline">Ingresa tu contraseña</span>
          </VCardTitle>
          <VCardText>
            <VContainer grid-list-md>
              <VLayout wrap>
                <VFlex xs12 sm6 md4>
                  <VTextField v-model="myPassword" label="Contraseña*" required></VTextField>
                </VFlex>
              </VLayout>
            </VContainer>
            <small>*Para asegurarnos de tu bienestar, ingresa tu contraseña</small>
          </VCardText>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn color="blue darken-1" flat @click="dialog = false">Cerrar</VBtn>
            <VBtn color="blue darken-1" flat @click="confirmPassword">Enviar</VBtn>
          </VCardActions>
        </VCard>
         </VDialog>
        <!--  -->
       <VCard height="60px" class="bootom-bar" v>
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
    data () {
      return {
        bottomNav: 2,
        time: 0,
        password: JSON.parse(localStorage.User).password,
        danger : false,
        dialog: false,
        myPassword: '',
        // accountSid : 'AC2fe67bf8921cfbae5ca0bbd580a3e428',
        // authToken : ,
        // client : require('twilio')(this.accountSid, thi'571a907918d9ea7b1fb65ebddc49d346's.authToken)
      }
    },
    computed: {
      color () {
        switch (this.bottomNav) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'indigo'
        }
      }
    },
    methods: {
      sendSMS(){
        console.log('Entrada');
        const phoneServer = '+12039416043';
        const phoneAlert = '+525527258173';
        const mySMS = JSON.parse(localStorage.getItem("User")).name;
        const lat = JSON.parse(localStorage.getItem("latitde"));
        const long = JSON.parse(localStorage.getItem("longitude"));
        const alertMessage = `Estas recibiendo este mensaje por que ${mySMS}
            esta en situacion de alerta. Su posicion es: ${lat}, ${long}`;
        const fetchServer = ({ phoneAlert, alertMessage}) => {
          console.log('Se llama');
          fetch('http://localhost:5000/message', {
            method: 'post',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ body:alertMessage, to: phoneAlert , from: phoneServer})
          })
            .then(function (res) {
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            });

        };
         fetchServer({ phoneAlert, alertMessage });
      },
      startAlert(){
        console.log('Tu alerta ha sido activada');
        this.danger = true;
        const _this = this;
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(myPosition){
              console.log("Latitude: " + myPosition.coords.latitude +
              "Longitude: " + myPosition.coords.longitude);
              localStorage.latitde = JSON.stringify(myPosition.coords.latitude);
              localStorage.longitude = JSON.stringify(myPosition.coords.longitude);
              // console.log("Latitude: " + JSON.parse(`${localStorage}`) +
              // "Longitude: " + JSON.parse(`${localStorage}`));
              _this.sendSMS();
          });
        } else {
          console.log('Geolocalización no habilitada');
        }
      },
      stopAlert(){
        this.dialog = true;
      },
      confirmPassword(){
        if(this.myPassword === this.password){
          console.log('Nos alegra que estes bien!.');
          this.danger = false;
          this.dialog = false;
        } else {
          console.log('No podemos desactivar la alerta!.');
          this.danger = true;
          this.dialog = false;
        }
      }
    }
  }
</script>

<style>
 .v-btn--floating.v-btn--large {
    height: 100px;
    width: 100px;
  }
  .v-btn--floating.v-btn--large .v-icon {
    font-size: 40px;
  }
</style>
