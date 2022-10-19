import axios from "axios";

export default {
    namespaced: true,
    state: {
        carga: false,
        paises: [],
    },
    mutations: {
        cargaSQL(state, payload) {
            state.carga = payload
        },
        cargarPaises(state, payload) {
            state.paises = payload
        },
    },
    actions: {
        cargarPaises({ commit }) {
            commit('cargaSQL', true)
            let header = { Authorization: "Bearer " + this.state.token };
            let configuracion = { headers: header };
            axios.get(`api/Paises/${this.state.usuario.institucion}`, configuracion)
                .then(function (response) {
                    commit('cargaSQL', false)
                    commit('cargarPaises', response.data)
                })
                .catch(function (error) {
                    commit('cargaSQL', false)
                    console.log(error.response)
                })
        },
    },
}