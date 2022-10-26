<template>
  <v-layout>
      <v-flex >

        <v-overlay :value="loadingData">
            <v-progress-circular indeterminate size="64"></v-progress-circular>          
        </v-overlay>

              <v-row>
                <v-col cols="5">
                  <v-autocomplete
                    :loading="loadingLCT"
                    label="Tipo de Convivencia"
                    :items="aIncumplimientos"
                    v-model="incumplimientoID"
                    item-text="descripcion"
                    item-value="id"
                    autocomplete="off"
                    clearable
                    solo
                    persistent-hint
                    hint="Seleccione un Tipo de Convivencia"
                    @change="ListaConvivencia()"
                  />
                </v-col>
                <v-col cols="4">
                </v-col>

                <v-col cols="3" style="text-align:right">

                    <!-- Nuevo Registro Disciplinario Btn /*{#ff3399}*/ :to="{ name: 'nuevoRegistroConducta' }" -->
                    <v-tooltip left slot="activator">
                      <template #activator="{ on: onTooltip }">
                        <v-btn
                          @click="showTCRUD(null,'Crear')" 
                          class="mx-2 hidden-sm-and-down"
                          v-on="onTooltip"
                          fab
                          dark
                          medium
                          color="#38c6d9"
                          style="margin-bottom: 18px"
                        >
                          <v-icon dark medium>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Nuevo Registo Disciplinario</span>
                    </v-tooltip>
                
                  </v-col>
              </v-row>

              <v-container>
                <v-card>
                  <v-data-table
                    :headers="convivenciaHeader"
                    :items="convivenciaValues"
                    :disable-pagination="false"
                    class="elevation-1"
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card>
              </v-container>
      </v-flex>

    <!-- convivencia.descripcion /*{#bad1f3}*/-->
    <v-dialog v-model="dialogLTCRUD" persistent max-width="800px">
      <v-form  ref="form" lazy-validation>
          <NuevoRegistroConducta 
            :random_LT="random_LT" 
            :convivencia="convivencia" 
            :Incumplimiento="aIncumplimientos"
            :incumplimiento_ID="incumplimientoID"
            :accion="accion"
            @closeLTCRUD="closeLTCRUD" 
          />
      </v-form>
    </v-dialog>

  </v-layout>
</template>

<script>

import axios from "axios";
import Alerts from "@/components/Public/Alerts";
import NuevoRegistroConducta from '../../components/Convivencia/NuevoRegistroConducta.vue';

export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      convivenciaHeader: [
        {text:"CONVIVENCIA", value:'convivencia'},
        {text:"Tipo", value:'tipo'},
        {text:"tipoID", value:'tipoID'},
        {text:"ID", value:"id"}
      ],
      convivenciaValues: [],
      alertDlg: false,
      loadingData: false,
      random_LT: "",
      accion: "",
      convivencia :{
        id: "",
        tipoID: "",
        descripcion:""
      },
      dialogLTCRUD: false,
      dlgDeleteConfirm: false,
      selID: "",
      loadingLCT:"",
      aIncumplimientos:[],
      incumplimientoID:""
    };
  },

  computed: {
    usuarioID() {
      return this.$store.state.usuario.idusuario;
    },
    institucion() {
      return this.$store.state.usuario.institucion;
    },
    cicloLectivo() {
      if (!this.$store.state.cicloLectivo) {
        return;
      }
      return this.$store.state.cicloLectivo;
    },
  },

  created() {
    this.ListaConvivenciaTipos();
  },

  components: {
    Alerts,
    NuevoRegistroConducta
   
  },

  methods: {

    async ListaConvivencia() {
      this.loadingLCT = true;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const data = await axios.get(`api/Convivencia/${me.institucion},${me.incumplimientoID}/ListaConvivencia`, configuracion, { timeout: 30000 });
        // console.log(data.data);
        me.convivenciaValues = data.data;
        console.log(this.convivenciaValues)
        me.loadingData = false
      } catch (error) {
          this.$emit(
            "showAlert",
            "black",
            "Problemas de conexion con el servidor!"
          );
        console.log(error);
      } finally {
        me.loadingLCT = false
      }
    },

    async ListaConvivenciaTipos() {
      //console.log(this.institucion)
      let header = { Authorization: "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      let me = this
      me.loadingLCT = true
      try {
        const data = await axios.get(`api/Convivencia/${me.institucion}/ListaConvivenciaTipos`, configuracion, { timeout: 30000 });
        me.aIncumplimientos = data.data
        console.log(this.aIncumplimientos)
        me.loadingLCT = false
      } catch (error) {
        console.log(error)
      } finally {
        me.loadingLCT = false
      }
    },

    async ListaConvivenciaCRUD() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const data = await axios.get(`api/Convivencia/${me.institucion}/ListaConvivenciaCRUD`, configuracion, { timeout: 30000 });
        console.log(data.data)
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
      }
    },

    async CreaConvivencia() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.post(`api/Convivencia/${me.institucion}/CreaConvivencia`,
          {
            tipoID: me.convivencia.tipoID,
            descripcion: me.convivencia.descripcion,
          },
          configuracion);
        me.convivencias.push(response.data[0])
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
        me.LimpiaDatos();
        me.sortArrays(me.convivencias);
      }
    },

    async EditarConvivencia() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.post(`api/Convivencia/${me.institucion}/EditarConvivencia`,
          {
            id: me.convivencia.id,
            tipoID: me.convivencia.tipoID,
            descripcion: me.convivencia.descripcion,
          },
          configuracion);
          me.convivencias.forEach(function (item) {
          if (item.id == response.data[0].id) {
            item.tipoID = response.data[0].tipoID;
            item.descripcion = response.data[0].descripcion;
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
        me.LimpiaDatos();
        me.sortArrays(me.convivencias);
      }
    },

    async EliminarConvivencia() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.post(`api/Convivencia/${me.institucion},${me.selID}/EliminarConvivencia`,
          {
          },
          configuracion);
        this.convivencias = this.convivencias.filter((e) => e.id !== me.selID)
        me.sortArrays(me.convivencias);
        this.showAlert("green",
          "Registro eliminado con exito")
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);

        if (error.response.status === 409) {
          this.showAlert("red",
            "No se pudo eliminar el registro porque esta relacionado con un campo de otra tabla")
        }
      } finally {
        me.loadingData = false;
        me.closeDeleteConfirm();
      }
    },

    sortArrays(arrays) {
      arrays.sort(function (a, b) {
        const valorA = a.convivencia.toUpperCase();
        const valorB = b.convivencia.toUpperCase();
        if (valorA < valorB) {
          return -1;
        }
        if (valorA > valorB) {
          return 1;
        }
        return 0;
      });
    },

    /* funcion para mostrar ventana {#ff3399} */
    showTCRUD(item, accion) {
      if (accion != 'Crear') {
        this.convivencia = item;
        console.log(this.convivencia)
      }
      this.accion = accion;
      console.log(accion)
      this.random_LT = Math.random();
      this.dialogLTCRUD = true;
    },

    closeLTCRUD() {
      this.dialogLTCRUD = false;
      this.$refs.form.resetValidation();
      this.LimpiaDatos();
    },

    LimpiaDatos() {
      this.accion = "";
      this.convivencia = {
        id: "",
        tipoID: "",
        descripcion:""
      }
    },
  

  showAlert(tipo, mensaje) {
    this.snackbar = false;
    this.alertColor = tipo;
    this.alertMessage = mensaje;
    this.snackbar = "mostrar";
    this.alertDlg = true;
    this.closeAlert();
  },
},
};
</script>

