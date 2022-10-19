<template>
  <v-layout align-start>
    <v-flex>

      
      <v-data-table
        :headers="cabecerapersonas"
        :items="personas"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.opciones`]="{ item }">
          <v-btn color="green" fab x-small dark @click="editaPersona(item)">
            <v-icon size="14">mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            color="blue"
            title="Resetear Password"
            class="mx-2"
            fab
            x-small
            dark
            @click="showResetPassword(item)"
          >
            <v-icon size="14">fa-unlock-alt</v-icon>
          </v-btn>
          <template v-if="item.estado">
            <v-btn
              color="red"
              fab
              x-small
              dark
              @click="activarDesactivarMostrar(2, item)"
            >
              <v-icon size="14">fa-ban</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-icon small @click="activarDesactivarMostrar(1, item)"
              >fa-check</v-icon
            >
          </template>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="listarPersonas()">Resetear</v-btn>
        </template>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Personas</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="text-xs-center"
              v-model="search"
              append-icon="search"
              label="Búsqueda"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="mx-2"
                  v-on="on"
                  fab
                  dark
                  small
                  color="cyan"
                  @click="showPersonaCRU('AltaPersona')"
                  style="margin-top: 10px"
                >
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span class="tooltip">Nueva Persona</span>
            </v-tooltip>
          </v-toolbar>
        </template>
      </v-data-table>

      <!--Modal Activar Desactivar Usuario-->
      <v-dialog v-model="adModal" persistent max-width="550">
        <v-card>
          <v-card-title class="headline" v-if="adAccion == 1"
            >¿Activar Persona?</v-card-title
          >
          <v-card-title class="headline" v-if="adAccion == 2"
            >¿Desactivar Persona?</v-card-title
          >
          <v-card-text>
            Estás a punto de
            <span v-if="adAccion == 1">Activar</span>
            <span v-if="adAccion == 2">Desactivar</span>
            a {{ nombreCompleto }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="adAccion == 1"
              color="orange darken-4"
              text
              @click="activar()"
            >
              <v-icon small class="mx-2">fa-check</v-icon>Activar
            </v-btn>
            <v-btn
              v-if="adAccion == 2"
              color="orange darken-4"
              text
              @click="desactivar()"
            >
              <v-icon small class="mx-2">fa-ban</v-icon>Desactivar
            </v-btn>
            <v-btn
              color="primary darken-1"
              text
              @click="activarDesactivarCerrar()"
            >
              <v-icon small class="mx-2">fa-times-circle</v-icon>Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Fin-->
    </v-flex>

    <!------------------>
    <!--Personas Crear-->
    <!------------------>
    <v-dialog v-model="dlgPersonaCRU" scrollable persistent max-width="80%">
      <personaCRU
        :random_app="random_app"
        :accion="accion"
        @closePersonaCRU="closePersonaCRU"
        @showAlert="showAlert"
      />
    </v-dialog>

    <!-------------------------------------------------------->
    <!--Reseteo Clave                                       -->
    <!-------------------------------------------------------->
    <v-dialog
      v-model="dlgResetPassword"
      scrollable
      persistent
      max-width="425px"
    >
      <resetPassword
        :nombreCompleto="nombreCompleto"
        :personaID="personaID"
        @closeResetPassword="closeResetPassword"
        @showAlert="showAlert"
      />
    </v-dialog>

    <!----------------------->
    <!--Alerts--------------->
    <!----------------------->
    <template v-if="alertDlg">
      <Alerts
        :alertColor="alertColor"
        :alertMessage="alertMessage"
        :snackbar="snackbar"
      />
    </template>
  </v-layout>
</template>

<script>
import axios from "axios";
import personaCRU from "./PersonaCRU";
import Alerts from "@/components/Public/Alerts";

export default {
  components: {
    personaCRU,
    Alerts,
  },
  data() {
    return {
      search: "",
      personas: [],
      cabecerapersonas: [
        { text: "Nombre", value: "nombreCompleto" },
        { text: "Email", value: "mail", sortable: false },
        { text: "Documento", value: "nroDocumento", sortable: false },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      nombreCompleto: "",
      personaID: "",
      dlgResetPassword: false,
      alertDlg: false,
      adAccion: 0,
      adModal: 0,
      dlgPersonaCRU: false,
      random_app: "",
      accion:"",
    };
  },

  computed: {
    institucion() {
      return this.$store.state.usuario.institucion;
    },
  },

  watch: {},

  created() {
    this.listarPersonas();
  },

  methods: {
    salir() {
      this.$store.dispatch("salir");
    },

    showResetPassword(item) {
      this.personaID = item.id;
      this.nombreCompleto = item.nombreCompleto;
      this.dlgResetPassword = true;
    },

    closeResetPassword() {
      this.dlgResetPassword = false;
    },

    showPersonaCRU(accion) {
      this.random_app = Math.random();
      this.accion = accion
      this.dlgPersonaCRU = true;
    },

    closePersonaCRU() {
      this.dlgPersonaCRU = false;
    },

    showAlert(tipo, mensaje) {
      (this.snackbar = false),
        (this.alertColor = tipo),
        (this.alertMessage = mensaje),
        (this.snackbar = "mostrar"),
        (this.alertDlg = true),
        this.cerrarAlert();
    },

    cerrarAlert: function () {
      var me = this;
      setTimeout(() => {
        (this.snackbar = ""), (this.alertDlg = false);
      }, 3000);
    },

    listarPersonas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("api/personas/" + me.institucion, configuracion)
        .then(function (response) {
          me.personas = response.data;
          //     console.log(me.personas);
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

    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.nombreCompleto = item.nombreCompleto;
      this.id = item.id;
      if (accion == 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },

    activarDesactivarCerrar() {
      this.adModal = 0;
    },

    desactivar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .delete(
          "api/Personas/" + this.id + "," + me.institucion,
          configuracion,
          {}
        )
        .then(function (response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.nombreCompleto = "";
          me.listarPersonas();
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

    activar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put(
          "api/Personas/" + this.id + "," + me.institucion + "/activar",
          {
            condicion: true,
          },
          configuracion
        )
        .then(function (response) {
          me.adModal = 0;
          me.adAccion = 0;
          me.nombre = "";
          me.adId = "";
          me.listarPersonas();
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
  },
};
</script>