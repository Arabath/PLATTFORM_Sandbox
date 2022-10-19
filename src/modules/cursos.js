import axios from "axios";
import router from '../router'


export default {
    namespaced: true,
    state: {
        carga: false,

        alert:{
            estado:false,
            tipo:'',
            mensaje:''
        },

        cursos: [],
        // personasActivas:[],

        // persona: {
        //     apellido: "",
        //     nombres: "",
        //     mail: "",
        //     tipoDocumentoID: "",
        //     nroDocumento: "",
        //     fechaNacimiento: "",
        //     genero: "",
        //     paisID: "",
        //     provinciaID: "",
        //     ciudad: "",
        //     codPost: "",
        //     calle: "",
        //     numeroPuerta: "",
        //     piso: "",
        //     dpto: "",
        //     telefonoParticular: "",
        //     telefonoLaboral: "",
        //     telefonoCelular: "",
        //     observaciones: "",
        //     institucion:""
        // },
    },
    mutations: {
        cargaSQL(state, payload) {
            state.carga = payload
        },
        
        cargarCursos(state, payload) {
            state.cursos = payload
        },

        // cargarPersonasActivas(state, payload) {
        //     state.personasActivas = payload
        // },

        // estadoAlert(state, payload) {
        //     console.log("El VALOR DEL PAYLOAD "+payload)
        //     state.alert.estado = payload
        // },

        // createPersona(state, payload) {
        //     console.log("Hace el Commit")
        //     console.log(payload)
            
        //     state.personas.push(payload)
        //     console.log(state.personas)
        //     state.alert.estado = true
        //     state.alert.tipo='green'
        //     state.alert.mensaje='Los datos se guardaron correctamente!'
        //     router.push('/personas')
        // },

        // deletePersona(state, payload) {
        //     state.personas = state.personas.filter(item => item.id !== payload)
        // },

        // setPersona(state, payload) {
        //     if (!state.personas.find(item => item.id === payload)) {
        //         router.push('/personas')
        //         return
        //     }
        //     state.persona = state.personas.find(item => item.id === payload)
        // },

        // updatePersona(state, payload) {
        //     state.personas = state.personas.map(item => item.id === payload.id ? payload : item)
        //     router.push('/personas')
        // },
    },
    actions: {
        // cargarPersonasActivas({ commit }) {
        //     commit('cargaSQL', true)
        //     let header = { Authorization: "Bearer " + this.state.token };
        //     let configuracion = { headers: header };
        //     axios.get(`api/personas/${this.state.usuario.institucion}/ListaPersonasActivasXPerfil`, configuracion)
        //         .then(function (response) {
        //             commit('cargaSQL', false)
        //             commit('cargarPersonasActivas', response.data)
        //         })
        //         .catch(function (error) {
        //             commit('cargaSQL', false)
        //             console.log(error.response)
        //         })
        // },

        cargarCursos({ commit }) {
            commit('cargaSQL', true)
            let header = { Authorization: "Bearer " + this.state.token };
            let configuracion = { headers: header };
            axios.get(`api/cursos/${this.state.usuario.institucion}/ListarCursos`, configuracion)
                .then(function (response) {
console.log(response.data)
                    
                    commit('cargaSQL', false)
                    commit('cargarCursos', response.data)
                })
                .catch(function (error) {
                    commit('cargaSQL', false)
                    console.log(error.response)
                })
        },

        // createPersona({ commit }, persona) {
        //     let header = { Authorization: "Bearer " + this.state.token };
        //     let configuracion = { headers: header };
        //     let me = this;
        //     axios
        //         .post(
        //             `api/Personas/${this.state.usuario.institucion}/AltaPersona`,
        //             {
        //                 nroDocumento: persona.nroDocumento,
        //                 apellido: persona.apellido,
        //                 nombres: persona.nombres,
        //                 tipoDocumentoID: persona.tipoDocumentoID,
        //                 fechaNacimiento: persona.fechaNacimiento,
        //                 genero: persona.genero,
        //                 mail: persona.mail,
        //                 calle: persona.calle,
        //                 numeroPuerta: persona.numeroPuerta,
        //                 piso: persona.piso,
        //                 dpto: persona.dpto,
        //                 paisID: persona.paisID,
        //                 provinciaID: persona.provinciaID,
        //                 ciudad: persona.ciudad,
        //                 codPost: persona.codPost,
        //                 telefonoParticular: persona.telefonoParticular,
        //                 telefonoLaboral: persona.telefonoLaboral,
        //                 telefonoCelular: persona.telefonoCelular,
        //                 observaciones: persona.observaciones,
        //                 institucion: this.state.usuario.institucion
        //             },
        //             configuracion
        //         )
        //         .then(function (response) {
        //             console.log(response);
        //             if(response.statusText ==='Created'){
        //                 console.log("PersonaCreada")
                        
        //                 commit('createPersona', response.data)
        //             }
        //         })
        //         .catch(function (error) {
        //             state.alert.estado = true
        //             state.alert.tipo='red'
        //             state.alert.mensaje='Ocurrio un error al guardar los datos!'
        //             console.log(error.response)
        //             router.push('/personas')
        //         })
        // },

        // deletePersona({ commit }, id) {
        //     let header = { Authorization: "Bearer " + this.state.token };
        //     let configuracion = { headers: header };
        //     let me = this;
        //     axios
        //         .delete(
        //             `api/Personas/${this.state.usuario.institucion, id}/EliminarPersona`,
        //             configuracion
        //         )
        //     commit('deletePersona', id)
        //         .catch(function (error) {
        //             console.log(error.response)
        //         })
        // },

        // setPersona({ commit }, id) {
        //     commit('setPersona', id)
        // },

        // updatePersona({ commit }, persona) {
        //     let header = { Authorization: "Bearer " + this.state.token };
        //     let configuracion = { headers: header };
        //     let me = this;
        //     axios
        //         .put(
        //             `api/Personas/${this.state.usuario.institucion, persona.id}/ActualizarPersona`,
        //             {
        //                 apellido: persona.apellido,
        //                 nombre: persona.nombres
        //             },
        //             configuracion
        //         )
        //         .then(function (response) {
        //             console.log(response);
        //             commit('updatePersona', response.data)
        //         })
        //         .catch(function (error) {
        //             console.log(error.response)
        //         })
        // },

    },
}