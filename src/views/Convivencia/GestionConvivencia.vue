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
                      <template #activator="{ on }">
                        <v-btn
                          @click="showTCRUD(null,'Crear')" 
                          class="mx-2 hidden-sm-and-down"
                          v-on="on"
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
                    v-if="!loadingData"
                  >

                  <!-- botones editar y eliminar tema /* {#e173ff} */ -->
                  <template v-slot:[`item.Acciones`]="{ item }">
                    <v-tooltip bottom slot="activator">
                      <template #activator="{ on: onTooltip }">
                        <v-btn color="#999999" v-on="onTooltip" fab x-small dark @click="showTCRUD(item,'Editar')">
                          <v-icon size='16'>mdi-file-document-edit-outline</v-icon>
                        </v-btn>
                      </template>
                      <span class="tooltip_small">Editar Tema</span>
                    </v-tooltip>
                    &nbsp;&nbsp;
                    <v-tooltip bottom slot="activator">
                      <template #activator="{ on: onTooltip }">
                        <v-btn color="#ff8888" v-on="onTooltip" fab x-small dark @click="showDeleteConfirm(item.id)">
                          <v-icon size='16'>mdi-trash-can-outline</v-icon>
                        </v-btn>
                      </template>
                      <span class="tooltip_small">Eliminar Tema</span>
                    </v-tooltip>
                  </template> 

                  
                </v-data-table>
                  <!-- ventana dialogo para confirmar eliminar tema /*{#dff3ba}*/ -->
                  <v-dialog v-model="dlgDeleteConfirm" persistent max-width="700">
                    <v-card class="pt-5" style="border:5px solid #ff8888">
                      <v-card-text>
                        <v-card-title class="headline">Esta seguro que desea eliminar el Codigo de Convivencia seleccionado?</v-card-title>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text depressed large @click="closeDeleteConfirm()">Cancelar</v-btn>
                        <v-btn class="my-2" depressed large color="#ff8888" dark @click="EliminarConvivencia()"
                          style="padding-left: 10px; padding-right: 10px">Eliminar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <template v-if="alertDlg">
                    <Alerts :alertColor="alertColor" :alertMessage="alertMessage" :snackbar="snackbar" />
                  </template> 

                </v-card>
              </v-container>
      </v-flex>

    <!-- convivencia.descripcion /*{#bad1f3}*/-->
    <v-dialog v-model="dialogLTCRUD" persistent max-width="800px">
      <v-form @submit.prevent="enviaDatos()" ref="form" lazy-validation>
          <NuevoRegistroConducta 
            :random_LT="random_LT" 
            :convivencia="convivencia" 
            :Incumplimiento="aIncumplimientos"
            :incumplimiento_ID="incumplimientoID"
            :accion="accion"
            @closeLTCRUD="closeLTCRUD" 
            @showAlert="showAlert" 
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
      convivenciaHeader: [
        {text:"CONVIVENCIA", value:'convivencia'},
        {text:"Tipo", value:'tipo'},
        { text: "", value: "Acciones", sortable: false, align: 'right', }
      ],
      convivenciaValues: [],
      convivencias:[],
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
    this.ListaConvivenciaTipos()
  },

  components: {
    Alerts,
    NuevoRegistroConducta
  },

  methods: {
    async enviaDatos() {
      if (this.accion === 'Crear') {
        const paso1 = await this.CreaConvivencia();
        console.log("CreaConvivencia")
      }
      else {
        const paso2 = await this.EditarConvivencia()
        console.log("EditarConvivencia")
      }
      const paso3 = await this.closeLTCRUD();
    },

    // Incumplimiento o Reconocimiento 
    async ListaConvivenciaTipos() {
      //console.log(this.institucion)
      let header = { Authorization: "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      let me = this
      me.loadingLCT = true
      try {
        const response = await axios.get(`api/Convivencia/${me.institucion}/ListaConvivenciaTipos`, configuracion, { timeout: 30000 });
        me.aIncumplimientos = response.data
        console.log(me.aIncumplimientos)
        me.loadingLCT = false
      } catch (error) {
        console.log(error)
      } finally {
        me.loadingLCT = false
      }
    },

    // Codigo de tipos de convivencia
    async ListaConvivencia() {
      this.loadingLCT = true;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.get(`api/Convivencia/${me.institucion},${me.incumplimientoID}/ListaConvivencia`, configuracion, { timeout: 30000 });
        // console.log(data.data);
        me.convivenciaValues = response.data;
        console.log(me.convivenciaValues)
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

    async CreaConvivencia() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.post(`api/Convivencia/${me.institucion}/CreaConvivencia`,
          {
            tipoID:  me.incumplimientoID,
            descripcion: me.convivencia.descripcion,
          },
          configuracion);
          console.log(response)
      
        me.convivencias.push(response.data[0])
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
        me.LimpiaDatos();
        me.sortArrays(me.convivencias);
        me.ListaConvivencia();
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
            tipoID: me.incumplimientoID,
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
        me.ListaConvivencia()
        console.log(me.ListaConvivencia())
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
          console.log(response)  
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
        me.ListaConvivencia();
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

    showDeleteConfirm(id) {
      this.selID = id;
      this.dlgDeleteConfirm = true;
    },

    closeDeleteConfirm() {
      this.dlgDeleteConfirm = false;
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

  closeAlert: function () {
      setTimeout(() => {
        (this.snackbar = ""), (this.alertDlg = false);
      }, 3000);
    },
  
  },
};
</script>

