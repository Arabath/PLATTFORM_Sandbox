import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        // primary:'#ee44aa',
        // primary:'#1976D2',
        // primary:'#303F9F',
        // primary:'#512DA8',
        // primary:'#7B1FA2',
        // primary:'#C2185B',
            primary:'#D32F2F',
        // primary:'#00796B',
        //  primary:'#0097A7',
          primary:'#0288D1',
       //   primary:'#AFB42B',
        //  primary:'#689F38',
         // primary:'#388E3C',
        //  primary:'#F57C00',
        //  primary:'#FFA000',
        //  primary:'#FBC02D',
        //  primary:'#455A64',
        //  primary:'#5D4037',
       //  primary:'#E64A19',
        // primary:'#616161',
        // primary:'#000000',
        // primary:'#FFFFFF',




        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'md',
  },
});
