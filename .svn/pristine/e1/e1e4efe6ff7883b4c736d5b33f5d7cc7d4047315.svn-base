<template>
  <div>
      <el-form ref="AddForm" :model="AddForm" label-width="80px" :rules="AddRules" style="margin-top:10px;margin-bottom:60px;">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
                <el-form-item label="标题" prop="cn_title">
                    <el-input v-model="AddForm.cn_title"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
                <el-form-item label="来源">
                    <el-input v-model="AddForm.cn_source"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
                <el-form-item label="发布组织">
                    <el-input v-model="AddForm.cn_organization"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
                <el-form-item label="发布时间">
                <el-date-picker
                    v-model="AddForm.cn_createtime"
                    value-format="timestamp"
                    type="date">
                </el-date-picker>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
                <el-form-item label="内容">
                <quill-editor ref="AddTextEditor"
                    :content="AddForm.cn_content"
                    :options = "AddEditorOption"
                    @change="onAddEditorChange($event)"
                    style="height:400px;overflow:scroll">
                </quill-editor>
                </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-footer>
        <el-button type="primary" @click="goBack" size="small" icon="el-icon-arrow-left">返回</el-button>
        <el-button type="primary" @click="AddSave('AddForm')" size="small" icon="el-icon-edit-outline">保存</el-button>
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
          AddForm : {
              cn_title : '',
              cn_source : '',
              cn_organization : '',
              cn_createtime : '',
              cn_content : '',
              cn_id : ''
          },

          AddEditorOption : {
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

        AddRules : {
            cn_title : [{required: true,message : '请输入标题', trigger: 'blur'}]
        },
      }
  },
  methods: {
    goBack() {
        this.$router.back(-1);
    },
      //富文本编辑器  文本改变时 设置字段值
        onAddEditorChange({ editor, html, text }) {
	        this.AddForm.cn_content = html;
        },

        AddSave(formName) {
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
                    formdata.append('cn_title',this.AddForm.cn_title);
                    formdata.append('cn_source',this.AddForm.cn_source);
                    formdata.append('cn_organization',this.AddForm.cn_organization);
                    formdata.append('cn_content',this.AddForm.cn_content);
                    formdata.append('cn_createtime',new Date(this.AddForm.cn_createtime).toString());
                    this.$http.post(`${api.dev}/p/main/culturalNews/save`,formdata,{emulateJSON:true}).then(res => {
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


