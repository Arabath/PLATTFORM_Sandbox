import axios from "axios";

export default {
    namespaced: true,
    state: {
        perfCarga: false,
        perfiles: [],
        perfSelected:[],
        personaPerfiles: {
            personaID:"",
            perfilesIDs:"",
            perfilPredeterminadoID:''
        },
        alertPerf:{
            estado:false,
            tipo:'',
            mensaje:''
        },
        estadoAlert: false,
    },
    mutations: {
        cargaSQL(state, payload) {
            state.perfCarga = payload
        },
        cargarPerfiles(state, payload) {
            state.perfiles = payload
            state.perfSelected =state.perfiles.filter(item => item.estadoRelacion === true)
        },
        ActualizarPersonaPerfilesRelacion(state, payload) {
            console.log("Hace el Commit")
            console.log(payload)
            state.alertPerf.estado = true
            state.alertPerf.tipo='green'
            state.alertPerf.mensaje='Los datos se guardaron correctamente!'
            state.estadoAlert= true
        },
        setEstadoAlert(state, payload) {
            state.estadoAlert = payload
        },
    },
    actions: {
        cargarPerfiles({ commit },personaID) {
            commit('cargaSQL', true)
            let header = { Authorization: "Bearer " + this.state.token };
            let configuracion = { headers: header };
            axios.get(`api/Perfiles/${personaID},${this.state.usuario.institucion}/PerfilesXPersonaID`, configuracion)
                .then(function (response) {
                    console.log(response.data)
                    commit('cargaSQL', false)
                    commit('cargarPerfiles', response.data)
                })
                .catch(function (error) {
                    commit('cargaSQL', false)
                    console.log(error.response)
                })
        },
        setEstadoAlert({ commit }, estado) {
            commit('setEstadoAlert', estado)
        },
        ActualizarPersonaPerfilesRelacion({ commit }, personaPerfiles) {
            console.log(personaPerfiles)

            let header = { Authorization: "Bearer " + this.state.token };
            let configuracion = { headers: header };
            axios
                .post(
                    `api/Perfiles/${this.state.usuario.institucion}/ActualizarPersonaPerfilesRelacion`,
                    {
                        iD:0,
                        personaID: personaPerfiles.personaID,
                        perfilesIDs: personaPerfiles.perfilesIDs,
                        perfilPredeterminadoID: personaPerfiles.perfilPredeterminadoID,
                    },
                    configuracion
                )
                .then(function (response) {
                    console.log(response);
                    if(response.statusText ==='Created'){
                        console.log("PerfilesActualizacos")
                        
                        commit('ActualizarPersonaPerfilesRelacion', response.data)
                    }
                })
                .catch(function (error) {
                    state.alertPerf.estado = true
                    state.alertPerf.tipo='red'
                    state.alertPerf.mensaje='Ocurrio un error al guardar los datos!'
                    console.log(error.response)
                })
        },





    },
}