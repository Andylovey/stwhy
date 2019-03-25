<template>
  <div>
    <el-form ref="EditForm" :model="EditForm" label-width="110px" style="margin-top:10px;margin-bottom:60px;" :rules="EditRules">
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="名称" prop="b_name">
                <el-input v-model="EditForm.b_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="类别" prop="b_source">
                <el-radio-group v-model="EditForm.b_source">
                    <el-radio :label="0">PC端</el-radio>
                    <el-radio :label="1">移动端</el-radio>
                </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="所属专题" prop="b_topic">
                <el-select v-model="EditForm.b_topic" placeholder="请选择" clearable>
                <el-option
                    v-for="item in topicOptions"
                    :key="item.t_id"
                    :label="item.t_name"
                    :value="item.t_id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="跳转链接" prop="b_url">
                <el-input v-model="EditForm.b_url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="封面" prop="b_cover" :class="{'hasImg' : IsHasImg}">
            <el-upload
                :action="uploadAddress"
                list-type="picture-card"
                name="file"
                :limit="1"
                ref="EditUpload"
                :on-preview="handleAddPreview"
                :before-upload="beforeUploadCover"
                :on-success="successEditUploadCover"
                :on-remove="removeEditUploadCover"
                :file-list="EditFileListCover">
                <i class="el-icon-plus"></i>
            </el-upload>
            <p style="margin:0;color:red">图片格式：".bmp", ".jpg", ".jpeg", ".png"</p>
            <el-dialog :visible.sync="AddPreviewDialogVisible">
              <img width="100%" :src="AddPreviewDialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>

    <el-footer>
        <el-button type="primary" @click="goBack" size="small" icon="el-icon-arrow-left">返回</el-button>
        <el-button type="primary" @click="editSave('EditForm')" size="small" icon="el-icon-edit-outline">保存</el-button>
      </el-footer>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

export default {
  name: 'advertisementedit',
  data() {
      return {
          EditForm : {},
          EditRules : {
              b_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
              b_source : [{required: true,message : '请输入名称', trigger: 'blur'}],
              b_topic : [{required: true,message : '请输入所属专题', trigger: 'blur'}],
              b_cover : [{required: true,message : '请选择封面图', trigger: 'change'}],
          },
          topicOptions : [],
          EditFileListCover : [],

          uploadAddress : `${api.dev}/p/main/upload/image`,  // 上传图片的地址
          AddPreviewDialogVisible : false,
          AddPreviewDialogImageUrl : '',

          IsHasImg : false,
      }
  },
  methods : {
      goBack() {
        this.$router.back(-1);
      },
      getInfo() {
          this.$http.get(`${api.dev}/p/main/banner/select`,{params: {access_token: getToken(), b_id : this.$route.params.id}}).then(res => {
              if(res.body.code == 200) {
                    this.EditForm = res.body.content;
                    // if(this.EditForm.b_topic == 0) {
                    //     this.EditForm.b_topic = '首页'
                    // }

                    this.EditFileListCover = [{url:`${api.address}${this.EditForm.b_cover}`}]
                    this.IsHasImg = true;
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
      // 获取所有专题
      getAllTopic() {
          this.$http.get(`${api.dev}/p/main/drop/selectTopic`,{params : {access_token : getToken()}}).then(res => {
              if(res.body.code == 200) {
                //   this.topicMsg = res.body.content;
                  var indexTop = [{t_id : 0, t_name : '首页'}]
                  this.topicOptions = indexTop.concat(res.body.content);
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
      successEditUploadCover(res,file,fileList) {
            this.EditForm.b_cover = res.content;
            this.IsHasImg = true;
      },
      removeEditUploadCover(file,fileList) {
            this.EditForm.b_cover = '0';
            this.IsHasImg = false;
      },
      editSave(formName) {
        this.$refs[formName].validate((valid) => {
            if(valid) {
                const loading = this.$loading({
                    lock: true,
                    text: '正在保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                var formdata = new FormData();
                formdata.append('access_token',getToken());
                formdata.append('b_id',this.EditForm.b_id);
                formdata.append('b_name',this.EditForm.b_name);
                formdata.append('b_source',this.EditForm.b_source);
                formdata.append('b_cover',this.EditForm.b_cover);
                formdata.append('b_topic',this.EditForm.b_topic);
                if(this.EditForm.b_url) {
                    formdata.append('b_url',this.EditForm.b_url)
                }else {
                    formdata.append('b_url','')
                }
                // if(this.EditForm.b_topic == '' || this.EditForm.b_topic == '首页') {
                //     formdata.append('b_topic',0)
                // }else {
                //     formdata.append('b_topic',this.EditForm.b_topic)
                // }
                this.$http.post(`${api.dev}/p/main/banner/update`,formdata,{emulateJSON: true}).then(res => {
                    if(res.body.code == 200) {
                        loading.close();
                        this.$message({
                            message: res.body.msg,
                            type: 'success'
                        });
                        this.$router.back(-1);
                    }else if (res.body.code == 500) {
                        loading.close();
                        this.$message({
                            message : res.body.msg,
                            type : 'error'
                        })
                    }
                })
            }else {
                console.log('submit error');
                return false;
            }
        })
    },
    beforeUploadCover(file) {
        const isLt5M = file.size / 1024 / 1024  < 5;
        if (['image/jpg', 'image/jpeg', 'image/bmp','image/png'].indexOf(file.type) == -1) {
            this.$message.error('请上传正确的图片格式');
            return false;
        }
        if (!isLt5M) {
            this.$message.error('上传图片大小不能超过5MB!');
            return false;
        }
      },
            // 放大图片
    handleAddPreview(file) {
        this.AddPreviewDialogVisible = true;
        this.AddPreviewDialogImageUrl = file.url;
    },
  },
  created() {
      this.getInfo()
      this.getAllTopic()
  },
  computed : {
      uploadDisabledCover:function() {
            return this.EditForm.b_cover != '0'
        },
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
    margin-right -15px
form.el-form 
    width 1180px;
</style>
<style lang="stylus">
.hasImg{
		.el-upload.el-upload--picture-card{
			display: none!important;
		}
	}
</style>