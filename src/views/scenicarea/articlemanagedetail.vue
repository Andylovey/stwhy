<template>
  <div>
    <el-form ref="DetailForm" :model="DetailForm" label-width="80px" style="margin-top:10px;margin-bottom:60px;">
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="标题" prop="ha_title">
                <el-input v-model="DetailForm.ha_title" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="创建时间" prop="ha_date">
                <el-date-picker
                    readonly
                    v-model="DetailForm.ha_date"
                    type="datetime">
                </el-date-picker>
            </el-form-item>
          </el-col> 
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
                <el-form-item label="内容" prop="ha_content">
                    <quill-editor ref="DetailTextEditor"
                        disabled
                        class="ql-editor"
                        v-model="DetailForm.ha_content"
                        :options = "DetailEditorOption"
                        style="width:800px;height:500px;overflow:scroll">
                    </quill-editor>
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

export default {
  name: 'componentspage1',
  components : {
    quillEditor
  },
  data() {
      return {
          DetailForm : {},

          DetailRules : {
                ha_title : [{required: true,message : '请输入标题', trigger: 'blur'}],
                ha_content : [{required: true,message : '请输入内容', trigger: 'blur'}],
            },

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
                    this.DetailForm = res.body.content;
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
