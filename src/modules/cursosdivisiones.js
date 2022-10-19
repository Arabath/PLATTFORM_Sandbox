import axios from "axios";

export default {
    namespaced: true,
    state: {
        carga: false,
        divisiones: [],
    },
    mutations: {
        cargaSQL(state, payload) {
            state.carga = payload
        },
        cargarDivisiones(state, payload) {
            state.divisiones = payload
        },
    },
    actions: {
        cargarDivisiones({ commit }) {
            commit('cargaSQL', true)
            console.log("CARGANDO DIVISIONES " + this.state.usuario.institucion)
            let header = { Authorization: "Bearer " + this.state.token };
            let configuracion = { headers: header };
            axios.get(`api/Cursos/${this.state.usuario.institucion}/ListarDivisiones`, configuracion)
                .then(function (response) {
                    commit('cargaSQL', false)
                    commit('cargarDivisiones', response.data)
                })
                .catch(function (error) {
                    commit('cargaSQL', false)
                    console.log(error.response)
                })
        },
    },
}