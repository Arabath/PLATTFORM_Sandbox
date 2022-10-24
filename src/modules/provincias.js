import axios from "axios";

export default {
    namespaced: true,
    state: {
        carga: false,
        provincias: [],
    },
    mutations: {
        cargaSQL(state, payload) {
            state.carga = payload
            console.log(state.carga)
        },
        cargarProvincias(state, payload) {
            state.provincias = payload
            console.log(state.provincias)
        },
    },
    actions: {
        cargarProvincias({ commit },paisID) {
            commit('cargaSQL', true)
            let header = { Authorization: "Bearer " + this.state.token };
            let configuracion = { headers: header };
            axios.get(`api/Provincias/${paisID},${this.state.usuario.institucion}/porpais`, configuracion)
                .then(function (response) {
                    //console.log(response.data)
                    commit('cargaSQL', false)
                    commit('cargarProvincias', response.data)
                })
                .catch(function (error) {
                    commit('cargaSQL', false)
                    console.log(error.response)
                })
        },
    },
}