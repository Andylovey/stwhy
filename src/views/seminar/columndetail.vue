<template>
  <div>
    <el-form ref="DetailForm" :model="DetailForm" label-width="110px" style="margin-top:10px;margin-bottom:60px;">
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="名称" prop="c_name">
                <el-input v-model="DetailForm.c_name" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="代码" prop="c_code">
                <el-input v-model="DetailForm.c_code" readonly></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="7">
            <el-form-item label="类型" prop="c_type">
                <el-radio v-model="DetailForm.c_type" label="0" disabled>资讯</el-radio>
                <el-radio v-model="DetailForm.c_type" label="1" disabled>活动</el-radio>
                <el-radio v-model="DetailForm.c_type" label="2" disabled>攻略</el-radio>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="7">
            <el-form-item label="状态" prop="c_status">
                <el-radio v-model="DetailForm.c_status" label="0" disabled>未发布</el-radio>
                <el-radio v-model="DetailForm.c_status" label="1" disabled>已发布</el-radio>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="是否有子栏目" prop="c_haschild">
                <el-radio v-model="DetailForm.c_haschild" label="0" disabled>否</el-radio>
                <el-radio v-model="DetailForm.c_haschild" label="1" disabled>是</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="页面" prop="c_single">
                <el-radio v-model="DetailForm.c_single" label="0" disabled>单页面</el-radio>
                <el-radio v-model="DetailForm.c_single" label="1" disabled>列表</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="专题" prop="c_topic">
                <el-select v-model="DetailForm.c_topic" placeholder="请选择" disabled>
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
            <el-form-item label="所属栏目" prop="c_fid">
                <el-cascader
                    disabled
                    v-model="selectedDetailOptions"
                    clearable
                    change-on-select
                    :options="parentDetailOptions"
                    @focus="getDetailCategory"
                    @change="onProvincesDetailChange"
                    :props="parentDetailProps"
                    placeholder="此项不选择表示建立顶级栏目"
                    >
                </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="栏目负责人" prop="c_director">
                <el-select v-model="DetailForm.c_director" multiple placeholder="请选择" disabled>
                <el-option
                    v-for="item in selectAdminOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="排序值" prop="c_sort">
                <el-input v-model="DetailForm.c_sort" readonly></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="7">
            <el-form-item label="代码" prop="c_code">
                <el-input v-model="DetailForm.c_code" readonly></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="链接" prop="c_url">
                <el-input v-model="DetailForm.c_url" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="图标" prop="c_icon">
            <el-upload
                disabled
                :class="{disabled:uploadDisabledIcon}"
                :action="uploadAddress"
                list-type="picture-card"
                name="file"
                :limit="1"
                ref="DetailUpload"
                :on-preview="handleAddPreviewIcon"
                :file-list="DetailFileListIcon">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="AddPreviewDialogVisibleIcon">
              <img width="100%" :src="AddPreviewDialogImageUrlIcon" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="封面图" prop="c_cover">
            <el-upload
                disabled
                :class="{disabled:uploadDisabledCover}"
                :action="uploadAddress"
                list-type="picture-card"
                name="file"
                :limit="1"
                ref="DetailUpload"
                :on-preview="handleAddPreviewCover"
                :file-list="DetailFileListCover">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="AddPreviewDialogVisibleCover">
                  <img width="100%" :src="AddPreviewDialogImageUrlCover" alt="">
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
              c_haschild : '',
              c_name : '',
              c_type : '',
              c_amount : '',
              c_id : '',
              c_director : [],
              c_article : '',
              c_single : '',
              c_fid : '',
              c_sort : '',
              c_sub : '',
              c_topic : '',
              c_url : '',
              c_code : '',
              c_status : '',
              c_level : '',
              c_route : '',
              c_icon : '',
              c_cover : ''
            },

            DetailFileListIcon : [],
            DetailFileListCover : [],

            selectAdminOptions : [], // 栏目负责人
            topicOptions : [] , // 专题数组，遍历后可获取专题ID
            parentDetailOptions : [] , // 父级选择框
            parentDetailProps : {
              value: 'c_id',
              label:'c_name',
              children: 'c_children'
            },

            selectedDetailOptions : [],

            uploadAddress : `${api.dev}/p/main/upload/image`,  // 上传图片的地址

            uploadDisabledIcon : true,
            uploadDisabledCover : true,


            AddPreviewDialogVisibleCover : false,
            AddPreviewDialogImageUrlCover : '',
            AddPreviewDialogVisibleIcon : false,
            AddPreviewDialogImageUrlIcon : '',
      }
  },
  methods : {
      goBack() {
        this.$router.back(-1);
      },
      getInfo() {
          this.$http.get(`${api.dev}/p/main/category/select`,{params : {access_token : getToken() , c_id : this.$route.params.id}}).then(res => {
                if(res.body.code == 200) {
                    this.DetailForm.c_haschild = (res.body.content.category.c_haschild).toString();
                    this.DetailForm.c_name = res.body.content.category.c_name;
                    // this.DetailForm.c_type = (res.body.content.category.c_type).toString();
                    this.DetailForm.c_amount = res.body.content.category.c_amount;
                    this.DetailForm.c_id = res.body.content.category.c_id;
                    this.DetailForm.c_director = res.body.content.category.c_director;
                    this.DetailForm.c_article = res.body.content.category.c_article;
                    this.DetailForm.c_single = (res.body.content.category.c_single).toString();
                    this.DetailForm.c_fid = res.body.content.category.c_fid;
                    this.DetailForm.c_sort = res.body.content.category.c_sort;
                    this.DetailForm.c_sub = res.body.content.category.c_sub;
                    this.DetailForm.c_topic = res.body.content.category.c_topic;
                    this.DetailForm.c_url = res.body.content.category.c_url;
                    this.DetailForm.c_code = res.body.content.category.c_code;
                    // this.DetailForm.c_status = (res.body.content.category.c_status).toString();
                    this.DetailForm.c_level = res.body.content.category.c_level;
                    this.DetailForm.c_route = res.body.content.category.c_route;
                    this.DetailForm.c_icon = res.body.content.category.c_icon;
                    this.DetailForm.c_cover = res.body.content.category.c_cover;

                    this.getDetailCategory();
                    this.selectedDetailOptions = [this.DetailForm.c_fid]  // 所属栏目的父级ID
                    // this.selectedDetailOptions = [20,21]  // 所属栏目的父级ID

                    if(this.DetailForm.c_icon) {
                      this.DetailFileListIcon = [{url: `${api.address}${res.body.content.category.c_icon}`}];
                    }
                    if(this.DetailForm.c_cover) {
                      this.DetailFileListCover = [{url: `${api.address}${res.body.content.category.c_cover}`}];
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
      // 获取所有专题
      getAllTopic() {
          this.$http.get(`${api.dev}/p/main/drop/selectTopic`,{params : {access_token : getToken()}}).then(res => {
              if(res.body.code == 200) {
                //   this.topicMsg = res.body.content;
                  this.topicOptions = res.body.content;
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
      // 获取栏目负责人
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
      getDetailCategory(e) {
        this.$http.get(`${api.dev}/p/main/category/show`,{params: {access_token:getToken(),c_topic:this.DetailForm.c_topic}}).then(res => {
            if(res.body.code == 200) {
            this.parentDetailOptions = res.body.content;
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
    // 编辑时选择父级ID
    onProvincesDetailChange(item) {
      for(var i = 0 ; i < item.length ; i++) {
            if(i == item.length - 1) {
                this.DetailForm.c_fid = item[i];
            }
        }
      if(item.length == 0) {
        this.DetailForm.c_fid = '';
      }
    },
          // 放大图片
    handleAddPreviewCover(file) {
        this.AddPreviewDialogVisibleCover = true;
        this.AddPreviewDialogImageUrlCover = file.url;
    },
    handleAddPreviewIcon(file) {
        this.AddPreviewDialogVisibleIcon = true;
        this.AddPreviewDialogImageUrlIcon = file.url;
    }
  },
  created() {
      this.getInfo()
      this.getAllTopic()
      this.getSelectAdmin()
  },
  computed: {
        // uploadDisabledIcon:function() {
        //     return this.DetailForm.c_icon
        // },
        // uploadDisabledCover:function() {
        //     return this.DetailForm.c_cover
        // },
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
form.el-form 
    width 1180px;
</style>

<style>
    .disabled .el-upload--picture-card {
        display: none;
    }
</style>



