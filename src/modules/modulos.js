import axios from "axios";

export default {
    namespaced: true,
    state: {
        modCarga: false,
        modulos: [],
        modSelected: [],
        personaPerfModulos: {
            personaID: "",
            modulosIDs: "",
            perfilID: ''
        },
        alertMod: {
            estado: false,
            tipo: '',
            mensaje: ''
        },
        estadoAlertMod: false,
    },
    mutations: {
        cargaSQL(state, payload) {
            state.modCarga = payload
        },
        cargarModulos(state, payload) {
            state.modulos = payload
            state.modSelected = state.modulos.filter(item => item.estadoRelacion === true)
        },
        ActualizarPersonaPerfModulosRelacion(state, payload) {
            console.log("Hace el Commit")
            console.log(payload)
            console.log("STATE")
            console.log(state)
            console.log("FIN STATE")
            state.alertMod.estado = true
            state.alertMod.tipo = 'green'
            state.alertMod.mensaje = 'Los datos se guardaron correctamente!'
            state.estadoAlertMod = true
        },
        setEstadoAlertMod(state, payload) {
            state.estadoAlertMod = payload
        },
    },
    actions: {
        cargarModulos({ commit }, moduloParams) {
            commit('cargaSQL', true)
            let header = { Authorization: "Bearer " + this.state.token };
            let configuracion = { headers: header };
            axios.get(`api/Modulos/${moduloParams.personaID},${moduloParams.perfilID},${moduloParams.nivelID},${this.state.usuario.institucion}/ModulosXPersonaID`, configuracion)
                .then(function (response) {
                    console.log(response.data)
                    commit('cargaSQL', false)
                    commit('cargarModulos', response.data)
                })
                .catch(function (error) {
                    commit('cargaSQL', false)
                    console.log(error.response)
                })
        },

        setEstadoAlertMod({ commit }, estado) {
            commit('setEstadoAlertMod', estado)
        },
        ActualizarPersonaPerfModulosRelacion({ commit }, personaPerfModulos) {
            console.log(personaPerfModulos)

            let header = { Authorization: "Bearer " + this.state.token };
            let configuracion = { headers: header };
            axios
                .post(
                    `api/Modulos/${this.state.usuario.institucion}/ActualizarPersonaPerfModulosRelacion`,
                    {
                        iD: 0,
                        personaID: personaPerfModulos.personaID,
                        modulosIDs: personaPerfModulos.modulosIDs,
                        perfilID: personaPerfModulos.perfilID,
                    },
                    configuracion
                )
                .then(function (response) {
                    console.log(response);
                    if (response.statusText === 'Created') {
                        console.log("PerfModulosActualizacos")

                        commit('ActualizarPersonaPerfModulosRelacion', response.data)
                    }
                })
                .catch(function (error) {
                    state.alertMod.estado = true
                    state.alertMod.tipo = 'red'
                    state.alertMod.mensaje = 'Ocurrio un error al guardar los datos!'
                    console.log(error.response)
                })
        },
    },
}