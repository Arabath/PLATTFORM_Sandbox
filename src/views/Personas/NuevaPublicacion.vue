<template>
  <v-card class="mx-auto"
    :loading="isLoading_adjuntos"
    color="#ffffff"
    max-width="900px"
    >
    <v-toolbar flat > <!--#f74c85-->
      <v-row>
        <v-col md="auto" style="padding-top:15px; padding-left:20px">
          <span class="headline_dlg" style="color:black">Nueva Publicacion</span>
        </v-col>
        <v-col align="right" style="padding-top:15px">
          <v-btn fab small  color="transparent" depressed @click="$emit('closeNuevaPublicacion')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <template>
      <v-tabs v-model="tabs" background-color="#ffffff" color="#999999" grow>
        <v-tabs-slider color="#37cadd"></v-tabs-slider>
        <v-tab href="#tab_portada">Imagen de Portada</v-tab>
        <v-tab href="#tab_publicacion">Publicacion</v-tab>
        <v-tab href="#tab_adjuntos">Archivos adjuntos</v-tab>
      </v-tabs>
    </template>

    <v-card-text style="padding-left:15px; padding-right:15px">
      <v-tabs-items v-model="tabs">

        <v-tab-item value="tab_portada">
          <v-card flat>
            <v-card-text>      
              <v-container style="padding-left:0px; padding-right:0px">
                <v-row>
                  <v-col cols="6" rowSpan="2">
                    <vue-croppie
                      ref="croppieRef"
                      :enableResize="false"
                      :enableOrientation="true"
                      :boundary="{ width: 405, height: 270}"
                      :viewport="{ width:360, height:200, 'type':'square' }"
                    ></vue-croppie>
                  </v-col>
                  <v-col cols="6" style="padding-left:120px">
                    <v-row>
                    <v-avatar tile width="240px" height="184px">
                      <img :src="cropped" style="margin-left:10px; border:1px solid #d0d0d0" />
                    </v-avatar>
                    </v-row>
                    <v-row style="margin-top:20px">
                      <input
                        type="file"
                        id="file-input"
                        accept="image/png, image/jpeg, image/bmp"
                        @change="croppie"
                      />
                      
                      <label for="file-input">
                        <v-icon small color="#ffffff">mdi-upload</v-icon>Buscar imagen
                      </label>

                      <v-btn
                        mediun
                        @click="crop">vista previa</v-btn>

                    </v-row>
                    
                  </v-col>
                </v-row>
                <!--
                <div>
                  <div style="float:left">
                    <vue-croppie
                      ref="croppieRef"
                      :enableResize="false"
                      :enableOrientation="true"
                      :boundary="{ width: 450, height: 300}"
                      :viewport="{ width:360, height:200, 'type':'square' }"
                    ></vue-croppie>
                  </div>
                  <div>
                    <v-avatar tile width="240px" height="184px">
                      <img :src="cropped" style="margin-left:10px; border:1px solid #d0d0d0" />
                    </v-avatar>
                  </div>
                  <div style="margin-top:30px">
                      <input
                        type="file"
                        id="file-input"
                        accept="image/png, image/jpeg, image/bmp"
                        @change="croppie"
                      />
                      <label for="file-input">
                        <v-icon small color="#ffffff">mdi-upload</v-icon>Seleccionar imagen
                      </label><br><br>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <v-btn @click="crop">vista previa</v-btn>
                  </div>
                </div>
                -->
              </v-container>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="tab_publicacion">
          <v-card flat>
            <v-card-text>      
              <v-container style="padding-left:0px; padding-right:0px">
                <div>
                  <v-row>
                    <v-col cols="11" style="padding:20px; padding-left:65px; padding-top:0px">
                      <v-text-field
                        v-model="titulo"
                        color="purple darken-2"
                        label="Titulo de la Publicación"
                        required
                      ></v-text-field>              
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="11" style="padding:20px; padding-left:65px">
                      <!--
                    <editor
                        v-model="content"
                        api-key="1sa1u12nuwvcysd8w54xjd32a6xoglhtm6tphxyq3s2eslqu"
                        disabled="{true}"
                          :init="{
                          branding:  false,
                          language:  'es',
                          menubar:   false,
                          toolbar:   false,
                          resize:    false,
                          statusbar: false,
                          inline:    true,
                          plugins: ['autolink autoresize print preview emoticons'],
                        }"
                      />
                      -->
                      <editor
                        id="Editor"
                        v-model="edtNuevaPublicacion"
                        api-key="1sa1u12nuwvcysd8w54xjd32a6xoglhtm6tphxyq3s2eslqu"
                        :init="{
                          branding: false,
                          language : 'es',
                          height: 500,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount emoticons imagetools noneditable'
                          ],

                          toolbar:[
                            'undo redo | formatselect | bold italic backcolor forecolor | image | media | fullscreen |\
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | emoticons | help'
                          ],

                          a11y_advanced_options: true,

                          image_advtab: true,
                          paste_data_images: true,
                          images_upload_handler: function(blobInfo, success, failure){
                            imagesuploadhandler(blobInfo, success, failure);
                          } ,    
                        }"
                      />
                      
                    </v-col>
                  </v-row>
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item value="tab_adjuntos">
          <v-card flat>
            <v-card-text>      
              <v-container style="padding-left:0px; padding-right:0px">
                <div>
                  <v-row>
                    <v-col cols="11" style="padding-top:20px">
                      <v-file-input
                        v-model="currFiles"
                        show-size
                        counter
                        chips
                        filled
                        multiple
                        label="Tamaño 10Mb por archivo (recomendado 2Mb max)"
                        placeholder="Archivos Adjuntos"
                        outlined
                        name="uploadedfiles"
                        ref="myfile"
                        height="220px"
                        @change="inputChanged()"
                      >
                          <template v-slot:selection="{ text, index, file }">
                              <v-chip small text-color="white" color="green" close @click:close="remove(index)">
                                  {{ text }}
                              </v-chip>
                          </template>
                      </v-file-input>
                      <div v-if="files.length">
                          <h5>Archivos seleccionados</h5>
                          <v-chip v-for="f in files" class="mr-1">
                              {{ f.name }}
                          </v-chip>
                          <!--
                          <div class="py-3">
                              <v-btn>Upload all</v-btn>
                          </div>
                          -->
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-container>
            </v-card-text>
          </v-card>

        </v-tab-item>

      </v-tabs-items>

    </v-card-text>
    <v-card-actions style="padding-right:15px">
      <v-spacer></v-spacer>
      <v-btn
        text
        depressed
        large
        @click="$emit('closeNuevaPublicacion')"
      >Cancelar</v-btn>
      <v-btn
        class="my-2"
        depressed
        large
        color="#26c6da"
        dark
        @click="InsertarIntercambio()"
        style="padding-left:20px"
      >
        Publicar
        <v-icon small class="mx-2" color="#f9f9f9">mdi-send</v-icon>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>
