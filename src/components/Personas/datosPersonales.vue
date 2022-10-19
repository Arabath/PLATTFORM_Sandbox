<template>
  <v-card class="mx-auto" :loading="isLoadingDatos" style="padding:0px">
    <v-toolbar color="#64bdff" dark>
      <v-row>
        <v-col md="auto" style="padding-top:15px; padding-left:20px">
          <v-avatar class="mx-3">
            <v-img :src="appURL + '/Datos/'+ avatar"></v-img>
          </v-avatar>
          <span class="headline_dlg">Mis datos personales</span>
        </v-col>
        <v-col align="right" style="padding-top:15px">
          <v-btn fab small dark color="transparent" depressed @click="$emit('closeMisDatosPersonales')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="apellido" label="Apellido" autocomplete="off"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field id="txtnombres" name="txtnombres" v-model="nombres" label="Nombres" autocomplete="off">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="mail" label="E-Mail" autocomplete="off"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="nroDocumento" readonly label="Nº Documento"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="calle" label="Calle" autocomplete="off"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-text-field v-model="numeroPuerta" label="Nº" autocomplete="off"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-text-field v-model="piso" label="Piso" autocomplete="off"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-text-field v-model="dpto" label="Dpto" autocomplete="off"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="telefonoParticular" label="Telefono" autocomplete="off"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-menu v-model="menuFechaNacimiento" :close-on-content-click="false" :nudge-right="40"
              transition="scale-transition" offset-y min-width="90px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="fechaNacimiento" label="Fecha de Nacimiento" prepend-icon="event" readonly
                  v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="fechaNacimiento" @input="menuFechaNacimiento = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions style="padding-right:15px">
      <div class="flex-grow-1"></div>
      <v-btn class="my-2" depressed large color="#00bcd4" dark @click="guardar()" style="padding-right:20px">
        <v-icon small class="mx-2">fa-save</v-icon>Guardar
      </v-btn>
      <v-btn text depressed large @click="$emit('closeMisDatosPersonales')">
        <v-icon small class="mx-2">fa-times-circle</v-icon>Cancelar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: {
    random_app: ""
  },

  data() {
    return {
      isLoadingDatos: false,
      misDatos: [],
      apellido: "",
      nombres: "",
      menuFechaNacimiento: false,
      fechaNacimiento: "",
      mail: "",
      calle: "",
      numeroPuerta: "",
      piso: "",
      dpto: "",
      telefonoParticular: "",
      nroDocumento: "",
      avatar: "images.png",
      valida: 0,
      validaMensaje: [],
      dialogValidaPersona: false,
      url: null,
      files: null,
      file: "",
      adAccion: 0,
      adModal: 0
    };
  },

  computed: {
    usuarioID() {
      return this.$store.state.usuario.idusuario;
    },
    institucion() {
      return this.$store.state.usuario.institucion;
    },
    appURL() {
      return axios.defaults.baseURL;
    },
  },

  watch: {
    random_app: function () {
      if (this.random_app) {
        this.obtenerDatos();
      }
    }
  },

  created() {
    this.obtenerDatos();
  },

  methods: {
    salir() {
      this.$store.dispatch("salir");
    },

    async obtenerDatos() {
      this.url = "";
      this.isLoadingDatos = true;
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.loadingData = true
      try {
        const response = await axios.get(`api/personas/${me.usuarioID},${me.institucion}`, configuracion, { timeout: 30000 });
        me.misDatos = response.data;
        me.apellido = me.misDatos.apellido;
        me.nombres = me.misDatos.nombres;
        me.mail = me.misDatos.mail;
        me.calle = me.misDatos.calle;
        me.numeroPuerta = me.misDatos.numeroPuerta;
        me.piso = me.misDatos.piso;
        me.dpto = me.misDatos.dpto;
        me.telefonoParticular = me.misDatos.telefonoParticular;
        me.nroDocumento = me.misDatos.nroDocumento;
        me.fechaNacimiento = new Date(me.misDatos.fechaNacimiento)
          .toISOString()
          .substr(0, 10);
        me.avatar = me.misDatos.avatar;
        me.isLoadingDatos = false;

      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
      }
    },


    close() {
      this.limpiar();
      this.$emit("closeMisDatosPersonales");
    },

  async guardar() {
      if (this.validar()) {
        return;
      }
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      if (me.password != me.passwordAnt) {
        me.actPassword = true;
      }
      me.loadingData = true
      try {
        const response = await axios.put(`api/Personas/${me.usuarioID},${me.institucion}/datosPersonales`,
          {
            id: me.usuarioID,
            apellido: me.apellido,
            nombres: me.nombres,
            fechaNacimiento: me.fechaNacimiento,
            mail: me.mail,
            calle: me.calle,
            numeroPuerta: me.numeroPuerta,
            piso: me.piso,
            dpto: me.dpto,
            telefonoParticular: me.telefonoParticular,
            avatar: me.avatar
          },
          configuracion);
        me.$emit(
            "showAlert",
            "green",
            "Los datos se han actualizado con exito!"
          );
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
      }
    },


    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.nombres.length < 3 || this.nombres.length > 30) {
        this.validaMensaje.push(
          "El nombre debe tener más de 3 caracteres y menos de 30 caracteres."
        );
      }
      if (this.apellido.length < 3 || this.apellido.length > 30) {
        this.validaMensaje.push(
          "El apellido debe tener más de 3 caracteres y menos de 30 caracteres."
        );
      }
      if (this.validaMensaje.length) {
        this.dialogValidaPersona = true;
        this.valida = 1;
      }
      return this.valida;
    },

    limpiar() {
      this.files = null;
      this.isLoadingDatos = false;
    }
  }
};
</script>