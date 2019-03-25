<template>
	<div class="notice">
		<el-button v-if="permissionAdd" type="primary" @click="AddDialogTableVisible = true" class="AddVillageBtn margin-bottom-10"><i class="el-icon-edit"></i> 新增</el-button>
		<div class="margin-bottom-10" style="float: right;">
			<el-input v-model="searchName" placeholder="请输入消息推送标题搜索" style="width:200px" @keyup.enter.native="getInfo('search')"></el-input>
			<el-button slot="append" icon="el-icon-search" type="primary" @keyup.enter="getInfo('search')" @click="getInfo('search')" style="margin-left:10px;">搜索</el-button>
		</div>
		<el-table
			v-if="permissionShow"
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.8)"
			:data="tableData"
			border
			style="width: 100%"
			height="calc(100% - 100px)">
			<el-table-column prop="ml_id" label="序号" sortable align="center"  min-width="90"></el-table-column>
			<el-table-column prop="ml_title" label="标题" sortable align="center" min-width="200"></el-table-column>
			<el-table-column prop="username" label="发布人" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="ml_createtime" label="发布日期" sortable align="center" min-width="200"></el-table-column>
			<el-table-column
				label="操作"
				align="center"
				min-width="180"
				v-if="permissionDetail || permissionEdit || permissionDelete">
				<template slot-scope="scope">
					<el-button v-if="permissionDetail" @click="handleDetail(scope.row)" type="text" size="small" style="margin-left:10px">查看</el-button>
					<el-button v-if="permissionEdit" @click="handleEdit(scope.row)" type="text" size="small" style="margin-left:10px">编辑</el-button>
					<el-button v-if="permissionDelete" @click="handleDelete(scope.row)" type="text" size="small" style="margin-left:10px">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<div id="pagination">
			<el-pagination
				background
				layout="prev, pager, next"
				:total="total"
				:page-size="limit"
				@current-change="handleCurrentChange">
			</el-pagination>
		</div>

		<!-- 查看模态框 -->
		<el-dialog 
			:visible.sync="DetailDialogTableVisible"
			title="查看通知详情"
			class="detailDialog"
			top="40px"
			width="760px"
			@closed="cancleDetailForm('DetailForm')"
			:close-on-click-modal="false">
			<el-form ref="DetailForm" :model="DetailForm" label-width="120px" style="width:100%;">
				<el-form-item label="标题" prop="ml_title">
					<el-input v-model="DetailForm.ml_title" readonly></el-input>
				</el-form-item>
				<el-form-item label="发布人" prop="username">
					<el-input v-model="DetailForm.username" style="width: 260px;" readonly></el-input>
				</el-form-item>
				<el-form-item label="发布日期" prop="ml_createtime">
					<el-date-picker type="datetime" v-model="DetailForm.ml_createtime" style="width: 260px;" readonly></el-date-picker>
				</el-form-item>
				<el-form-item label="消息推送内容" prop="ml_content">
					<el-input type="textarea" v-model="DetailForm.ml_content" placeholder="请输入消息推送内容" readonly rows="5"></el-input>
				</el-form-item>
				<el-form-item label="阅读记录" prop="readlogList">
					<el-table
						v-loading="loading"
						element-loading-text="拼命加载中"
						element-loading-spinner="el-icon-loading"
						element-loading-background="rgba(0, 0, 0, 0.8)"
						:data="DetailForm.readlogList"
						border
						style="width: 100%"
						height="300">
						<el-table-column prop="mr_id" label="序号" sortable align="center"  min-width="90"></el-table-column>
						<el-table-column prop="user_phone" label="手机号码" sortable align="center"  min-width="180"></el-table-column>
						<el-table-column prop="mr_readtime" label="阅读时间" sortable align="center" min-width="200"></el-table-column>
					</el-table>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 新建模态框 -->
		<el-dialog 
			:visible.sync="AddDialogTableVisible"
			title="新建通知" 
			top="8%"
			width="760px"
			@closed="cancleAddForm('AddForm')"
			:close-on-click-modal="false">
			<!-- 表单 -->
			<el-form ref="AddForm" :model="AddForm" label-width="120px" :rules="AddRules" style="width:100%;">
				<el-form-item label="标题" prop="ml_title">
					<el-input v-model="AddForm.ml_title" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item label="通知内容" prop="ml_content">
					<el-input type="textarea" v-model="AddForm.ml_content" placeholder="请输入通知内容" rows="10"></el-input>
				</el-form-item>
				<el-form-item class="text-align-right">
					<el-button type="primary" @click="submitAddForm('AddForm')">提交</el-button>
					<el-button @click="cancleAddForm('AddForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 编辑模态框 -->
		<el-dialog 
			:visible.sync="EditDialogTableVisible"
			title="修改通知" 
			top="8%"
			width="760px"
			@closed="cancleEditForm('EditForm')"
			:close-on-click-modal="false">
			<el-form ref="EditForm" :model="EditForm" label-width="120px" :rules="EditRules" style="width:100%;">
				<el-form-item label="标题" prop="ml_title">
					<el-input v-model="EditForm.ml_title" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item label="通知内容" prop="ml_content">
					<el-input type="textarea" v-model="EditForm.ml_content" placeholder="请输入通知内容" rows="10"></el-input>
				</el-form-item>
				<el-form-item class="text-align-right">
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
// 时间过滤器
import {formatDate} from '@/filter/date.js'

