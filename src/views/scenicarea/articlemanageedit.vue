<template>
  <div>
    <el-form ref="EditForm" :model="EditForm" label-width="80px" :rules="EditRules" style="margin-top:10px;margin-bottom:60px;">
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="标题" prop="ha_title">
                <el-input v-model="EditForm.ha_title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="创建时间" prop="ha_date">
                <el-date-picker
                    readonly
                    v-model="EditForm.ha_date"
                    type="datetime">
                </el-date-picker>
            </el-form-item>
          </el-col> 
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
                <el-form-item label="内容" prop="ha_content">
                    <quill-editor ref="EditTextEditor"
                        class="ql-editor"
                        v-model="EditForm.ha_content"
                        :options = "EditEditorOption"
                        style="width:800px;height:500px;overflow:scroll">
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
          EditForm : {},

          EditRules : {
                ha_title : [{required: true,message : '请输入标题', trigger: 'blur'}],
                ha_content : [{required: true,message : '请输入内容', trigger: 'blur'}],
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
      }
  },
  methods : {
      goBack() {
        this.$router.back(-1);
      },
      getInfo() {
          this.$http.get(`${api.dev}/p/main/houseArticle/select`,{params:{access_token:getToken(),ha_id:this.$route.params.haid}}).then(res => {
              if(res.body.code == 200) {
                    this.EditForm = res.body.content;
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
                    formdata.append('ha_id',this.EditForm.ha_id);
                    formdata.append('ha_title',this.EditForm.ha_title);
                    formdata.append('ha_building',this.EditForm.ha_building);
                    formdata.append('ha_content',this.EditForm.ha_content);
                    this.$http.post(`${api.dev}/p/main/houseArticle/update`,formdata,{emulateJSON:true}).then(res => {
                        if(res.body.code == 200) {
                            loading.close();
                            this.$message({
                                message: res.body.msg,
                                type: 'success'
                            });
                            this.$router.back(-1);
                        }else if(res.body.code == 500) {
                            loading.close();
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
                }else {
                    console.log('submit error');
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
    margin-left -15px
</style>
