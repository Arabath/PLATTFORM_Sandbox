<template>
  <v-layout>
    <v-flex >

        <v-overlay :value="loadingData">
            <v-progress-circular indeterminate size="64"></v-progress-circular>          
        </v-overlay>

              <v-row>
                <v-col cols="3">  
                  <v-autocomplete
                    :loading="loadingLCT"
                    label="Nivel"
                    :items="aIncumplimientos"
                    v-model="incumplimientoID"
                    item-text="convivencia"
                    item-value="id"
                    autocomplete="off"
                    clearable
                    solo
                    persistent-hint
                    hint="Nivel"
                  />
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
                    :loading="loadingLCT"
                    label="Cursos"
                    :items="aIncumplimientos"
                    v-model="incumplimientoID"
                    item-text="Seleccione un Curso"
                    item-value="id"
                    autocomplete="off"
                    clearable
                    solo
                    persistent-hint
                    hint="Seleccione un Curso"
                  />
                </v-col>
                <v-col cols="5">
                  <v-autocomplete
                    :loading="loadingLCT"
                    label="Tipo de Convivencia"
                    :items="aIncumplimientos"
                    v-model="incumplimientoID"
                    item-text="Seleccione un Tipo de Convivencia"
                    item-value="id"
                    autocomplete="off"
                    clearable
                    solo
                    persistent-hint
                    hint="Seleccione un Tipo de Convivencia"
                  />
                </v-col>
              </v-row>

              <v-container>
                <v-card>
                  <v-data-table >

                  </v-data-table>
                </v-card>
              </v-container>

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
      alertDlg: false,
      loadingData: false,
      random_LT: "",
      accion: "",
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
    this.ListaConvivenciaTipos();
  },

  components: {
    Alerts,
   
  },

  methods: {
    async ListaConvivenciaTipos() {
      let header = { Authorization: "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      let me = this
      me.loadingData = true
      try {
        const data = await axios.get(`api/Convivencia/${me.institucion}/ListaConvivenciaTipos`, configuracion, { timeout: 30000 });
        console.log(data.data)
      } catch (error) {
        console.log(error)
      } finally {
        me.loadingData = false
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

    LimpiaDatos() {
      this.accion = "";
      this.convivencia = {
        id: "",
        tipoID: "",
        descripcion:""
      }
    },
  },

};
</script>

