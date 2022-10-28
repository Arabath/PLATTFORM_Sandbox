<!-- ESTE TEMPLATE CORRESPONDE A EL DATATABLE PRINCIPAL SECCION PERSONAS -->
<template>
  <v-layout align-start>
    <v-flex>
      <v-row>
        <v-col>
          <v-card class="px-3 py-1">
            <!-- /* config seteo para header {#df00f5} */ -->
            <v-data-table
              :headers="cabecerapersonas"
              :items="personas"
              :search="search"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              hide-default-footer
              @page-count="pageCount = $event"
              class="elevation-1"
              v-if="!carga"
            >
            
              <template v-slot:[`item.nombreCompleto`]="{ item }">
                {{ item.apellido + " " + item.nombres }}
              </template>
              
              <!-- /* menu opciones {#f50000} */ -->
              <template v-slot:[`item.opciones`]="{ item }">
                <v-menu
                  left
                  bottom
                  rounded
                  offset-x
                  transition="slide-y-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click.native.stop
                      color="blue"
                      class="mx-2"
                      fab
                      x-small
                      dark
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      @click.native.stop
                      :to="{
                        name: 'actualizarpersona',
                        params: {
                          id: item.id,
                        },
                      }"
                    >
                      <v-list-item-icon
                        ><v-icon color="#999999"
                          >mdi-account-edit-outline</v-icon
                        ></v-list-item-icon
                      >
                      <v-list-item-title
                        >Editar Datos Personales</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
              
              <!-- /* Titulo, busqueda y boton "Nueva Persona" {#3ff500} */ -->
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Personas</v-toolbar-title>
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
                        :to="{ name: 'AltaPersona' }"
                        class="mx-2"
                        v-on="on"
                        fab
                        dark
                        small
                        color="cyan"
                        style="margin-top: 10px"
                      >
                        <v-icon dark>mdi-account-plus-outline</v-icon>
                      </v-btn>
                    </template>
                    <span class="tooltip">Nueva Persona</span>
                  </v-tooltip>
                </v-toolbar>
              </template>

            </v-data-table>

            <!-- /* Paginacion {#009cf5} */ -->
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
import { mapState, mapActions, mapMutations } from "vuex";
import Alerts from "@/components/Public/Alerts";

export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      cabecerapersonas: [
        { text: "Nombre", value: "nombreCompleto" },
        { text: "Email", value: "mail", sortable: false },
        { text: "Documento", value: "nroDocumento", sortable: false },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      alertDlg: false,
    };
  },
  computed: {
    ...mapState("personas", ["personas", "carga", "alert"]),
  },
  watch: {
    carga: function () {
      if (this.carga == false) {
        this.ocultarLoading();
      }
    },
  },

  methods: {
    ...mapActions("personas", ["deletePersona", "cargarPersonas"]),
    ...mapMutations("personas", ["estadoAlert"]),
    ...mapMutations(["mostrarLoading", "ocultarLoading"]),

    showAlert(tipo, mensaje) {
      this.snackbar = false;
      this.alertColor = tipo;
      this.alertMessage = mensaje;
      this.snackbar = "mostrar";
      this.alertDlg = true;
      this.estadoAlert(false);
      this.closeAlert();
    },

    closeAlert: function () {
      var me = this;
      setTimeout(() => {
        (this.snackbar = ""), (this.alertDlg = false);
      }, 3000);
    },
  },
  created() {
    if (this.personas.length > 0) {
      if (this.alert.estado === true) {
        this.showAlert(this.alert.tipo, this.alert.mensaje);
      }
      return;
    }
    this.cargarPersonas();

    this.mostrarLoading({
      titulo: "Accediendo a la información",
      color: "#90caf9",
      loader: "ring-loader",
      loadercolor: "#fff",
    });
  },
  components: {
    Alerts,
  },
};
</script>
<style>

#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>