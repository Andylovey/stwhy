<template>
  <div>
    <!-- <el-button type="primary" @click="AddDialogTableVisible = true" class="AddVillageBtn"><i class="el-icon-edit"></i> 新增</el-button> -->
    <router-link :to="'/scenicarea/house/houseadd/add'">
      <el-button v-if="permissionAdd" type="primary" class="AddVillageBtn"><i class="el-icon-edit"></i> 新增</el-button>
    </router-link>
    <el-table
        v-if="permissionShow"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        stripe
        border
        style="width: 100%"
        height="calc(100% - 100px)">
        <el-table-column
        prop="b_name"
        label="名称"
        sortable
        align="center"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="b_house"
        label="对应讲述楼"
        sortable
        align="center"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="b_addr"
        label="地址"
        sortable
        align="center"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        label="封面图"
        sortable
        align="center"
        show-overflow-tooltip>
            <template slot-scope="scope">
                <img :src="coverUrl + '/' + scope.row.b_cover" height="34px" class="showImg" @click="showImg(scope.row.b_cover)">
            </template>
        </el-table-column>
        <!-- <el-table-column
        prop="b_director"
        label="负责人"
        sortable
        align="center"
        show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
        label="操作"
        align="center"
        width="250">
        <template slot-scope="scope">
            <!-- <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button> -->
            <!-- <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button> -->
            <!-- <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button> -->
            <router-link :to="'/scenicarea/house/article/articlemanage/'+ permissionArticleID + '/' + scope.row.b_id + '/' + scope.row.b_name">
                <el-button v-if="permissionArticle" type="text" size="small">文章管理</el-button>
            </router-link>
            <router-link :to="'/scenicarea/house/housedetail/'+scope.row.b_id">
                <el-button v-if="permissionDetail" type="text" size="small" style="margin-left:10px">查看</el-button>
            </router-link>
            <router-link :to="'/scenicarea/house/houseedit/'+scope.row.b_id">
                <el-button v-if="permissionEdit" type="text" size="small" style="margin-left:10px">编辑</el-button>
            </router-link>
            <el-button v-if="permissionDelete" @click="handleDelete(scope.row)" type="text" size="small" style="margin-left:10px">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div id="pagination">
      <el-pagination
        background
        layout="prev, pager, next,total ,jumper"
        :total="total"
        :page-size="limit"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="DetailPreviewDialogVisible">
        <img width="100%" :src="DetailPreviewDialogImageUrl" alt="">
    </el-dialog>

    <!-- 查看详情的模态框 -->
    <el-dialog 
      :visible.sync="DetailDialogTableVisible"
      title="建筑管理详情" 
      top="25px"
      :close-on-click-modal="false">
      <!-- 表单 -->
      <el-form ref="DetailForm" :model="DetailForm" label-width="80px">
        <el-form-item label="代码">
          <el-input v-model="DetailForm.b_code" disabled></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="DetailForm.b_lat" disabled></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="DetailForm.b_director" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="DetailForm.b_desc" disabled></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <!-- <el-input v-model="DetailForm.b_photo" disabled></el-input> -->
          <img :src="DetailForm.b_photo" width="150px">
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="DetailForm.b_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="DetailForm.b_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="地区ID">
          <el-input v-model="DetailForm.b_area" disabled></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="DetailForm.b_lon" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑模态框 -->
    <el-dialog 
      :visible.sync="EditDialogTableVisible"
      title="建筑管理编辑" 
      top="25px"
      @closed="EditDialogClosed('EditForm')"
      :close-on-click-modal="false">
      <!-- 表单 -->
      <el-form ref="EditForm" :model="EditForm" label-width="80px" :rules="EditRules">
        <el-form-item label="代码" prop="b_code">
          <el-input v-model="EditForm.b_code"></el-input>
        </el-form-item>
        <el-form-item label="维度" prop="b_lat">
          <el-input v-model="EditForm.b_lat"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="b_director">
          <el-input v-model="EditForm.b_director"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="b_desc">
          <el-input v-model="EditForm.b_desc"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="b_photo">
          <!-- <el-input v-model="DetailForm.b_photo" disabled></el-input> -->
          <el-upload
            :action="uploadAddress"
            list-type="picture-card"
            name="file"
            :limit="1"
            ref="EditUpload"
            :on-success="successEditUpload"
            :on-remove="removeEditUpload"
            :file-list="EditFileList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <img :src="EditForm.b_photo" width="150px"> -->
        </el-form-item>
        <el-form-item label="序号" prop="b_id">
          <el-input v-model="EditForm.b_id"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="b_name">
          <el-input v-model="EditForm.b_name"></el-input>
        </el-form-item>
        <el-form-item label="地区ID" prop="b_area">
          <el-input v-model="EditForm.b_area"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="b_lon">
          <el-input v-model="EditForm.b_lon"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm('EditForm')">提交</el-button>
          <el-button @click="cancleEditForm('EditForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新建模态框 -->
    <el-dialog 
      :visible.sync="AddDialogTableVisible"
      title="新建建筑管理" 
      top="25px"
      @closed="AddDialogClosed('AddForm')"
      :close-on-click-modal="false">
      <!-- 表单 -->
      <el-form ref="AddForm" :model="AddForm" label-width="80px" :rules="AddRules">
          <el-form-item label="代码" prop="b_code">
          <el-input v-model="AddForm.b_code"></el-input>
        </el-form-item>
        <el-form-item label="维度" prop="b_lat">
          <el-input v-model="AddForm.b_lat"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="b_director">
          <el-input v-model="AddForm.b_director"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="b_desc">
          <el-input v-model="AddForm.b_desc"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="b_photo">
          <!-- <img :src="AddForm.b_photo" width="150px"> -->
          <el-upload
            :action="uploadAddress"
            list-type="picture-card"
            name="file"
            :limit="1"
            ref="AddUpload"
            :on-success="successAddUpload"
            :on-remove="removeAddUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="序号" prop="b_id">
          <el-input v-model="AddForm.b_id"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="b_name">
          <el-input v-model="AddForm.b_name"></el-input>
        </el-form-item>
        <el-form-item label="地区ID" prop="b_area">
          <el-input v-model="AddForm.b_area"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="b_lon">
          <el-input v-model="AddForm.b_lon"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddForm('AddForm')">提交</el-button>
          <el-button @click="cancleAddForm('AddForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

