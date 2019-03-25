<template>
  <div>
      <el-form ref="EditForm" :model="EditForm" label-width="80px" :rules="EditRules" style="margin-top:10px;margin-bottom:60px;">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
                <el-form-item label="标题" prop="cn_title">
                    <el-input v-model="EditForm.cn_title"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
                <el-form-item label="来源">
                    <el-input v-model="EditForm.cn_source"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
                <el-form-item label="发布组织">
                    <el-input v-model="EditForm.cn_organization"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
                <el-form-item label="发布时间">
                <el-date-picker
                    v-model="EditForm.cn_createtime"
                    value-format="timestamp"
                    type="date">
                </el-date-picker>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
                <el-form-item label="内容">
                <quill-editor ref="EditTextEditor"
                    :content="EditForm.cn_content"
                    :options = "EditEditorOption"
                    @change="onEditEditorChange($event)"
                    style="height:400px;overflow:scroll">
                </quill-editor>
                </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-footer>
        <el-button type="primary" @click="goBack" size="small" icon="el-icon-arrow-left">返回</el-button>
        <el-button type="primary" @click="EditSave('EditForm')" size="small" icon="el-icon-edit-outline">保存</el-button>
      </el-footer>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'
// 时间过滤器
import {formatDate} from '@/filter/date.js';
// 引入富文本框插件
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'componentspage1',
  components : {
    quillEditor
  },
  data() {
      return {
          EditForm : {
              cn_title : '',
              cn_source : '',
              cn_organization : '',
              cn_createtime : '',
              cn_content : '',
              cn_id : ''
          },

          EditEditorOption : {
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
          readOnly: false
        },

        EditRules : {
            cn_title : [{required: true,message : '请输入标题', trigger: 'blur'}]
        },
      }
  },
  methods: {
    goBack() {
        this.$router.back(-1);
    },
      getInfo() {
          this.$http.post(`${api.dev}/p/main/culturalNews/select`,{access_token:getToken(),cn_id: this.$route.params.id},{emulateJSON: true}).then(res => {
                if(res.body.code == 200) {
                    this.EditForm.cn_title = res.body.content.cn_title;
                    this.EditForm.cn_source = res.body.content.cn_source;
                    this.EditForm.cn_organization = res.body.content.cn_organization;
                    this.EditForm.cn_createtime = res.body.content.cn_createtime;
                    this.EditForm.cn_content = res.body.content.cn_content;
                    this.EditForm.cn_id = res.body.content.cn_id;
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
      //富文本编辑器  文本改变时 设置字段值
        onEditEditorChange({ editor, html, text }) {
	        this.EditForm.cn_content = html;
        },

        EditSave(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    // 开启加载器
                    const loading = this.$loading({
                        lock: true,
                        text: '正在保存中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    var formdata = new FormData();
                    formdata.append('access_token',getToken());
                    formdata.append('cn_id',this.EditForm.cn_id);
                    formdata.append('cn_title',this.EditForm.cn_title);
                    formdata.append('cn_source',this.EditForm.cn_source);
                    formdata.append('cn_organization',this.EditForm.cn_organization);
                    formdata.append('cn_content',this.EditForm.cn_content);
                    formdata.append('cn_createtime',new Date(this.EditForm.cn_createtime).toString());
                    this.$http.post(`${api.dev}/p/main/culturalNews/update`,formdata,{emulateJSON:true}).then(res => {
                        if(res.body.code == 200) {
                            loading.close();
                            this.$message({
                                message: res.body.msg,
                                type: 'success'
                            });
                            this.$router.back(-1);
                        }else if(res.body.code == 500) {
                            this.$message({
                                message: res.body.msg,
                                type: 'error'
                            });
                        }
                    })
                }else {
                    console.log('error submit');
                    return false;
                }
            })
        }
  },
  created() {
      this.getInfo()
  }
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
    z-index 9999
</style>


