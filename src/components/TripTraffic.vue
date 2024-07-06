<script setup>
import MapContainer from './MapContainer.vue';


</script>

<template>
  <div class="mapContainer">
    <MapContainer></MapContainer>
  </div>
</template>

<style scoped>
.mapContainer{
  display: flex;
  position: relative;
  /* 垂直居中 */ 
  align-items: center;
  /* 水平居中 */ 
  justify-content: center; 
  padding: 15px;
}
</style>