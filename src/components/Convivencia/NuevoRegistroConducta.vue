<template>
  <v-card class="mx-auto" color="#ffffff">
    <v-toolbar flat color="#f0f2f5">
      <v-row>
        <v-col md="auto" style="padding-top:15px; padding-left:20px">
          <span class="headline_dlg" style="color:black">{{accion}} Nuevo Registro</span>
        </v-col>
        <v-col align="right" style="padding-top:15px">
          <v-btn fab small color="transparent" depressed @click="Cerrar()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-container>

      <!----------- SOLICITANTE ------------>
      <!-- <template v-slot:[`item.convivencia`]="props"> 
        <span style="color:#336699">
          {{props.item.convivencia}}
        </span>
      </template>  -->

      <!-- <v-col cols="5">
        <template>
          <v-container class="px-0" fluid>
            <v-radio-group v-model="selected" row>
              <v-radio
                v-for="n in 2"
                :key="n"
                :label="`Radio ${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </v-container>
        </template>
      </v-col> -->
      
      <!-- <v-row>    
        <v-col cols="7">
          <v-autocomplete
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
      </v-row> -->
      
      <v-row>
        <v-col>
          <v-text-field 
            id="convivencia.tipoID" 
            v-model="convivencia.descripcion"
            label="Ingrese tipo de convivencia"
          >               
          </v-text-field>
        </v-col>
      </v-row>


      <!-- /* Botonera {#33ddff} */ -->
      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn @click="Cerrar()" depressed class="pr-8">
            <v-icon medium class="mx-2" color="#999999"></v-icon>Cancelar
          </v-btn>
          &nbsp;&nbsp;
          <v-btn type="submit" :disabled="bloquearSubmit" depressed color="#6cbd70">
            <v-icon medium class="mr-2" color="#aff7b0">mdi-cloud-upload-outline</v-icon>
            Guardar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>

export default {
  data() {
    return {
      rules: {
        required: (value) => !!value || "Campo Requerido.",
        counter: (value) => value.length <= 20 || "Maximo 20 caracteres",
      },
      msg: [],
      tema: ""
    };
  },
  
  props: {
    aIncumplimientos:[],
    incumplimientoID:'',
    accion:"",
    convivencia:""
  },

  /* bloquea boton Guardar si no hay nada escrito en el text field {#ffdf2a} */
  computed: {
    bloquearSubmit() {
      return this.convivencia.descripcion.trim() === ""
        ? true
        : false;
    },
  },

  watch: {
    'random_LT': function () {
      if (this.random_LT) {
        console.log(this.random_LT);
        console.log(this.accion);
      }
    },
  },

  methods: {
    Cerrar() {
      this.$emit('closeLTCRUD')
    },
  },
};
</script>
