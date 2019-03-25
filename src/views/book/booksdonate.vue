<template>
  <div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      border
      :data="tableData"
      style="width: 100%"
      height="500">
        <el-table-column
          prop="dob_id"
          label="序号"
          sortable
          align="center">
       </el-table-column>
       <el-table-column
          prop="dob_sort"
          label="排序"
          sortable
          align="center">
       </el-table-column>
       <el-table-column
          property="dob_isshow"
          label="是否显示"
          sortable
          align="center">
            <template slot-scope="scope">
                <el-switch
                    on-text="是"
                    off-text="否"
                    active-color="#13ce66" 
                    inactive-color="#dcdfe6" 
                    active-value="100"
                    inactive-value="0"
                    v-model="scope.row.inf_isshow"
                    @click.native="changeShow(scope.$index,scope.row)">
                </el-switch>
            </template>
       </el-table-column>
       <el-table-column
          property="dob_istop"
          label="是否置顶"
          sortable
          align="center">
            <template slot-scope="scope">
                <el-switch
                    on-text="是"
                    off-text="否"
                    active-color="#13ce66" 
                    inactive-color="#dcdfe6" 
                    active-value="100"
                    inactive-value="0"
                    v-model="scope.row.inf_istop" 
                    @click.native="changeTop(scope.$index,scope.row)">
                </el-switch>
            </template>
       </el-table-column>
       <el-table-column
          prop="dob_createtime"
          label="创建日期"
          sortable
          align="center">
       </el-table-column>
       <el-table-column
          prop="dob_name"
          label="芳名"
          sortable
          align="center">
       </el-table-column>
       <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

export default {
  name: 'booksdonate',
  data() {
      return {
          loading : true, // 加载条
          tableData : [],
          total : 0 , // 总条数
          start : 0, // 默认第一页
          limit : 10, // 每页10条

          bookName : '' , // 搜索图书名称
          isShow : '' , // 搜索是否显示
          isTop : '' , // 搜索是否置顶
          selectDate : '' , // 搜索选择日期
      }
  },
  methods : {
      getInfo() {
          var formdata = new FormData();
          formdata.append('access_token',getToken());
          formdata.append('start',this.start);
          formdata.append('limit',this.limit);
          formdata.append('name1',this.bookName);
          formdata.append('id1',this.isShow);
          formdata.append('id2',this.isTop);
          formdata.append('date_start1',this.selectDate);
          this.$http.post(`${api.dev}/p/main/booksDonate/show`,formdata,{emulateJSON: true}).then(res => {
              if(res.body.code == 200) {
                // 先过滤
                res.body.content.records.forEach( item => {
                    if(item.inf_isshow == true) {
                        item.inf_isshow = '100'
                    }else {
                        item.inf_isshow = '0'
                    }

                    if(item.inf_istop == true) {
                        item.inf_istop = '100'
                    }else {
                        item.inf_istop = '0'
                    }
                    // 过滤时间
                    item.inf_createtime = formatDate(new Date(item.inf_createtime),'yyyy-MM-dd')
                })
                this.tableData = res.body.content.records;
                this.total = res.body.content.total;
                this.loading = false;
              }else if(res.body.code == 500) {
                this.$message({
                    message : res.body.msg,
                    type : 'error'
                })
                removeToken();
                setTimeout(function () {
                    window.location.href = '';
                },2000)
              }
          })
      },
  },
  created() {
      this.getInfo();
  }
}
</script>

<style lang="stylus" scoped>

</style>
