<template>
  <div>
      <h3 style="color:#c9c9c9;margin:5px 0;font-size:16px;">{{BName}} > 文章管理</h3>
      <router-link :to="'/scenicarea/venue/article/articlemanage/'+ pId + '/' + bId + '/add/addarticle'">
        <el-button v-if="permissionAdd" type="primary" class="AddVillageBtn"><i class="el-icon-edit"></i> 新增</el-button>
      </router-link>

      <el-table
      v-if="permissionShow"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      border
      stripe
      :data="tableData"
      style="width: 100%;margin-top:10px"
      height="calc(100% - 140px)">
        <el-table-column
          prop="va_title"
          label="标题"
          sortable
          min-width="160"
          align="center">
       </el-table-column>
       <el-table-column
          prop="va_date"
          label="创建时间"
          sortable
          min-width="160"
          align="center">
       </el-table-column>
       <el-table-column
        label="操作"
        align="center"
        width="250">
        <template slot-scope="scope">
            <router-link :to="'/scenicarea/venue/article/articlemanage/'+ pId + '/' + bId + '/detail/' + scope.row.va_id">
                <el-button v-if="permissionDetail" type="text" size="small">查看</el-button>
            </router-link>
            <router-link :to="'/scenicarea/venue/article/articlemanage/'+ pId + '/' + bId + '/edit/' + scope.row.va_id">
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
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

import {formatDate} from '@/filter/date.js';

export default {
  name: 'articlemanagevenue',
  data() {
      return {
          permissionShow : false,
          permissionAdd : false,
          permissionEdit : false,
          permissionDetail : false,
          permissionDelete : false,


          loading : true,
          total : 0,
          start : 0, 
          limit : 10,
          tableData : [],

          pId : this.$route.params.id,
          bId : this.$route.params.bid,

          BName : this.$route.params.bname
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
          this.$http.get(`${api.dev}/p/main/venueArticle/show`,{params:{access_token:getToken(),id1:this.$route.params.bid,start:this.start,limit:this.limit}}).then(res => {
              if(res.body.code == 200) {
                    res.body.content.records.forEach(item => {
                        item.va_date = formatDate(new Date(item.va_date) , 'yyyy-MM-dd hh:mm:ss');
                    })
                    this.tableData = res.body.content.records;
                    this.total = res.body.content.total;
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
      handleDelete(row) {
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.loading = true;
              this.$http.post(`${api.dev}/p/main/venueArticle/delete`,{access_token : getToken(), va_id: row.va_id},{emulateJSON:true}).then(res => {
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
      // 分页
      handleCurrentChange(val) {
        this.loading = true;
        this.start = 10 * (val - 1);
        this.getInfo();
      },
  },
  created() {
      this.getSubPermission();
      this.getInfo();
  }
}
</script>

<style lang="stylus" scoped>
#pagination
  margin-top 10px
</style>
