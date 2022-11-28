<template>
  <v-layout>
    <v-flex>
      <v-overlay :value="loadingData">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <v-row>
        <v-col>
          <v-card class="px-3 py-1">
            <v-data-table
              :headers="caberaConvivenciaConceptos"
              :items="convivencias"
              :search="search"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              hide-default-footer
              @page-count="pageCount = $event"
              class="elevation-1"
              v-if="!loadingData"
            >
              <template v-slot:[`item.Acciones`]="{ item }">
                <v-tooltip bottom slot="activator">
                  <template #activator="{ on: onTooltip }">
                    <v-btn
                      color="#999999"
                      v-on="onTooltip"
                      fab
                      x-small
                      dark
                      @click="showCCRUD(item, 'Editar')"
                    >
                      <v-icon size="16">mdi-file-document-edit-outline</v-icon>
                    </v-btn>
                  </template>
                  <span class="tooltip_small">Editar Concepto</span>
                </v-tooltip>
                &nbsp;&nbsp;
                <v-tooltip bottom slot="activator">
                  <template #activator="{ on: onTooltip }">
                    <v-btn
                      color="#ff8888"
                      v-on="onTooltip"
                      fab
                      x-small
                      dark
                      @click="showDeleteConfirm(item.id)"
                    >
                      <v-icon size="16">mdi-trash-can-outline</v-icon>
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
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                    filled
                    rounded
                    dense
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
                        @click="showCCRUD(null, 'Crear')"
                        style="margin-top: 10px"
                      >
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span class="tooltip">Nuevo Concepto</span>
                  </v-tooltip>
                </v-toolbar>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="10"
              ></v-pagination>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>

import axios from "axios";
import Alerts from "@/components/Public/Alerts";

export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      cabeceraEnfermeriaMotivos: [
        { text: "ID", value: "motivoID", sortable: false, align: "d-none" },
        { text: "Motivo", value: "motivo" },
        { text: "", value: "Acciones", sortable: false, align: "right" },
      ],
      enfermeriaMotivos: [],
      alertDlg: false,
      loadingData: false,
      random_LT: "",
      accion: "",
      enfermeriaMotivo: {
        motivoID: "",
        motivo: "",
      },
      dialogLTCRUD: false,
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
    this.ListaEnfermeriaMotivos();
  },

  components: {
    Alerts,
  },

  methods: {
    async enviaDatos() {
      if (this.accion === "Crear") {
        const paso1 = await this.CreaEnfermeriaMotivo();
        console.log("CreaMotivo");
      } else {
        const paso2 = await this.ActualizarEnfermeriaMotivo();
        console.log("EditaMotivo");
      }
      const paso3 = await this.closeCCCRUD();
      console.log("CerrarCRUD");
    },

    async ListaEnfermeriaMotivos() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true;
      try {
        const data = await axios.get(
          `api/Enfermeria/${me.institucion}/ListaEnfermeriaMotivos`,
          configuracion,
          { timeout: 30000 }
        );
        console.log(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false;
      }
    },

    async CreaEnfermeriaMotivo() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true;
      try {
        const response = await axios.post(
          `api/Enfermeria/${me.institucion}/CreaEnfermeriaMotivo`,
          {
            motivo: me.enfermeriaMotivo.motivo,
          },
          configuracion
        );
        me.enfermeriaMotivos.push(response.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false;
        me.LimpiaDatos();
        me.sortArrays(me.enfermeriaMotivos);
      }
    },

    async ActualizarEnfermeriaMotivo() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true;
      try {
        const response = await axios.post(
          `api/Enfermeria/${me.institucion}/ActualizarEnfermeriaMotivo`,
          {
            motivoID: me.enfermeriaMotivo.motivoID,
            motivo: me.enfermeriaMotivo.motivo,
          },
          configuracion
        );
        me.enfermeriaMotivos.forEach(function (item) {
          if (item.id == response.data[0].id) {
            item.motivo = response.data[0].motivo;
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false;
        me.LimpiaDatos();
        me.sortArrays(me.enfermeriaMotivos);
      }
    },

    async EliminarEnfermeriaMotivo() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true;
      try {
        const response = await axios.post(
          `api/Enfermeria/${me.institucion},${me.selID}/EliminarEnfermeriaMotivo`,
          {},
          configuracion
        );
        this.enfermeriaMotivos = this.enfermeriaMotivos.filter(
          (e) => e.id !== me.selID
        );
        me.sortArrays(me.enfermeriaMotivos);
        this.showAlert("green", "Registro eliminado con exito");
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);

        if (error.response.status === 409) {
          this.showAlert(
            "red",
            "No se pudo eliminar el registro porque esta relacionado con un campo de otra tabla"
          );
        }
      } finally {
        me.loadingData = false;
        me.closeDeleteConfirm();
      }
    },

    sortArrays(arrays) {
      arrays.sort(function (a, b) {
        const valorA = a.motivo;
        const valorB = b.motivo;
        if (valorA < valorB) {
          return -1;
        }
        if (valorA > valorB) {
          return 1;
        }
        return 0;
      });
    },

    showECRUD(item, accion) {
      if (accion != 'Crear') {
        this.libroTema = item;
        console.log(this.libroTema)
      }
      this.accion = accion;
      console.log(accion)
      this.random_LT = Math.random();
      this.dialogLTCRUD = true;
    },

    closeEMCRUD() {
      this.dialogCCCRUD = false;
      this.$refs.form.resetValidation();
      this.LimpiaDatos();
    },

    LimpiaDatos() {
      this.enfermeriaMotivo = {
        motivoID: "",
        motivo: "",
      };
    },

    showDeleteConfirm(id) {
      this.selID = id;
      this.dlgDeleteConfirm = true;
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

