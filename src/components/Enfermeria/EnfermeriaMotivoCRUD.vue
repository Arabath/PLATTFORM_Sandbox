<template>
  <v-card class="mx-auto" color="#ffffff">

    <v-toolbar flat color="#f0f2f5">
      <v-row>
        <v-col md="auto" style="padding-top:15px; padding-left:20px">
          <span class="headline_dlg" style="color:black">{{ accion }} Enfermeria Motivo</span>
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

        <v-row>
          <v-col cols="2">
          </v-col>
          <v-col cols="8">
            <v-text-field id="enfermeriaMotivo" v-model.trim="enfermeriaMotivo.motivo"
              :rules="[rules.required, rules.counter]" label="Convivencia Concepto" outlined autocomplete="off"
              clearable clear-icon="mdi-close-circle-outline">
            </v-text-field>
          </v-col>
        </v-row>

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

//import axios from "axios";

export default {

  props: {
    enfermeriaMotivo: Object,
    accion: "",
    random_EM: "",
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Campo Requerido.",
        counter: (value) => value.length <= 20 || "Maximo 20 caracteres",
      },
      enfermeriaMotivo: [],
      motivoID: "",
      motivo:""
    };
  },
  computed: {
    bloquearSubmit() {
      return this.enfermeriaMotivo.motivo.trim() === ""
        ? true
        : false;
    },
  },

  watch: {
    'random_EM': function () {
      if (this.random_EM) {
        // console.log(this.this.random_EM);
         this.motivoID = this.enfermeriaMotivo.motivoID;
         console.log(this.random_EM)
         console.log(this.accion)
      }
    },
  },



  methods: {
    Cerrar() {
      this.$emit('closeEMCRUD')
    },

    // async ListaEnfermeriaMotivos() {
    //   let header = { Authorization: "Bearer " + this.$store.state.token };
    //   let configuracion = { headers: header };
    //   let me = this;
    //   me.loadingData = true;
    //   try {
    //     const data = await axios.get(
    //       `api/Enfermeria/${me.institucion}/ListaEnfermeriaMotivos`,
    //       configuracion,
    //       { timeout: 30000 }
    //     );
    //     console.log(data.data);
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     me.loadingData = false;
    //   }
    // },
  },
};
</script>
