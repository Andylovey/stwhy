<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left:35px;font-size:16px;margin:25px 0;">
            <el-breadcrumb-item style="font-weight:700">{{titleInfo[0]}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{titleInfo[1]}}</el-breadcrumb-item>
        </el-breadcrumb>
      <el-form ref="DetailForm" :model="DetailForm" label-width="120px" style="margin-top:10px;margin-bottom:60px;">
          <el-row type="flex" class="row-bg">
            <el-col :span="14">
                <el-form-item label="标题" prop="article.a_title">
                    <el-input v-model="DetailForm.article.a_title" readonly></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          
          <el-row type="flex" class="row-bg">
            <el-col :span="14">
                <el-form-item v-for="item in DetailForm.fields" :key="item.f_key" :label="item.f_name">
                    <el-input type="textarea" :rows="2" v-if="item.f_type==0" v-model="item.f_value" readonly></el-input> 
                    <el-upload
                        v-if="item.f_type==1 && item.f_value!= null"
                        disabled
                        :class="{disabled:uploadDisabled}"
                        :action="uploadAddressCover"
                        list-type="picture-card"
                        name="file"
                        :limit="1"
                        ref="DetailUpload"
                        :on-preview="handleAddPreview"
                        :on-success="successDetailUploadCover"
                        :on-remove="removeDetailUploadCover"
                        :file-list="item.f_value?[{url:`${address}${item.f_value}`}]:disabled">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <!-- <quill-editor ref="DetailTextEditor"
                        disabled
                        v-if="item.f_type==2"
                        :content="item.f_value"
                        :options = "DetailEditorOption"
                        v-model="item.f_value"
                        style="width:800px;height:500px;overflow:scroll"
                        >
                    </quill-editor> -->
                    <vue-ueditor-wrap 
                        v-if="item.f_type==2" 
                        v-model="item.f_value" 
                        :config="editorConfig">
                    </vue-ueditor-wrap>
                    <!-- <div v-if="item.f_type==3">
                        <el-upload class="avatar-uploader el-upload--text"
                            disabled 
                            :action="uploadAddressAudio" 
                            :show-file-list="false" 
                            :on-progress="uploadAudioProcess"
                            :on-success="handleAudioSuccess">
                            <audio v-if="item.f_value !='' && audioFlag == false" :src="`${address}${item.f_value}`" class="avatar" controls="controls">您的浏览器不支持音频播放</audio>
                            <i v-else-if="item.f_value =='' && audioFlag == false" class="el-icon-plus audio avatar-uploader-icon"></i>
                            <el-progress v-if="audioFlag == true" type="circle" :percentage="audioUploadPercent" style="margin-top:30px;"></el-progress>
                        </el-upload>
                    </div> -->
                    <div v-if="item.f_type==3">
                        <!-- <el-button type="primary" @click="handleUploadAudioTable">上传音频</el-button> -->
                        <div v-if="audioPlaySource" style="position:relative;margin-top:15px;border:1px dashed #ccc;line-height:50px;">
                            <!-- <audio :src="`${address}${audioPlaySource}`" controls></audio> -->
                            <VueAudio :theUrl="`${address}${audioPlaySource}`" theControlList="noDownload onlyOnePlaying"/>
                            <!-- <span style="position:absolute;right:0;top:-10px;width:25px;height:25px;background-color:red;border-radius:50%;text-align:center;line-height:25px;color:#fff;cursor:pointer;" @click="handleDeleteAudio(item)">X</span> -->
                        </div>
                    </div>
                    <!-- <div v-if="item.f_type==4" style="width:500px;height:300px;"> -->
                        <!-- <video controls="controls" width="100%">
                            <source :src="item.f_value" type="video/ogg">
                            <source :src="item.f_value" type="video/webm">
                            <source :src="item.f_value" type="video/mp4">
                        </video> -->
                    <!-- </div> -->
                    <div v-if="item.f_type==4">
                        <!-- <el-upload class="avatar-uploader el-upload--text"
                            disabled 
                            :action="uploadAddressVideo" 
                            :show-file-list="false" 
                            :on-progress="uploadVideoProcess"
                            :on-success="handleVideoSuccess" 
                            :before-upload="beforeUploadVideo">
                            <video v-if="item.f_value !='' && videoFlag == false" :src="`${address}${item.f_value}`" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                            <i v-else-if="item.f_value =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
                            <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                        </el-upload> -->
                        <div v-if="videoPlaySource" style="position:relative;width:200px;height:150px;">
                            <video :src="`${address}${videoPlaySource}`" controls width="200" height="150"></video>
                        </div>
                    </div>
                    <el-date-picker
                        v-if="item.f_type==5"
                        v-model="item.f_value"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择日期时间"
                        readonly>
                    </el-date-picker>
                    <el-radio-group v-model="item.f_value" v-if="item.f_type==6" disabled>
                        <el-radio v-for="i in item.f_extra" :key="i.id" :label="i.name">{{i.name}}</el-radio>
                    </el-radio-group>
                    <el-upload
                        v-if="item.f_type==7"
                        :class="{disabled:uploadDisabled}"
                        disabled
                        :action="uploadAddressCover"
                        list-type="picture-card"
                        name="file"
                        ref="EditUpload"
                        :on-preview="handleAddPreviewCoverArr"
                        :file-list="EditUploadFileListCover">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div v-if="item.f_type==8">
                        <div class="videoSourceBasePlaceArr" style="margin-top:10px;">
                            <span v-for="item in videoPlaySourceArr" :key="item" style="position:relative;display:inline-block;width:200px;height:150px;">
                                <video controls :src="videoUrl + item" width="200px" height="150px" ref="deleteVideo"></video>
                            </span>
                        </div>
                    </div>
                </el-form-item>
                <el-dialog :visible.sync="AddPreviewDialogVisible">
                  <img width="100%" :src="AddPreviewDialogImageUrl" alt="">
                </el-dialog>
                <el-dialog :visible.sync="AddPreviewDialogVisibleCoverArr">
                  <img width="100%" :src="AddPreviewDialogImageUrlCoverArr" alt="">
                </el-dialog>
            </el-col>
          </el-row>
        
          <el-row type="flex" class="row-bg">
            <el-col :span="14">
                <el-form-item label="关键字" prop="article.a_keywords">
                    <el-input type="textarea" :rows="4" placeholder="多个关键字用半角逗号分隔" v-model="DetailForm.article.a_keywords"></el-input>
                    <!-- <p style="margin:0;color:red">注：关键字的设置主要用于网络搜索</p> -->
                </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg">
            <el-col :span="7">
                <el-form-item label="文章作者" prop="article.a_author">
                    <el-input v-model="DetailForm.article.a_author"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="文章来源" prop="article.a_source">
                    <el-input v-model="DetailForm.article.a_source"></el-input>
                </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg">
            <el-col :span="14">
                <el-form-item label="分享标题" prop="article.a_share_title">
                    <el-input v-model="DetailForm.article.a_share_title"></el-input>
                </el-form-item>
            </el-col>
             <!-- <el-col :span="7">
                <el-form-item label="分享链接" prop="article.a_share_url">
                    <el-input v-model="DetailForm.article.a_share_url"></el-input>
                </el-form-item>
            </el-col> -->
          </el-row>

          <el-row type="flex" class="row-bg">
            <el-col :span="14">
                <el-form-item label="分享介绍" prop="article.a_share_introduce">
                    <el-input type="textarea" :rows="4" v-model="DetailForm.article.a_share_introduce"></el-input>
                </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg">
              <el-col :span="14">
                    <el-form-item label="分享图片" prop="article.a_share_img">
                        <el-upload
                            disabled
                            :class="{disabled:uploadShareDisabled}"
                            :action="uploadAddressCover"
                            list-type="picture-card"
                            name="file"
                            :limit="1"
                            ref="DetailShareUpload"
                            :on-preview="handleAddPreviewShareCover"
                            :file-list="DetailShareUploadCoverList">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="AddPreviewDialogVisibleShareCover">
                            <img width="100%" :src="AddPreviewDialogImageUrlShareCover" alt="">
                        </el-dialog>
                    </el-form-item>
              </el-col>
          </el-row>
        </el-form>

        <el-footer>
            <el-button type="primary" @click="goBack" size="small" icon="el-icon-arrow-left">返回</el-button>
        </el-footer>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

