<template>
  <v-container>
    <v-row>
      <v-card class="mx-auto">
        <v-toolbar color="#64bdff" dark>
          <v-row>
            <v-col style="padding-top: 20px; padding-left: 20px">
              <span class="headline"
                ><v-icon large class="mx-2">mdi-account-details</v-icon>
                Crear Persona</span
              >
            </v-col>
            <v-col align="right" style="padding-top: 15px">
              <v-btn
                :to="{ name: 'personas' }"
                fab
                small
                dark
                color="transparent"
                depressed
                @click="limpiaDatos()"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-toolbar>
        <v-card-text>
          <v-card flat>
            <v-card-text>
              <v-form @submit.prevent="enviaDatos()" ref="form" lazy-validation>
                <ControlesFormCRU :persona="persona" />
              </v-form>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import BtnIngresar from "../../components/Botones/BtnIngresar.vue";

import ControlesFormCRU from "../../components/Personas/ControlesFormCRU.vue";

export default {
  name: "AltaPersona",
  components: {
    BtnIngresar,
    ControlesFormCRU,
  },

  data() {
    return {
      persona: {
        id: "",
        apellido: "",
        nombres: "",
        mail: "",
        tipoDocumentoID: "",
        nroDocumento: "",
        fechaNacimiento: "",
        genero: "",
        paisID: "",
        provinciaID: "",
        ciudad: "",
        codPost: "",
        calle: "",
        numeroPuerta: "",
        piso: "",
        dpto: "",
        telefonoParticular: "",
        telefonoLaboral: "",
        telefonoCelular: "",
        observaciones: "",
      },
    };
  },
  methods: {
    ...mapActions("personas", ["createPersona"]),
    ...mapActions("tiposdocumento", ["cargarTiposDocumentos"]),
    ...mapActions("paises", ["cargarPaises"]),
    ...mapActions("provincias", ["cargarProvincias"]),
    ...mapMutations(["mostrarLoading", "ocultarLoading"]),

    enviaDatos() {
      this.$refs.form.validate();
      this.createPersona(this.persona);
      this.limpiaDatos();
      this.$refs.form.resetValidation();
    },
    limpiaDatos() {
      this.persona = {
        id: "",
        apellido: "",
        nombres: "",
        mail: "",
        tipoDocumentoID: "",
        nroDocumento: "",
        fechaNacimiento: "",
        genero: "",
        paisID: "",
        provinciaID: "",
        ciudad: "",
        codPost: "",
        calle: "",
        numeroPuerta: "",
        piso: "",
        dpto: "",
        telefonoParticular: "",
        telefonoLaboral: "",
        telefonoCelular: "",
        observaciones: "",
      };
    },
  },
  created() {
    this.cargarTiposDocumentos();
    this.persona.tipoDocumentoID = 1
    this.cargarPaises();
    this.persona.paisID = 9
    this.cargarProvincias(9)
    this.persona.provinciaID = 1
  },
};
</script>
