<template>
  <div>
    <el-form ref="EditForm" :model="EditForm" label-width="110px" :rules="EditRules" style="margin-top:10px;margin-bottom:60px;">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="名称" prop="b_name">
                <el-input v-model="EditForm.b_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="对应讲述楼" prop="b_house">
                <el-input v-model="EditForm.b_house"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="地区名称" prop="b_area">
                <el-select v-model="EditForm.b_area" placeholder="请选择">
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
            <el-form-item label="地址" prop="b_addr">
                <el-input v-model="EditForm.b_addr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <!-- <el-col :span="7">
            <el-form-item label="代码" prop="b_code">
                <el-input v-model="EditForm.b_code"></el-input>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="7">
            <el-form-item label="负责人" prop="b_director">
                <el-select v-model="EditForm.b_director" multiple placeholder="请选择">
                <el-option
                    v-for="item in selectAdminOptions"
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
            <!-- <el-form-item label="描述" prop="b_desc">
                <el-input type="textarea" :rows="6" v-model="EditForm.b_desc"></el-input>
            </el-form-item> -->
            <el-form-item label="服务时间" prop="b_servertime">
                <el-input type="textarea" :rows="4" v-model="EditForm.b_servertime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="图片" prop="b_cover">
                <el-upload
                    :class="{disabled:uploadDisabled}"
                    :action="uploadAddress"
                    list-type="picture-card"
                    name="file"
                    :limit="1"
                    ref="EditUpload"
                    :on-preview="handleEditPreview"
                    :on-success="successEditUpload"
                    :on-remove="removeEditUpload"
                    :file-list="EditFileList"
                    :before-upload="beforeUploadCover">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <p style="margin:0;color:red">图片格式：".bmp", ".jpg", ".jpeg", ".png"</p>
                <el-dialog :visible.sync="EditPreviewDialogVisible">
                    <img width="100%" :src="EditPreviewDialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="图片宽度" prop="b_width">
                <el-input v-model="EditForm.b_width" placeholder="格式如: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="图片X轴位置" prop="b_left">
                <el-input v-model="EditForm.b_left" placeholder="格式如: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="图片Y轴位置" prop="b_top">
                <el-input v-model="EditForm.b_top" placeholder="格式如: 100%"></el-input>
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

export default {
  name: 'componentspage1',
  data() {
      return {
        EditForm: {
            // b_code : '',
            // b_lat : '',
            // b_director : [],
            // b_desc : '',
            b_id : '',
            b_name : '',
            b_house : '',
            b_addr : '',
            b_servertime : '',
            b_cover : '',
            b_width : '',
            b_left : '',
            b_top : '',
            // b_area : '',
            // b_lon : '',
        },
        EditFileList : [],
        selectAdminOptions : [], // 负责人
        selectAreaOptions : [], // 地区
        EditRules : {
            // b_lat : [{required: true,message : '请输入纬度', trigger: 'blur'}],
            // b_lon : [{required: true,message : '请输入经度', trigger: 'blur'}],
            // b_desc : [{required: true,message : '请输入描述', trigger: 'blur'}],
            b_cover : [{required: true,message : '请上传图片', trigger: 'change'}],
            b_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
            b_house : [{required: true,message : '请输入对应讲述楼', trigger: 'blur'}],
            b_addr : [{required: true,message : '请输入地址', trigger: 'blur'}],
            b_width : [{required: true,message : '请输入图片的宽度', trigger: 'blur'}],
            b_left : [{required: true,message : '请输入图片的X轴位置', trigger: 'blur'}],
            b_top : [{required: true,message : '请输入图片的Y轴位置', trigger: 'blur'}],
            // b_area : [{required: true,message : '请输入地区名称', trigger: 'blur'}],
          },
        uploadAddress : `${api.dev}/p/main/upload/image`,  // 上传图片的地址
        EditPreviewDialogVisible : false,
        EditPreviewDialogImageUrl : ''
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
          this.$http.get(`${api.dev}/p/main/house/select`,{params: {access_token : getToken() , b_id : this.$route.params.id}}).then(res => {
            if(res.body.code == 200) {        
                // this.EditForm.b_code = res.body.content.house.b_code;
                // this.EditForm.b_lat = res.body.content.house.b_lat;
                // this.EditForm.b_director = res.body.content.house.b_director;
                // this.EditForm.b_desc = res.body.content.house.b_desc;
                this.EditForm.b_cover = res.body.content.house.b_cover;
                this.EditForm.b_id = res.body.content.house.b_id;
                this.EditForm.b_name = res.body.content.house.b_name;
                this.EditForm.b_house = res.body.content.house.b_house;
                this.EditForm.b_addr = res.body.content.house.b_addr;
                this.EditForm.b_servertime = res.body.content.house.b_servertime;
                this.EditForm.b_width = res.body.content.house.b_width;
                this.EditForm.b_top = res.body.content.house.b_top;
                this.EditForm.b_left = res.body.content.house.b_left;
                // this.EditForm.b_area = res.body.content.house.b_area;
                // this.EditForm.b_lon = res.body.content.house.b_lon;

                this.EditFileList = [{url: `${api.address}${res.body.content.house.b_cover}`}];
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
                formdata.append('b_id',this.EditForm.b_id);
                formdata.append('b_name',this.EditForm.b_name);
                formdata.append('b_house',this.EditForm.b_house);
                formdata.append('b_addr',this.EditForm.b_addr);
                formdata.append('b_servertime',this.EditForm.b_servertime);
                formdata.append('b_cover',this.EditForm.b_cover);
                formdata.append('b_width',this.EditForm.b_width);
                formdata.append('b_left',this.EditForm.b_left);
                formdata.append('b_top',this.EditForm.b_top);
                // formdata.append('b_code',this.EditForm.b_code);
                // formdata.append('b_desc',this.EditForm.b_desc);
                // formdata.append('b_director',JSON.stringify(this.EditForm.b_director));
                // formdata.append('b_area',this.EditForm.b_area);
                // formdata.append('b_lon',this.EditForm.b_lon);
                // formdata.append('b_lat',this.EditForm.b_lat);
                this.$http.post(`${api.dev}/p/main/house/update`,formdata,{emulateJSON:true}).then(res => {
                    if(res.body.code == 200) {
                        loading.close()
                        this.$message({
                            message: res.body.msg,
                            type: 'success'
                        });
                        this.$router.back(-1);
                    }else if(res.body.code == 500) {
                        loading.close()
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
    },
            // 放大图片
    handleEditPreview(file) {
        this.EditPreviewDialogVisible = true;
        this.EditPreviewDialogImageUrl = file.url;
    },
    successEditUpload(res,file,fileList) {
            this.EditForm.b_cover = res.content;
    },
    removeEditUpload(file,fileList) {
        this.EditForm.b_cover = '';
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
      this.getInfo()
      this.getSelectArea()
      this.getSelectAdmin()
  },
  computed: {
        uploadDisabled:function() {
            return this.EditForm.b_cover != ''
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
.el-form-item
    margin-bottom 30px
</style>

<style>
    .disabled .el-upload--picture-card {
        display: none;
    }
</style>


