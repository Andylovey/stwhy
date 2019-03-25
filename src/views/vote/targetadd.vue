<template>
  <div>
    <el-form ref="AddForm" :model="AddForm" style="margin-top:10px;margin-bottom:60px;" :rules="AddRules">

      <el-row type="flex" class="row-bg">
          <el-col :span="7">
              <el-form-item label="编号" prop="tl_number" label-width="120px">
                  <el-input style="width:16em" v-model="AddForm.tl_number"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item label="名称" prop="tl_name" label-width="120px">
                  <el-input style="width:16em" v-model="AddForm.tl_name"></el-input>
              </el-form-item>
          </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
          <el-col :span="7">
              <el-form-item label="关联投票" prop="tl_vl_id" label-width="120px">
                <el-select v-model="AddForm.tl_vl_id" placeholder="请选择">
                    <li class="el-select-dropdown__item el-select-dropdown__item-title">
                        <span>公司名称</span>
                        <span>活动名称</span>
                        <span>投票类别</span>
                        <span>对接人</span>
                    </li>
                    <el-option
                    v-for="item in selectList"
                    :key="item.vl_id"
                    :label="item.vl_name"
                    :value="item.vl_id">
                    <span>{{ item.vl_company }}</span>
                    <span>{{ item.vl_name }}</span>
                    <!-- <span>{{ item.vl_type }}</span> -->
                    <span v-if="item.vl_type==1">常规</span>
                    <span v-else-if="item.vl_type==2">报名式</span>

                    <span>{{ item.vl_abutment }}</span>
                    </el-option>
                </el-select>
              </el-form-item>
          </el-col>
      </el-row>
      
      <el-row type="flex" class="row-bg">
          <el-col :span="14">
              <el-form-item label="说明介绍" prop="tl_introduction" label-width="120px">
                  <el-input type="textarea" :rows="4" style="width:100%" v-model="AddForm.tl_introduction"></el-input>
              </el-form-item>
          </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
          <el-col :span="14">
              <el-form-item label="首图" prop="tl_img_url" label-width="120px">
                <el-upload
                    :class="{disabled:uploadDisabled}"
                    :limit="1"
                    :action="AddUploadUrl"
                    list-type="picture-card"
                    :on-success="handleAddUploadSuccess"
                    :on-preview="handleAddPreview"
                    :on-remove="handleAddUploadRemove"
                    :file-list="AddUploadFileList"
                    :before-upload="beforeUploadCover">
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
      <el-button type="primary" @click="AddSave('AddForm')" size="small" icon="el-icon-edit-outline">保存</el-button>
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
      return {
          AddForm : {
              tl_img_url : ''
          },
          AddUploadUrl : `${api.dev}/p/vote/target/uploadFile?access_token=${getToken()}`, // 上传图片路径
          AddUploadFileList : [],
          AddPreviewDialogVisible : false,
          AddPreviewDialogImageUrl : '',
          AddRules : {
              tl_number : [{required: true,message : '请输入编号', trigger: 'blur'}],
              tl_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
              tl_vl_id : [{required: true,message : '请选择关联投票', trigger: 'blur'}],
              tl_introduction : [{required: true,message : '请输入介绍内容', trigger: 'blur'}],
              tl_img_url : [{required: true,message : '请选择图片', trigger: 'change'}],
          },

          selectList : [],
      }
  },
  methods : {
    getSelectList() {
        this.$http.post(`${api.dev}/p/vote/manager/selectList`,{access_token:getToken()},{emulateJSON:true}).then(res => {
            if(res.body.code == 200) {
                this.selectList = res.body.content;
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
      // 上传成功时
    handleAddUploadSuccess(res,file,fileList) {
        this.AddForm.tl_img_url = res.content
    },
    // 删除图片
    handleAddUploadRemove(file,fileList) {
        this.AddForm.tl_img_url = '';
    },
    // 放大图片
    handleAddPreview(file) {
        this.AddPreviewDialogVisible = true;
        this.AddPreviewDialogImageUrl = file.url;
    },
    // 返回
    goBack() {
        this.$router.back(-1);
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
                // formdata.append('tl_id',this.AddForm.tl_id);
                formdata.append('tl_vl_id',this.AddForm.tl_vl_id);
                formdata.append('tl_number',this.AddForm.tl_number);
                formdata.append('tl_name',this.AddForm.tl_name);
                formdata.append('tl_img_url',this.AddForm.tl_img_url);
                formdata.append('tl_introduction',this.AddForm.tl_introduction);
                this.$http.post(`${api.dev}/p/vote/target/save`,formdata,{emulateJSON:true}).then(res => {
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
                        loading.close();
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
  },
  created() {
      this.getSelectList()
  },
  computed: {
        uploadDisabled:function() {
            return this.AddForm.tl_img_url != ''
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

<style scoped>
.el-select-dropdown__item-title {
    font-weight: 700;
}
.el-select-dropdown__item span {
    display: inline-block;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

