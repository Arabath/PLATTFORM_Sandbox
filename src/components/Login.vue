<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-card :loading="isLoadingLogin" class="mx-auto" max-width="100%" style="opacity: 0.9">

        <v-card-text style='padding-left:50px; padding-right:65px; padding-top:0px'>
          <v-form>
            <v-icon dark>mdi-key-variant</v-icon>

            <v-toolbar-title style='padding-left:20px; padding-bottom:0px; text-align:center'>
              <img class="d-inline-block align-top imgLogin" src="../assets/logo_p01.png" style="cursor:pointer" />
            </v-toolbar-title>

            <v-toolbar-title style='padding-left:20px; padding-bottom:40px; text-align:center' v-if="formulario==0">
              Bienvenidos a PLATTFORM</v-toolbar-title>
            <v-toolbar-title style='padding-left:20px; padding-bottom:40px; text-align:center' v-if="formulario==1">
              Recuperar Contraseña</v-toolbar-title>

            <v-text-field v-if="formulario!=2" v-model="usuario" prepend-icon="mdi-account" autofocus color="accent"
              :label="labelMail" @blur="listarInstitucionesXPersona()"></v-text-field>

            <v-alert border="left" colored-border color="green" elevation="1" v-if="formulario==1">
              <span class="textoGray">Te enviaremos un correo a tu casilla con un enlace para restablecer tu
                contraseña.</span>
            </v-alert>

            <v-text-field v-if="formulario==0" v-model="password" prepend-icon="lock" type="password" color="accent"
              label="Contraseña" @keyup.enter="ingresar()"></v-text-field>

            <v-text-field v-if="formulario==2" v-model="password_nueva_1" prepend-icon="lock" type="password"
              color="accent" label="Nueva Contraseña " @keyup.enter="ingresar()"></v-text-field>

            <v-text-field v-if="formulario==2" v-model="password_nueva_2" prepend-icon="lock" type="password"
              color="accent" label="Retipear nueva contraseña " @keyup.enter="ingresar()"></v-text-field>

            <v-autocomplete label="Institucion" :items="personaInstituciones" v-model="identificador" solo
              prepend-icon="school" item-text="institucion" item-value="identificador" autocomplete="off">
              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar>
                    <img :src="getImgUrl(data.item.logo)" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="data.item.institucion"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>

            <v-flex class="red--text" v-if="error">{{error}}</v-flex>
            <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
          </v-form>
          <v-row>
            <v-col align="center">
              <v-btn @click="ingresar()" color="primary" large width="200px" v-if="formulario==0">Ingresar</v-btn>
              <v-btn @click="passwordRecovery" color="primary" width="200px" v-if="formulario==1">Enviar</v-btn>
              <v-btn @click="changePassword" color="primary" width="200px" v-if="formulario==2">Enviar</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center" style="padding-bottom:35px">
              <a href="javascript:void(0)" @click="cambiaFormulario(1,'Su email')" v-if="formulario==0">Olvidaste tu
                contraseña ?</a>
              <a href="javascript:void(0)" @click="cambiaFormulario(0, 'Email o Documento Nro')"
                v-if="formulario==1">Iniciar sesión</a>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>

</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      usuario: "",
      password: "",
      error: null,
      valida: 0,
      validaMensaje: [],
      formulario: 0,
      labelMail: "Usuario",
      isLoadingLogin: false,
      modulos: [],
      institucion: "",
      identificador: "",
      personaInstituciones: [],
    };
  },
  computed: {
    usuarioID() {
      return this.$store.state.usuario.idusuario;
    },
    institucionSel() {
      return this.$store.state.usuario.institucion;
    },
  },

  methods: {
    ...mapActions("personas", ["limpiarVariablesPersonas"]),

    validar() {
      this.limpiarVariablesPersonas();
      this.valida = 0;
      this.validaMensaje = [];

      if (this.personaInstituciones.length > 1 && !this.identificador) {
        this.validaMensaje.push("Debe seleccionar una Institucion");
      }

      if (!this.usuario) {
        this.validaMensaje.push("El campo Email es Obligatorio");
      }
      if (!this.password) {
        this.validaMensaje.push("El campo Password es Obligatorio.");
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },

    cambiaFormulario(opc, label) {

      this.formulario = opc;
      this.labelMail = label;

      this.validaMensaje = [];

    },

    ingresar() {
      if (this.validar()) {
        return;
      }
      this.isLoadingLogin = true;
      this.error = null;
      axios
        .post("api/Sesion/login", {
          mail: this.usuario,
          password: this.password,
          identificador: this.identificador,
          deviceID: '',
          deviceUUID: '',
          deviceType: 'web'
        })
        .then(respuesta => {
          return respuesta.data;
        })
        .then(data => {

          this.$store.dispatch("guardarToken", data.token);

          this.$store.dispatch("cicloLectivo", new Date().getFullYear());

          this.$store.dispatch("hijoID", '');
          this.$store.dispatch("nombreHijo", '');
          this.$store.dispatch("avatarHijo", '');
          this.$store.dispatch("cursoHijo", '');

          if (this.$store.state.usuario.rol == 'Preceptor' || this.$store.state.usuario.rol == 'Alumno' || this.$store.state.usuario.rol == 'Docente' || this.$store.state.usuario.rol == 'Familia') {
            this.$router.push({ name: "Main" });
          }
          else {
            this.$router.push({ name: "home" });
          }

        })
        .catch(err => {
          console.log(err.response);
          this.isLoadingLogin = false;
          if (err.response.status == 400) {
            this.error = "Usuario o contraseña inválidos";
          } else if (err.response.status == 404) {
            this.error = "No existe el usuario o sus datos son incorrectos";
          } else {
            this.error = "Ocurrió un error";
          }

        });
    },

    listarInstitucionesXPersona() {
      if (this.usuario) {
        this.isLoadingLogin = true;
        this.institucion = "";
        this.identificador = "";
        if (!this.usuario) { return; }
        let me = this;
        let header = { Authorization: "Bearer " + this.$store.state.token };
        let configuracion = { headers: header };
        axios
          .get("api/PersonasInstituciones/" + me.usuario, configuracion)
          .then(function (response) {
            me.personaInstituciones = response.data;
            if (me.personaInstituciones.length == 1) {
              me.institucion = me.personaInstituciones[0].institucion;
              me.identificador = me.personaInstituciones[0].identificador;

            }
          })
          .catch(function (error) {
            console.log(error);
          });
        this.isLoadingLogin = false;
      }
    },

    getImgUrl(pic) {
      var n = pic.lastIndexOf(".");
      var tipo = pic.substr(n + 1, pic.length - n + 1);
      try {
        return require("../Datos/" + pic);
      } catch (error) {
        console.log(error);
        return require("../Datos/images.png");
      }
    },


  }
};
</script>

<style>
.imgLogin {
  width: 60px;
  height: auto;
}
</style>