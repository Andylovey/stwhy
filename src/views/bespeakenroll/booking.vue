<template>
	<div>
		<el-button v-if="permissionAdd" type="primary" @click="AddDialogTableVisible = true" class="AddVillageBtn margin-bottom-10"><i class="el-icon-edit"></i> 新增</el-button>
		<div style="float: right;">
			<el-input v-model="searchName" placeholder="请输入活动名称进行搜索" style="width:200px" @keyup.enter.native="getInfo('search')"></el-input>
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
			<el-table-column prop="bl_id" label="序号" sortable align="center"  min-width="90"></el-table-column>
			<el-table-column prop="bl_name" label="活动名称" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="bl_place" label="活动地点" sortable align="center" min-width="240"></el-table-column>
			<el-table-column prop="bl_starttime" label="开始时间" sortable align="center" min-width="200"></el-table-column>
			<el-table-column prop="bl_endtime" label="结束时间" sortable align="center" min-width="200"></el-table-column>
			<el-table-column prop="bl_signtime" label="报名时间" sortable align="center" min-width="200"></el-table-column>
			<el-table-column prop="bl_limit" label="限制人数（0为不限制）" sortable align="center" min-width="210"></el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				align="center"
				min-width="180"
				v-if="permissionDetail || permissionEdit || permissionDelete">
				<template slot-scope="scope">
					<el-button v-if="permissionDetail" @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
					<el-button v-if="permissionEdit" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
					<el-button v-if="permissionDelete" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
			title="新建预约报名活动" 
			top="8%"
			width="580px"
			@closed="cancleAddForm('AddForm')"
			:close-on-click-modal="false">
			<!-- 表单 -->
			<el-form ref="AddForm" :model="AddForm" label-width="120px" :rules="AddRules" style="width:100%;">
				<el-form-item label="活动名称" prop="bl_name">
					<el-input v-model="AddForm.bl_name"></el-input>
				</el-form-item>
				<el-form-item label="活动地点" prop="bl_place">
					<el-input v-model="AddForm.bl_place"></el-input>
				</el-form-item>
				<el-form-item label="活动时间" prop="bl_time">
					<el-date-picker
						v-model="AddForm.bl_time"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						style="width: 100%;"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="报名时间" prop="bl_signtime">
					<el-date-picker type="datetime" placeholder="选择报名时间" v-model="AddForm.bl_signtime" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="限制人数" prop="bl_limit">
					<el-input v-model.number="AddForm.bl_limit" placeholder="限制人数（0为不限制）"></el-input>
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
			width="580px"
			@closed="cancleEditForm('EditForm')"
			:close-on-click-modal="false">
			<el-form ref="EditForm" :model="EditForm" label-width="140px" :rules="EditRules" style="width:100%;">
				<el-form-item label="活动名称" prop="bl_name">
					<el-input v-model="EditForm.bl_name"></el-input>
				</el-form-item>
				<el-form-item label="活动地点" prop="bl_place">
					<el-input v-model="EditForm.bl_place"></el-input>
				</el-form-item>
				<el-form-item label="活动时间" prop="bl_time">
					<el-date-picker
						v-model="EditForm.bl_time"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						style="width: 100%;"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="报名时间" prop="bl_signtime">
					<el-date-picker type="datetime" placeholder="选择报名时间" v-model="EditForm.bl_signtime" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="限制人数" prop="bl_limit">
					<el-input v-model.number="EditForm.bl_limit" placeholder="限制人数（0为不限制）"></el-input>
				</el-form-item>
				<el-form-item class="text-align-right">
					<el-button type="primary" @click="submitEditForm('EditForm')">提交</el-button>
					<el-button @click="cancleEditForm('EditForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 查看模态框 -->
		<el-dialog 
			:visible.sync="DetailDialogTableVisible"
			title="查看报名活动详情" 
			top="8%"
			width="40%"
			@closed="cancleDetailForm('DetailForm')"
			:close-on-click-modal="false">
			<el-form ref="DetailForm" :model="DetailForm" label-width="140px" disabled style="width:100%;">
				<el-form-item label="活动名称" prop="bl_name">
					<el-input v-model="DetailForm.bl_name"></el-input>
				</el-form-item>
				<el-form-item label="活动地点" prop="bl_place">
					<el-input v-model="DetailForm.bl_place"></el-input>
				</el-form-item>
				<el-form-item label="活动时间" prop="bl_time">
					<el-date-picker
						v-model="DetailForm.bl_time"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						style="width: 100%;"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="报名时间" prop="bl_signtime">
					<el-date-picker type="datetime"v-model="DetailForm.bl_signtime" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="限制人数" prop="bl_limit">
					<el-input v-model.number="DetailForm.bl_limit" ></el-input>
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
	name: 'booking',
	data() {
		// 活动开始时间验证
		var checkStartime = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入活动时间'));
			} else {
				if(this.getBl_signtime()){
					const bl_signtime = new Date(this.getBl_signtime());
					const val = new Date(value[0]);
					console.log('bl_signtime: '+bl_signtime);
					console.log('val: '+val);
					if (val > bl_signtime) {  
						callback();
					} else {
						return callback(new Error('活动开始时间 要晚于 报名时间'));
					}
				}
			}
		};
		// 开始报名时间验证
		var checkSigntime = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入开始报名时间（到活动开始时间截止）'));
			} else {
				if(this.getBl_Startime()){
					const bl_starttime = new Date(this.getBl_Startime());
					const val = new Date(value);
					console.log('bl_starttime: '+bl_starttime);
					console.log('val: '+val);
					if (val < bl_starttime) { 
						callback();
					} else {
						return callback(new Error('报名时间 要早于 活动开始时间'));          
					}
				}
				 
			}
		};
		return {
			/* 
			 * tableData: 表格数据
			 * loading: 加载状态（默认为true）
			 * total: 总条数（table数据总长度）
			 * start: 表格分页（默认第一页）
			 * limit: 每页显示条数
			 * searchName: 搜索（用户名）
			 */
			tableData : [],
			loading : true,
			total: 0,
			start : 0,
			limit : 10,
			searchName: '',
			dowidth: 180,

			/* 新增部分 */
			AddDialogTableVisible : false, //默认隐藏
			AddForm : {
				bl_id : '',
				bl_name : '',
				bl_place : '',
				bl_starttime : '',
				bl_endtime : '',
				bl_signtime : '',
				bl_limit : ''
			},
			AddRules : {
				bl_name : [{required: true, message : '请输入活动名称', trigger: 'blur'}],
				bl_place : [{required: true, message : '活请输入动地点', trigger: 'blur'}],
				bl_time: [{required: true, validator: checkStartime, trigger: 'blur'}],
				bl_signtime : [{required: true, validator: checkSigntime, trigger: 'blur'}],
				bl_limit : [{required: true, message : '限制人数（0为不限制）', trigger: 'blur'}],
			},

			/* 编辑部分 */
			EditDialogTableVisible : false, //默认隐藏
			EditForm : {
				bl_id : '',
				bl_name : '',
				bl_place : '',
				bl_time: '',
				bl_signtime : '',
				bl_limit : ''
			},
			EditRules : {
				bl_name : [{required: true, message : '请输入活动名称', trigger: 'blur'}],
				bl_place : [{required: true, message : '活请输入动地点', trigger: 'blur'}],
				bl_time: [{required: true, validator: checkStartime, trigger: 'blur'}],
				bl_signtime : [{required: true, validator: checkSigntime, trigger: 'blur'}],
				bl_limit : [{required: true, message : '限制人数（0为不限制）', trigger: 'blur'}],
			},

			/* 查看详情部分 */
			DetailDialogTableVisible : false,
			DetailForm : {
				bl_id : '',
				bl_name : '',
				bl_place : '',
				bl_starttime : '',
				bl_endtime : '',
				bl_signtime : '',
				bl_limit : ''
			},
			currentForm: 'AddForm', // 当前表单

			permissionShow: false, // 默认为false,根据权限是否显示
			permissionDetail: false, // 默认为false,根据权限是否新建
			permissionEdit: false, // 默认为false,根据权限是否修改
			permissionAdd: false, // 默认为false,根据权限是否新建
			permissionDelete: false, // 默认为false,根据权限是否查看
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
						}else if(item.p_name.indexOf('查看') > -1) {
							this.permissionDetail = true;
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
		/* 表格数据加载 */
		getInfo(searchName){
			//console.log('searchName:'+searchName);
			var searchVal = (searchName == 'search') ? this.searchName : '';
			this.$http.post(
				`${api.dev}/p/bespeakenroll/list/show`,
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
						i.bl_starttime = formatDate(new Date(i.bl_starttime) , 'yyyy-MM-dd hh:mm:ss');
						i.bl_endtime = formatDate(new Date(i.bl_endtime) , 'yyyy-MM-dd hh:mm:ss');
						i.bl_signtime = formatDate(new Date(i.bl_signtime) , 'yyyy-MM-dd hh:mm:ss');
						i.bl_time = [i.bl_starttime, i.bl_endtime];
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
		/* 获取当前表单校验时间 */
		getBl_signtime(){
			var i;
			console.log(this.currentForm);
			if(this.currentForm == 'AddForm'){
				i = this.AddForm.bl_signtime;
			}else{
				i = this.EditForm.bl_signtime;
			}
			return i;
		},
		getBl_Startime(){
			var i;
			console.log(this.currentForm);
			if(this.currentForm == 'AddForm'){
				i = this.AddForm.bl_time[0];
			}else{
				i = this.EditForm.bl_time[0];
			}
			return i;
		},
		/* 活动详情加载 */
		handleDetail(row) {
			this.$http.post(
				`${api.dev}/p/bespeakenroll/list/select`,
				{
					access_token: getToken(),
					bl_id: row.bl_id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					var data = res.body.content;
						data.bl_starttime = formatDate(new Date(data.bl_starttime) , 'yyyy-MM-dd hh:mm:ss');
						data.bl_endtime = formatDate(new Date(data.bl_endtime) , 'yyyy-MM-dd hh:mm:ss');
						data.bl_signtime = formatDate(new Date(data.bl_signtime) , 'yyyy-MM-dd hh:mm:ss');
						data.bl_time = [data.bl_starttime, data.bl_endtime];
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
		/* 活动修改加载 */
		handleEdit(row) {
			this.currentForm = 'EditForm';
			this.EditForm.bl_id = row.bl_id;
			this.EditForm.bl_name = row.bl_name;
			this.EditForm.bl_place = row.bl_place;
			this.EditForm.bl_time = [row.bl_starttime, row.bl_endtime];
			this.EditForm.bl_signtime = row.bl_signtime;
			this.EditForm.bl_limit = row.bl_limit;
			this.EditDialogTableVisible = true;
		},
		/* 活动删除 */
		handleDelete(row) {
			var prompt = '您确认删除 ' + row.bl_name + ' 此活动？';
			this.$confirm(prompt, '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				this.$http.post(
					`${api.dev}/p/bespeakenroll/list/delete`,
					{
						access_token : getToken() ,
						bl_id : row.bl_id
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
					var formdata = new FormData(),
						bl_starttime = formatDate(new Date(this.AddForm.bl_time[0]) , 'yyyy-MM-dd hh:mm:ss'),
						bl_endtime = formatDate(new Date(this.AddForm.bl_time[1]) , 'yyyy-MM-dd hh:mm:ss'),
						bl_signtime = formatDate(new Date(this.AddForm.bl_signtime) , 'yyyy-MM-dd hh:mm:ss');
					formdata.append('access_token',getToken());
					formdata.append('bl_name',this.AddForm.bl_name);
					formdata.append('bl_place',this.AddForm.bl_place);
					formdata.append('bl_starttime',bl_starttime);
					formdata.append('bl_endtime',bl_endtime);
					formdata.append('bl_signtime',bl_signtime);
					formdata.append('bl_limit',this.AddForm.bl_limit);

					this.$http.post(`${api.dev}/p/bespeakenroll/list/save`,formdata, {emulateJSON:true}).then(res => {
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
					var formdata = new FormData(),
						bl_starttime = formatDate(new Date(this.EditForm.bl_time[0]) , 'yyyy-MM-dd hh:mm:ss'),
						bl_endtime = formatDate(new Date(this.EditForm.bl_time[1]) , 'yyyy-MM-dd hh:mm:ss'),
						bl_signtime = formatDate(new Date(this.EditForm.bl_signtime) , 'yyyy-MM-dd hh:mm:ss');
					formdata.append('access_token',getToken());
					formdata.append('bl_name',this.EditForm.bl_name);
					formdata.append('bl_place',this.EditForm.bl_place);
					formdata.append('bl_starttime',bl_starttime);
					formdata.append('bl_endtime',bl_endtime);
					formdata.append('bl_signtime',bl_signtime);
					formdata.append('bl_limit',this.EditForm.bl_limit);
					formdata.append('bl_id',this.EditForm.bl_id);

					this.$http.post(
						`${api.dev}/p/bespeakenroll/list/update`,
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
			this.currentForm = 'AddForm';
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
		this.getLimit();
	}
}
</script>


<style lang="stylus" scoped>
#pagination
	margin-top 10px
.tree
	margin 0 12px;
	padding 12px 24px 12px 18px
	border 1px solid #ccc
.margin-bottom-10
	margin-bottom 10px
.padding-right-12
	padding-right 12px
.text-align-right
	text-align right;

</style>

<style>
.permissionsTree .el-tree-node__content{
	border-bottom: 1px solid #eee;
}
.el-date-editor .el-range-input[placeholder='开始日期']{
	text-align: left!important;
}
</style>
