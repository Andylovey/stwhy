<template>
  <div>
    <div style="display:flex;justify-content:space-between;line-height:56px;">
        <router-link :to="'/seminar/advertisement/advertisementadd/add'">
            <el-button v-if="permissionAdd" type="primary" class="AddVillageBtn"><i class="el-icon-edit"></i> 新增</el-button>
        </router-link>

        <span>
            <el-input v-model="name1" placeholder="请输入名称" style="width: 250px; margin-right: 10px" clearable></el-input>
            <el-select v-model="id1" placeholder="类别" clearable>
                <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" type="primary" @click="handleSearch" style="margin-left:10px;">搜索</el-button>
        </span>
    </div>

      <el-table
      v-if="permissionShow"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      border
      stripe
      :data="tableData"
      style="width: 100%;margin-bottom:10px;"
      height="calc(100% - 110px)">
        <el-table-column
          prop="b_name"
          label="名称"
          sortable
          min-width="160"
          align="center">
       </el-table-column>
       <el-table-column
          prop="b_source"
          label="类别"
          sortable
          min-width="160"
          align="center">
       </el-table-column>
       <el-table-column
          prop="t_name"
          label="所属专题名称"
          sortable
          min-width="160"
          align="center">
       </el-table-column>
       <!-- <el-table-column
          prop="b_status"
          label=""
          sortable
          min-width="160"
          align="center">
       </el-table-column> -->
       <el-table-column
          label="图片"
          min-width="160"
          align="center">
          <template slot-scope="scope">
              <img :src="coverUrl + '/' + scope.row.b_cover" height="34px" class="showImg" @click="showImg(scope.row.b_cover)">
          </template>
       </el-table-column>
       <el-table-column
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
            <router-link :to="'/seminar/advertisement/advertisementdetail/'+scope.row.b_id">
                <el-button v-if="permissionDetail" type="text" size="small">查看</el-button>
            </router-link>
            <router-link :to="'/seminar/advertisement/advertisementedit/'+scope.row.b_id">
                <el-button v-if="permissionEdit" type="text" size="small" style="margin-left:10px">编辑</el-button>
            </router-link>
            <el-button v-if="permissionDelete" @click="handleDelete(scope.row)" type="text" size="small" style="margin-left:10px">删除</el-button>
        </template>
       </el-table-column>
      </el-table>
    <!-- 分页 -->
    <div id="pagination" v-if="ShowPageination">
      <el-pagination
        background
        layout="prev, pager, next,total ,jumper"
        :total="total"
        :page-size="limit"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="dialogVisible" @closed="closeDialog">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

export default {
  name: 'advertisement',
  data() {
      return {
          permissionShow : false,
          permissionAdd : false,
          permissionEdit : false,
          permissionDelete : false,
          permissionDetail : false,

          loading : true,
          total : 0,
          start : 0,
          limit : 0,
          name1 : '',
          tableData : [],

          coverUrl : `${api.address}`,

          dialogVisible : false,
          dialogImageUrl : '',

          ShowPageination : false,

          id1 : '',
          typeOptions : [
            {
               value: '-1',
               label: '全部'
            },
            {
               value: '0',
               label: 'PC端'
            },
            {
               value: '1',
               label: '移动端'
            },
          ]
      }
  },
  methods : {
      getInfo() {
          this.$http.get(`${api.dev}/p/main/banner/show`,{params: {access_token:getToken(),start:this.start,limit:this.limit,name1:this.name1,id1:this.id1}}).then(res => {
              if(res.body.code == 200) {
                  res.body.content.records.forEach(item => {
                      if(item.b_source == 0) {
                          item.b_source = 'PC端'
                      }else {
                          item.b_source = '移动端'
                      }
                  })
                  this.tableData = res.body.content.records;
                  this.total = res.body.content.total;
                  this.loading = false;

                  this.ShowPageination = true
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
      getSubPermission() {
          this.$http.get(`${api.dev}/p/permission/getSub`,{params: {access_token : getToken(), p_id : this.$route.params.id}}).then(res => {
              if(res.body.code == 200) {
                res.body.content.forEach(item => {
                    if(item.p_name.indexOf('显示') > -1) {
                        this.permissionShow = true;
                    }else if(item.p_name.indexOf('新建') > -1) {
                        this.permissionAdd = true
                    }else if(item.p_name.indexOf('修改') > -1) {
                        this.permissionEdit = true
                    }else if(item.p_name.indexOf('删除') > -1) {
                        this.permissionDelete = true
                    }else if(item.p_name.indexOf('查看') > -1) {
                        this.permissionDetail = true
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
      showImg(url) {
          this.dialogVisible = true;
          this.dialogImageUrl = `${api.address}${url}`
      },
      closeDialog(){
          this.dialogImageUrl = '';
      },
      // 分页
      handleCurrentChange(val) {
        this.loading = true;
        this.start = this.limit * (val - 1);
        this.getInfo();
      },
      handleSearch() {
          this.loading = true;
          this.start = 0;
          this.ShowPageination = false;
          this.getInfo();
        //   this.$nextTick(function () {
        //       console.log('dsds')
        //   })
      },
      handleDelete(row) {
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.loading = true;
              this.$http.post(`${api.dev}/p/main/banner/delete`,{access_token: getToken(), b_id : row.b_id},{emulateJSON:true}).then(res => {
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
  },
  created() {
    //   this.getInfo()
      this.getLimit()
      this.getSubPermission()
  },
  watch : {
      $route : {
          handler : function (val,oldval) {
              if(val.name == 'advertisement') {
                  this.getInfo()
              }
          }
      }
  }
}
</script>

<style lang="stylus" scoped>
.showImg:hover
    cursor  zoom-in
</style>
