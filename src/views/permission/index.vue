<template>
    <div>
      <el-button type="primary" @click="dialogTableVisible = true" class="add-manager"><i class="el-icon-edit"></i> 新增管理员</el-button>
      <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="新增管理员">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="手机号码">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancleAddManager">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'admin_id'}"
        >
        <el-table-column
          prop="admin_id"
          label="管理员ID"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          prop="admin_phone"
          label="管理员手机号码">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i> 删除</el-button>
          </template>
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
import elDragDialog from '@/directive/el-dragDialog'; 
import $ from 'jquery';
import api from '@/api/api.js';
export default {
  name: 'DragDialogDemo',
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false,
      form : {
        phone : ''
      },
      tableData: [],
      total : 0,
      start : 0,
      limit : 10,
      loading : true
    }
  },
  created() {
    this.getInfo();
  },
  methods : {
    onSubmit() {
      this.$http.post(`${api.dev}/admin/buildAdmin`,{phone: Number(this.form.phone)},{emulateJSON:true}).then(res => {
          if(res.body.code == 500) {
            this.$notify.error({
              title: '错误',
              message: res.body.msg,
              duration : 1000
            });
            this.form.phone = "";
          }else {
            this.$notify({
              title: '成功',
              message: res.body.msg,
              type: 'success',
              duration : 1000
            });
            this.form.phone = "";
            this.dialogTableVisible = false;
            this.getInfo();
          }
      })
    },
    cancleAddManager() {
      this.dialogTableVisible = false;
    },
    getInfo() {
      this.$http.get(`${api.dev}/admin/selectAdmin`,{params : {start:this.start,limit:this.limit}}).then(res => {
        // console.log(res.body.content);

        this.tableData = res.body.content.records;

        var total = res.body.content.total;
        this.total = total;
        // console.log(this.tableData);

        this.loading = false;
      })
    },
    handleCurrentChange(val) {
      this.start = 10 * (val - 1);
      this.getInfo();
    },
    handleDelete(index,row) {
      // console.log(index,row);

      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(`${api.dev}/admin/deleteAdmin`,{admin_id:row.admin_id},{emulateJSON:true}).then(res => {
          console.log(res);
          if(res.body.code == 500) {
            this.$message.error(res.body.msg);
          }else {
            this.$message({
              message: res.body.msg,
              type: 'success'
            });
            this.getInfo();
          }
        })
      }).catch(() => {
        console.log('已取消删除')        
      });

    }
  }
}
</script>

<style scoped>
.add-manager {
  margin-bottom: 10px;
}
.pagination {
  margin-top: 10px;
}
</style>

