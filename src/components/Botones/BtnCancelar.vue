<template>
  <v-btn @click="cancelar" depressed large class="pr-8">
    <v-icon medium class="mx-2" color="#999999"></v-icon>Cancelar
  </v-btn>
</template>
<script>
import router from '../../router'

export default {
  props:{
    rutaTo: String
  },
  methods:{
    cancelar(){
      console.log("RUTA" + this.rutaTo)
      router.push('/' + this.rutaTo)
    }
  }
}
</script>