// 引入富文本框插件
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import VueUeditorWrap from 'vue-ueditor-wrap' 

import VueAudio from '@/components/audio/VueAudio'

export default {
  name: 'componentspage1',
  components : {
        quillEditor,
        VueUeditorWrap,
        VueAudio
  },
  data() {
      return { 
            DetailForm : {
                article : {
                    a_title : '',
                    a_keywords : '',
                    a_id : '',
                    a_author : '',
                    a_source : '',
                    a_share_title : '',
                    // a_share_url : '',
                    a_share_introduce : '',
                    a_share_img : ''
                },
                fields : []
            },

            DetailShareUploadCoverList : [],

            address : `${api.address}`,

            uploadAddressCover : `${api.dev}/p/main/upload/image`,  // 上传图片的地址
            uploadAddressVideo : `${api.dev}/p/main/upload/video`,  // 上传视频的地址
            uploadAddressAudio : `${api.dev}/p/main/upload/audio`,  // 上传视频的地址

            videoFlag : false,
            videoUploadPercent : 0,

            audioFlag : false,
            audioUploadPercent : 0,

        
            DetailEditorOption : {
                theme: 'snow',
                boundary: document.body, 
                modules: {
                    toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean'],
                    ['link', 'image', 'video']
                    ]
                },
                placeholder: 'Insert text here ...',
                readOnly: true
            },

            editorConfig : {
                // 如果需要上传功能,找后端小伙伴要服务器接口地址
                // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
                // serverUrl: 'http://localhost:8090/ueditor/ueditorConfig',
                serverUrl: `${api.dev}/api/main/ueditor/ueditorConfig`,
                // 你的UEditor资源存放的路径,相对于打包后的index.html
                UEDITOR_HOME_URL: '/ueditor/',
                // UEDITOR_HOME_URL: '/ueditor/',
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 工具栏是否可以浮动
                autoFloatEnabled: false,
                // 初始容器高度
                initialFrameHeight: 320,
                // 初始容器宽度
                initialFrameWidth: 800,
                // 关闭自动保存
                enableAutoSave: true,
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'simpleupload', 'emotion', 'pagebreak', 'template', 'background', '|',
                    'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                    'print', 'preview', 'searchreplace', 'drafts', 'help'
                ]],
                readonly : true
            },

            videoPlaySource : '',

            EditUploadFileListCover : [],

            videoPlaySourceArr : [],
            videoSaveSourceArr : [],
            videoUrl : `${api.address}`,

            AddPreviewDialogVisible : false,
            AddPreviewDialogImageUrl : '',
            AddPreviewDialogVisibleCoverArr : false,
            AddPreviewDialogImageUrlCoverArr : '',
            AddPreviewDialogVisibleShareCover : false,
            AddPreviewDialogImageUrlShareCover : '',


            titleInfo : [],
            categoryId : '',

            audioPlaySource : ''
      }
  },
  methods : {
      goBack() {
        this.$router.back(-1);
      },
    getCategoryInfo() {
        this.$http.post(`${api.dev}/p/main/category/getCategory`,{access_token:getToken,c_id:this.categoryId},{emulateJSON:true}).then(res => {
            if(res.body.code == 200) {
                this.titleInfo = res.body.content;
            }else if(res.body.code == 500) {
                this.$message({
                    message: res.body.msg,
                    type: 'error'
                });
            }else if(res.body.code == 510) {
                this.$message({
                    message: res.body.msg,
                    type: 'error'
                });
                removeToken();
                setTimeout(function () {
                    window.location.href = '';
                },2000)
            }
        })
    },
    getInfo() {
        this.$http.get(`${api.dev}/p/main/information/select`,{params: {access_token : getToken(),a_id : this.$route.params.id,c_id:this.$route.params.cid}}).then(res => {
            if(res.body.code == 200) {
                this.DetailForm.article.a_title = res.body.content.article.a_title;
                this.DetailForm.article.a_keywords = res.body.content.article.a_keywords;
                this.DetailForm.article.a_id = res.body.content.article.a_id;
                this.DetailForm.article.a_author = res.body.content.article.a_author;
                this.DetailForm.article.a_source = res.body.content.article.a_source;
                this.DetailForm.article.a_share_title = res.body.content.article.a_share_title;
                // this.DetailForm.article.a_share_url = res.body.content.article.a_share_url;
                this.DetailForm.article.a_share_introduce = res.body.content.article.a_share_introduce;
                this.DetailForm.article.a_share_img = res.body.content.article.a_share_img;

                if(this.DetailForm.article.a_share_img) {
                    this.DetailShareUploadCoverList = [{url : `${api.address}${this.DetailForm.article.a_share_img}`}]
                }
                
                this.categoryId = Number(res.body.content.article.a_category);
                this.getCategoryInfo()

                this.DetailForm.fields = res.body.content.fields;
                this.DetailForm.fields.forEach(item => {
                    if(item.f_type == 3) {
                        this.audioPlaySource = item.f_value
                    }
                    else if(item.f_type == 4) {
                        this.videoPlaySource = item.f_value
                    }
                    else if(item.f_type == 7 && eval(item.f_value) != "[]") {
                        item.f_value = eval(item.f_value);
                        var arr = eval(item.f_value);
                        for(var i = 0 ; i < arr.length ; i++) {
                            this.EditUploadFileListCover.push({url:`${api.address}${arr[i]}`})
                        }
                    }else if(item.f_type == 7 && eval(item.f_value) == "[]") {
                        item.f_value = eval(item.f_value)
                    }
                    else if(item.f_type == 8 && eval(item.f_value) != "[]") {
                        // this.videoPlaySourceArr = eval(item.f_value)
                        // this.videoSaveSourceArr = eval(item.f_value)
                        item.f_value = eval(item.f_value);
                        var videoArr = eval(item.f_value);
                        for(var j = 0 ; j < videoArr.length ; j++) {
                            this.videoPlaySourceArr.push(videoArr[j])
                            this.videoSaveSourceArr.push(videoArr[j])
                        }
                    }else if(item.f_type == 8 && eval(item.f_value) == "[]") {
                        item.f_value = eval(item.f_value)
                    }
                })
            }else if(res.body.code == 500) {
                this.$message({
                    message: res.body.msg,
                    type: 'error'
                });
                removeToken();
                setTimeout(function () {
                    window.location.href = '';
                },2000)
            }
        })
    },
    successDetailUploadCover(res,file,fileList) {
        this.DetailForm.fields.forEach(item => {
            if(item.f_type == 1) {
                // item.f_value = `${api.address}${res.content}`
                item.f_value = `${res.content}`
            }
        })
    },
    removeDetailUploadCover(file,fileList) {
        // this.DetailForm.fields.forEach(item => {
        //     if(item.f_type == 1) {
        //         item.f_value = ''
        //         item = []
        //     }
        // })

        
        this.DetailForm.fields.forEach(item => {
            if(item.f_type == 1) {
                // console.log(item);
                item.f_value = ''
            }
        })
        
    },
    beforeUploadVideo(file) {
        const isLt10M = file.size / 1024 / 1024  < 10;
        if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
            this.$message.error('请上传正确的视频格式');
            return false;
        }
        // if (!isLt10M) {
        //     this.$message.error('上传视频大小不能超过10MB哦!');
        //     return false;
        // }
    },
    uploadVideoProcess(event, file, fileList){
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage.toFixed(0);
    },
    handleVideoSuccess(res, file) {                               
        this.videoFlag = false;
        this.videoUploadPercent = 0; 
        if(res.code == 200) {
            this.DetailForm.fields.forEach(item => {
                if(item.f_type == 4) {
                    item.f_value = res.content
                }
            })
        }else if(res.code == 500){
            this.$message({
                message: res.msg,
                type: 'error'
            });
        }
    },
    uploadAudioProcess(event, file, fileList){
        this.audioFlag = true;
        this.audioUploadPercent = file.percentage.toFixed(0);
    },
    handleAudioSuccess(res, file) {                               
        this.audioFlag = false;
        this.audioUploadPercent = 0; 
        if(res.code == 200) {
            this.AddForm.fields.forEach(item => {
                if(item.f_type == 3) {
                    item.f_value = res.content
                }
            })
        }else if(res.code == 500){
            this.$message({
                message: res.msg,
                type: 'error'
            });
        }
    },
    handleAddPreview(file) {
        this.AddPreviewDialogVisible = true;
        this.AddPreviewDialogImageUrl = file.url;
    },
    handleAddPreviewCoverArr(file) {
        this.AddPreviewDialogVisibleCoverArr = true;
        this.AddPreviewDialogImageUrlCoverArr = file.url;
    },
    handleAddPreviewShareCover(file) {
        this.AddPreviewDialogVisibleShareCover = true;
        this.AddPreviewDialogImageUrlShareCover = file.url;
    },
  },
  created() {
      this.getInfo()
  },
  computed: {
        uploadDisabled:function() {
            // return this.DetailForm.b_photo != ''
            return true
            // var flag;
            // this.DetailForm.fields.forEach(item => {
            //     if(item.f_type == 1 && item.f_value != '') {
            //         // item = []
            //         flag = true
            //         return;
            //     }else {
            //         flag = false
            //     }
            // })
            // return flag
        },
        uploadShareDisabled: function () {
            // return this.DetailForm.article.a_share_img != ""
            return true
        }
    },
}
</script>

<style lang="stylus" scoped>
.el-footer 
    background-color #A3C0D1;
    color #333;
    line-height 60px;
    position absolute;
    width 100%;
    bottom 0;
    z-index 999
    margin-left -15px
</style>
