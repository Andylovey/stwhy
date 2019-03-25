<template>
  <div>
    <el-form ref="DetailForm" :model="DetailForm" style="margin-top:10px;margin-bottom:60px;">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
              <el-form-item label="参赛者姓名" prop="sl_name" label-width="120px">
                  <el-input style="width:16em" v-model="DetailForm.sl_name" readonly></el-input>
              </el-form-item>
          </el-col>
           <el-col :span="7">
              <el-form-item label="参赛编号" prop="sl_number" label-width="120px">
                  <el-input style="width:16em" v-model="DetailForm.sl_number" readonly></el-input>
              </el-form-item>
          </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
            <el-col :span="7">
                <el-form-item label="关联投票名称" prop="vl_name" label-width="120px">
                    <el-input style="width:16em" v-model="DetailForm.vl_name" readonly></el-input>
                </el-form-item>
            </el-col>
            <!--<el-col :span="7">
                <el-form-item label="关联投票ID" prop="sl_vl_id" label-width="120px">
                    <el-input style="width:16em" v-model="DetailForm.sl_vl_id" readonly></el-input>
                </el-form-item>
            </el-col>-->
      </el-row>
      <el-row type="flex" class="row-bg">      
            <el-col :span="7">
                <el-form-item label="参赛者手机" prop="sl_phone" label-width="120px">
                    <el-input style="width:16em" v-model="DetailForm.sl_phone" readonly></el-input>
                </el-form-item>
            </el-col>
      </el-row>
       <el-row type="flex" class="row-bg">      
           <el-col :span="7">
                <el-form-item label="参赛内容名称" prop="sl_content" label-width="120px">
                  <el-input style="width:16em" v-model="DetailForm.sl_content" readonly></el-input>
                </el-form-item>
            </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
            <el-col :span="14">
                <el-form-item label="简介" prop="sl_desc" label-width="120px">
                  <el-input  :rows="3" style="width:100%" type="textarea" v-model="DetailForm.sl_desc" readonly></el-input>
                </el-form-item>
            </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="14">
          <el-form-item label="审核状态" prop="sl_audit" label-width="130px">
            <el-radio v-model="DetailForm.sl_audit" label="1" disabled>已审核</el-radio>
            <el-radio v-model="DetailForm.sl_audit" label="0" disabled>未审核</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
          <el-col :span="14">
              <el-form-item label="图片(最多3张)" prop="sl_img" label-width="120px">
                <el-upload
                    disabled
                    :class="{disabled:uploadDisabled}"
                    :limit="3"
                    :action="DetailUploadUrl"
                    list-type="picture-card"
                    :on-preview="handleDetailPreview"
                    :file-list="DetailUploadFileList">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="DetailPreviewDialogVisible">
                    <img width="100%" :src="DetailPreviewDialogImageUrl" alt="">
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

export default {
  name: 'componentspage1',
  data() {
      return {
          DetailForm : {},
          DetailUploadUrl : `${api.dev}/p/vote/manager/uploadFile?access_token=${getToken()}`, // 上传图片路径
          DetailUploadFileList : [],
          DetailPreviewDialogVisible : false,
          DetailPreviewDialogImageUrl : '',
          uploadDisabled : true
      }
  },
  methods : {
    getInfo() {
        this.$http.post(`${api.dev}/p/vote/signup/select`,{access_token: getToken(), sl_id : this.$route.params.id},{emulateJSON:true}).then(res => {
            if(res.body.code == 200) {
                this.DetailForm = res.body.content;
                this.DetailForm.sl_audit = (this.DetailForm.sl_audit)? '1' : '0';
                for(var i = 0 ; i < this.DetailForm.sl_img.length ; i++) {
                    this.DetailUploadFileList.push({url:`${api.address}${this.DetailForm.sl_img[i]}`})
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
    // 放大图片
    handleDetailPreview(file) {
        this.DetailPreviewDialogVisible = true;
        this.DetailPreviewDialogImageUrl = file.url;
    },
    // 返回
    goBack() {
        this.$router.back(-1);
    },
  },
  created() {
    this.getInfo();
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
