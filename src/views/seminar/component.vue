<template>
  <div>
      <el-button v-if="permissionAdd" type="primary" @click="AddDialogTableVisible = true" class="AddVillageBtn"><i class="el-icon-edit"></i> 新增</el-button>
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
        prop="c_name"
        label="名称"
        sortable
        align="center"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="c_key"
        label="标识"
        sortable
        align="center"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
            <!-- <router-link :to="'/seminar/symposium/symposiumdetail/'+scope.row.t_id">
                <el-button v-if="permissionDetail" type="text" size="small">查看</el-button>
            </router-link>
            <router-link :to="'/seminar/symposium/symposiumedit/'+scope.row.t_id">
                <el-button v-if="permissionEdit" type="text" size="small" style="margin-left:10px">编辑</el-button>
            </router-link> -->
            <el-button v-if="permissionDetail" @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button v-if="permissionEdit" @click="handleEdit(scope.row)" type="text" size="small" style="margin-left:10px">编辑</el-button>
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

    <el-dialog 
      v-elDragDialog
      :visible.sync="AddDialogTableVisible"
      title="新建组件管理" 
      @closed="AddDialogClosed('AddForm')"
      :close-on-click-modal="false">
      <!-- 表单 -->
      <el-form ref="AddForm" :model="AddForm" label-width="80px" :rules="AddRules" style="width:100%;">
          <el-form-item label="名称" prop="c_name">
              <el-input v-model="AddForm.c_name"></el-input>
          </el-form-item>
          <el-form-item label="标识" prop="c_key">
              <el-input v-model="AddForm.c_key"></el-input>
          </el-form-item>
          <el-form-item label="所属页面" prop="c_area">
                <el-select v-model="AddForm.c_area" placeholder="请选择" clearable>
                    <el-option
                    v-for="item in areaOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item style="text-align:right">
            <el-button type="primary" @click="submitAddForm('AddForm')">提交</el-button>
            <el-button @click="cancleAddForm('AddForm')">取消</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog 
      v-elDragDialog
      :visible.sync="DetailDialogTableVisible"
      title="组件管理详情" 
      :close-on-click-modal="false">
      <!-- 表单 -->
      <el-form ref="DetailForm" :model="DetailForm" label-width="80px" style="width:100%;">
          <el-form-item label="名称" prop="c_name">
              <el-input v-model="DetailForm.c_name" readonly></el-input>
          </el-form-item>
          <el-form-item label="标识" prop="c_key">
              <el-input v-model="DetailForm.c_key" readonly></el-input>
          </el-form-item>
          <el-form-item label="所属页面" prop="c_area">
                <el-select v-model="DetailForm.c_area" placeholder="请选择" clearable disabled>
                    <el-option
                    v-for="item in areaOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
          </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog 
      v-elDragDialog
      :visible.sync="EditDialogTableVisible"
      title="编辑组件管理" 
      @closed="EditDialogClosed('EditForm')"
      :close-on-click-modal="false">
      <!-- 表单 -->
      <el-form ref="EditForm" :model="EditForm" label-width="80px" :rules="EditRules" style="width:100%;">
          <el-form-item label="名称" prop="c_name">
              <el-input v-model="EditForm.c_name"></el-input>
          </el-form-item>
          <el-form-item label="标识" prop="c_key">
              <el-input v-model="EditForm.c_key" readonly></el-input>
          </el-form-item>
          <el-form-item label="所属页面" prop="c_area">
                <el-select v-model="EditForm.c_area" placeholder="请选择" clearable>
                    <el-option
                    v-for="item in areaOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item style="text-align:right">
            <el-button type="primary" @click="submitEditForm('EditForm')">提交</el-button>
            <el-button @click="cancleEditForm('EditForm')">取消</el-button>
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

import elDragDialog from '@/directive/el-dragDialog';

