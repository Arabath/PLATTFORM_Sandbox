<template>
  <v-layout>

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

  </v-layout>
</template>

<script>
export default {
    data() {
        return {
        enfermeriaMotivos: [],
        enfermeriaMotivo: {
            motivoID: "",
            motivo: "",
        },
        selID: "",
        }
    }
}
</script>

