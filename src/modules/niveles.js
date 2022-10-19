import axios from "axios";

export default {
    namespaced: true,
    state: {
        nivCarga: false,
        niveles: []
    },
    mutations: {
        cargaSQL(state, payload) {
            state.nivCarga = payload
        },
        cargarNiveles(state, payload) {
            state.niveles = payload
        },
    },
    actions: {
        cargarNiveles({ commit }) {
            commit('cargaSQL', true)
            let header = { Authorization: "Bearer " + this.state.token };
            let configuracion = { headers: header };
            axios.get(`api/InstitucionNiveles/${this.state.usuario.institucion}/InstitucionNiveles`, configuracion)
                .then(function (response) {
                    console.log(response.data)
                    commit('cargaSQL', false)
                    commit('cargarNiveles', response.data)
                })
                .catch(function (error) {
                    commit('cargaSQL', false)
                    console.log(error.response)
                })
        },
    },
}