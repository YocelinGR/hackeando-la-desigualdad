<template>
  <VFlex text-xs-center>
      <VLayout align-space-between justify-space-between row reverse fill-height>
          <VFlex xs6 order-lg2>
            <VCard dark tile flat color="transparent" class="light-blue--text">
              <VCardText class="headline cyan--text">$3,800</VCardText>
              <P class="subheading">COBRADO</P>
            </VCard>
          </VFlex>
          <VFlex xs6>
            <VCard dark tile flat color="transparent" class="light-blue--text">
              <VCardText class="headline">$1,890</VCardText>
              <p class="subheading">PENDIENTE</p>
            </VCard>
          </VFlex>
      </VLayout>
      <VLayout fill-height align-space-between justify-space-between>
        <VContainer column>
          <VProgressCircular value="77" color="light-blue"></VProgressCircular><span>77% Marketing</span>
          <VProgressCircular value="23" color="light-blue"></VProgressCircular><span>23% Otros</span>
        </VContainer>
      </VLayout>
  </VFlex>
</template>
