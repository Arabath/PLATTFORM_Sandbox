<template>
  <v-layout align-start>
    <v-flex>

      <v-overlay :value="loadingData">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <v-row>
        <v-col>
          <v-card class="px-3 py-1">
            <v-data-table :headers="caberaConvivenciaConceptos" :items="convivencias" :search="search" :page.sync="page"
              :items-per-page="itemsPerPage" hide-default-footer @page-count="pageCount = $event" class="elevation-1"
              v-if="!loadingData">

              <template v-slot:[`item.Acciones`]="{ item }">
                <v-tooltip bottom slot="activator">
                  <template #activator="{ on: onTooltip }">
                    <v-btn color="#999999" v-on="onTooltip" fab x-small dark @click="showCCRUD(item, 'Editar')">
                      <v-icon size='16'>mdi-file-document-edit-outline</v-icon>
                    </v-btn>
                  </template>
                  <span class="tooltip_small">Editar Concepto</span>
                </v-tooltip>
                &nbsp;&nbsp;
                <v-tooltip bottom slot="activator">
                  <template #activator="{ on: onTooltip }">
                    <v-btn color="#ff8888" v-on="onTooltip" fab x-small dark @click="showDeleteConfirm(item.id)">
                      <v-icon size='16'>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </template>
                  <span class="tooltip_small">Eliminar Concepto</span>
                </v-tooltip>
              </template>
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Convivencia Conceptos</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                    filled rounded dense></v-text-field>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn class="mx-2" v-on="on" fab dark small color="cyan" @click="showCCRUD(null, 'Crear')"
                        style="margin-top: 10px">
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span class="tooltip">Nuevo Concepto</span>
                  </v-tooltip>
                </v-toolbar>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount" :total-visible="10"></v-pagination>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>

    <v-dialog v-model="dialogCCCRUD" persistent max-width="800px">

      <v-form @submit.prevent="enviaDatos()" ref="form" lazy-validation>
        <ConvivenciaConceptosFormCRUD :random_CC="random_CC" :convivencia="convivencia" :accion="accion"
          @closeCCCRUD="closeCCCRUD" @showAlert="showAlert" />
      </v-form>
    </v-dialog>

    <v-dialog v-model="dlgDeleteConfirm" persistent max-width="600">
      <v-card class="pt-5" style="border:5px solid #ff8888">
        <v-card-text>
          <v-card-title class="headline">Esta seguro que desea eliminar el Concepto Seleccionado?</v-card-title>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text depressed large @click="closeDeleteConfirm()">Cancelar</v-btn>
          <v-btn class="my-2" depressed large color="#ff8888" dark @click="EliminarConvivenciaConcepto()"
            style="padding-left: 10px; padding-right: 10px">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template v-if="alertDlg">
      <Alerts :alertColor="alertColor" :alertMessage="alertMessage" :snackbar="snackbar" />
    </template>
  </v-layout>
</template>

<script>

import axios from "axios";
import Alerts from "@/components/Public/Alerts";
import ConvivenciaConceptosFormCRUD from "@/components/Convivencia/ConvivenciaConceptosFormCRUD"

export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      caberaConvivenciaConceptos: [
        { text: "ID", value: "id", sortable: false, align: ' d-none', },
        { text: "Concepto", value: 'convivencia' },
        { text: "Tipo", value: 'tipo' },
        { text: "", value: "Acciones", sortable: false, align: 'right', },
      ],
      convivencias: [],
      alertDlg: false,
      loadingData: false,
      random_CC: "",
      accion: "",
      dialogCCCRUD: false,
      convivencia: {
        id: "",
        tipoID: "",
        convivencia: ""
      },
      dlgDeleteConfirm: false,
      selID: "",
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
    this.ListaConvivenciaCRUD();
  },

  components: {
    Alerts,
    ConvivenciaConceptosFormCRUD,
  },

  methods: {
    async enviaDatos() {
      if (this.accion === 'Crear') {
        const paso1 = await this.CrearConvivenciaConceptos();
      }
      else {
        const paso2 = await this.EditarConvivenciaConceptos()
      }
      const paso3 = await this.closeCCCRUD();
    },

    async CrearConvivenciaConceptos() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.post(`api/Convivencia/${me.institucion}/CreaConvivencia`,
          {
            tipoID: me.convivencia.tipoID,
            descripcion: me.convivencia.convivencia,
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

    async EditarConvivenciaConceptos() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.post(`api/Convivencia/${me.institucion}/EditarConvivencia`,
          {
            id: me.convivencia.id,
            tipoID: me.convivencia.tipoID,
            descripcion: me.convivencia.convivencia,
          },
          configuracion);
        me.convivencias.forEach(function (item) {
          if (item.id == response.data[0].id) {
            item.tipoID = response.data[0].tipoID;
            item.tipo = response.data[0].tipo;
            item.convivencia = response.data[0].convivencia;
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

    async EliminarConvivenciaConcepto() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.post(`api/Convivencia/${me.institucion},${me.selID}/EliminarConvivencia`,
          {
          },
          configuracion);
        me.convivencias = me.convivencias.filter((e) => e.id !== me.selID)
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

    async ListaConvivenciaCRUD() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.get(`api/Convivencia/${me.institucion}/ListaConvivenciaCRUD`, configuracion, { timeout: 30000 });
        // console.log(response.data)
        me.convivencias = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
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

    showCCRUD(item, accion) {
      if (accion != 'Crear') {
        this.convivencia.id = item.id;
        this.convivencia.tipoID = item.tipoID;
        this.convivencia.convivencia = item.convivencia;
      }
      this.accion = accion;
      this.random_CC = Math.random();
      this.dialogCCCRUD = true;
    },

    closeCCCRUD() {
      this.dialogCCCRUD = false;
      this.$refs.form.resetValidation();
      this.LimpiaDatos();
    },

    LimpiaDatos() {
      this.accion = "";
      this.convivencia = {
        id: "",
        tipoID: "",
        convivencia: ""
      }
    },

    showDeleteConfirm(id) {
      this.selID = id;
      this.dlgDeleteConfirm = true;
    },

    closeDeleteConfirm() {
      this.dlgDeleteConfirm = false;
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
      var me = this;
      setTimeout(() => {
        (this.snackbar = ""), (this.alertDlg = false);
      }, 3000);
    },
  },


};
</script>

