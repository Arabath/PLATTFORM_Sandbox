import axios from "axios";

export default {
    namespaced: true,
    state: {
        carga: false,
        tiposDocumentos: [],
    },
    mutations: {
        cargaSQL(state, payload) {
            state.carga = payload
        },
        cargarTiposDocumentos(state, payload) {
            state.tiposDocumentos = payload
        },
    },
    actions: {
        cargarTiposDocumentos({ commit }) {
            commit('cargaSQL', true)
            let header = { Authorization: "Bearer " + this.state.token };
            let configuracion = { headers: header };
            axios.get(`api/TiposDocumento/${this.state.usuario.institucion}`, configuracion)
                .then(function (response) {
                    commit('cargaSQL', false)
                    commit('cargarTiposDocumentos', response.data)
                })
                .catch(function (error) {
                    commit('cargaSQL', false)
                    console.log(error.response)
                })
        },
    },
}