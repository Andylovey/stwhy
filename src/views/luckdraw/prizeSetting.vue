<template>
	<div>
		<el-button v-if="permissionAdd" type="primary" @click="AddDialogTableVisible = true" class="AddVillageBtn margin-bottom-10"><i class="el-icon-edit"></i> 新增</el-button>
		<div class="margin-bottom-10" style="float: right;">
			<el-select class="padding-right-12" v-model="searchID" slot="prepend" placeholder="请选择抽奖ID" style="width:200px" clearable >
				<template v-for="item in searchIdList">
					<el-option :label="item.dl_id" :value="item.dl_id"></el-option>
				</template>
			</el-select>
			<el-input v-model="searchName" placeholder="请输入奖品名称搜索" style="width:200px" @keyup.enter.native="getInfo('search')"></el-input>
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
			<el-table-column prop="pl_id" label="序号" sortable align="center"  min-width="90"></el-table-column>
			<el-table-column prop="pl_sort" label="排序（轮盘按顺时针排）" sortable align="center" min-width="190"></el-table-column>
			<el-table-column prop="pl_name" label="奖品名称" sortable align="center" min-width="180"></el-table-column>
			<el-table-column prop="pl_num" label="奖品数量（-1为无限制）" sortable align="center" min-width="190"></el-table-column>
			<el-table-column prop="pl_chance" label="中奖概率" sortable align="center" min-width="140"></el-table-column>
			<el-table-column prop="pl_isdrawText" label="是否是奖品" sortable align="center" min-width="180"></el-table-column>
			<el-table-column prop="pl_createtime" label="创建时间" sortable align="center" min-width="200"></el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				align="center"
				min-width="180"
				v-if="permissionEdit || permissionDelete">
				<template slot-scope="scope">
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

		<!-- 新建模态框 -->
		<el-dialog 
			:visible.sync="AddDialogTableVisible"
			title="新建奖品" 
			top="8%"
			width="480px"
			@closed="cancleAddForm('AddForm')"
			:close-on-click-modal="false">
			<!-- 表单 -->
			<el-form ref="AddForm" :model="AddForm" label-width="150px" :rules="AddRules" style="width:100%;">
				<el-form-item label="奖品名称" prop="pl_name">
					<el-input v-model="AddForm.pl_name" placeholder="请输入奖品名称" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="关联抽奖活动ID" prop="pl_dl_id">
					<el-select v-model="AddForm.pl_dl_id" placeholder="请输入关联抽奖活动ID" style="width: 200px;">
						<el-option v-for="item in searchIdList" :key="item.value" :label="item.dl_id" :value="item.dl_id" ></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序" prop="pl_sort">
					<el-input v-model.number="AddForm.pl_sort" placeholder="轮盘按顺时针排" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="奖品数量" prop="pl_num">
					<el-input v-model.number="AddForm.pl_num" placeholder="-1为无限制" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="中奖概率" prop="pl_chance">
					<el-input v-model.number="AddForm.pl_chance" placeholder="请输入中奖概率" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="是否是奖品" prop="pl_isdraw">
					<el-radio v-model="AddForm.pl_isdraw" label="1">是</el-radio>
					<el-radio v-model="AddForm.pl_isdraw" label="0">否</el-radio>
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
			title="修改预约报名活动" 
			top="8%"
			width="480px"
			@closed="cancleEditForm('EditForm')"
			:close-on-click-modal="false">
			<el-form ref="EditForm" :model="EditForm" label-width="140px" :rules="EditRules" style="width:100%;">
				<el-form-item label="奖品名称" prop="pl_name">
					<el-input v-model="EditForm.pl_name" placeholder="请输入奖品名称" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="关联抽奖活动ID" prop="pl_dl_id">
					<el-select v-model="EditForm.pl_dl_id" placeholder="请输入关联抽奖活动ID" style="width: 200px;">
						<el-option v-for="item in searchIdList" :key="item.value" :label="item.dl_id" :value="item.dl_id" ></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序" prop="pl_sort">
					<el-input v-model.number="EditForm.pl_sort" placeholder="轮盘按顺时针排" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="奖品数量" prop="pl_num">
					<el-input v-model.number="EditForm.pl_num" placeholder="-1为无限制" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="中奖概率" prop="pl_chance">
					<el-input v-model.number="EditForm.pl_chance" placeholder="请输入中奖概率" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="是否是奖品" prop="pl_isdraw">
					<el-radio v-model="EditForm.pl_isdraw" label="1">是</el-radio>
					<el-radio v-model="EditForm.pl_isdraw" label="0">否</el-radio>
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
	name: 'prizeSetting',
	data() {
		return {
			/* 
			 * tableData: 表格数据
			 * loading: 加载状态（默认为true）
			 * total: 总条数（table数据总长度）
			 * start: 表格分页（默认第一页）
			 * limit: 每页显示条数
			 * searchName: 搜索（奖品名称）
			 * searchID: 搜索（抽奖ID）,
			 */
			tableData : [],
			loading : true,
			total: 0,
			start : 0,
			limit : 10,
			searchName: '',
			searchID: '',
			searchIdList: [],

			/* 新增部分 */
			AddDialogTableVisible : false, //默认隐藏
			AddForm : {
				pl_name : '',
				pl_sort : '',
				pl_num : '',
				pl_dl_id : '',
				pl_chance : '',
				pl_isdraw : ''
			},
			AddRules : {
				pl_name : [{required: true, message : '请输入奖品名称', trigger: 'blur'}],
				pl_sort : [{required: true, message : '请输入排序', trigger: 'blur'}],
				pl_num : [{required: true, message : '请输入奖品数量', trigger: 'blur'}],
				pl_dl_id : [{required: true, message : '请输入关联抽奖活动ID', trigger: 'blur'}],
				pl_chance : [{required: true, message : '请输入中奖概率', trigger: 'blur'}],
				pl_isdraw : [{required: true, message : '请选择是否是奖品', trigger: 'blur'}]
			},

			/* 编辑部分 */
			EditDialogTableVisible : false, //默认隐藏
			EditForm : {
				pl_id : '',
				pl_name : '',
				pl_sort : '',
				pl_num : '',
				pl_dl_id : '',
				pl_chance : '',
				pl_isdraw : ''
			},
			EditRules : {
				pl_name : [{required: true, message : '请输入奖品名称', trigger: 'blur'}],
				pl_sort : [{required: true, message : '请输入排序', trigger: 'blur'}],
				pl_num : [{required: true, message : '请输入奖品数量', trigger: 'blur'}],
				pl_dl_id : [{required: true, message : '请输入关联抽奖活动ID', trigger: 'blur'}],
				pl_chance : [{required: true, message : '请输入中奖概率', trigger: 'blur'}],
				pl_isdraw : [{required: true, message : '请选择是否是奖品', trigger: 'blur'}]
			},

			permissionShow: false, // 默认为false,根据权限是否显示
			permissionEdit: false, // 默认为false,根据权限是否修改
			permissionAdd: false, // 默认为false,根据权限是否新建
			permissionDelete: false, // 默认为false,根据权限是否删除
		}
	},
	methods : {
		getLimit(){
			this.$http.post(
				`${api.dev}/p/main/preference/show`,
				{
					access_token: getToken(),
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					this.limit = (res.body.content) ? res.body.content.p_pagesize : 10;
					this.getInfo();
				}else if(res.body.code == 500) {
					this.$message({
						message: res.body.msg,
						type: 'error'
					});
					this.getInfo();
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
		/* 获取投稿ID */
		getID(){
			this.$http.post(
				`${api.dev}/p/luckDraw/list/selectAll`,
				{
					access_token: getToken()
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					this.searchIdList = res.body.content;
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
			//console.log('searchName:'+searchName);
			var searchVal = (searchName == 'search') ? this.searchName : '';
			var searchId = (searchName == 'search') ? this.searchID : '';
			this.$http.post(
				`${api.dev}/p/luckDraw/prize/show`,
				{
					access_token: getToken(),
					start: this.start,
					limit: this.limit,
					id1: searchId,
					name1: searchVal
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					res.body.content.records.forEach(i => {
						i.pl_createtime = formatDate(new Date(i.pl_createtime) , 'yyyy-MM-dd hh:mm:ss');
						i.pl_isdrawText = (i.pl_isdraw) ? '是' : '否';
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
		/* 活动修改加载 */
		handleEdit(row) {
			//debugger;
			this.currentForm = 'EditForm';
			this.EditForm.pl_id = row.pl_id;
			this.EditForm.pl_name = row.pl_name;
			this.EditForm.pl_sort = row.pl_sort;
			this.EditForm.pl_num = row.pl_num
			this.EditForm.pl_dl_id = row.pl_dl_id;
			this.EditForm.pl_chance = row.pl_chance;
			this.EditForm.pl_isdraw = (row.pl_isdraw) ? '1' : '0';
			this.EditDialogTableVisible = true;
		},
		/* 删除 */
		handleDelete(row) {
			var prompt = '您确认删除 ' + row.pl_name + ' ？';
			this.$confirm(prompt, '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				this.$http.post(
					`${api.dev}/p/luckDraw/prize/delete`,
					{
						access_token : getToken() ,
						pl_id : row.pl_id
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
					formdata.append('access_token',getToken());
					formdata.append('pl_name',this.AddForm.pl_name);
					formdata.append('pl_sort',this.AddForm.pl_sort);
					formdata.append('pl_dl_id',this.AddForm.pl_dl_id);
					formdata.append('pl_num',this.AddForm.pl_num);
					formdata.append('pl_chance',this.AddForm.pl_chance);
					formdata.append('pl_isdraw',this.AddForm.pl_isdraw);

					this.$http.post(`${api.dev}/p/luckDraw/prize/save`,formdata, {emulateJSON:true}).then(res => {
						loading.close();
						if(res.body.code == 200) {
							this.$message({
								message: res.body.msg,
								type: 'success'
							})
							this.loading = true;
							this.cancleAddForm(formName);
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
					formdata.append('access_token',getToken());
					formdata.append('pl_id',this.EditForm.pl_id);
					formdata.append('pl_name',this.EditForm.pl_name);
					formdata.append('pl_sort',this.EditForm.pl_sort);
					formdata.append('pl_dl_id',this.EditForm.pl_dl_id);
					formdata.append('pl_num',this.EditForm.pl_num);
					formdata.append('pl_chance',this.EditForm.pl_chance);
					formdata.append('pl_isdraw',this.EditForm.pl_isdraw);

					this.$http.post(
						`${api.dev}/p/luckDraw/prize/update`,
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
			this.start = this.limit * (val - 1);
			this.getInfo();
		}
	},
	created() {
		this.getSubPermission();
		this.getID();
		this.getLimit();
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
</style>
