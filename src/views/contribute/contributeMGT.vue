<template>
	<div>
		<el-button v-if="permissionAdd" type="primary" @click="AddDialogTableVisible = true" class="AddVillageBtn margin-bottom-10"><i class="el-icon-edit"></i> 新增</el-button>
		<div style="float: right;">
			<el-input v-model="searchName" placeholder="请输入名称进行搜索" style="width:200px" @keyup.enter.native="getInfo('search')"></el-input>
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
			<el-table-column prop="cl_id" label="序号" sortable align="center"  min-width="90"></el-table-column>
			<el-table-column prop="cl_name" label="名称" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="cl_starttime" label="开始时间" sortable align="center" min-width="200"></el-table-column>
			<el-table-column prop="cl_endtime" label="结束时间" sortable align="center" min-width="200"></el-table-column>
			<el-table-column prop="cl_title_requiredText" label="投稿标题是否必填" sortable align="center" min-width="210"></el-table-column>
			<el-table-column prop="cl_author_requiredText" label="投稿作者是否必填" sortable align="center" min-width="200"></el-table-column>
			<el-table-column prop="cl_article_requiredText" label="投稿文章是否必填" sortable align="center" min-width="210"></el-table-column>
			<el-table-column prop="cl_img_requiredText" label="投稿图片是否必填" sortable align="center" min-width="200"></el-table-column>
			<el-table-column prop="cl_date_requiredText" label="投稿日期是否必填" sortable align="center" min-width="210"></el-table-column>
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
			title="新建投稿" 
			top="8%"
			width="620px"
			@closed="cancleAddForm('AddForm')"
			:close-on-click-modal="false">
			<!-- 表单 -->
			<el-form ref="AddForm" :model="AddForm" label-width="150px" :rules="AddRules" style="width:100%;">
				<el-form-item label="名称" prop="cl_name">
					<el-input v-model="AddForm.cl_name"></el-input>
				</el-form-item>
				<el-form-item label="投稿时间" prop="cl_time">
					<el-date-picker
						v-model="AddForm.cl_time"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						style="width: 100%;"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="投稿标题是否必填" prop="cl_title_required">
					<el-radio v-model="AddForm.cl_title_required" label="1">是</el-radio>
					<el-radio v-model="AddForm.cl_title_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿作者是否必填" prop="cl_author_required">
					<el-radio v-model="AddForm.cl_author_required" label="1">是</el-radio>
					<el-radio v-model="AddForm.cl_author_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿文章是否必填" prop="cl_article_required">
					<el-radio v-model="AddForm.cl_article_required" label="1">是</el-radio>
					<el-radio v-model="AddForm.cl_article_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿图片是否必填" prop="cl_img_required">
					<el-radio v-model="AddForm.cl_img_required" label="1">是</el-radio>
					<el-radio v-model="AddForm.cl_img_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿日期是否必填" prop="cl_date_required">
					<el-radio v-model="AddForm.cl_date_required" label="1">是</el-radio>
					<el-radio v-model="AddForm.cl_date_required" label="0">否</el-radio>
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
			title="修改投稿" 
			top="8%"
			width="620px"
			@closed="cancleEditForm('EditForm')"
			:close-on-click-modal="false">
			<el-form ref="EditForm" :model="EditForm" label-width="150px" :rules="EditRules" style="width:100%;">
				<el-form-item label="名称" prop="cl_name">
					<el-input v-model="EditForm.cl_name"></el-input>
				</el-form-item>
				<el-form-item label="投稿时间" prop="cl_time">
					<el-date-picker
						v-model="EditForm.cl_time"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						style="width: 100%;"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="投稿标题是否必填" prop="cl_title_required">
					<el-radio v-model="EditForm.cl_title_required" label="1">是</el-radio>
					<el-radio v-model="EditForm.cl_title_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿作者是否必填" prop="cl_author_required">
					<el-radio v-model="EditForm.cl_author_required" label="1">是</el-radio>
					<el-radio v-model="EditForm.cl_author_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿文章是否必填" prop="cl_article_required">
					<el-radio v-model="EditForm.cl_article_required" label="1">是</el-radio>
					<el-radio v-model="EditForm.cl_article_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿图片是否必填" prop="cl_img_required">
					<el-radio v-model="EditForm.cl_img_required" label="1">是</el-radio>
					<el-radio v-model="EditForm.cl_img_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿日期是否必填" prop="cl_date_required">
					<el-radio v-model="EditForm.cl_date_required" label="1">是</el-radio>
					<el-radio v-model="EditForm.cl_date_required" label="0">否</el-radio>
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
			title="查看投稿详情" 
			top="8%"
			width="620px"
			@closed="cancleDetailForm('DetailForm')"
			:close-on-click-modal="false">
			<el-form ref="DetailForm" :model="DetailForm" label-width="150px" disabled style="width:100%;">
				<el-form-item label="名称" prop="cl_name">
					<el-input v-model="DetailForm.cl_name"></el-input>
				</el-form-item>
				<el-form-item label="投稿时间" prop="cl_time">
					<el-date-picker
						v-model="DetailForm.cl_time"
						type="datetimerange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						style="width: 100%;"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="投稿标题是否必填" prop="cl_title_required">
					<el-radio v-model="DetailForm.cl_title_required" label="1">是</el-radio>
					<el-radio v-model="DetailForm.cl_title_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿作者是否必填" prop="cl_author_required">
					<el-radio v-model="DetailForm.cl_author_required" label="1">是</el-radio>
					<el-radio v-model="DetailForm.cl_author_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿文章是否必填" prop="cl_article_required">
					<el-radio v-model="DetailForm.cl_article_required" label="1">是</el-radio>
					<el-radio v-model="DetailForm.cl_article_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿图片是否必填" prop="cl_img_required">
					<el-radio v-model="DetailForm.cl_img_required" label="1">是</el-radio>
					<el-radio v-model="DetailForm.cl_img_required" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="投稿日期是否必填" prop="cl_date_required">
					<el-radio v-model="DetailForm.cl_date_required" label="1">是</el-radio>
					<el-radio v-model="DetailForm.cl_date_required" label="0">否</el-radio>
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
	name: 'contributeMGT',
	data() {
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

			/* 新增部分 */
			AddDialogTableVisible : false, //默认隐藏
			AddForm : {
				cl_name : '',
				cl_time : '',
				cl_title_required : '',
				cl_date_required : '',
				cl_author_required : '',
				cl_img_required : '',
				cl_article_required : ''
			},
			AddRules : {
				cl_name : [{required: true, message : '请输入名称', trigger: 'blur'}],
				cl_time : [{required: true, message : '请输入投稿时间', trigger: 'blur'}],
				cl_title_required : [{required: true, message : '请选择投稿标题是否必填', trigger: 'blur'}],
				cl_date_required : [{required: true, message : '请选择投稿日期是否必填', trigger: 'blur'}],
				cl_author_required : [{required: true, message : '请选择投稿作者是否必填', trigger: 'blur'}],
				cl_img_required : [{required: true, message : '请选择投稿图片是否必填', trigger: 'blur'}],
				cl_article_required : [{required: true, message : '请选择投稿文章是否必填', trigger: 'blur'}],
			},

			/* 编辑部分 */
			EditDialogTableVisible : false, //默认隐藏
			EditForm : {
				cl_name : '',
				cl_time : '',
				cl_title_required : '',
				cl_date_required : '',
				cl_author_required : '',
				cl_img_required : '',
				cl_article_required : ''
			},
			EditRules : {
				cl_name : [{required: true, message : '请输入名称', trigger: 'blur'}],
				cl_time : [{required: true, message : '请输入投稿时间', trigger: 'blur'}],
				cl_title_required : [{required: true, message : '请选择投稿标题是否必填', trigger: 'blur'}],
				cl_date_required : [{required: true, message : '请选择投稿日期是否必填', trigger: 'blur'}],
				cl_author_required : [{required: true, message : '请选择投稿作者是否必填', trigger: 'blur'}],
				cl_img_required : [{required: true, message : '请选择投稿图片是否必填', trigger: 'blur'}],
				cl_article_required : [{required: true, message : '请选择投稿文章是否必填', trigger: 'blur'}],
			},

			/* 查看详情部分 */
			DetailDialogTableVisible : false,
			DetailForm : {
				cl_name : '',
				cl_time : '',
				cl_title_required : '',
				cl_date_required : '',
				cl_author_required : '',
				cl_img_required : '',
				cl_article_required : ''
			},

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
						}else if(item.p_name.indexOf('详情') > -1) {
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
				`${api.dev}/p/contribute/list/show`,
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
						i.cl_starttime = formatDate(new Date(i.cl_starttime) , 'yyyy-MM-dd hh:mm:ss');
						i.cl_endtime = formatDate(new Date(i.cl_endtime) , 'yyyy-MM-dd hh:mm:ss');
						i.cl_time = [i.cl_starttime, i.cl_endtime];

						i.cl_title_requiredText = (i.cl_title_required) ? '是' : '否' ;
						i.cl_author_requiredText = (i.cl_author_required) ? '是' : '否' ;
						i.cl_article_requiredText = (i.cl_article_required) ? '是' : '否' ;
						i.cl_img_requiredText = (i.cl_img_required) ? '是' : '否' ;
						i.cl_date_requiredText = (i.cl_date_required) ? '是' : '否' ;

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
		/* 详情加载 */
		handleDetail(row) {
			this.$http.post(
				`${api.dev}/p/contribute/list/select`,
				{
					access_token: getToken(),
					cl_id: row.cl_id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					var data = res.body.content;
						data.cl_starttime = formatDate(new Date(data.cl_starttime) , 'yyyy-MM-dd hh:mm:ss');
						data.cl_endtime = formatDate(new Date(data.cl_endtime) , 'yyyy-MM-dd hh:mm:ss');
						data.cl_time = [data.cl_starttime, data.cl_endtime];
						data.cl_title_required = (data.cl_title_required) ? '1' : '0' ;
						data.cl_author_required = (data.cl_author_required) ? '1' : '0' ;
						data.cl_article_required = (data.cl_article_required) ? '1' : '0' ;
						data.cl_img_required = (data.cl_img_required) ? '1' : '0' ;
						data.cl_date_required = (data.cl_date_required) ? '1' : '0' ;
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
		/* 修改加载 */
		handleEdit(row) {
			this.EditForm.cl_id = row.cl_id;
			this.EditForm.cl_name = row.cl_name;
			this.EditForm.cl_time = row.cl_time
			this.EditForm.cl_title_required = (row.cl_title_required) ? '1' : '0' ;
			this.EditForm.cl_date_required = (row.cl_date_required) ? '1' : '0' ;
			this.EditForm.cl_article_required = (row.cl_article_required) ? '1' : '0' ;
			this.EditForm.cl_img_required = (row.cl_img_required) ? '1' : '0' ;
			this.EditForm.cl_author_required = (row.cl_author_required) ? '1' : '0' ;
			this.EditDialogTableVisible = true;
		},
		/* 删除 */
		handleDelete(row) {
			var prompt = '您确认删除 ' + row.cl_name + ' ？';
			this.$confirm(prompt, '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				this.$http.post(
					`${api.dev}/p/contribute/list/delete`,
					{
						access_token : getToken() ,
						cl_id : row.cl_id
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
						cl_starttime = formatDate(new Date(this.AddForm.cl_time[0]) , 'yyyy-MM-dd hh:mm:ss'),
						cl_endtime = formatDate(new Date(this.AddForm.cl_time[1]) , 'yyyy-MM-dd hh:mm:ss');
					formdata.append('access_token',getToken());
					formdata.append('cl_name',this.AddForm.cl_name);
					formdata.append('cl_place',this.AddForm.bl_place);
					formdata.append('cl_starttime',cl_starttime);
					formdata.append('cl_endtime',cl_endtime);
					formdata.append('cl_title_required',this.AddForm.cl_title_required);
					formdata.append('cl_date_required',this.AddForm.cl_date_required);
					formdata.append('cl_author_required',this.AddForm.cl_author_required);
					formdata.append('cl_img_required',this.AddForm.cl_img_required);
					formdata.append('cl_article_required',this.AddForm.cl_article_required);

					this.$http.post(`${api.dev}/p/contribute/list/save`,formdata, {emulateJSON:true}).then(res => {
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
					debugger;
					console.log(this.EditForm.bl_time);
					var formdata = new FormData(),
						cl_starttime = formatDate(new Date(this.EditForm.cl_time[0]) , 'yyyy-MM-dd hh:mm:ss'),
						cl_endtime = formatDate(new Date(this.EditForm.cl_time[1]) , 'yyyy-MM-dd hh:mm:ss');
					formdata.append('access_token',getToken());
					formdata.append('cl_id',this.EditForm.cl_id);
					formdata.append('cl_name',this.EditForm.cl_name);
					formdata.append('cl_place',this.EditForm.bl_place);
					formdata.append('cl_starttime',cl_starttime);
					formdata.append('cl_endtime',cl_endtime);
					formdata.append('cl_title_required',this.EditForm.cl_title_required);
					formdata.append('cl_date_required',this.EditForm.cl_date_required);
					formdata.append('cl_author_required',this.EditForm.cl_author_required);
					formdata.append('cl_img_required',this.EditForm.cl_img_required);
					formdata.append('cl_article_required',this.EditForm.cl_article_required);
					this.$http.post(
						`${api.dev}/p/contribute/list/update`,
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
.margin-bottom-10
	margin-bottom 10px
</style>

<style>
.el-date-editor .el-range-input[placeholder='开始日期']{
	text-align: left!important;
}
</style>