export default {
	name: 'messageMGT',
	data() {
		return {
			/* 
			 * tableData: 表格数据
			 * loading: 加载状态（默认为true）
			 * total: 总条数（table数据总长度）
			 * start: 表格分页（默认第一页）
			 * limit: 每页显示条数
			 * searchName: 搜索（通知标题）
			 */
			tableData : [],
			loading : true,
			total: 0,
			start : 0,
			limit : 10,
			searchName: '',
			searchTargetList: [],

			/* 新增部分 */
			AddDialogTableVisible : false, //默认隐藏
			AddForm : {
				ml_title : '',
				ml_content : '',
			},
			AddRules : {
				ml_title : [{required: true, message : '请输入标题', trigger: 'blur'}],
				ml_content : [{required: true, message : '请输入通知内容', trigger: 'blur'}],
			},

			/* 编辑部分 */
			EditDialogTableVisible : false, //默认隐藏
			EditForm : {
				ml_id : '',
				ml_title : '',
				ml_content : '',
			},
			EditRules : {
				ml_title : [{required: true, message : '请输入标题', trigger: 'blur'}],
				ml_content : [{required: true, message : '请输入通知内容', trigger: 'blur'}],
			},

			/* 编辑部分 */
			DetailDialogTableVisible : false, //默认隐藏
			DetailForm : {
				ml_id : '',
				ml_title : '',
				ml_content : '',
				readlogList: []
			},

			permissionShow: false, // 默认为false,根据权限是否显示
			permissionEdit: false, // 默认为false,根据权限是否修改
			permissionAdd: false, // 默认为false,根据权限是否新建
			permissionDelete: false, // 默认为false,根据权限是否删除
			permissionDetail: false, // 默认为false,根据权限是否查看
		}
	},
	methods : {
		/* 获取权限 */
		getSubPermission() {
			this.$http.get(
				`${api.dev}/p/permission/getSub`,
				{
					params:{
						access_token:getToken(),
						p_id: this.$route.params.id
					}
				}
			).then(res => {
				if(res.body.code == 200) {
					res.body.content.forEach(item => {
						if(item.p_name.indexOf('显示') > -1) {
							this.permissionShow = true;
						}else if(item.p_name.indexOf('修改') > -1) {
							this.permissionEdit = true;
						}else if(item.p_name.indexOf('新建') > -1) {
							this.permissionAdd = true;
						}else if(item.p_name.indexOf('删除') > -1) {
							this.permissionDelete = true;
						}else if(item.p_name.indexOf('详情') > -1) {
							this.permissionDetail = true;
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
						this.$router.push({path: '/login'})
					},2000)
				}
			})
		},
		/* 表格数据加载 */
		getInfo(searchName){
			var searchVal = (searchName == 'search') ? this.searchName : '';
			this.$http.post(
				`${api.dev}/p/main/message/show`,
				{
					access_token: getToken(),
					start: this.start,
					limit: this.limit,
					name1: searchVal
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					res.body.content.records.forEach(i => {
						i.ml_createtime = formatDate(new Date(i.ml_createtime) , 'yyyy-MM-dd hh:mm:ss');
					});
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
						this.$router.push({path: '/login'})
					},2000)
				}
			})
		},
		/* 通知详情加载 */
		handleDetail(row) {
			this.$http.post(
				`${api.dev}/p/main/message/select`,
				{
					access_token: getToken(),
					ml_id: row.ml_id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					var data = res.body.content;
						data.ml_createtime = formatDate(new Date(data.ml_createtime) , 'yyyy-MM-dd hh:mm:ss');
					data.readlogList.forEach(i => {
						i.mr_readtime = formatDate(new Date(i.mr_readtime) , 'yyyy-MM-dd hh:mm:ss');
					});
					this.DetailForm = data;
					this.DetailDialogTableVisible = true;
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
						this.$router.push({path: '/login'})
					},2000)
				}
			})
		},
		/* 通知修改加载 */
		handleEdit(row) {
			this.$http.post(
				`${api.dev}/p/main/message/select`,
				{
					access_token: getToken(),
					ml_id: row.ml_id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					var data = res.body.content;
						//data.nl_releasedate = formatDate(new Date(data.nl_releasedate) , 'yyyy-MM-dd hh:mm:ss');
					//console.log(data.nl_target)
					this.EditForm = data;
					this.EditDialogTableVisible = true;
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
						this.$router.push({path: '/login'})
					},2000)
				}
			})
		},
		/* 删除 */
		handleDelete(row) {
			var prompt = '您确认删除【 ' + row.ml_title + ' 】？';
			this.$confirm(prompt, '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				this.$http.post(
					`${api.dev}/p/main/message/delete`,
					{
						access_token : getToken() ,
						ml_id : row.ml_id
					},
					{emulateJSON : true}
				).then(res => {
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
						this.loading = false;
					}else if(res.body.code == 510) {
						this.$message({
							message: res.body.msg,
							type: 'error'
						});
						removeToken();
						setTimeout(function () {
							this.$router.push({path: '/login'})
						},2000)
					}
				})
			})
		},
		/* 新增提交 */
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
					var arr = new Array();
					formdata.append('access_token',getToken());
					formdata.append('ml_title',this.AddForm.ml_title);
					formdata.append('ml_content',this.AddForm.ml_content);
					this.$http.post(`${api.dev}/p/main/message/save`,formdata, {emulateJSON:true}).then(res => {
						loading.close();
						if(res.body.code == 200) {
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
								type: 'error'
							});
						}else if(res.body.code == 510) {
							this.$message({
								message: res.body.msg,
								type: 'error'
							});
							removeToken();
							setTimeout(function () {
								this.$router.push({path: '/login'})
							},2000)
						}
					})
				}
			})
		},
		/* 编辑提交 */
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
					formdata.append('ml_id',this.EditForm.ml_id);
					formdata.append('access_token',getToken());
					formdata.append('ml_title',this.EditForm.ml_title);
					formdata.append('ml_content',this.EditForm.ml_content);

					this.$http.post(
						`${api.dev}/p/main/message/update`,
						formdata,
						{emulateJSON:true}
					).then(res => {
						loading.close();
						if(res.body.code == 200) {
							this.cancleEditForm(formName)
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
							this.loading = false;
						}else if(res.body.code == 510) {
							this.$message({
								message: res.body.msg,
								type: 'error'
							});
							removeToken();
							setTimeout(function () {
								this.$router.push({path: '/login'})
							},2000)
						}
					})
			  }else {
				  console.log('error submit');
				  return false;
			  }
		  })
		},
		/* 取消查看 */
		cancleDetailForm(formName) {
			this.DetailDialogTableVisible = false;
		},
		/* 取消新增 */
		cancleAddForm(formName) {
			this.AddDialogTableVisible = false;
			this.$refs[formName].resetFields(); // 清除表单验证规则
		},
		/* 取消编辑 */
		cancleEditForm(formName) {
			this.EditDialogTableVisible = false;
			this.$refs[formName].clearValidate(); // 清除表单验证规则
		},
		/* 分页 */
		handleCurrentChange(val) {
			this.loading = true;
			this.start = 10 * (val - 1);
			this.getInfo();
		}
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
.margin-bottom-10
	margin-bottom 10px
.padding-right-12
	padding-right 12px

</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #41B883;
  }
  .avatar-uploader.disabled .el-upload{
  	border-color: #d9d9d9!important;
	cursor: not-allowed!important;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .detailDialog .el-table--medium th{
  	padding: 6px 0;
  }
</style>
<style>
	.notice .el-table .cell{
		white-space: nowrap!important
	}

</style>
