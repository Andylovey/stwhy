<template>
  <div class="symposiumedit">
      <el-form ref="EditForm" :model="EditForm" label-width="140px" :rules="EditRules" style="margin-top:10px;margin-bottom:60px;">
        <!-- <el-form-item label="名称" prop="t_name">
          <el-input style="width:16em" v-model="EditForm.t_name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="t_type">
          <el-radio v-model="EditForm.t_type" label="0">普通专题</el-radio>
          <el-radio v-model="EditForm.t_type" label="1">场馆</el-radio>
          <el-radio v-model="EditForm.t_type" label="2">古村落</el-radio>
        </el-form-item>
        <el-form-item label="排序值" prop="t_sort">
          <el-input style="width:16em" v-model="EditForm.t_sort"></el-input>
        </el-form-item>
        <el-form-item label="代码" prop="t_code">
          <el-input style="width:16em" v-model="EditForm.t_code"></el-input>
        </el-form-item>
        <el-form-item label="发布" prop="t_status">
            <el-radio v-model="EditForm.t_status" label="0">未发布</el-radio>
            <el-radio v-model="EditForm.t_status" label="1">已发布</el-radio>
        </el-form-item>
        <el-form-item label="链接" prop="t_url">
          <el-input style="width:16em" v-model="EditForm.t_url"></el-input>
        </el-form-item>
        <el-form-item label="专题首页" prop="t_indexpage">
          <el-input style="width:16em" v-model="EditForm.t_indexpage"></el-input>
        </el-form-item>
        <el-form-item label="专题负责人" prop="t_director">
          <el-input style="width:16em" v-model="EditForm.t_director"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="t_desc">
          <el-input style="width:16em" v-model="EditForm.t_desc"></el-input>
        </el-form-item> -->
        <el-row type="flex" class="row-bg">
          <el-col :span="8">
                <el-form-item label="名称" prop="t_name">
                <el-input v-model="EditForm.t_name"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="9">
                <el-form-item label="类型" prop="t_type">
                <el-radio v-model="EditForm.t_type" label="0">普通专题</el-radio>
                <el-radio v-model="EditForm.t_type" label="1">场馆</el-radio>
                <el-radio v-model="EditForm.t_type" label="2">古村落</el-radio>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="8">
                <el-form-item label="排序值" prop="t_sort">
                <el-input v-model="EditForm.t_sort"></el-input>
                </el-form-item>
          </el-col>
          <el-col :span="8">
                <el-form-item label="代码" prop="t_code">
                <el-input v-model="EditForm.t_code"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <!-- <el-col :span="8">
                <el-form-item label="发布" prop="t_status">
                    <el-radio v-model="EditForm.t_status" label="0">未发布</el-radio>
                    <el-radio v-model="EditForm.t_status" label="1">已发布</el-radio>
                </el-form-item>
          </el-col> -->
          <el-col :span="8">
                <el-form-item label="专题负责人" prop="t_director">
                    <el-select v-model="EditForm.t_director" multiple placeholder="请选择" style="width:100%;">
                      <el-option
                          v-for="item in selectAdminOptions"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                      </el-option>
                    </el-select>
                </el-form-item>
           </el-col>
          <el-col :span="8">
                <el-form-item label="链接" prop="t_url">
                    <el-input v-model="EditForm.t_url"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row type="flex" class="row-bg">
           <el-col :span="8">
                <el-form-item label="专题负责人" prop="t_director">
                    <el-select v-model="EditForm.t_director" multiple placeholder="请选择">
                    <el-option
                        v-for="item in selectAdminOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                    </el-select>
                </el-form-item>
           </el-col>
        </el-row> -->
        <el-row type="flex" class="row-bg">
            <el-col :span="8">
                    <el-form-item label="专题PC端" prop="t_indexpage_pc">
                        <el-input v-model="EditForm.t_indexpage_pc"></el-input>
                    </el-form-item>
            </el-col>
            <el-col :span="8">
                    <el-form-item label="专题首页移动端" prop="t_indexpage_m">
                        <el-input v-model="EditForm.t_indexpage_m"></el-input>
                    </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="16">
                <el-form-item label="搜索关键字设置" prop="t_keywords">
                    <el-input v-model="EditForm.t_keywords" placeholder="多个关键字以半角逗号分隔"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="16">
                <el-form-item label="描述" prop="t_desc">
                    <el-input type="textarea" :rows="4" v-model="EditForm.t_desc"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="封面图" prop="t_cover">
          <el-upload
            :class="{disabled:uploadDisabled}"
            :action="uploadAddress"
            list-type="picture-card"
            name="file"
            :limit="1"
            ref="EditUpload"
            :before-upload="beforeUploadCover"
            :on-preview="handleEditPreview"
            :on-success="successEditUpload"
            :on-remove="removeEditUpload"
            :file-list="EditFileList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <p style="margin:0;color:red">图片格式：".bmp", ".jpg", ".jpeg", ".png"</p>
          <el-dialog :visible.sync="EditPreviewDialogVisible">
              <img width="100%" :src="EditPreviewDialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
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
          EditForm : {
              t_sort: '',
              t_status: '',
              t_name: '',
              t_code : '',
              t_type : '',
              t_id : '',
              t_cover : '',
              t_desc : '',
              t_url : '',
              t_indexpage_pc : '',
              t_indexpage_m : '',
              t_director : [],
              t_keywords: ''
          },
          EditFileList : [],
          selectAdminOptions : [],
          EditRules : {
              t_sort : [{required: true,message : '请输入排序值', trigger: 'blur'}],
            //   t_status : [{required: true,message : '请选择状态', trigger: 'blur'}],
              t_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
              t_code : [{required: true,message : '请输入代码', trigger: 'blur'}],
              t_type : [{required: true,message : '请选择类型', trigger: 'blur'}],
            //   t_id : [{required: true,message : '请输入序号', trigger: 'blur'}],
              t_cover : [{required: true,message : '请上传图片', trigger: 'blur'}],
              t_desc : [{required: true,message : '请输入描述', trigger: 'blur'}],
              t_url : [{required: true,message : '请输入链接', trigger: 'blur'}],
              t_indexpage_pc : [{required: true,message : '请输入专题首页', trigger: 'blur'}],
              t_indexpage_m : [{required: true,message : '请输入专题首页', trigger: 'blur'}],
              t_director : [{required: true,message : '请输入负责人', trigger: 'blur'}],
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
              this.$router.push({path: '/login'})
            },2000)
          }
        })
      },
      getInfo() {
          this.$http.get(`${api.dev}/p/main/topic/select`,{params : {access_token : getToken() , t_id : this.$route.params.id} }).then(res => {
            if(res.body.code == 200) {
                // 关闭加载器
                // loading.close();
                // this.EditDialogTableVisible = true;

                this.EditForm.t_sort = res.body.content.t_sort;
                // this.EditForm.t_status = (res.body.content.t_status).toString(); // Radio必须为字符串类型
                this.EditForm.t_name = res.body.content.t_name;
                this.EditForm.t_code = res.body.content.t_code;
                this.EditForm.t_type = (res.body.content.t_type).toString();  // Radio必须为字符串类型
                this.EditForm.t_id = res.body.content.t_id;
                this.EditForm.t_cover = res.body.content.t_cover;
                this.EditForm.t_desc = res.body.content.t_desc;
                this.EditForm.t_url = res.body.content.t_url;
                this.EditForm.t_indexpage_pc = res.body.content.t_indexpage_pc;
                this.EditForm.t_indexpage_m = res.body.content.t_indexpage_m;
                this.EditForm.t_director = res.body.content.t_director;
                this.EditForm.t_keywords = res.body.content.t_keywords;

                // for(var i = 0 ; i < this.selectAdminOptions.length ; i++ ){
                //     for(var j = 0 ; j < this.EditForm.t_director.length ; j++) {
                //         if(this.selectAdminOptions[i].id == this.EditForm.t_director[j]) {
                //             this.EditForm.t_director[j] = this.selectAdminOptions[i].name
                //         }
                //     }
                // }

                this.EditFileList = [{url: `${api.address}${res.body.content.t_cover}`}];
            }else if (res.body.code == 500) {
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
      successEditUpload(res,file,fileList) {
            this.EditForm.t_cover = res.content;
      },
      removeEditUpload(file,fileList) {
            this.EditForm.t_cover = '';
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
                    formdata.append('t_name',this.EditForm.t_name);
                    // formdata.append('t_status',this.EditForm.t_status);
                    formdata.append('t_sort',this.EditForm.t_sort);
                    formdata.append('t_cover',this.EditForm.t_cover);
                    formdata.append('t_url',this.EditForm.t_url);
                    // formdata.append('t_director',this.EditForm.t_director);
                    formdata.append('t_director',JSON.stringify(this.EditForm.t_director));
                    formdata.append('t_desc',this.EditForm.t_desc);
                    formdata.append('t_code',this.EditForm.t_code);
                    formdata.append('t_type',this.EditForm.t_type);
                    formdata.append('t_indexpage_pc',this.EditForm.t_indexpage_pc);
                    formdata.append('t_indexpage_m',this.EditForm.t_indexpage_m);
                    formdata.append('t_id',this.EditForm.t_id);
                    formdata.append('t_keywords',this.EditForm.t_keywords);

                    this.$http.post(`${api.dev}/p/main/topic/update`,formdata,{emulateJSON:true}).then(res => {
                        if(res.body.code == 200) {
                            loading.close()
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
    handleEditPreview(file) {
        this.EditPreviewDialogVisible = true;
        this.EditPreviewDialogImageUrl = file.url;
    },
  },
  created() {
      this.getInfo()
      this.getSelectAdmin()
  },
  computed: {
        uploadDisabled:function() {
            return this.EditForm.t_cover != ''
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
    margin-right -15px
.el-form-item
    margin-bottom 30px

form.el-form 
    width 1180px;

</style>

<style lang="stylus">
.symposiumedit textarea{
  resize:none;
}
.disabled .el-upload--picture-card {
    display: none;
}
</style>
