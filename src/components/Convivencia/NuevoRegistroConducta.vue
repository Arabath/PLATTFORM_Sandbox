/* TODO: COPIADO DE LibrosTemasFormCRUD.vue Reemplazar los valores y setear 
    para que funcione con GestionConvivencia.vue
 */

<template>
  <v-card class="mx-auto" color="#ffffff">

    <!-- /* header crear libro tema {#55ff33} */ -->
    <v-toolbar flat color="#f0f2f5">
      <v-row>
        <v-col md="auto" style="padding-top:15px; padding-left:20px">
          <span class="headline_dlg" style="color:black">{{accion}} Libro Tema</span>
        </v-col>
        <v-col align="right" style="padding-top:15px">
          <v-btn fab small color="transparent" depressed @click="Cerrar()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-card-text style="padding-left:15px; padding-right:15px">
      <v-container style="padding-left:0px; padding-right:0px">

      <!--  Input crear nuevo libro tema  /* {#af33ff} */ -->
        <v-row>
          <v-col cols="2">
          </v-col>
          <v-col cols="8">
            <v-text-field id="tema" v-model.trim="libroTema.tema" :rules="[rules.required, rules.counter]"
              label="Libro Tema" outlined autocomplete="off" clearable clear-icon="mdi-close-circle-outline">
            </v-text-field>
          </v-col>
        </v-row>

        <!-- /* Botonera {#33ddff} */ -->
        <v-row>
          <v-col cols="12" class="text-right">
            <v-btn @click="Cerrar()" depressed class="pr-8">
              <v-icon medium class="mx-2" color="#999999"></v-icon>Cancelar
            </v-btn>
            &nbsp;&nbsp;
            <v-btn type="submit" :disabled="bloquearSubmit" depressed color="#6cbd70">
              <v-icon medium class="mr-2" color="#aff7b0">mdi-cloud-upload-outline</v-icon>
              Guardar
            </v-btn>
          </v-col>
        </v-row>
     
      </v-container>
    </v-card-text>
  
  </v-card>
</template>
<script>


export default {

  props: {

    /* props traidas desde GestionLibrosTemas {#c6ed97} */
    libroTema: Object,
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
      return this.libroTema.tema.trim() === ""
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
