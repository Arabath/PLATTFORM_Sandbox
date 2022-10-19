import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router'

import personas from '../modules/personas'
import tiposdocumento from '../modules/tiposdocumento'
import paises from '../modules/paises'
import provincias from '../modules/provincias'
import perfiles from '../modules/perfiles'
import modulos from '../modules/modulos'
import niveles from '../modules/niveles'
import cursos from '../modules/cursos'
import cursosdivisiones from '../modules/cursosdivisiones'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    loading: {
      titulo: '',
      estado: false,
      color: 'primary',
      loader:'',
      loadercolor:'#fff'
    },

    token: null,
    usuario: null,
    chatabierto: null,
    sinCalificar: null,
    menuConfiguracion: null,
    menuInstitucional: null,
    menuComunicaciones: null,
    menuAulaVirtual: null,
    menuMensajeria: null,
    menuMonitoreo: null,
    menuInformes: null,
    menuBiblioteca: null,
    menuCalificaciones: null,
    menuInasistencias: null,
    menuTerciarioPlanEstudio:null,
    menuSoporte:null,
    menuEspacioDocente:null,
    hijoID: null,
    nombreHijo: null,
    avatarHijo: null,
    cursoHijo: null,
    materiaIDTarea: null,
    docenteIDTarea: null,
    estadoTarea: null,
    tareaSeleccionadaID: null,
    tareaAvatarD: null,
    tareaMateria: null,
    tareaDocente: null,
    tareaFromMain: null,
    tareaAsignada: null,
    cicloLectivo: null,
  },
  mutations: {

    mostrarLoading(state, payload) {
      state.loading.titulo = payload.titulo
      state.loading.color = payload.color
      state.loading.estado = true
      state.loading.loader = payload.loader
      state.loading.loadercolor = payload.loadercolor
    },

    ocultarLoading(state) {
      state.loading.estado = false
    },

    setToken(state, token) {
      state.token = token
    },
    setUsuario(state, usuario) {
      state.usuario = usuario
    },
    setChatAbierto(state, chatabierto) {
      state.chatabierto = chatabierto
    },
    setTareaAsignada(state, tareaAsignada) {
      state.tareaAsignada = tareaAsignada
    },
    setSinCalificar(state, sinCalificar) {
      state.sinCalificar = sinCalificar
    },
    setMenuConfiguracion(state, menuConfiguracion) {
      state.menuConfiguracion = menuConfiguracion
    },
    setMenuInstitucional(state, menuInstitucional) {
      state.menuInstitucional = menuInstitucional
    },
    setMenuComunicaciones(state, menuComunicaciones) {
      state.menuComunicaciones = menuComunicaciones
    },
    setMenuAulaVirtual(state, menuAulaVirtual) {
      state.menuAulaVirtual = menuAulaVirtual
    },
    setMenuMensajeria(state, menuMensajeria) {
      state.menuMensajeria = menuMensajeria
    },
    setMenuMonitoreo(state, menuMonitoreo) {
      state.menuMonitoreo = menuMonitoreo
    },
    setMenuInformes(state, menuInformes) {
      state.menuInformes = menuInformes
    },
    setMenuFormularios(state, menuFormularios) {
      state.menuFormularios = menuFormularios
    },
    setMenuBiblioteca(state, menuBiblioteca) {
      state.menuBiblioteca = menuBiblioteca
    },
    setMenuCalificaciones(state, menuCalificaciones) {
      state.menuCalificaciones = menuCalificaciones
    },
    setMenuInasistencias(state, menuInasistencias) {
      state.menuInasistencias = menuInasistencias
    },
    setMenuTerciarioPlanEstudio(state, menuTerciarioPlanEstudio) {
      state.menuTerciarioPlanEstudio = menuTerciarioPlanEstudio
    },
    setMenuSoporte(state, menuSoporte) {
      state.menuSoporte = menuSoporte
    },
    setMenuEspacioDocente(state, menuEspacioDocente) {
      state.menuEspacioDocente = menuEspacioDocente
    },
    setHijoID(state, hijoID) {
      state.hijoID = hijoID
    },
    setNombreHijo(state, nombreHijo) {
      state.nombreHijo = nombreHijo
    },
    setAvatarHijo(state, avatarHijo) {
      state.avatarHijo = avatarHijo
    },
    setCursoHijo(state, cursoHijo) {
      state.cursoHijo = cursoHijo
    },
    setMateriaIDTarea(state, materiaIDTarea) {
      state.materiaIDTarea = materiaIDTarea
    },
    setDocenteIDTarea(state, docenteIDTarea) {
      state.docenteIDTarea = docenteIDTarea
    },
    setEstadoTarea(state, estadoTarea) {
      state.estadoTarea = estadoTarea
    },
    setTareaSeleccionadaID(state, tareaSeleccionadaID) {
      state.tareaSeleccionadaID = tareaSeleccionadaID
    },
    setTareaFromMain(state, tareaFromMain) {
      state.tareaFromMain = tareaFromMain
    },
    setTareaAvatarD(state, tareaAvatarD) {
      state.tareaAvatarD = tareaAvatarD
    },
    setTareaMateria(state, tareaMateria) {
      state.tareaMateria = tareaMateria
    },
    setTareaDocente(state, tareaDocente) {
      state.tareaDocente = tareaDocente
    },
    setCicloLectivo(state, cicloLectivo){
      state.cicloLectivo = cicloLectivo
    },



  },
  actions: {
        
    guardarToken({ commit }, token) {
      commit("setToken", token)
      commit("setUsuario", decode(token))
      localStorage.setItem("token", token)
    },
    autoLogin({ commit }) {
      let token = localStorage.getItem("token")
      if (token) {
        commit("setToken", token)
        commit("setUsuario", decode(token))
      }
    
      router.push({ name: 'home' })
    },
    salir({ commit }) {
      commit("setToken", null)
      commit("setUsuario", null)
      localStorage.removeItem("token")
      router.push({ name: 'login' })
    },
    estableceChatAbierto({ commit }, chatabierto) {
      commit("setChatAbierto", chatabierto)
    },
    estableceTareaAsignada({ commit }, tareaAsignada) {
      commit("setTareaAsignada", tareaAsignada)
    },
    estableceSinCalificar({ commit }, sinCalificar) {
      commit("setSinCalificar", sinCalificar)
    },
    menuConfiguracion({ commit }, menuConfiguracion) {
      commit("setMenuConfiguracion", menuConfiguracion)
    },
    menuInstitucional({ commit }, menuInstitucional) {
      commit("setMenuInstitucional", menuInstitucional)
    },
    menuComunicaciones({ commit }, menuComunicaciones) {
      commit("setMenuComunicaciones", menuComunicaciones)
    },
    menuAulaVirtual({ commit }, menuAulaVirtual) {
      commit("setMenuAulaVirtual", menuAulaVirtual)
    },
    menuMensajeria({ commit }, menuMensajeria) {
      commit("setMenuMensajeria", menuMensajeria)
    },
    menuMonitoreo({ commit }, menuMonitoreo) {
      commit("setMenuMonitoreo", menuMonitoreo)
    },
    menuInformes({ commit }, menuInformes) {
      commit("setMenuInformes", menuInformes)
    },
    menuFormularios({ commit }, menuFormularios) {
      commit("setMenuFormularios", menuFormularios)
    },
    menuBiblioteca({ commit }, menuBiblioteca) {
      commit("setMenuBiblioteca", menuBiblioteca)
    },
    menuCalificaciones({ commit }, menuCalificaciones) {
      commit("setMenuCalificaciones", menuCalificaciones)
    },
    menuInasistencias({ commit }, menuInasistencias) {
      commit("setMenuInasistencias", menuInasistencias)
    },
    menuTerciarioPlanEstudio({ commit }, menuTerciarioPlanEstudio) {
      commit("setMenuTerciarioPlanEstudio", menuTerciarioPlanEstudio)
    },
    menuSoporte({ commit }, menuSoporte) {
      commit("setMenuSoporte", menuSoporte)
    },
    menuEspacioDocente({ commit }, menuEspacioDocente) {
      commit("setMenuEspacioDocente", menuEspacioDocente)
    },
    hijoID({ commit }, hijoID) {
      commit("setHijoID", hijoID)
    },
    nombreHijo({ commit }, nombreHijo) {
      commit("setNombreHijo", nombreHijo)
    },
    avatarHijo({ commit }, avatarHijo) {
      commit("setAvatarHijo", avatarHijo)
    },
    cursoHijo({ commit }, cursoHijo) {
      commit("setCursoHijo", cursoHijo)
    },
    materiaIDTarea({ commit }, materiaIDTarea) {
      commit("setMateriaIDTarea", materiaIDTarea)
    },
    docenteIDTarea({ commit }, docenteIDTarea) {
      commit("setDocenteIDTarea", docenteIDTarea)
    },
    estadoTarea({ commit }, estadoTarea) {
      commit("setEstadoTarea", estadoTarea)
    },
    tareaSeleccionadaID({ commit }, tareaSeleccionadaID) {
      commit("setTareaSeleccionadaID", tareaSeleccionadaID)
    },
    tareaFromMain({ commit }, tareaFromMain) {
      commit("setTareaFromMain", tareaFromMain)
    },

    tareaAvatarD({ commit }, tareaAvatarD) {
      commit("setTareaAvatarD", tareaAvatarD)
    },
    tareaMateria({ commit }, tareaMateria) {
      commit("setTareaMateria", tareaMateria)
    },
    tareaDocente({ commit }, tareaDocente) {
      commit("setTareaDocente", tareaDocente)
    },

    cicloLectivo({ commit }, cicloLectivo) {
     
      commit("setCicloLectivo", cicloLectivo)
      localStorage.setItem("cicloLectivo", cicloLectivo)
    },


  },

  getters: {
  },

  modules:{
    personas, tiposdocumento, paises, provincias, perfiles, modulos, niveles, cursos, cursosdivisiones
  }
})
