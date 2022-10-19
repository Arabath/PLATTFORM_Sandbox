<template>
  <!-- Navbar principal horizontal -->
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#4682b4"
      dark
      elevate-on-scroll
      v-if="this.$store.state.usuario != null"
      class="top-background"
    >
      <v-toolbar-title style="width: 70px; padding-top: 7px" class="ml-0 pl-0">
        <span class>
          <img
            class="d-inline-block align-top img1"
            src="./assets/logo_p02.png"
            @click="showScreenMain()"
            style="cursor: pointer"
          />
        </span>
      </v-toolbar-title>
      <v-toolbar-title
        style="width: 400px"
        class="ml-0 pl-0 hidden-sm-and-down"
      >
        <v-toolbar-title style="width: 400px" class="ml-0 pl-1 pb-2">
          <span class="tituloApp" style="color: #ffffff">pla</span>
          <span class="tituloApp" style="color: #ffffff">tt</span>
          <span class="tituloApp" style="color: #46e6f8">form</span>
        </v-toolbar-title>
      </v-toolbar-title>

      <div class="flex-grow-1 pt-0 pr-10" style=""></div>
      <span class="hidden-sm-and-down mr-5"> Ciclo {{ cicloLectivo }} </span>

      <v-toolbar-title>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="appURL + '/Datos/' + avatar" style="cursor: pointer" />
          </v-list-item-avatar>
          <v-list-item-content
            v-on:click.stop="
              drawer_user = !drawer_user;
              ciclo = cicloLectivo;
            "
            style="cursor: pointer"
            v-if="isLogged"
          >
            <v-list-item-title>{{ userName }}</v-list-item-title>
            <v-list-item-subtitle class="parentezco">{{
              userPerfil
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-toolbar-title>
    </v-app-bar>

    <!-- Fondo principal que contiene la grid -->
    <v-content style="background-color: #e9e9e9">
      <v-container class="fill-height" fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <!-- Menú navegación lateral izquierdo -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      color="#f1f1f5"
      v-if="this.$store.state.usuario != null"
      permanent
      expand-on-hover
    >
      <v-layout fill-height column justify-space-between>
        <v-list dense>
          <v-list-item class="menu_principal_group" :to="{ name: 'personas' }">
            <v-btn
              fab
              small
              depressed
              dark
              color="#d0d0d0"
              style="margin-right: 10px; margin-left: 5px"
            >
              <v-icon>mdi-account-multiple</v-icon>
            </v-btn>
            <v-list-item-content>
              <v-list-item-title class="menu_principal"
                >PERSONAS</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list-group>
          <v-list-item slot="activator" class="menu_principal_group">
            <v-btn
              fab
              depressed
              small
              dark
              color="#d0d0d0"
              style="margin-right: 10px; margin-left: 5px"
            >
              <v-icon>mdi-fingerprint</v-icon>
            </v-btn>
            <v-list-item-title> Gestion de Datos </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'gestionLibrosTemas' }">
            <v-list-item-action></v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="menu_principal"
                >Biblioteca Libros Temas</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

         <v-list-group>
          <v-list-item slot="activator" class="menu_principal_group">
            <v-btn
              fab
              depressed
              small
              dark
              color="#d0d0d0"
              style="margin-right: 10px; margin-left: 5px"
            >
              <v-icon>mdi-fingerprint</v-icon>
            </v-btn>
            <v-list-item-title> Gestion de Datos </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'gestionConvivencia' }">
            <v-list-item-action></v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="menu_principal"
                >Biblioteca Libros Temas</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

      </v-layout>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="drawer_user"
      right
      temporary
      class="overflow-hidden"
      app
      color="#ffffff"
    >
      <v-list-item style="padding-top: 5px">
        <v-list-item-avatar>
          <img :src="appURL + '/Datos/' + avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
          <v-list-item-subtitle class="parentezco">{{
            userPerfil
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item style="padding-top: 5px">
        <v-list-item-content>
          <v-autocomplete
            label="Ciclo"
            :items="ciclosLectivos"
            v-model="ciclo"
            solo
            item-text="cicloLectivo"
            item-value="cicloLectivo"
            autocomplete="off"
            persistent-hint
            @change="seleccionaCiclo()"
          ></v-autocomplete>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item @click="showMisDatosPersonales()">
          <v-list-item-icon>
            <v-icon color="#777777">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Mis datos personales</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="salir()">
          <v-list-item-icon>
            <v-icon color="#777777">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Cambiar Datos Personales -->
    <v-dialog
      v-model="dlgMisDatosPersonales"
      scrollable
      persistent
      max-width="600px"
    >
      <datosPersonales
        :random_app="random_app"
        @closeMisDatosPersonales="closeMisDatosPersonales"
        @showAlert="showAlert"
      />
    </v-dialog>
    <!-- Cambiar Datos Personales -->

    <!-- Alert -->
    <template v-if="alertDlg">
      <Alerts
        :alertColor="alertColor"
        :alertMessage="alertMessage"
        :snackbar="snackbar"
      />
    </template>
    <!-- Alert -->
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import datosPersonales from "./components/Personas/datosPersonales";
import Alerts from "@/components/Public/Alerts";

export default {
  name: "App",
  components: {
    datosPersonales,
    Alerts,
  },

  data() {
    return {
      drawer: null,
      drawer_user: null,
      random_app: "",
      dlgMisDatosPersonales: false,
      alertDlg: false,
      ciclosLectivos: [
        { text: "2021", cicloLectivo: 2021 },
        { text: "2022", cicloLectivo: 2022 },
      ],
      ciclo: "",
    };
  },

  computed: {
    ...mapState(["loading"]),

    logueado() {
      return this.$store.state.usuario;
    },

    institucion() {
      return this.$store.state.usuario.institucion;
    },

    appURL() {
      return axios.defaults.baseURL;
    },

    isLogged() {
      return this.$store.state.usuario && this.$store.state.usuario.rol != "";
    },
    userName() {
      if (!this.$store.state.usuario) {
        return;
      }
      return this.$store.state.usuario.nombre;
    },
    userPerfil() {
      if (!this.$store.state.usuario) {
        return;
      }
      return this.$store.state.usuario.rol;
    },
    avatar() {
      if (!this.$store.state.usuario) {
        return "images.png";
      }
      return this.$store.state.usuario.avatar;
    },
    cicloLectivo() {
      if (!this.$store.state.cicloLectivo) {
        return;
      }
      return this.$store.state.cicloLectivo;
    },
  },

  created() {
    this.$store.dispatch("autoLogin");
    this.listarAutorizacionModulos();
    if (
      this.logueado &&
      (this.userPerfil == "Alumno" || this.userPerfil == "Docente")
    ) {
      this.showScreenMain();
    }
    let cicloSeleccionado = localStorage.getItem("cicloLectivo");
    console.log("CICLO SELECCIONADO " + cicloSeleccionado);
    if (!cicloSeleccionado) {
      this.$store.dispatch("cicloLectivo", new Date().getFullYear());
      this.ciclo = parseInt(this.cicloLectivo);
    } else {
      this.$store.dispatch("cicloLectivo", cicloSeleccionado);
      this.ciclo = parseInt(this.cicloLectivo);
    }

    console.log("EL CICLO ES " + this.ciclo);
  },

  watch: {},

  methods: {
    seleccionaCiclo() {
      this.$store.dispatch("cicloLectivo", this.ciclo);
      if (
        this.$store.state.usuario.rol == "Preceptor" ||
        this.$store.state.usuario.rol == "Alumno" ||
        this.$store.state.usuario.rol == "Docente" ||
        this.$store.state.usuario.rol == "Familia"
      ) {
        this.$router.push({ name: "Main" });
      } else {
        this.$router.push({ name: "home" });
      }
    },

    listarAutorizacionModulos() {
      var usuarioID = this.$store.state.usuario.idusuario;
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get(
          "api/Permisos/" +
            usuarioID +
            "," +
            me.institucion +
            "/AutorizacionModulos",
          configuracion
        )
        .then(function (response) {
          me.modulos = response.data;
          me.$store.dispatch("menuConfiguracion", false);
          me.$store.dispatch("menuInstitucional", false);
          me.$store.dispatch("menuComunicaciones", false);
          me.$store.dispatch("menuAulaVirtual", false);
          me.$store.dispatch("menuMensajeria", false);
          me.$store.dispatch("menuMonitoreo", false);
          me.$store.dispatch("menuInformes", false);
          me.$store.dispatch("menuFormularios", false);
          me.$store.dispatch("menuBiblioteca", false);
          me.$store.dispatch("menuCalificaciones", false);
          me.$store.dispatch("menuInasistencias", false);
          me.$store.dispatch("menuTerciarioPlanEstudio", false);
          me.$store.dispatch("menuSoporte", false);
          me.$store.dispatch("menuEspacioDocente", false);

          var idPerfilActual = me.$store.state.usuario.defaultPerfilID;
          for (var i = 0; i < me.modulos.length; i++) {
            if (me.modulos[i].perfilID == idPerfilActual) {
              if (me.modulos[i].moduloID == 1) {
                me.$store.dispatch("menuConfiguracion", true);
              }
              if (me.modulos[i].moduloID == 2) {
                me.$store.dispatch("menuInstitucional", true);
              }
              if (me.modulos[i].moduloID == 3) {
                me.$store.dispatch("menuComunicaciones", true);
              }
              if (me.modulos[i].moduloID == 4) {
                me.$store.dispatch("menuAulaVirtual", true);
              }
              if (me.modulos[i].moduloID == 5) {
                me.$store.dispatch("menuMensajeria", true);
              }
              if (me.modulos[i].moduloID == 6) {
                me.$store.dispatch("menuMonitoreo", true);
              }
              if (me.modulos[i].moduloID == 7) {
                me.$store.dispatch("menuInformes", true);
              }
              if (me.modulos[i].moduloID == 8) {
                me.$store.dispatch("menuFormularios", true);
              }
              if (me.modulos[i].moduloID == 9) {
                me.$store.dispatch("menuBiblioteca", true);
              }
              if (me.modulos[i].moduloID == 10) {
                me.$store.dispatch("menuCalificaciones", true);
              }
              if (me.modulos[i].moduloID == 11) {
                me.$store.dispatch("menuInasistencias", true);
              }
              if (me.modulos[i].moduloID == 12) {
                me.$store.dispatch("menuTerciarioPlanEstudio", true);
              }
              if (me.modulos[i].moduloID == 13) {
                me.$store.dispatch("menuSoporte", true);
              }
              if (me.modulos[i].moduloID == 14) {
                me.$store.dispatch("menuEspacioDocente", true);
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    salir() {
      this.drawer_user = null;
      this.$store.dispatch("salir");
    },

    showMisDatosPersonales() {
      this.random_app = Math.random();
      this.dlgMisDatosPersonales = true;
    },
    closeMisDatosPersonales() {
      this.dlgMisDatosPersonales = false;
    },

    showAlert(tipo, mensaje) {
      (this.snackbar = false),
        (this.alertColor = tipo),
        (this.alertMessage = mensaje),
        (this.snackbar = "mostrar"),
        (this.alertDlg = true),
        this.cerrarAlert();
    },

    showScreenMain() {
      this.$store.dispatch("hijoID", "");
      this.$router.push({ name: "Main" });
    },

    getInstIMGUrl(institucion) {
      if (institucion == "Holters") {
        try {
          return require("./Datos/" + institucion);
        } catch (error) {
          return require("./Datos/Holters/logo_holters.png");
        }
      }

      if (institucion == "Dante") {
        try {
          return require("./Datos/" + institucion);
        } catch (error) {
          return require("./Datos/Dante/logo_uada.jpg");
        }
      }
    },

    cerrarAlert: function () {
      var me = this;
      setTimeout(() => {
        (this.snackbar = ""), (this.alertDlg = false);
      }, 3000);
    },
  },
};
</script>

<style>
.top-background {
  background-image: linear-gradient(left, #65adf1, #65adf1 90%);
}

.color1 {
  background-image: url("assets/bg.png");
  background-size: cover;
  display: flex;
  height: auto;
  width: auto;
  max-height: 100%;
  max-width: 100%;
}

/* xs */
.img1 {
  width: 30px;
  height: auto;
}

/* sm */
@media (min-width: 768px) {
  .img1 {
    width: 30px;
  }
}

/* md */
@media (min-width: 992px) {
  .img1 {
    width: 35px;
  }
}

/* lg */
@media (min-width: 1200px) {
  .img1 {
    width: 42px;
  }
}
</style>

