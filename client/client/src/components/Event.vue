<template>
  <div class="event">
<form
  id="app"
  @submit="checkForm"
  action="https://vuejs.org/"
  method="post"
>

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li  :key="error" v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="name">Nom de l'événement</label>
    <input
      id="name"
      v-model="name"
      type="text"
      name="name"
    >
  </p>
  <p>
    <label for="name">Description de l'événement</label>
    <textarea
      id="name"
      v-model="name"
      
      name="name"
    />
  </p>

  <p>
    <label for="age">Date</label>
    <input
      id="age"
      v-model="age"
      type="date"
      name="age"
      min="0"
    >
  </p>



<div class="custom-control custom-switch">
  <input v-model="publik" type="checkbox" class="custom-control-input" id="customSwitch1" >
  <label class="custom-control-label" for="customSwitch1" >Evénément {{check}}</label>
</div>

<div class="card-body">
        <l-map style="height: 40rem; width:50%;  display: flex; justify-content: center;" :zoom="zoom" :center="center"  :minZoom="zoom" :markerZoomAnimation="true" attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'>
            
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng.sync="marker.position" :draggable="marker.draggable" :icon="icon"></l-marker>
            <l-marker :lat-lng="PlaceToFind" :draggable="false" :visible="end"></l-marker>
            
        </l-map>
        
        <button v-on:click="submitLoc()" class="btn btn-primary myb">Valider</button>
    </div>  

  <p>
    <input
      type="submit"
      value="Submit"
    >
  </p>

</form>
</div>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import { Icon, icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  name: "event",
 components: {
      LMap,
      LTileLayer,
      LMarker,      
  },
  data() {
      return {
errors: [],
    name: null,
    age: null,
    publik: false,
  url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
          zoom: 13,
        x:46.918294,
        y:2.267119,
        positionX:46.918294,
        positionY:2.267119,
          center: [46.918294,2.267119],
          marker: {
              id: 'm1',
              position: { lat: "46.918294,2", lng: "2.267119"},
              tooltip: 'tooltip for marker1',
              draggable: true,
              visible: true,
          },
          PlaceToFind: { lat: this.x, lng: this.y},
          dist: 0,
          distM: 0,
          end: false,
          launch: setTimeout(this.initialisation, 600),
          icon: icon({
              iconUrl: "https://image.flaticon.com/icons/svg/60/60834.svg",
              iconSize: [32,37],
              iconAnchor: [16, 37]
          })

      }
  },
  props: {}, methods:{
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.age) {
        this.errors.push('Age required.');
      }

      e.preventDefault();
    },          
       
       submitLoc() {
          
       },
       initialisation() {
           this.center = [this.positionX, this.positionY]
          this.zoom=1
           this.marker.position.lat = this.positionX
           this.marker.position.lng = this.positionY
       }
  },computed: {
  check: function () {
    if(this.publik){
    return "publique"
}else{ return "privé"}
  }
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
