<template>
  <div>
    <el-form ref="DetailForm" :model="DetailForm" label-width="100px" style="margin-top:10px;margin-bottom:60px;">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="名称">
                <el-input v-model="DetailForm.b_name" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="地区名称">
                <!-- <el-input v-model="DetailForm.b_area" readonly></el-input> -->
                <el-select v-model="DetailForm.b_area" placeholder="请选择" disabled style="width:100%;">
                <el-option
                    v-for="item in selectAreaOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="地区名称">
                <el-select v-model="DetailForm.b_area" placeholder="请选择" disabled>
                <el-option
                    v-for="item in selectAreaOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="经度">
                <el-input v-model="DetailForm.b_lon" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="纬度">
                <el-input v-model="DetailForm.b_lat" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="代码">
                <el-input v-model="DetailForm.b_code" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row type="flex" class="row-bg">
          <!-- <el-col :span="7">
            <el-form-item label="负责人">
                <el-select v-model="DetailForm.b_director" multiple placeholder="请选择" disabled>
                <el-option
                    v-for="item in selectAdminOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="7">
            <el-form-item label="联系方式">
                <el-input v-model="DetailForm.b_tel" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="服务时间">
                <el-input v-model="DetailForm.b_servetime" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="地址">
                <el-input v-model="DetailForm.b_addr" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="网站地址">
                <el-input v-model="DetailForm.b_url" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="描述">
                <el-input type="textarea" :rows="6" v-model="DetailForm.b_desc" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="图片">
                <!-- <el-input v-model="DetailForm.b_cover" disabled></el-input> -->
                <!-- <img :src="DetailForm.b_cover" width="150px"> -->
                <el-upload
                    disabled
                    :class="{disabled:uploadDisabled}"
                    :limit="1"
                    :action="uploadAddress"
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
          DetailForm : {
                b_code : '',
                b_lat : '',
                b_id : '',
                b_lon : '',
                // b_director : [],
                b_desc : '',
                b_cover : '',
                b_addr : '',
                b_name : '',
                b_tel : '',
                b_servetime : '',
                b_area : '',
                b_url : '',
          },
          selectAdminOptions : [], // 负责人
          selectAreaOptions : [], // 地区

          uploadAddress : `${api.dev}/p/main/upload/image`,  // 上传图片的地址
          DetailUploadFileList : [],
          DetailPreviewDialogVisible : false,
          DetailPreviewDialogImageUrl : '',
          uploadDisabled : true
      }
  },
  methods : {
      goBack() {
        this.$router.back(-1);
      },
      // 获取负责人
      getSelectAdmin() {
        this.$http.get(`${api.dev}/p/main/drop/selectAdmin`,{params: {access_token: getToken(), type : 0}}).then(res => {
          if(res.body.code == 200) {
            this.selectAdminOptions = res.body.content;
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
      getSelectArea() {
          this.$http.get(`${api.dev}/p/main/drop/selectArea`,{params: {access_token: getToken(), type : 0}}).then(res => {
                if(res.body.code == 200) {
                    this.selectAreaOptions = res.body.content;
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
      getInfo() {
          this.$http.get(`${api.dev}/p/main/venue/select`,{params: {access_token: getToken() , b_id : this.$route.params.id}}).then(res => {
              if(res.body.code == 200) {
                  this.DetailForm.b_code = res.body.content.venue.b_code;
                  this.DetailForm.b_lat = res.body.content.venue.b_lat;
                  this.DetailForm.b_id = res.body.content.venue.b_id;
                  this.DetailForm.b_lon = res.body.content.venue.b_lon;
                //   this.DetailForm.b_director = res.body.content.venue.b_director;
                  this.DetailForm.b_desc = res.body.content.venue.b_desc;
                  this.DetailForm.b_cover = res.body.content.venue.b_cover;
                  this.DetailForm.b_name = res.body.content.venue.b_name;
                  this.DetailForm.b_area = res.body.content.venue.b_area;
                  this.DetailForm.b_addr = res.body.content.venue.b_addr;
                  this.DetailForm.b_tel = res.body.content.venue.b_tel;
                  this.DetailForm.b_servetime = res.body.content.venue.b_servetime;
                  this.DetailForm.b_url = res.body.content.venue.b_url;
                  
                  if(this.DetailForm.b_cover) {
                      this.DetailUploadFileList = [{url: `${api.address}${res.body.content.venue.b_cover}`}];
                  }
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
        // 放大图片
    handleDetailPreview(file) {
        this.DetailPreviewDialogVisible = true;
        this.DetailPreviewDialogImageUrl = file.url;
    },
  },
  created() {
      this.getInfo()
      this.getSelectArea()
      this.getSelectAdmin()
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
.el-form-item
    margin-bottom 30px
</style>