<script>

import Vue from "vue";

import axios from "axios";
import {bus} from '../../main';
import moment from "moment";
import VueCroppie from "vue-croppie";
import "croppie/croppie.css"; // import the croppie css manually
import Editor from "@tinymce/tinymce-vue";

Vue.use(VueCroppie);

export default {

  components: {
    editor: Editor,
  },

  props:{ 
    random_comentarios:""
  },

  data() {
    return {
      comunicadoLeidos: [],
      isLoading_adjuntos: false,
      files: [],   
      currFiles : [],   
      preview:false,
      html:'https://www.plattform.com.ar/loading.html',
      dlgColor:"",
      fileName:"",
      realName:"",
      fileType:"",
      textoMensaje:"",
      titulo:"",
      edtNuevaPublicacion:"",
      tabs: null,
      croppieImage: "",
      cropped: null,
      imagePortada: null
    };
  },
  
  computed:{    
    institucion(){
      return this.$store.state.usuario.institucion;
    },
    usuarioID() {
      if (!this.$store.state.usuario) {
        return null;
      }
      return this.$store.state.usuario.idusuario;
    },
    appURL(){
      return axios.defaults.baseURL;
    },

  },

  created() {
   // this.listaIntercambioComentarios(this.intercambioID);
   this.cropped = null;
  },

  methods: {

    moment,

    getImgUrl(pic) {

     // console.log(pic);

      try{
      return require('../../assets/'+pic)
      }
      catch(error){
     // console.log(error);
        return require('../../assets/desconocido.svg');
      }
    },

    InsertarIntercambio() {

      
      if (!this.cropped) {
        this.$emit(
          "showAlert",
          "red",
          "Deberia presionar el boton VISTA PREVIA para asignar una imagen de portada a la publicacion..."
        );
        return false;
      }

      
      if (!this.titulo) {
        this.$emit(
          "showAlert",
          "red",
          "Deberia ingresar el TITULO de la Publicacion para continuar..."
        );
        return false;
      }

      if (!this.edtNuevaPublicacion) {
        this.$emit(
          "showAlert",
          "red",
          "Deberia ingresar el CONTENIDO de la Publicacion para continuar..."
        );
        return false;
      }

      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      console.log(me.titulo)
      console.log(me.edtNuevaPublicacion)
      console.log(me.usuarioID)
      axios
        .post(
          "api/EspacioIntercambio/" + me.institucion + "/CreaIntercambio",
          {
            temaID: null,
            titulo: me.titulo,
            descripcion: me.edtNuevaPublicacion,
            publicanteID: me.usuarioID
          },
          configuracion
        )
        .then(function (response) {
          me.datos = response.data;
          //console.log("*****"+me.datos[0].id);
          
          if (me.files) {
            //me.submitFiles(me.datos[0].id);
            me.submitFilesPortada(me.datos[0].id)
          }
          console.log("paso por acaaaaaaaaaaaaaaaaaaaa")
          me.$emit("closeNuevaPublicacion");
          me.$emit(
            "showAlert",
            "green",
            "La Actividad ha sido enviada con exito!"
          );
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
          } else {
            me.$emit(
              "showAlert",
              "red",
              "Ha ocurrido un ERROR al intentar dar de alta Intercambio"
            );
          }
        });
    },

    imagesuploadhandler(blobInfo, success, failure){

      var data = JSON.stringify({ fileBytes: blobInfo.base64(), fileName: blobInfo.blob().name });
      let header = {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          };
          let configuracion = { headers: header };

          let formData = new FormData();
          var file1 = blobInfo.filename();

          var filename = 'wyswyg_img'+  moment(new Date()).local().format("YYYYMMDDHHmmss") +"." + file1.split('.').pop();

          if(file1.substr(0,10)== 'wyswyg_img'){
            filename = blobInfo.filename();
          }
            formData.append('files', blobInfo.blob(), filename);
            axios
              .post("api/EspacioIntercambio/" + this.institucion + "/PostTinymce/", formData, configuracion, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
              success(response.data.ruta +'/' +  filename );
              })
              .catch((error) => {
                failure(error.message);
                console.log({ error });
              });
    },  

    validaArchivos() {
      for (let file of this.files) {
        this.file = file;
        //  console.log("El tamaño del Archivo " + file + " es " + file.size);
        if (file.size > 10485760) {
          this.$emit(
            "showAlert",
            "red",
            "El tamaño del adjunto excede los limites permitidos!"
          );
          this.files.splice(file);
        }
      }
    },

  inputChanged () {
      console.log(this.files)
      this.files = [
          ...this.currFiles,
          ...this.files
      ]
    },

    submitFiles(intercambioID) {
      let header = {
        Authorization: "Bearer " + this.$store.state.token,
        "Content-Type": "multipart/form-data",
      };
      let configuracion = { headers: header };

      if (this.files) {
        let formData = new FormData();

        for (let file of this.files) {
          this.file = file;
          formData.append("files", this.file);
        }
        formData.append("intercambioID", intercambioID);
        //  console.log(formData.getAll("files"))
        // console.log(this.files)
        axios
          .post("api/EspacioIntercambio/"+ this.institucion +"/SubirIntercambioArchivos/", formData, configuracion, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Success Submit Files!");
            //  console.log({response})
          })
          .catch((error) => {
            console.log({ error });
          });
      } else {
        console.log("there are no files.");
      }
    },

    submitFilesPortada(intercambioID) {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;
      axios
        .put(
          "api/EspacioIntercambio/" + intercambioID + "," + me.institucion + "/SubirPortada",
          {
            intercambioID: intercambioID,
            portada: me.cropped
          },
          configuracion
        )
        .then(function(response) {
          console.log("Success Image Portada!");

        })
        .catch(function(error) {
          console.log(error);
          if (error.response && error.response.status === 401) {
            me.salir();
          } else {
            // Handle error however you want
          }
        });
    },

    sendMessage () {
      this.InsertaComentario();
      //this.resetIcon()
      this.textoMensaje = '';
    },

    croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
   //   console.log(files);
      if (!files.length) return;

      var reader = new FileReader();
      reader.onload = e => {
        this.$refs.croppieRef.bind({
          url: e.target.result
        });
      };

      reader.readAsDataURL(files[0]);
    },

    crop() {
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
      this.btnActualizar = true;
      let options = {
        type: "base64",
        size: { width: 360, height: 200 },
        format: "jpeg"
      };
      this.$refs.croppieRef.result(options, output => {
        this.cropped = this.croppieImage = output;
        //   console.log(this.croppieImage);
      });
    },    

  }

};
</script>

<style>
  input#file-input {
    display: none;
  }
  input#file-input + label {
    background-color: #4d8cf2;
    padding: 4px;
    color: #fff;
    border: 2px solid #9ec3ff;
    border-radius: 9px;
    margin-left: 10px;
    margin-right: 10px;
  }
  input#file-input + label {
    background-color: #3b73ce;
    border-color: #729fe7;
    cursor: pointer;
  }
</style>
