<template>
  <v-container>
    <v-row> Editar {{ $route.params.id }} - {{ persona }} </v-row>
    <v-form @submit.prevent="updatePersona(persona)">
    <ControlesFormCRU :persona="persona" />
    </v-form>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import ControlesFormCRU from "../../components/Personas/ControlesFormCRU.vue";

export default {
  name: "ActualizarPersona",
  components: {
    ControlesFormCRU,
  },

  computed: {
    ...mapState(['persona']),
  },
  methods: {
    ...mapActions("personas", ["deletePersona", "cargarPersonas"]),
    ...mapActions(['setPersona', 'updatePersona']),
  },
  created() {
    this.setPersona(this.$route.params.id);
  },
};
</script>