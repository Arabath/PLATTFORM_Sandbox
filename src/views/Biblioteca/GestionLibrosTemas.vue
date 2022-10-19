<template>
  <v-layout align-start>
    <v-flex>
      <!-- Spinner carga -->
      <v-overlay :value="loadingData">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <v-row>
        <v-col>
          <v-card class="px-3 py-1">
            
            <v-data-table :headers="caberaLibrosTemas" :items="librosTemas" :search="search" :page.sync="page"
              :items-per-page="itemsPerPage" hide-default-footer @page-count="pageCount = $event" class="elevation-1"
              v-if="!loadingData">

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

              <template v-slot:top>
                <v-toolbar flat color="white">

                  <v-toolbar-title>Libros Temas</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                    filled rounded dense></v-text-field>
                 
                  <v-spacer></v-spacer>
                  
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn class="mx-2" v-on="on" fab dark small color="cyan" @click="showTCRUD(null,'Crear')"
                        style="margin-top: 10px">
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span class="tooltip">Nuevo Tema</span>
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

    <v-dialog v-model="dialogLTCRUD" persistent max-width="800px">

      <v-form @submit.prevent="enviaDatos()" ref="form" lazy-validation>
        <LibrosTemasFormCRUD :random_LT="random_LT" :libroTema="libroTema" :accion="accion" @closeLTCRUD="closeLTCRUD"
          @showAlert="showAlert" />

      </v-form>
    </v-dialog>

    <v-dialog v-model="dlgDeleteConfirm" persistent max-width="600">
      <v-card class="pt-5" style="border:5px solid #ff8888">
        <v-card-text>
          <v-card-title class="headline">Esta seguro que desea el Tema Seleccionado?</v-card-title>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text depressed large @click="closeDeleteConfirm()">Cancelar</v-btn>
          <v-btn class="my-2" depressed large color="#ff8888" dark @click="EliminarBibliotecaLibrosTema()"
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
import LibrosTemasFormCRUD from "@/components/Biblioteca/LibrosTemasFormCRUD"

export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      caberaLibrosTemas: [
        { text: "ID", value: "id", sortable: false, align: ' d-none', },
        { text: "Tema", value: "tema" },
        { text: "", value: "Acciones", sortable: false, align: 'right', },
      ],
      librosTemas: [],
      alertDlg: false,
      loadingData: false,
      random_LT: "",
      accion: "",
      dialogLTCRUD: false,
      libroTema: {
        id: "",
        tema: "",
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
    this.ListaBibliotecaLibrosTemas();
  },

  components: {
    Alerts,
    LibrosTemasFormCRUD,
  },

  methods: {
    async enviaDatos() {
      if (this.accion === 'Crear') {
        const paso1 = await this.CrearBibliotecaLibrosTema();
      }
      else {
        const paso2 = await this.EditarBibliotecaLibrosTema()
      }
      const paso3 = await this.closeLTCRUD();
    },

    async CrearBibliotecaLibrosTema() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.post(`api/Biblioteca/${me.institucion}/CrearBibliotecaLibrosTema`,
          {
            tema: me.libroTema.tema,
          },
          configuracion);
        me.librosTemas.push(response.data[0])
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
        me.LimpiaDatos();
        me.sortArrays(me.librosTemas);
      }
    },

    async EditarBibliotecaLibrosTema() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.post(`api/Biblioteca/${me.institucion}/EditarBibliotecaLibrosTema`,
          {
            id: me.libroTema.id,
            tema: me.libroTema.tema,
          },
          configuracion);
        me.librosTemas.forEach(function (item) {
          if (item.id == response.data[0].id) {
            item.tema = response.data[0].tema;
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
        me.LimpiaDatos();
        me.sortArrays(me.librosTemas);
      }
    },

    async EliminarBibliotecaLibrosTema() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.post(`api/Biblioteca/${me.institucion},${me.selID}/EliminarBibliotecaLibrosTema`,
          {
          },
          configuracion);
        this.librosTemas = this.librosTemas.filter((e) => e.id !== me.selID)
        me.sortArrays(me.librosTemas);
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

    async ListaBibliotecaLibrosTemas() {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      me.loadingData = true
      try {
        const response = await axios.get(`api/Biblioteca/${me.institucion}/ListaBibliotecaLibrosTemas`, configuracion, { timeout: 30000 });
        me.librosTemas = response.data;

      } catch (error) {
        console.log(error);
      } finally {
        me.loadingData = false
      }
    },

    sortArrays(arrays) {
      arrays.sort(function (a, b) {
        const temaA = a.tema.toUpperCase();
        const temaB = b.tema.toUpperCase();
        if (temaA < temaB) {
          return -1;
        }
        if (temaA > temaB) {
          return 1;
        }
        return 0;
      });
    },

    showTCRUD(item, accion) {
      if (accion != 'Crear') {
        this.libroTema = item;
        console.log(this.libroTema)
      }
      this.accion = accion;
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
      this.libroTema = {
        id: "",
        tema: "",
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