export default {
  name: 'component',
  directives: { elDragDialog }, // 拖拽指令
  data() {
      return{
          tableData : [],
          loading : true,  // 加载条
          total: 0, // 分页总条数
          start : 0 ,
          limit : 0,

          permissionShow: false,
          permissionAdd : false,
          permissionEdit: false,
          permissionDetail: false,
          permissionDelete: false,

          // 新建的数据
        AddDialogTableVisible : false,
        AddForm : {},
        AddRules : {
            c_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
            c_key : [{required: true,message : '请输入标识', trigger: 'blur'}],
            c_area : [{required: true,message : '请选择所属页面', trigger: 'blur'}]
        },
        areaOptions : [],

        // 查看详情的数据
        DetailDialogTableVisible : false, // 详情框默认的模态框
        DetailForm : {},

        EditDialogTableVisible : false,
        EditForm : {},
        EditRules : {
            c_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
            c_key : [{required: true,message : '请输入标识', trigger: 'blur'}],
            c_area : [{required: true,message : '请选择所属页面', trigger: 'blur'}]
        },
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
                    }
                })
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
          this.$http.get(`${api.dev}/p/main/compnent/show`,{params: {access_token:getToken(),start:this.start,limit:this.limit}}).then(res => {
              if(res.body.code == 200) {
                this.tableData = res.body.content.records;
                this.total = res.body.content.total
                this.loading = false;
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
      getAreaOptions() {
          this.$http.get(`${api.dev}/p/main/drop/selectPageArea`,{params:{access_token:getToken()}}).then(res => {
              if(res.body.code == 200) {
                this.areaOptions = res.body.content;
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
      handleDelete(row) {
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.loading = true;
              this.$http.post(`${api.dev}/p/main/compnent/delete`,{access_token : getToken() , c_id : row.c_id},{emulateJSON : true}).then(res => {
                    if(res.body.code == 200) {
                        this.$message({
                        message: '删除成功',
                        type: 'success'
                        });
                        this.getInfo();
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
          })
      },
      // 分页
        handleCurrentChange(val) {
            this.loading = true;
            this.start = this.limit * (val - 1);
            this.getInfo();
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
                    formdata.append('c_name',this.AddForm.c_name);
                    formdata.append('c_key',this.AddForm.c_key);
                    formdata.append('c_area',this.AddForm.c_area);
                    this.$http.post(`${api.dev}/p/main/compnent/save`,formdata,{emulateJSON:true}).then(res => {
                        if(res.body.code == 200) {
                            loading.close();
                            this.AddDialogTableVisible = false;
                            this.$message({
                                message: res.body.msg,
                                type: 'success'
                            });
                            this.loading = true;
                            this.getInfo();
                            this.$refs[formName].clearValidate(); // 清除表单验证规则
                            this.$refs[formName].resetFields(); // 清空表单数据
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
                }else {
                    console.log('submit error');
                    return false;
                }
            })
        },
        // 关闭新增框
      AddDialogClosed(formName) {
          this.$refs[formName].resetFields(); // 清除表单验证规则
      },
      cancleAddForm(formName) {
          this.$refs[formName].resetFields(); // 清除表单验证规则
          this.AddDialogTableVisible = false;
      },
      handleDetail(row) {
          // 开启加载器
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$http.get(`${api.dev}/p/main/compnent/select`,{params:{access_token:getToken(),c_id:row.c_id}}).then(res => {
              if(res.body.code == 200) {
                    loading.close();
                    this.DetailDialogTableVisible = true;
                    this.DetailForm = res.body.content;
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
      handleEdit(row) {
          // 开启加载器
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$http.get(`${api.dev}/p/main/compnent/select`,{params:{access_token:getToken(),c_id:row.c_id}}).then(res => {
              if(res.body.code == 200) {
                    loading.close();
                    this.EditDialogTableVisible = true;
                    this.EditForm = res.body.content;
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
        // 关闭新增框
      EditDialogClosed(formName) {
          this.$refs[formName].clearValidate(); // 清除表单验证规则
      },
      cancleEditForm(formName) {
          this.$refs[formName].clearValidate(); // 清除表单验证规则
          this.EditDialogTableVisible = false;
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
                    formdata.append('c_id',this.EditForm.c_id);
                    formdata.append('c_name',this.EditForm.c_name);
                    formdata.append('c_area',this.EditForm.c_area);
                    this.$http.post(`${api.dev}/p/main/compnent/update`,formdata,{emulateJSON:true}).then(res => {
                        if(res.body.code == 200) {
                            loading.close();
                            this.EditDialogTableVisible = false;
                            this.$message({
                                message: res.body.msg,
                                type: 'success'
                            });
                            this.loading = true;
                            this.getInfo();

                        }else if(res.body.code == 500) {
                            loading.close()
                            this.$message({
                                message: res.body.msg,
                                type: 'error'
                            });
                            this.EditDialogTableVisible = false;
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
            }else {
                console.log('submit error');
                return false;
            }
          })
      }
  },
  created() {
      this.getSubPermission()
    //   this.getInfo()
      this.getLimit();
      this.getAreaOptions()
  }
}
</script>

<style lang="stylus" scoped>
#pagination
  margin-top 10px
.AddVillageBtn 
  margin-bottom 10px
</style>
