<template>
  <div>
    <el-form ref="EditForm" :model="EditForm" style="margin-top:10px;margin-bottom:60px;" :rules="EditRules">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
              <el-form-item label="参赛者姓名" prop="sl_name" label-width="120px">
                  <el-input style="width:16em" v-model="EditForm.sl_name"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item label="参赛者手机" prop="sl_phone" label-width="120px">
                  <el-input style="width:16em" v-model="EditForm.sl_phone"></el-input>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
          <el-col :span="7">
              <el-form-item label="关联投票名称" prop="vl_name" label-width="120px">
                <el-select placeholder="关联投票名称" style="width:16em" v-model="EditForm.sl_vl_id">
                  <el-option v-for="item in searchIdList" :label="item.vl_name" :value="item.vl_id" :key="item.vl_id"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">      
           <el-col :span="7">
                <el-form-item label="参赛内容名称" prop="sl_content" label-width="120px">
                  <el-input style="width:16em" v-model="EditForm.sl_content"></el-input>
                </el-form-item>
            </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
            <el-col :span="14">
                <el-form-item label="简介" prop="sl_desc" label-width="120px">
                  <el-input  :rows="3" style="width:100%" type="textarea" v-model="EditForm.sl_desc"></el-input>
                </el-form-item>
            </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
          <el-col :span="14">
              <el-form-item label="图片(最多3张)" prop="sl_img" label-width="120px">
                <el-upload
                    :class="{disabled:uploadDisabled}"
                    :limit="3"
                    :action="editUploadUrl"
                    list-type="picture-card"
                    :on-success="handleEditUploadSuccess"
                    :on-preview="handleEditPreview"
                    :on-remove="handleEditUploadRemove"
                    :file-list="editUploadFileList">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="editPreviewDialogVisible">
                    <img width="100%" :src="editPreviewDialogImageUrl" alt="">
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
  name: 'componentspage1',
  data() {
      // 手机验证
    var checkPhone = (rule, value, callback) => {        
      if (!value) {           
        return callback(new Error('手机号不能为空'));         
      } else {          
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));          
        if (reg.test(value)) {            
          callback();         
        } else {            
          return callback(new Error('请输入正确的手机号'));          
        }     
      }
    };
      return {
          EditForm : {},
          editUploadUrl : `${api.dev}/p/vote/manager/uploadFile?access_token=${getToken()}`, // 上传图片路径
          editUploadFileList : [],
          editPreviewDialogVisible : false,
          editPreviewDialogImageUrl : '',
          searchIdList: '',
          EditRules : {
              sl_vl_id : [{required: true,message : '请选择关联投票名称', trigger: 'change'}],
              sl_phone : [{required: false, validator: checkPhone, trigger: 'blur'}],
              /*vl_name : [{required: true,message : '请输入所属投票名称', trigger: 'blur'}],
              sl_introduction : [{required: true,message : '请输入介绍内容', trigger: 'blur'}],
              sl_img : [{required: true,message : '请选择图片', trigger: 'change'}],*/
          }
      }
  },
  methods : {
    /* 获取投稿ID */
    getID(){
      this.$http.post(
        `${api.dev}/p/vote/manager/selectList`,
        {
          access_token: getToken()
        },
        {emulateJSON : true}
      ).then(res => {
        if(res.body.code == 200) {
          this.searchIdList = res.body.content;
          console.log(this.searchIdList)
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
            this.$router.push({path: '/login'})
          },2000)
        }
      })
    },
    getInfo() {
        this.$http.post(`${api.dev}/p/vote/signup/select`,{access_token: getToken(), sl_id : this.$route.params.id},{emulateJSON:true}).then(res => {
            if(res.body.code == 200) {
                this.EditForm = res.body.content;
               
                for(var i = 0 ; i < this.EditForm.sl_img.length ; i++) {
                    this.editUploadFileList.push({url:`${api.address}${this.EditForm.sl_img[i]}`})
                }
            }else if(res.body.code == 500) {
                this.$message({
                    message: res.body.msg,
                    type: 'error'
                });
                removeToken();
                setTimeout(function () {
                    this.$router.push({path: '/login'})
                },2000)
            }
        })
    },
    // 上传成功时
    handleEditUploadSuccess(res,file,fileList) {
        this.editUploadFileList.push({url: `${api.address}${res.content}`})
        this.EditForm.sl_img.push(res.content)
    },
    // 删除图片
    handleEditUploadRemove(file,fileList) {
        for(var i = 0 ; i < this.editUploadFileList.length ; i++) {
            if(file.url == this.editUploadFileList[i].url) {
                this.editUploadFileList.splice(i,1)
            }
        }
        // console.log(file);
       
       var reg = new RegExp(`${api.address}`);
       file.url = file.url.replace(reg,'');

        for(var j = 0 ; j < this.EditForm.sl_img.length ; j++) {
            if(file.url == this.EditForm.sl_img[j]) {
                this.EditForm.sl_img.splice(j,1)
            }
        }
    },
    // 放大图片
    handleEditPreview(file) {
        this.editPreviewDialogVisible = true;
        this.editPreviewDialogImageUrl = file.url;
    },
    // 返回
    goBack() {
        this.$router.back(-1);
    },
    // 保存
    editSave(formName) {
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
                formdata.append('sl_id',this.EditForm.sl_id);
                formdata.append('sl_vl_id',this.EditForm.sl_vl_id);
                formdata.append('sl_name',this.EditForm.sl_name);
                formdata.append('sl_phone',this.EditForm.sl_phone);
                formdata.append('sl_content',this.EditForm.sl_content);
                formdata.append('sl_desc',this.EditForm.sl_desc);
                formdata.append('sl_img',JSON.stringify(this.EditForm.sl_img));
                this.$http.post(`${api.dev}/p/vote/signup/update`,formdata,{emulateJSON:true}).then(res => {
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
                        removeToken();
                        setTimeout(function () {
                            this.$router.push({path: '/login'})
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
    this.getID();
    this.getInfo();
  },
  computed: {
        uploadDisabled:function() {
            return this.editUploadFileList.length > 2
        },
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
    z-index 9999
    margin-left -15px
</style>

<style>
    .disabled .el-upload--picture-card {
        display: none;
    }
</style>
