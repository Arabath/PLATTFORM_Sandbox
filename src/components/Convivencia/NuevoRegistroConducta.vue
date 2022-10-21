
<template>
  <v-container>
    <v-row>
        <v-card class="mx-auto" width="1200px">

            <!-- Cabecera titulo, cerrar ventana {#d0f500} -->
            <v-toolbar color="#64bdff" dark>
            <v-row>
                <v-col style="padding-top: 20px; padding-left: 20px">
                <span class="headline"
                    ><v-icon large class="mx-2">mdi-account-details</v-icon>
                    Nuevo Registro Conducta</span
                >
                </v-col>
                <v-col align="right" style="padding-top: 15px">
                <!-- boton cierre ventana dialogo "crear persona" -->
                <v-btn
                    :to="{ name: 'gestionConvivencia' }"
                    fab
                    small
                    dark
                    color="cyan"
                    depressed
                    @click="limpiaDatos()"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-col>
            </v-row>
            </v-toolbar>

            <v-col>
                <v-row>
                    <v-col cols="5">
                        <v-text-field 
                            v-model="incumplimientoID" 
                            label="Nuevo Registro" 
                            autocomplete="off"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>

                        <template>
                            <v-btn depressed large color="#6cbd70" dark>
                                <v-icon medium class="mr-2" color="#aff7b0"
                                >mdi-cloud-upload-outline
                                </v-icon>
                                Guardar
                            </v-btn>
                        </template>
                        
                        <template>
                            <v-btn @click="cancelar" depressed large class="pr-8">
                                <v-icon medium class="mx-2" color="#999999"></v-icon>Cancelar
                            </v-btn>
                        </template>

                    </v-col>
                </v-row>
            </v-col>

        </v-card>
    </v-row>
  </v-container>
</template>

<script>
import BtnCancelar from '@/components/Botones/BtnCancelar';
import BtnGuardar from '@/components/Botones/BtnGuardar';

export default {
    name: "NuevoRegistroConducta",
    data(){
        return{
            
        }
    },
    components:{
        BtnCancelar,
        BtnGuardar
    }
}
</script>

<style>

</style>