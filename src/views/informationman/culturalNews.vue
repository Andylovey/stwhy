<template>
  <div>
    <router-link :to="'/informationman/culturalNews/culturalNewsadd/add'">
      <el-button type="primary" v-if="permissionAdd" class="AddVillageBtn"><i class="el-icon-edit"></i> 新增</el-button>
    </router-link>
    <el-table
      v-if="permissionShow"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      stripe
      border
      :data="tableData"
      style="width: 100%"
      height="500"
      header-row-style="height:40px"
      row-style="height:40px">
        <el-table-column
          prop="cn_createtime"
          label="发布时间"
          sortable
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="cn_title"
          label="标题"
          sortable
          align="center"
          show-overflow-tooltip>
       </el-table-column>
        <el-table-column
          prop="cn_source"
          label="来源"
          sortable
          align="center"
          show-overflow-tooltip>
       </el-table-column>
       <el-table-column
          prop="cn_organization"
          label="发布组织"
          sortable
          align="center"
          show-overflow-tooltip>
       </el-table-column>
       <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
            <!-- <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button> -->
            <!-- <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button> -->
            <router-link :to="'/informationman/culturalNews/culturalNewsdetail/'+scope.row.cn_id">
                <el-button v-if="permissionDetail" type="text" size="small">查看</el-button>
            </router-link>
            <router-link :to="'/informationman/culturalNews/culturalNewsedit/'+scope.row.cn_id">
                <el-button v-if="permissionEdit" type="text" size="small" style="margin-left:10px">编辑</el-button>
            </router-link>
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

    <!-- 查看详情的模态框 -->
    <el-dialog
      :visible.sync="DetailDialogTableVisible"
      v-elDragDialog
      title="文化要闻详情" 
      :close-on-click-modal="false">
      <!-- 表单 -->
      <el-form ref="DetailForm" :model="DetailForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="DetailForm.cn_title" readonly></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="DetailForm.cn_source" readonly></el-input>
        </el-form-item>
        <el-form-item label="发布组织">
          <el-input v-model="DetailForm.cn_organization" readonly></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <!-- <el-input v-model="DetailForm.cn_createtime" readonly></el-input> -->
          <el-date-picker
            v-model="DetailForm.cn_createtime"
            type="date"
            value-format="timestamp"
            readonly>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input v-model="DetailForm.cn_content" readonly></el-input> -->
          <div v-html="DetailForm.cn_content" style="height:200px;overflow-y:scroll"></div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑的模态框 -->
    <el-dialog
      :visible.sync="EditDialogTableVisible"
      v-elDragDialog
      title="文化要闻编辑" 
      :close-on-click-modal="false"
      top="50px">
      <!-- 表单 -->
      <el-form ref="EditForm" :model="EditForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="EditForm.cn_title"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="EditForm.cn_source"></el-input>
        </el-form-item>
        <el-form-item label="发布组织">
          <el-input v-model="EditForm.cn_organization"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="EditForm.cn_createtime"
            value-format="timestamp"
            type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <div v-html="EditForm.cn_content" style="height:200px;overflow-y:scroll"></div> -->
          <quill-editor ref="EditTextEditor"
              :content="EditForm.cn_content"
              :options = "EditEditorOption"
              @change="onEditEditorChange($event)">
					</quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm('EditForm')">提交</el-button>
          <el-button @click="cancleEditForm('EditForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 新建的模态框 -->
    <el-dialog 
      :visible.sync="AddDialogTableVisible"
      v-elDragDialog
      title="新建文化要闻"
      @closed="AddDialogClosed('AddForm')"
      top="50px"
      :close-on-click-modal="false">
      <!-- 表单 -->
      <el-form ref="AddForm" :model="AddForm" label-width="80px" :rules="AddRules">
          <el-form-item label="序号" prop="cn_id">
            <el-input v-model="AddForm.cn_id"></el-input>
          </el-form-item>
          <el-form-item label="标题" prop="cn_title">
            <el-input v-model="AddForm.cn_title"></el-input>
          </el-form-item>
          <el-form-item label="来源" prop="cn_source">
            <el-input v-model="AddForm.cn_source"></el-input>
          </el-form-item>
          <el-form-item label="发布组织" prop="cn_organization">
            <el-input v-model="AddForm.cn_organization"></el-input>
          </el-form-item>
          <el-form-item label="发布时间" prop="cn_createtime">
            <el-date-picker
              v-model="AddForm.cn_createtime"
              value-format="timestamp"
              type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="内容" prop="cn_content">
            <!-- <div v-html="AddForm.cn_content" style="height:200px;overflow-y:scroll"></div> -->
            <quill-editor ref="AddTextEditor"
              :content="AddForm.cn_content"
              :options = "AddEditorOption"
              @change="onAddEditorChange($event)">
						</quill-editor>
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
// 时间过滤器
import {formatDate} from '@/filter/date.js';
// 引用拖拽
import elDragDialog from '@/directive/el-dragDialog';
// 引入富文本框插件
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'culturalNews',
  directives: {elDragDialog},
  components : {
    quillEditor
  },
  data() {
      return {
          loading : true, // 加载条
          tableData : [],
          total : 0 , // 总条数
          start : 0, // 默认第一页
          limit : 10, // 每页10条

          // 查看详情的数据
          DetailDialogTableVisible : false, // 详情框默认的模态框
          DetailForm : {
              cn_title : '',
              cn_source : '',
              cn_organization : '',
              cn_createtime : '',
              cn_content : ''
          },

          // 编辑的数据
          EditDialogTableVisible : false, // 编辑框默认的模态框
          EditForm : {
              cn_title : '',
              cn_source : '',
              cn_organization : '',
              cn_createtime : '',
              cn_content : '',
              cn_id : ''
          },
          // 编辑富文本编辑框
          EditEditorOption : {
          theme: 'snow',
          boundary: document.body, 
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          },
          placeholder: 'Insert text here ...',
          readOnly: false
        },

          // 新建的数据
          AddDialogTableVisible : false,
          AddForm : {
              cn_title : '',
              cn_source : '',
              cn_organization : '',
              cn_createtime : '',
              cn_content : '',
              cn_id : ''
          },
          AddRules : {
            cn_title : [{required: true,message : '请输入标题', trigger: 'blur'}]
          },
          // 新建富文本编辑框
          AddEditorOption : {
          theme: 'snow',
          boundary: document.body, 
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          },
          placeholder: 'Insert text here ...',
          readOnly: false
        },

        // 权限按钮控制
        permissionShow : false,
        permissionAdd : false,
        permissionEdit : false,
        permissionDetail : false,
      }
  },
  methods : {
    getSubPermission() {
          this.$http.get(`${api.dev}/p/permission/getSub`,{params: {access_token : getToken(), p_id : this.$route.params.id}}).then(res => {
              if(res.body.code == 200) {
                res.body.content.forEach(item => {
                    if(item.p_name.indexOf('显示') > -1) {
                        this.permissionShow = true;
                    }else if(item.p_name.indexOf('新增') > -1) {
                        this.permissionAdd = true
                    }else if(item.p_name.indexOf('修改') > -1) {
                        this.permissionEdit = true
                    }else if(item.p_name.indexOf('查询') > -1) {
                        this.permissionDetail = true
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
      getInfo() {
          this.$http.post(`${api.dev}/p/main/culturalNews/show`,{access_token:getToken(),start: this.start,limit : this.limit},{emulateJSON: true}).then(res => {
              if(res.body.code == 200) {
                  res.body.content.records.forEach(item => {
                      item.cn_createtime = formatDate(new Date(item.cn_createtime) , 'yyyy-MM-dd');
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
      // 处理详情
      handleDetail(row) {
            // 开启加载器
            const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.post(`${api.dev}/p/main/culturalNews/select`,{access_token:getToken(),cn_id:row.cn_id},{emulateJSON: true}).then(res => {
                if(res.body.code == 200) {
                    loading.close();
                    this.DetailDialogTableVisible = true;

                    this.DetailForm.cn_title = res.body.content.cn_title;
                    this.DetailForm.cn_source = res.body.content.cn_source;
                    this.DetailForm.cn_organization = res.body.content.cn_organization;
                    this.DetailForm.cn_createtime = res.body.content.cn_createtime;
                    this.DetailForm.cn_content = res.body.content.cn_content;
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
      // 处理编辑
      handleEdit(row) {
          // 开启加载器
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.post(`${api.dev}/p/main/culturalNews/select`,{access_token:getToken(),cn_id: row.cn_id},{emulateJSON: true}).then(res => {
                if(res.body.code == 200) {
                    loading.close();
                    this.EditDialogTableVisible = true;

                    this.EditForm.cn_title = res.body.content.cn_title;
                    this.EditForm.cn_source = res.body.content.cn_source;
                    this.EditForm.cn_organization = res.body.content.cn_organization;
                    this.EditForm.cn_createtime = res.body.content.cn_createtime;
                    this.EditForm.cn_content = res.body.content.cn_content;
                    this.EditForm.cn_id = res.body.content.cn_id;
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
      //富文本编辑器  文本改变时 设置字段值
        onEditEditorChange({ editor, html, text }) {
	        this.EditForm.cn_content = html;
        },
      // 提交编辑
      submitEditForm(formName) {
            // 开启加载器
            const loading = this.$loading({
                lock: true,
                text: '正在保存中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            var formdata = new FormData();
            formdata.append('access_token',getToken());
            formdata.append('cn_id',this.EditForm.cn_id);
            formdata.append('cn_title',this.EditForm.cn_title);
            formdata.append('cn_source',this.EditForm.cn_source);
            formdata.append('cn_organization',this.EditForm.cn_organization);
            formdata.append('cn_content',this.EditForm.cn_content);
            formdata.append('cn_createtime',new Date(this.EditForm.cn_createtime).toString());
            this.$http.post(`${api.dev}/p/main/culturalNews/update`,formdata,{emulateJSON:true}).then(res => {
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
                    this.$message({
                        message: res.body.msg,
                        type: 'error'
                    });
                }
            })
      },
      // 取消编辑框
        cancleEditForm(formName) {
          this.EditDialogTableVisible = false;
        },
        //富文本编辑器  文本改变时 设置字段值
        onAddEditorChange({ editor, html, text }) {
	        this.AddForm.cn_content = html;
        },
        // 提交新建框
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
              formdata.append('cn_title',this.AddForm.cn_title);
              formdata.append('cn_id',this.AddForm.cn_id);
              formdata.append('cn_source',this.AddForm.cn_source);
              formdata.append('cn_organization',this.AddForm.cn_organization);
              formdata.append('cn_content',this.AddForm.cn_content);
              formdata.append('cn_createtime',new Date(this.AddForm.cn_createtime).toString());
              this.$http.post(`${api.dev}/p/main/culturalNews/save`,formdata,{emulateJSON:true}).then(res => {
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
                }else if(res.body.code == 500) {
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
        // 关闭新建框
        AddDialogClosed(formName) {
          this.$refs[formName].resetFields(); // 清除表单验证规则和重置表单 要有prop属性
        },
        // 取消新建框
        cancleAddForm(formName) {
          this.AddDialogTableVisible = false;
          this.$refs[formName].resetFields(); // 清除表单验证规则和重置表单 要有prop属性
        },
      // 分页
      handleCurrentChange(val) {
        this.loading = true;
        this.start = 10 * (val - 1);
        this.getInfo();
      }
  },
  created() {
      this.getInfo();
      this.getSubPermission();
  }
}
</script>

<style lang="stylus" scoped>
#pagination
  margin-top 10px
.AddVillageBtn 
  margin-bottom 10px
.ql-editor
  height 200px
</style>
