<template>
  <div>
    <el-form ref="DetailForm" :model="DetailForm" label-width="100px" style="margin-top:10px;margin-bottom:60px;">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="名称" prop="b_name">
            <el-input v-model="DetailForm.b_name" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
                <!-- <el-form-item label="代码" prop="b_code">
                    <el-input v-model="DetailForm.b_code" readonly></el-input>
                </el-form-item> -->
            <el-form-item label="地区名称" prop="b_area">
                <el-select v-model="DetailForm.b_area" placeholder="请选择" style="width:100%;" disabled>
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
          <el-col :span="7">
            <el-form-item label="经度" prop="b_lon">
            <el-input v-model="DetailForm.b_lon" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="纬度" prop="b_lat">
            <el-input v-model="DetailForm.b_lat" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row type="flex" class="row-bg">
          <!-- <el-col :span="7">
            <el-form-item label="负责人" prop="b_director">
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
          <!-- <el-col :span="7">
            <el-form-item label="地区名称" prop="b_area">
                <el-select v-model="DetailForm.b_area" placeholder="请选择" disabled>
                <el-option
                    v-for="item in selectAreaOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="描述" prop="b_desc">
            <el-input type="textarea" :rows="4" v-model="DetailForm.b_desc" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="封面图片" prop="b_cover">
            <el-upload
                disabled
                :class="{disabled:uploadDisabled}"
                :limit="1"
                :action="DetailUploadUrl"
                list-type="picture-card"
                :on-success="handleDetailUploadSuccess"
                :on-preview="handleDetailPreview"
                :on-remove="handleDetailUploadRemove"
                :file-list="DetailUploadFileList">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="DetailPreviewDialogVisible">
                <img width="100%" :src="DetailPreviewDialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="村落图片" prop="b_village_photos">
            <el-upload
                disabled
                :class="{disabled:uploadPhotosDisabled}"
                :action="DetailUploadUrl"
                list-type="picture-card"
                :on-preview="handleDetailPhotosPreview"
                :file-list="DetailUploadFileListPhotos">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="DetailPreviewPhotosDialogVisible">
                <img width="100%" :src="DetailPreviewPhotosDialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="视频封面" prop="b_video_snapshots">
            <el-upload
                disabled
                :class="{disabled:uploadCoverDisabled}"
                :action="DetailUploadUrl"
                list-type="picture-card"
                :on-preview="handleDetailVideoCoverPreview"
                :file-list="DetailUploadFileListVideoCover">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="DetailPreviewVideoCoverDialogVisible">
                <img width="100%" :src="DetailPreviewVideoCoverDialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="村落视频" prop="b_village_videos">
                <div v-for="item in videoSrc" :key="item" style="position:relative;width:200px;height:150px;display:inline-block">
                    <video :src="item.url" width="200" height="150" controls="controls"></video>
                </div>
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
            // b_code : '',
            // b_lat : '',
            // b_director : [],
            b_desc : '',
            b_cover : [],
            b_id : '',
            b_name : '',
            b_area : '',
            // b_lon : '',
          },
          selectAdminOptions : [], // 负责人
          selectAreaOptions : [], // 地区

          DetailUploadUrl : `${api.dev}/p/main/upload/image`,  // 上传图片的地址
          DetailUploadFileList : [],

          DetailPreviewDialogVisible : false,
          DetailPreviewDialogImageUrl : '',

          DetailUploadFileListPhotos : [],
          DetailPreviewPhotosDialogVisible : false,
          DetailPreviewPhotosDialogImageUrl : '',

          DetailUploadFileListVideoCover : [],
          DetailPreviewVideoCoverDialogVisible : false,
          DetailPreviewVideoCoverDialogImageUrl : '',

          videoSrc : [],
      }
  },
  methods : {
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
            this.$http.get(`${api.dev}/p/main/village/select`,{params: {access_token : getToken() , b_id : this.$route.params.id}}).then(res => {
                if(res.body.code == 200) {
                // this.DetailForm.b_code = res.body.content.village.b_code;
                // this.DetailForm.b_lat = res.body.content.village.b_lat;
                // this.DetailForm.b_director = res.body.content.village.b_director;
                this.DetailForm.b_desc = res.body.content.village.b_desc;
                this.DetailForm.b_cover = res.body.content.village.b_cover;
                this.DetailForm.b_id = res.body.content.village.b_id;
                this.DetailForm.b_name = res.body.content.village.b_name;
                this.DetailForm.b_area = res.body.content.village.b_area;
                // this.DetailForm.b_lon = res.body.content.village.b_lon;

                this.DetailUploadFileList.push({url : `${api.address}${this.DetailForm.b_cover}`})
                res.body.content.villagePhoto.forEach(item => {
                    this.DetailUploadFileListPhotos.push({url : `${api.address}${item.vp_photo}`})
                })

                res.body.content.villageVideo.forEach(item => {
                    this.DetailUploadFileListVideoCover.push({url : `${api.address}${item.vv_snapshot}`})
                })
                
                res.body.content.villageVideo.forEach(item => {
                    this.videoSrc.push({url : `${api.address}${item.vv_video}`})
                })

                }else if (res.body.code == 500) {
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
      // 上传成功时
    handleDetailUploadSuccess(res,file,fileList) {
        this.DetailUploadFileList.push({url: `${api.address}${res.content}`})
        this.DetailForm.b_cover = res.content
        
    },
    handleDetailPreview(file) {
        this.DetailPreviewDialogVisible = true;
        this.DetailPreviewDialogImageUrl = file.url;
    },
    // 删除图片
    handleDetailUploadRemove(file,fileList) {
        for(var i = 0 ; i < this.DetailUploadFileList.length ; i++) {
            if(file.url == this.DetailUploadFileList[i].url) {
                this.DetailUploadFileList.splice(i,1)
            }
        }
       
    //    var reg = new RegExp(`${api.address}`);
    //    file.url = file.url.replace(reg,'');

        // for(var j = 0 ; j < this.DetailForm.b_cover.length ; j++) {
        //     if(file.url == this.DetailForm.b_cover[j]) {
        //         this.DetailForm.b_cover.splice(j,1)
        //     }
        // }

        this.DetailForm.b_cover = ''
    },
    // 返回
    goBack() {
        this.$router.back(-1);
    },
    handleDetailPhotosPreview(file) {
        this.DetailPreviewPhotosDialogVisible = true;
        this.DetailPreviewPhotosDialogImageUrl = file.url;
    },
    handleDetailVideoCoverPreview(file) {
        this.DetailPreviewVideoCoverDialogVisible = true;
        this.DetailPreviewVideoCoverDialogImageUrl = file.url;
    },
  },
  created() {
      this.getInfo()
      this.getSelectAdmin()
      this.getSelectArea()
  },
  computed : {
      uploadDisabled : function () {
        //   return this.DetailForm.b_cover != ''
        return true
      },
      uploadPhotosDisabled : function () {
          return true
      },
      uploadCoverDisabled : function () {
          return true
      }
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
