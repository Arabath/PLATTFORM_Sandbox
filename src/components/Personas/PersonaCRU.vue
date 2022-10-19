<template>
  <v-card :loading="isLoading_card" class="mx-auto" width="1000px">
    <v-toolbar color="#64bdff" dark>
      <v-row>
        <v-col style="padding-top: 20px; padding-left: 20px">
          <span class="headline">{{ tituloFormulario }}</span>
        </v-col>
        <v-col align="right" style="padding-top: 15px">
          <v-btn
            fab
            small
            dark
            color="transparent"
            depressed
            @click="
              limpiaDatos();
              $emit('closePersonaCRU');
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <template>
      <v-tabs
        v-model="tabs"
        background-color="#64bdff"
        color="#ffffff"
        dark
        grow
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab href="#tab_datosPersonales"
          ><v-icon medium class="mx-2">mdi-account-details</v-icon>Datos
          Personales</v-tab
        >
        <v-tab href="#tab_perfiles" v-if="accionRealizar == 'ActualizarPersona'"
          ><v-icon medium class="mx-2">mdi-account-check</v-icon
          >Prefiles/Modulos</v-tab
        >
      </v-tabs>
    </template>
    <v-card-text>
      <v-tabs-items v-model="tabs">
        <v-tab-item value="tab_datosPersonales">
          <v-card flat>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      id="apellido"
                      v-model="apellido"
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
                      v-model="nombres"
                      :rules="[() => !!nombres || 'This field is required']"
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
                      v-model="mail"
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
                      v-model="tipoDocumentoID"
                      item-text="tipoDocumento"
                      item-value="tipoDocumentoID"
                      outlined
                      clearable
                      clear-icon="mdi-close-circle-outline"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-text-field
                      v-model="nroDocumento"
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
                          v-model="fechaNacimiento"
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
                        v-model="fechaNacimiento"
                        @input="menuFechaNacimiento = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-autocomplete
                      label="Genero."
                      :items="generos"
                      v-model="genero"
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
                      v-model="paisID"
                      item-text="pais"
                      item-value="paisID"
                      outlined
                      clearable
                      clear-icon="mdi-close-circle-outline"
                      @change="cargaProvincias(paisID)"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-autocomplete
                      label="Provincia."
                      :items="provincias"
                      v-model="provinciaID"
                      item-text="provincia"
                      item-value="provinciaID"
                      outlined
                      clearable
                      clear-icon="mdi-close-circle-outline"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      v-model="ciudad"
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
                      v-model="codPost"
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
                      v-model="calle"
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
                      v-model="numeroPuerta"
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
                      v-model="piso"
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
                      v-model="dpto"
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
                      v-model="telefonoParticular"
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
                      v-model="telefonoLaboral"
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
                      v-model="telefonoCelular"
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
                      v-model="observaciones"
                      :value="observaciones"
                      outlined
                      clearable
                      clear-icon="mdi-close-circle-outline"
                      counter
                      maxlength="200"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="tab_perfiles">
          <v-card flat>
            <v-card-text style="padding-left: 40px; padding-right: 40px">
              <v-row>
                <v-col cols="12" sm="1" md="1"> </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-list dense>
                    <v-subheader style="background-color: teal; color: white"
                      >Perfiles Disponibles</v-subheader
                    >
                    <v-list-item-group
                      v-model="perfDispSel"
                      color="teal"
                      style="border: solid; height: 150px; overflow-y: scroll"
                    >
                      <v-list-item v-for="(perfil, i) in perfiles" :key="i">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="perfil.perfil"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
                <v-col cols="12" sm="2" md="2">
                  <v-container fill-height>
                    <v-row justify="center" class="pt-5 mt-5" align="center">
                      <v-tooltip bottom slot="activator">
                        <template #activator="{ on: onTooltip }">
                          <v-btn
                            v-on="onTooltip"
                            color="green"
                            fab
                            small
                            dark
                            @click="agregaPerfil(perfDispSel)"
                          >
                            <v-icon>mdi-chevron-double-right</v-icon>
                          </v-btn>
                        </template>
                        <span class="tooltip_small">Agregar Perfil</span>
                      </v-tooltip>
                    </v-row>
                    <v-row justify="center" class="pb-5 mb-5" align="center">
                      <v-tooltip bottom slot="activator">
                        <template #activator="{ on: onTooltip }">
                          <v-btn
                            v-on="onTooltip"
                            color="red"
                            fab
                            small
                            dark
                            @click="quitaPerfil(perfAsigSel)"
                          >
                            <v-icon>mdi-chevron-double-left</v-icon>
                          </v-btn>
                        </template>
                        <span class="tooltip_small">Remover Perfil</span>
                      </v-tooltip>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-list dense>
                    <v-subheader style="background-color: teal; color: white"
                      >Perfiles Asignados</v-subheader
                    >
                    <v-list-item-group
                      v-model="perfAsigSel"
                      color="teal"
                      style="border: solid; height: 150px; overflow-y: scroll"
                    >
                      <v-list-item
                        v-for="(perfilAsig, i) in perfilesAsig"
                        :key="i"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="perfilAsig.perfil"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
                <v-col cols="12" sm="1" md="1"> </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" sm="1" md="1"> </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-list dense>
                    <v-subheader style="background-color: teal; color: white"
                      >Modulos Disponibles</v-subheader
                    >
                    <v-list-item-group
                      v-model="modDispSel"
                      color="teal"
                      style="border: solid; height: 150px; overflow-y: scroll"
                    >
                      <v-list-item v-for="(modulo, i) in modulos" :key="i">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="modulo.modulo"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
                <v-col cols="12" sm="2" md="2">
                  <v-container fill-height>
                    <v-row justify="center" class="pt-5 mt-5" align="center">
                      <v-tooltip bottom slot="activator">
                        <template #activator="{ on: onTooltip }">
                          <v-btn
                            v-on="onTooltip"
                            color="green"
                            fab
                            small
                            dark
                            @click="agregaModulo(modDispSel)"
                          >
                            <v-icon>mdi-chevron-double-right</v-icon>
                          </v-btn>
                        </template>
                        <span class="tooltip_small">Agregar Modulo</span>
                      </v-tooltip>
                    </v-row>
                    <v-row justify="center" class="pb-5 mb-5" align="center">
                      <v-tooltip bottom slot="activator">
                        <template #activator="{ on: onTooltip }">
                          <v-btn
                            v-on="onTooltip"
                            color="red"
                            fab
                            small
                            dark
                            @click="quitaModulo(modAsigSel)"
                          >
                            <v-icon>mdi-chevron-double-left</v-icon>
                          </v-btn>
                        </template>
                        <span class="tooltip_small">Remover Modulo</span>
                      </v-tooltip>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-list dense>
                    <v-subheader style="background-color: teal; color: white"
                      >Modulos Asignados</v-subheader
                    >
                    <v-list-item-group
                      v-model="modAsigSel"
                      color="teal"
                      style="border: solid; height: 150px; overflow-y: scroll"
                    >
                      <v-list-item v-for="(modAsig, i) in modulosAsig" :key="i">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="modulosAsig.modulo"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
                <v-col cols="12" sm="1" md="1"> </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-card-actions style="padding-right: 15px">
      <v-spacer></v-spacer>
      <v-btn
        class="my-2 ml-2 mr-2 pr-5"
        depressed
        large
        color="#ff8a80"
        dark
        @click="
          limpiaDatos();
          $emit('closePersonaCRU');
        "
      >
        <v-icon medium class="mx-2" color="#ffffff">mdi-logout</v-icon>Salir
      </v-btn>
      <v-btn
        class="my-2 ml-2"
        depressed
        large
        color="#6cbd70"
        dark
        @click="guardarDatos()"
        v-if="tabs == 'tab_datosPersonales'"
      >
        <v-icon medium class="mr-2" color="#aff7b0"
          >mdi-cloud-upload-outline</v-icon
        >
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import "../../../src/App.css";
import axios from "axios";
import moment from "moment";

