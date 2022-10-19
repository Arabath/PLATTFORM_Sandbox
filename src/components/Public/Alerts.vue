<template>
  <v-snackbar
      v-model="ver"
      :color="alertColor"
      :timeout="alertTime"
    >
     <span class="alert">{{ alertMessage }}</span>
    </v-snackbar>
</template>
 <script>
 export default {
  props: {
     alertMessage:"",
     alertColor: "",
     alertTime : 3000,
     snackbar: "",
   },
data(){
return{
   ver: false,
};
},

watch:{
  'snackbar':function () {
    this.alerta;
  }
},

created(){
   this.alerta;
},

computed:{
  alerta: function(){
    if (this.snackbar =="mostrar"){
      return this.ver=true;
    }
  },
      institucion(){
      return this.$store.state.usuario.institucion;
    },

}

  };
 </script>
 <style scoped>
 .alert{
   font-size: 16px;
 }
 </style>

