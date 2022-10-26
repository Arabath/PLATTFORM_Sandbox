/* TODO: COPIADO DE LibrosTemasFormCRUD.vue Reemplazar los valores y setear 
    para que funcione con GestionConvivencia.vue
 */

<template>
  <v-card class="mx-auto" color="#ffffff">


  
  
  </v-card>
</template>
<script>


export default {

  props: {

    /* props traidas desde GestionLibrosTemas {#c6ed97} */
    convivencia: Object,
    accion: "",
    random_LT: "",

  },

  data() {
    return {
      rules: {
        required: (value) => !!value || "Campo Requerido.",
        counter: (value) => value.length <= 20 || "Maximo 20 caracteres",
      },
      msg: [],
      tema: ""
    };
  },

  /* bloquea boton Guardar si no hay nada escrito en el text field {#ffdf2a} */
  computed: {
    bloquearSubmit() {
      return this.convivencia.descripcion.trim() === ""
        ? true
        : false;
    },
  },

  watch: {
    'random_LT': function () {
      if (this.random_LT) {
        console.log(this.random_LT);
        console.log(this.accion);
      }
    },
  },

  methods: {
    Cerrar() {
      this.$emit('closeLTCRUD')
    },
  },
};
</script>
