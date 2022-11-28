import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
 
  {
    path: '/personas',
    name: 'personas',
    component: () => import('../views/Personas/Personas.vue'),
    meta: {
      administrador: true
    }
  },
  {
    path: '/AltaPersona',
    name: 'AltaPersona',
    component: () => import('../views/Personas/AltaPersona.vue'),
    meta: {
      administrador: true
    }
  },
  {
    path: '/actualizarpersona/:id',
    name: 'actualizarpersona',
    component: () => import('../views/Personas/ActualizarPersona.vue'),
    meta: {
      administrador: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: () => import ('../views/Home.vue'),
    meta: {
      administrador: true,
      familia: true,
      docente: true,
      preceptor: true,
      alumno: true,
      AtencionPadres: true,
      directivo: true,
      EOE: true
    }
  },
  {
    path: '/persona',
    name: 'persona',
    component: () => import ('../components/Personas/Persona.vue'),
    meta: {
      administrador: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('../components/Login.vue'),
    meta: {
      libre: true
    }
  },
  {
    path: '/App',
    name: 'app',
    component: () => import ('../App.vue'),
    meta: {
      libre: true
    }
  },
  {
    path: '/gestionLibrosTemas',
    name: 'gestionLibrosTemas',
    component: () => import('../views/Biblioteca/GestionLibrosTemas'),
    meta: {
      directivo: true,
      preceptor: true,
      docente: true,
      EOE: true,
      administrador: true,
      admin: true
    }
  },
  {
    path: '/gestionConvivencia',
    name: 'gestionConvivencia',
    component: () => import('../views/Convivencia/GestionConvivenciaConceptos.vue'),
    meta: {
      directivo: true,
      preceptor: true,
      docente: true,
      EOE: true,
      administrador: true,
      admin: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.libre)) {
    next()
  } else if (store.state.usuario && store.state.usuario.rol == 'Administrador') {
    if (to.matched.some(record => record.meta.administrador)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol == 'Alumno') {
    if (to.matched.some(record => record.meta.alumno)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol == 'Docente') {
    if (to.matched.some(record => record.meta.docente)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol == 'Familia') {
    if (to.matched.some(record => record.meta.familia)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol == 'Preceptor') {
    if (to.matched.some(record => record.meta.preceptor)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol == 'Atencion a Padres') {
    if (to.matched.some(record => record.meta.AtencionPadres)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol == 'Directivo') {
    if (to.matched.some(record => record.meta.directivo)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol == 'EOE') {
    if (to.matched.some(record => record.meta.EOE)) {
      next()
    }
  } else {
    next({
      name: 'login'
    })
  }
})

export default router