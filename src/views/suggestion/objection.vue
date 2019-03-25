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
          prop="s_id"
          label="序号"
          sortable
          align="center"
          flex="1">
       </el-table-column>
       <el-table-column
          prop="s_status"
          label="状态"
          sortable
          align="center"
          flex="1">
       </el-table-column>
       <el-table-column
          prop="s_title"
          label="标题"
          sortable
          align="center"
          flex="1">
       </el-table-column>
       <el-table-column
          prop="s_reply"
          label="回复"
          sortable
          align="center"
          flex="1">
       </el-table-column>
       <el-table-column
          prop="s_topic"
          label="专题ID"
          sortable
          align="center"
          flex="1">
       </el-table-column>
       <el-table-column
          prop="s_content"
          label="内容"
          sortable
          align="center"
          flex="1">
       </el-table-column>
       <el-table-column
          fixed="right"
          label="操作"
          align="center"
          flex="1">
          <template slot-scope="scope">
              <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
       </el-table-column>  
    </el-table>

    <!-- 查看详情的模态框 -->
    <el-dialog
      v-elDragDialog
      :visible.sync="DetailDialogTableVisible"
      title="意见管理详情" 
      :close-on-click-modal="false">
      <!-- 表单 -->
      <el-form ref="DetailForm" :model="DetailForm" label-width="80px" style="width:100%;">
        <el-form-item label="序号">
          <el-input v-model="DetailForm.s_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="DetailForm.s_status" disabled label="0">未解决</el-radio>
          <el-radio v-model="DetailForm.s_status" disabled label="1">已解决</el-radio>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="DetailForm.s_title" disabled></el-input>
        </el-form-item>
        <el-form-item label="回复">
          <el-input v-model="DetailForm.s_reply" disabled></el-input>
        </el-form-item>
        <el-form-item label="专题ID">
          <el-input v-model="DetailForm.s_topic" disabled></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="DetailForm.s_content" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 查看编辑的模态框 -->
    <el-dialog
      v-elDragDialog
      :visible.sync="EditDialogTableVisible"
      title="意见管理编辑" 
      @closed="EditDialogClosed('EditForm')"
      :close-on-click-modal="false">
      <!-- 表单 -->
      <el-form ref="EditForm" :model="EditForm" label-width="80px" :rules="EditRules" style="width:100%;"> 
        <el-form-item label="序号" prop="s_id">
          <el-input v-model="EditForm.s_id"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="s_status">
          <el-radio v-model="EditForm.s_status" label="0">未解决</el-radio>
          <el-radio v-model="EditForm.s_status" label="1">已解决</el-radio>
        </el-form-item>
        <el-form-item label="标题" prop="s_title">
          <el-input v-model="EditForm.s_title"></el-input>
        </el-form-item>
        <el-form-item label="回复" prop="s_reply">
          <el-input v-model="EditForm.s_reply"></el-input>
        </el-form-item>
        <el-form-item label="专题ID" prop="s_topic">
          <el-input v-model="EditForm.s_topic"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="s_content">
          <el-input v-model="EditForm.s_content"></el-input>
        </el-form-item>
        <el-form-item>
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
// 引用拖拽
import elDragDialog from '@/directive/el-dragDialog';

export default {
  name: 'objection',
  directives : {elDragDialog} ,
  data() {
      return {
          loading : true, //加载条
          tableData : [],
          total: 0, // 分页总条数
          start: 0, // 默认第一页
          limit: 10,  // 每页10条

          // 查看详情的数据
          DetailDialogTableVisible : false, // 详情框默认的模态框
          DetailForm : {
            s_id : '',
            s_status : '',
            s_title : '',
            s_reply : '',
            s_topic : '',
            s_content : ''
          },

          // 编辑的数据
          EditDialogTableVisible : false, // 编辑框默认的模态框
          EditForm : {
            s_id : '',
            s_status : '',
            s_title : '',
            s_reply : '',
            s_topic : '',
            s_content : ''
          },
          EditRules : {
            s_id : [{required: true,message : '请输入序号', trigger: 'blur'}],
            s_status : [{required: true,message : '请选择状态', trigger: 'blur'}],
            s_title : [{required: true,message : '请输入标题', trigger: 'blur'}],
            s_reply : [{required: true,message : '请输入回复', trigger: 'blur'}],
            s_topic : [{required: true,message : '请输入专题ID', trigger: 'blur'}],
            s_content : [{required: true,message : '请输入内容', trigger: 'blur'}],
          }
      }
  },
  methods : {
    getInfo() {
      this.$http.get(`${api.dev}/p/main/suggestion/show`,{params:{access_token : getToken() , start : this.start, limit : this.limit}}).then(res => {
        if(res.body.code == 200) {
          res.body.content.records.forEach( i => {
            if(i.s_status == 0) {
              i.s_status = '未解决'
            }else if(i.s_status == 1) {
              i.s_status = '已解决'
            }
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
    // 处理详情操作
    handleDetail(row) {
          // 开启加载器
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$http.get(`${api.dev}/p/main/suggestion/select`,{params : {access_token : getToken(), s_id : row.s_id}}).then(res => {
            if(res.body.code == 200) {
              loading.close();
              this.DetailDialogTableVisible = true;

              this.DetailForm.s_id = res.body.content.s_id;
              this.DetailForm.s_status = (res.body.content.s_status).toString();
              this.DetailForm.s_title = res.body.content.s_title;
              this.DetailForm.s_reply = res.body.content.s_reply;
              this.DetailForm.s_topic = res.body.content.s_topic;
              this.DetailForm.s_content = res.body.content.s_content;
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
    // 处理编辑操作
    handleEdit(row) {
            // 开启加载器
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.get(`${api.dev}/p/main/suggestion/select`,{params : {access_token : getToken(), s_id : row.s_id}}).then(res => {
              if(res.body.code == 200) {
                loading.close();
                this.EditDialogTableVisible = true;

                this.EditForm.s_id = res.body.content.s_id;
                this.EditForm.s_status = (res.body.content.s_status).toString();
                this.EditForm.s_title = res.body.content.s_title;
                this.EditForm.s_reply = res.body.content.s_reply;
                this.EditForm.s_topic = res.body.content.s_topic;
                this.EditForm.s_content = res.body.content.s_content;
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
    // 处理删除操作
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.loading = true;
        this.$http.post(`${api.dev}/p/main/suggestion/delete`,{access_token : getToken(), s_id : row.s_id},{emulateJSON : true}).then(res => {
          if(res.body.code == 200) {
            this.$message({
                message: '删除成功',
                type: 'success'
            });
            this.getInfo();
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
      })
    },
    // 提交编辑
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
                    formdata.append('s_id',this.EditForm.s_id);
                    formdata.append('s_status',this.EditForm.s_status);
                    formdata.append('s_title',this.EditForm.s_title);
                    formdata.append('s_reply',this.EditForm.s_reply);
                    formdata.append('s_topic',this.EditForm.s_topic);
                    formdata.append('s_content',this.EditForm.s_content);
                    this.$http.post(`${api.dev}/p/main/suggestion/update`,formdata,{emulateJSON: true}).then(res => {
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
                        loading.close();
                        this.$message({
                            message : res.body.msg,
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
    // 取消编辑操作
      cancleEditForm(formName) {
            this.EditDialogTableVisible = false;
            this.$refs[formName].clearValidate(); // 清除表单验证规则
      },
      // 关闭编辑框
      EditDialogClosed(formName) {
        this.$refs[formName].clearValidate(); // 清除表单验证规则
      },
  },
  created() {
    this.getInfo();
  }
}
</script>

<style lang="stylus" scoped>

</style>
