<template>
  <div>
     <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="tr_id"
        label="序号"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="tr_code"
        label="券号"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        prop="tl_name"
        label="票券名称"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        prop="user_nickname"
        align="center"
        sortable
        label="微信昵称">
      </el-table-column>
      <el-table-column
        prop="tr_time"
        align="center"
        sortable
        label="领票时间">
      </el-table-column> 
      <el-table-column
        prop="tr_status"
        align="center"
        label="验证状态">
      </el-table-column>  
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js';
import {formatDate} from '@/filter/date.js';
export default {
  data() {
      return {
        tableData: [],
        loading : true,
        total : 0,
        start : 0,
        limit : 10
      }
  },
  methods: {
      getInfo() {
        this.$http.get(`${api.dev}/admin/selectTicketRecord`,{params:{start:this.start,limit:this.limit}}).then(res => {
          this.tableData = res.body.content.records;
          this.loading = false;
          this.total = res.body.content.total;
          for(var i = 0 ; i < this.tableData.length ; i++) {
            if(this.tableData[i].tr_status == false) {
              this.tableData[i].tr_status = '未验证'
            }else {
              this.tableData[i].tr_status = '已验证'
            }
          }
          for(var j = 0 ; j < this.tableData.length ; j++) {
            this.tableData[j].tr_time = formatDate(new Date(this.tableData[j].tr_time) , 'yyyy-MM-dd hh:mm:ss')
          }
        })
       },
       handleCurrentChange(val) {
         this.start = 10 * (val - 1);
         this.getInfo();
       }
  },
  created() {
    this.getInfo()
  }
}
</script>

<style scoped>
  .pagination {
    margin-top: 10px;
  }
</style>