export default {
  props: {
    random_app: "",
    accion: "",
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Campo Requerido.",
        counter200: (value) => value.length <= 200 || "Maximo 350 caracteres",
        counter: (value) => value.length <= 20 || "Maximo 20 caracteres",
      },
      isLoading_card: false,
      tabs: null,
      personaID: "",
      nroDocumento: "",
      apellido: "",
      nombres: "",
      tiposDocumentos: [],
      tipoDocumentoID: "",
      menuFechaNacimiento: false,
      fechaNacimiento: "",
      generos: [
        { genero: "Femenino" },
        { genero: "Masculino" },
        { genero: "No Informa" },
      ],
      genero: "",
      mail: "",
      calle: "",
      numeroPuerta: "",
      piso: "",
      dpto: "",
      paises: [],
      paisID: "",
      provincias: [],
      provinciaID: "",
      ciudad: "",
      codPost: "",
      telefonoParticular: "",
      telefonoLaboral: "",
      telefonoCelular: "",
      observaciones: "",
      editedIndex: -1,
      msg: [],
      loading: false,

      perfDispSel: "",
      perfiles: [],
      perfAsigSel: "",
      perfilesAsig: [],

      modDispSel: "",
      modulos: [],
      modAsigSel: "",
      modulosAsig: [],
      accionRealizar:"",
    };
  },

  computed: {

    tituloFormulario() {
      return this.editedIndex == -1 ? "Nueva Persona" : "Actualizar Persona";
    },

    userID() {
      return this.$store.state.usuario.idusuario;
    },
    userPerfilID() {
      return this.$store.state.usuario.defaultPerfilID;
    },

    institucion() {
      return this.$store.state.usuario.institucion;
    },

    institucionID() {
      if (this.institucion == "Holters") {
        return 1;
      }
      if (this.institucion == "Dante") {
        return 2;
      }
    },

    appURL() {
      return axios.defaults.baseURL;
    },
  },
  watch: {
    random_app: function () {
      if (this.random_app) {
        this.loading = true;
        this.ListaTiposDocumento();
        this.cargaPaises();
        this.tabs = "tab_datosPersonales";
    this.accionRealizar = this.accion;
      }
    },
    tabs: function () {
      if (this.tabs == "tab_perfiles") {
        this.cargaPerfiles();
      }
    },
    mail(value) {
      this.msg["mail"] = "";
      console.log("LLEGA ACA");
      console.log("EL VALOR " + value);
      if (value == null) {
        return false;
      }
      this.mail = value;
      this.validateEmail(value);
    },
    password(value) {
      this.password = value;
      this.validatePassword(value);
    },
  },

  created() {
    this.loading = true;
    this.ListaTiposDocumento();
    this.cargaPaises();
    this.tabs = "tab_datosPersonales";
    this.accionRealizar = this.accion;
  },

  methods: {
    moment,

    agregaPerfil(i) {
      console.log("EL VALOR DE I ES " + i + i.length);
      if (i.length == 0) {
        return false;
      }
      console.log("EL PERFIL ID " + this.perfiles[i].perfilID);
      this.perfilesAsig.push(this.perfiles[i]);
      this.perfiles = this.perfiles.filter(
        (perfil) => perfil.perfilID !== this.perfiles[i].perfilID
      );
      this.perfDispSel = "";
      this.perfAsigSel = "";
    },

    quitaPerfil(i) {
      console.log("EL VALOR DE I ES " + i + i.length);
      if (i.length == 0) {
        return false;
      }
      this.perfiles.push(this.perfilesAsig[i]);
      this.perfilesAsig = this.perfilesAsig.filter(
        (item) => item.perfilID !== this.perfilesAsig[i].perfilID
      );
      this.perfDispSel = "";
      this.perfAsigSel = "";
    },

    agregaModulo(i) {
      console.log("EL VALOR DE I ES " + i + i.length);
      if (i.length == 0) {
        return false;
      }
      console.log("EL MODULO ID " + this.modulos[i].moduloID);
      this.modulosAsig.push(this.modulos[i]);
      this.modulos = this.modulos.filter(
        (item) => item.moduloID !== this.modulos[i].moduloID
      );
      this.modDispSel = "";
      this.modAsigSel = "";
    },

    quitaModulo(i) {
      console.log("EL VALOR DE I ES " + i + i.length);
      if (i.length == 0) {
        return false;
      }
      this.modulos.push(this.modulosAsig[i]);
      this.modulosAsig = this.modulosAsig.filter(
        (item) => item.moduloID !== this.modulosAsig[i].moduloID
      );
      this.modDispSel = "";
      this.modAsigSel = "";
    },

    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["mail"] = "";
      } else {
        this.msg["mail"] = "Email Invalido";
      }
    },
    // validatePassword(value) {
    //   let difference = 8 - value.length;
    //   if (value.length < 8) {
    //     this.msg["password"] =
    //       "Must be 8 characters! " + difference + " characters left";
    //   } else {
    //     this.msg["password"] = "";
    //   }
    // },

    validateNumber: (event) => {
      let keyCode = event.keyCode;
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
    },

    // validateNumber1: (event) => {
    //   const charCode = String.fromCharCode(event.keyCode);
    //   if (!/[0-9]/.test(charCode)) {
    //     event.preventDefault();
    //   }
    // },

    cargaPaises() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("api/Paises/" + me.institucion, configuracion)
        .then(function (response) {
          me.paises = response.data;
          if (me.editedIndex == -1) {
            me.paisID = 9;
            me.cargaProvincias(me.paisID);
          }
        })
        .catch(function (error) {
          console.log(error);
          if (error.response && error.response.status === 401) {
            me.salir();
          } else {
            // Handle error however you want
          }
        });
    },

    cargaProvincias(paisID) {
      console.log("cargaProvincias");
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get(
          "api/Provincias/" + paisID + "," + me.institucion + "/porpais",
          configuracion
        )
        .then(function (response) {
          me.provincias = response.data;
          if (me.loading == true) {
            document.getElementById("apellido").focus();
          }
          me.loading = false;
        })
        .catch(function (error) {
          console.log(error);
          if (error.response && error.response.status === 401) {
            me.salir();
          } else {
            // Handle error however you want
          }
        });
    },

    // cargaTiposDocumento() {
    //   let me = this;
    //   let header = { Authorization: "Bearer " + this.$store.state.token };
    //   let configuracion = { headers: header };
    //   axios
    //     .get("api/TiposDocumento/" + me.institucion, configuracion)
    //     .then(function (response) {
    //       me.tiposDocumentos = response.data;
    //       console.log(me.tiposDocumentos);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       if (error.response && error.response.status === 401) {
    //         me.salir();
    //       } else {
    //         // Handle error however you want
    //       }
    //     });
    // },

    async ListaTiposDocumento() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const data = await axios.get(`api/TiposDocumento/${me.institucion}`, configuracion, { timeout: 30000 });
        me.tiposDocumentos = data.data;
        console.log(data.data)
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
      }
    },



    cargaPerfiles() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("api/Perfiles/" + me.institucion, configuracion)
        .then(function (response) {
          console.log("Funcion_a Perfil listarPerfiles");
          me.perfiles = response.data;
          me.perfiles = me.perfiles.filter(
            (perfil) => perfil.perfilDescripcion !== "Retiros"
          );
          console.log(me.perfiles);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    guardarDatos() {
      this.$refs.form.validate();

      console.log(this.$refs.form.validate());
      console.log(this.msg.mail);
      if (
        this.$refs.form.validate() == false ||
        this.msg.mail == "Email Invalido"
      ) {
        return false;
      }

      if (this.accionRealizar == "AltaPersona") {
        this.AltaPersona();
      }
    },

    AltaPersona() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      axios
        .post(
          "api/Personas/" + me.institucion + "/AltaPersona",
          {
            nroDocumento: me.nroDocumento,
            institucionID: me.institucionID,
            apellido: me.apellido,
            nombres: me.nombres,
            tipoDocumentoID: me.tipoDocumentoID,
            fechaNacimiento: me.fechaNacimiento,
            genero: me.genero,
            mail: me.mail,
            calle: me.calle,
            numeroPuerta: me.numeroPuerta,
            piso: me.piso,
            dpto: me.dpto,
            paisID: me.paisID,
            provinciaID: me.provinciaID,
            ciudad: me.ciudad,
            codPost: me.codPost,
            telefonoParticular: me.telefonoParticular,
            telefonoLaboral: me.telefonoLaboral,
            telefonoCelular: me.telefonoCelular,
            observaciones: me.observaciones,
          },
          configuracion
        )
        .then(function (response) {
          console.log(response);
          me.$emit("showAlert", "green", response.data.resultado + "!!!");
          me.personaID = response.data.id;
          me.editedIndex = me.personaID;
          me.accionRealizar = "ActualizarPersona";
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            console.log(error.response);
          } else {
            me.$emit(
              "showAlert",
              "red",
              "Ha ocurrido un ERROR al intentar Crear Persona"
            );
          }
        });
    },

    limpiaDatos() {
      this.nroDocumento = "";
      this.apellido = "";
      this.nombres = "";
      this.tiposDocumentos = [];
      this.tipoDocumentoID = "";
      this.menuFechaNacimiento = false;
      this.fechaNacimiento = "";
      this.genero = "";
      this.mail = "";
      this.calle = "";
      this.numeroPuerta = "";
      this.piso = "";
      this.dpto = "";
      this.paises = [];
      this.paisID = "";
      this.provincias = [];
      this.provinciaID = "";
      this.ciudad = "";
      this.codPost = "";
      this.telefonoParticular = "";
      this.telefonoLaborarl = "";
      this.telefonoCelular = "";
      this.observaciones = "";
      this.editedIndex = -1;
    },
  },
};
</script>

