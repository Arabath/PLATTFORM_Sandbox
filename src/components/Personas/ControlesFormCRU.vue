<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" sm="4" md="4">
          <v-text-field
            id="apellido"
            v-model.trim="persona.apellido"
            :rules="[rules.required, rules.counter]"
            label="Apellido"
            outlined
            autocomplete="off"
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-text-field
            v-model="persona.nombres"
            :rules="[() => !!persona.nombres || 'This field is required']"
            label="Nombres"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-text-field
            v-model="persona.mail"
            label="Mail"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
          <span v-if="msg.mail">{{ msg.mail }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3" md="3">
          <v-autocomplete
            label="Tipo Documento."
            :items="tiposDocumentos"
            :rules="[rules.required]"
            v-model="persona.tipoDocumentoID"
            item-text="tipoDocumento"
            item-value="tipoDocumentoID"
            outlined
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="3" md="3">
          <v-text-field
            v-model="persona.nroDocumento"
            :rules="[rules.required]"
            label="Nº Documento"
            autocomplete="off"
            outlined
            clearable
            clear-icon="mdi-close-circle-outline"
            @keypress="validateNumber"
            maxlength="15"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3" md="3">
          <v-menu
            v-model="menuFechaNacimiento"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="persona.fechaNacimiento"
                label="Fecha de Nacimiento"
                prepend-icon="event"
                readonly
                v-on="on"
                outlined
                clearable
                clear-icon="mdi-close-circle-outline"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="persona.fechaNacimiento"
              @input="menuFechaNacimiento = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="3" md="3">
          <v-autocomplete
            label="Genero."
            :items="generos"
            v-model="persona.genero"
            item-text="genero"
            item-value="genero"
            outlined
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3" md="3">
          <v-autocomplete
            label="Pais."
            :items="paises"
            v-model="persona.paisID"
            item-text="pais"
            item-value="paisID"
            outlined
            clearable
            clear-icon="mdi-close-circle-outline"
            @change="cargarProvincias(persona.paisID)"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="3" md="3">
          <v-autocomplete
            label="Provincia."
            :items="provincias"
            v-model="persona.provinciaID"
            item-text="provincia"
            item-value="provinciaID"
            outlined
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-text-field
            v-model="persona.ciudad"
            label="Ciudad"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" md="2">
          <v-text-field
            v-model="persona.codPost"
            label="Codigo Postal"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row> </v-row>
      <v-row>
        <v-col cols="12" sm="3" md="3">
          <v-text-field
            v-model="persona.calle"
            label="Calle"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" md="2">
          <v-text-field
            v-model="persona.numeroPuerta"
            label="Numero Puerta"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" md="2">
          <v-text-field
            v-model="persona.piso"
            label="Piso"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" md="2">
          <v-text-field
            v-model="persona.dpto"
            label="Dpto"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="4">
          <v-text-field
            v-model="persona.telefonoParticular"
            label="Telefono Particular"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-text-field
            v-model="persona.telefonoLaboral"
            label="Telefono Laboral"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-text-field
            v-model="persona.telefonoCelular"
            label="Telefono Celular"
            autocomplete="off"
            outlined
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-textarea
            :rules="[rules.counter200]"
            rows="3"
            auto-grow
            label="Observaciones"
            v-model="persona.observaciones"
            :value="persona.observaciones"
            outlined
            clearable
            clear-icon="mdi-close-circle-outline"
            counter
            maxlength="200"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="6" md="6"></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6"></v-col>
        <v-col cols="12" sm="6" md="6" class="text-right">
          <BtnCancelar class="mr-2" :rutaTo="'personas'"></BtnCancelar>
          <BtnGuardar type="submit" :disabled="bloquearSubmit" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import BtnCancelar from "@/components/Botones/BtnCancelar";
import BtnGuardar from "@/components/Botones/BtnGuardar";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    BtnCancelar,
    BtnGuardar,
  },
  props: {
    persona: Object,
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Campo Requerido.",
        counter200: (value) => value.length <= 200 || "Maximo 350 caracteres",
        counter: (value) => value.length <= 20 || "Maximo 20 caracteres",
      },
      menuFechaNacimiento: false,
      msg: [],
      generos: [
        { genero: "Femenino" },
        { genero: "Masculino" },
        { genero: "No Informa" },
      ],
    };
  },
  computed: {
    ...mapState("tiposdocumento", ["tiposDocumentos"]),
    ...mapState("paises", ["paises"]),
    ...mapState("provincias", ["provincias"]),
    bloquearSubmit() {
      return this.persona.apellido.trim() === "" ||
        this.persona.nombres.trim() === ""
        ? true
        : false;
    },
  },
  methods: {
    ...mapActions("provincias", ["cargarProvincias"]),
    validateNumber: (event) => {
      let keyCode = event.keyCode;
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
    },
  },
};
</script>