export default {
  name: 'house',
  data() {
      return {
          coverUrl : `${api.address}`,
          DetailPreviewDialogVisible : false,
          DetailPreviewDialogImageUrl : '',
          tableData: [],
          loading : true , // 加载条
          total: 0, // 分页总条数
          start: 0, // 默认第一页
          limit: 0,  // 每页10条

          // 查看详情的数据
          DetailDialogTableVisible : false, // 详情框默认的模态框
          DetailForm: {
            b_code : '',
            b_lat : '',
            b_director : '',
            b_desc : '',
            b_photo : '',
            b_id : '',
            b_name : '',
            b_area : '',
            b_lon : '',
        },

        // 编辑的数据
        EditDialogTableVisible : false, // 编辑框默认的模态框
        EditForm: {
            b_code : '',
            b_lat : '',
            b_director : '',
            b_desc : '',
            b_photo : '',
            b_id : '',
            b_name : '',
            b_area : '',
            b_lon : '',
        },
        EditFileList : [], // 编辑框默认图片为空数组
        EditRules : {   // 验证规则
            b_code : [{required: true,message : '请输入代码', trigger: 'blur'}],
            b_lat : [{required: true,message : '请输入纬度', trigger: 'blur'}],
            b_director : [{required: true,message : '请输入负责人', trigger: 'blur'}],
            b_desc : [{required: true,message : '请输入描述', trigger: 'blur'}],
            b_photo : [{required: true,message : '请上传图片', trigger: 'change'}],
            b_id : [{required: true,message : '请输入ID', trigger: 'blur'}],
            b_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
            b_area : [{required: true,message : '请输入地区名称', trigger: 'blur'}],
            b_lon : [{required: true,message : '请输入经度', trigger: 'blur'}],
        },

        // 新建的数据
        AddDialogTableVisible : false,
        AddForm : {
            b_code : '',
            b_lat : '',
            b_director : '',
            b_desc : '',
            b_photo : '',
            b_id : '',
            b_name : '',
            b_area : '',
            b_lon : '',
        },
        AddRules : {   // 验证规则
            b_code : [{required: true,message : '请输入代码', trigger: 'blur'}],
            b_lat : [{required: true,message : '请输入纬度', trigger: 'blur'}],
            b_director : [{required: true,message : '请输入负责人', trigger: 'blur'}],
            b_desc : [{required: true,message : '请输入描述', trigger: 'blur'}],
            b_photo : [{required: true,message : '请上传图片', trigger: 'change'}],
            b_id : [{required: true,message : '请输入ID', trigger: 'blur'}],
            b_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
            b_area : [{required: true,message : '请输入地区名称', trigger: 'blur'}],
            b_lon : [{required: true,message : '请输入经度', trigger: 'blur'}],
        },

        uploadAddress : `${api.dev}/p/main/upload/image`,  // 上传图片的地址


        permissionShow: false, // 默认为false,根据权限是否显示
        permissionDetail: false, // 默认为false,根据权限是否查看
        permissionEdit: false, // 默认为false,根据权限是否修改
        permissionDelete: false, // 默认为false,根据权限是否删除
        permissionAdd: false, // 默认为false,根据权限是否新建
        permissionArticle: false, // 默认为false,根据权限是否文章管理
        permissionArticleID : '',
      }
  },
  methods : {
      getSubPermission() {
          this.$http.get(`${api.dev}/p/permission/getSub`,{params:{access_token:getToken(), p_id: this.$route.params.id}}).then(res => {
              if(res.body.code == 200) {
                  res.body.content.forEach(item => {
                      if(item.p_name.indexOf('显示') > -1) {
                        this.permissionShow = true;
                      }else if(item.p_name.indexOf('查看') > -1) {
                          this.permissionDetail = true
                      }else if(item.p_name.indexOf('修改') > -1) {
                          this.permissionEdit = true;
                      }else if(item.p_name.indexOf('删除') > -1) {
                          this.permissionDelete = true;
                      }else if(item.p_name.indexOf('新建') > -1) {
                          this.permissionAdd = true;
                      }else if(item.p_name.indexOf('设置') > -1) {
                          this.permissionArticle = true;
                          this.permissionArticleID = item.p_id;
                      }
                  })
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
        // 获取分页条数
    getLimit() {
        this.$http.post(`${api.dev}/p/main/preference/show`,{access_token:getToken()},{emulateJSON:true}).then(res => {
            if(res.body.code == 200) {
                this.limit = res.body.content.p_pagesize;
                this.getInfo();
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
      getInfo() {
          this.$http.get(`${api.dev}/p/main/house/show`,{params : {access_token : getToken() , start : this.start , limit : this.limit}}).then(res => {
              if(res.body.code == 200) {
                    this.tableData = res.body.content.records;
                    this.total = res.body.content.total
                    this.loading = false;
              }else if (res.body.code == 500) {
                    this.$message({
                        message : res.body.msg,
                        type : 'error'
                    })
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
      handleDetail(row) {
        // 开启加载器
        const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.get(`${api.dev}/p/main/house/select`,{params: {access_token : getToken() , b_id : row.b_id}}).then(res => {
            if(res.body.code == 200) {
                // 关闭加载器
                loading.close();
                this.DetailDialogTableVisible = true;
                
                this.DetailForm.b_code = res.body.content.house.b_code;
                this.DetailForm.b_lat = res.body.content.house.b_lat;
                this.DetailForm.b_director = res.body.content.house.b_director;
                this.DetailForm.b_desc = res.body.content.house.b_desc;
                this.DetailForm.b_photo = res.body.content.house.b_photo;
                this.DetailForm.b_id = res.body.content.house.b_id;
                this.DetailForm.b_name = res.body.content.house.b_name;
                this.DetailForm.b_area = res.body.content.house.b_area;
                this.DetailForm.b_lon = res.body.content.house.b_lon;
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
      handleEdit(row) {
            // 开启加载器
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.get(`${api.dev}/p/main/house/select`,{params: {access_token : getToken() , b_id : row.b_id}}).then(res => {
                if(res.body.code == 200) {
                    // 关闭加载器
                    loading.close();
                    this.EditDialogTableVisible = true;

                    this.EditForm.b_code = res.body.content.house.b_code;
                    this.EditForm.b_lat = res.body.content.house.b_lat;
                    this.EditForm.b_director = res.body.content.house.b_director;
                    this.EditForm.b_desc = res.body.content.house.b_desc;
                    this.EditForm.b_photo = res.body.content.house.b_photo;
                    this.EditForm.b_id = res.body.content.house.b_id;
                    this.EditForm.b_name = res.body.content.house.b_name;
                    this.EditForm.b_area = res.body.content.house.b_area;
                    this.EditForm.b_lon = res.body.content.house.b_lon;

                    this.EditFileList = [{url: res.body.content.house.b_photo}];
                }else if (res.body.code == 500) {
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
      handleDelete(row) {
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.loading = true;
              this.$http.post(`${api.dev}/p/main/house/delete`,{access_token : getToken(), b_id: row.b_id},{emulateJSON:true}).then(res => {
                  if(res.body.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getInfo();
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
          })
      },
      submitEditForm(formName) {
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
                formdata.append('b_photo',this.EditForm.b_photo);
                formdata.append('b_code',this.EditForm.b_code);
                formdata.append('b_desc',this.EditForm.b_desc);
                formdata.append('b_director',this.EditForm.b_director);
                formdata.append('b_area',this.EditForm.b_area);
                formdata.append('b_lon',this.EditForm.b_lon);
                formdata.append('b_lat',this.EditForm.b_lat);
                this.$http.post(`${api.dev}/p/main/house/update`,formdata,{emulateJSON:true}).then(res => {
                    if(res.body.code == 200) {
                        loading.close();
                        this.EditDialogTableVisible = false;
                        this.$refs[formName].clearValidate(); // 清除表单验证规则
                        this.$message({
                            message: res.body.msg,
                            type: 'success'
                        });
                        this.loading = true;
                        this.getInfo();
                    }else if(res.body.code == 500) {
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
      cancleEditForm(formName) {
          this.EditDialogTableVisible = false;
          this.$refs[formName].clearValidate(); // 清除表单验证规则
      },
      submitAddForm(formName) {
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
                formdata.append('b_id',this.AddForm.b_id);
                formdata.append('b_name',this.AddForm.b_name);
                formdata.append('b_photo',this.AddForm.b_photo);
                formdata.append('b_code',this.AddForm.b_code);
                formdata.append('b_desc',this.AddForm.b_desc);
                formdata.append('b_director',this.AddForm.b_director);
                formdata.append('b_area',this.AddForm.b_area);
                formdata.append('b_lon',this.AddForm.b_lon);
                formdata.append('b_lat',this.AddForm.b_lat);
                this.$http.post(`${api.dev}/p/main/house/save`,formdata,{emulateJSON:true}).then(res => {
                    if(res.body.code == 200) {
                        loading.close();
                        this.$message({
                            message: res.body.msg,
                            type: 'success'
                        })
                        this.AddDialogTableVisible = false;
                        this.loading = true;
                        this.getInfo();
                        this.$refs[formName].resetFields(); // 清除表单验证规则 清空表单数据
                        this.$refs.AddUpload.clearFiles(); // 清除图片位置
                    }else if (res.body.code == 500) {
                        this.$message({
                            message: res.body.msg,
                            type : 'error'
                        })
                    }
                })
              }else {
                  console.log('error submit');
                  return false;
              }
          })
      },
      cancleAddForm(formName) {
        this.AddDialogTableVisible = false;
        this.$refs[formName].resetFields(); // 清除表单验证规则
        this.$refs.AddUpload.clearFiles(); // 清除图片位置
      },
      successAddUpload(res,file,fileList) {
        this.AddForm.b_photo = `${api.address}${res.content}`;
      },
      successEditUpload(res,file,fileList) {
          this.EditForm.b_photo = `${api.address}${res.content}`;
      },
      removeEditUpload(file,fileList) {
          this.EditForm.b_photo = '';
      },
      removeAddUpload(file,fileList) {
        this.AddForm.b_photo = '';
      },
      AddDialogClosed(formName) {
        this.$refs[formName].resetFields(); // 清除表单验证规则
        this.$refs.AddUpload.clearFiles(); // 清除图片位置
      },
      EditDialogClosed(formName) {
          this.$refs[formName].clearValidate(); // 清除表单验证规则
      },
      // 分页
      handleCurrentChange(val) {
        this.loading = true;
        this.start = this.limit * (val - 1);
        this.getInfo();
      },
      showImg(url) {
          this.DetailPreviewDialogVisible = true;
          this.DetailPreviewDialogImageUrl = `${api.address}${url}`
      }
  },
  created() {
      this.getLimit()
    //   this.getInfo()
      this.getSubPermission()
  }
}
</script>

<style lang="stylus" scoped>
#pagination
  margin-top 10px
.AddVillageBtn 
  margin-bottom 10px

.showImg:hover
  cursor zoom-in
</style>
