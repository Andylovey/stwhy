<template>
	<div class="departmentDuty">
		<el-row type="flex" class="row-bg" style="height: 100%;">
			<el-col style="width:540px; padding-right:60px; height: 100%;">
				<el-row class="margin-bottom-6">
					<span>部门管理</span>
					<el-button v-if="deleteDepartment" type="danger" icon="el-icon-delete" circle size="mini" @click="handleDeleteDepartment()"></el-button>
					<el-button v-if="editDepartment" type="primary" icon="el-icon-edit" circle size="mini" @click="handleDepartment()"></el-button>
					<el-button v-if="addDepartment" icon="el-icon-plus" circle size="mini" @click="AddDialogTableVisible1 = true"></el-button>
				</el-row>
				<el-table
					v-if="showDepartment"
					v-loading="loading"
					class="table"
					ref="tableDepartment"
					stripe
					highlight-current-row
					element-loading-text="拼命加载中"
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(0, 0, 0, 0.8)"
					@current-change="DepartmentChange"
					:data="tableDepartment"
					height="calc(100% - 100px)">
					<el-table-column prop="dpm_name" label="部门名称" sortable align="left" min-width="160"></el-table-column>
					<el-table-column prop="dpm_remark" label="备注信息" align="center" min-width="220"></el-table-column>
					<!-- <el-table-column
						fixed="right"
						label="操作"
						align="center"
						min-width="120"
						v-if="permissionExport">
						<template slot-scope="scope">
							<el-button @click="handleExport(scope.row)" type="text" size="small">导出</el-button>
						</template>
					</el-table-column> -->
				</el-table>
				<!-- 分页 -->
				<div class="pagination">
					<el-pagination
						background
						layout="prev, pager, next"
						:total="total1"
						:page-size="limit"
						@current-change="handleCurrentChange1">
					</el-pagination>
				</div>
			</el-col>
			<el-col style="width:600px; padding-right:20px; height:100%;">
				<el-row class="margin-bottom-6">
					<span>职位管理</span>
					<el-button v-if="deleteDuty" type="danger" icon="el-icon-delete" circle size="mini"  @click="handleDeleteDuty()" :disabled="dutyDisabled"></el-button>
					<el-button v-if="editDuty" type="primary" icon="el-icon-edit" circle size="mini" @click="handleDuty()" :disabled="dutyDisabled"></el-button>
					<el-button v-if="addDuty" icon="el-icon-plus" circle size="mini" @click="AddDialogTableVisible2 = true;"></el-button>
				</el-row>
				<el-table
					v-if="showDuty"
					v-loading="loading"
					class="table"
					stripe
					highlight-current-row
					element-loading-text="拼命加载中"
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(0, 0, 0, 0.8)"
					@current-change="DutyChange"
					:data="tableDuty"
					height="calc(100% - 100px)">
					<el-table-column prop="duty_name" label="职位名称" sortable align="left" min-width="160"></el-table-column>
					<el-table-column prop="duty_remark" label="备注信息" align="center" min-width="220"></el-table-column>
					<!-- <el-table-column
						fixed="right"
						label="操作"
						align="center"
						min-width="120"
						v-if="permissionExport">
						<template slot-scope="scope">
							<el-button @click="handleExport(scope.row)" type="text" size="small">导出</el-button>
						</template>
					</el-table-column> -->
				</el-table>
				<!-- 分页 -->
				<div class="pagination">
					<el-pagination
						background
						layout="prev, pager, next"
						:total="total2"
						@current-change="handleCurrentChange2">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
		<!-- 新建模态框 -->
		<el-dialog 
			:visible.sync="AddDialogTableVisible1"
			title="新建部门" 
			top="8%"
			width="560px"
			@closed="cancleAddForm1('AddForm1')"
			:close-on-click-modal="false">
			<!-- 表单 -->
			<el-form ref="AddForm1" :model="AddForm1" label-width="120px" :rules="AddRules1" style="width:100%;">
				<el-form-item label="部门名称" prop="dpm_name">
					<el-input v-model="AddForm1.dpm_name" placeholder="请输入部门名称"></el-input>
				</el-form-item>
				<el-form-item label="备注信息" prop="dpm_remark">
					<el-input type="textarea" v-model="AddForm1.dpm_remark" placeholder="请输入备注信息" rows="6"></el-input>
				</el-form-item>
				<el-form-item class="text-align-right">
					<el-button type="primary" @click="submitAddForm1('AddForm1')">提交</el-button>
					<el-button @click="cancleAddForm1('AddForm1')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 编辑模态框 -->
		<el-dialog 
			:visible.sync="EditDialogTableVisible1"
			title="修改部门" 
			top="8%"
			width="560px"
			@closed="cancleEditForm1('EditForm1')"
			:close-on-click-modal="false">
			<el-form ref="EditForm1" :model="EditForm1" label-width="120px" :rules="EditRules1" style="width:100%;">
				<el-form-item label="部门名称" prop="dpm_name">
					<el-input v-model="EditForm1.dpm_name" placeholder="请输入部门名称"></el-input>
				</el-form-item>
				<el-form-item label="备注信息" prop="dpm_remark">
					<el-input type="textarea" v-model="EditForm1.dpm_remark" placeholder="请输入备注信息" rows="6"></el-input>
				</el-form-item>
				<el-form-item class="text-align-right">
					<el-button type="primary" @click="submitEditForm1('EditForm1')">提交</el-button>
					<el-button @click="cancleEditForm1('EditForm1')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 新建模态框 -->
		<el-dialog 
			:visible.sync="AddDialogTableVisible2"
			title="新建职位" 
			top="8%"
			width="560px"
			@closed="cancleAddForm2('AddForm2')"
			:close-on-click-modal="false">
			<!-- 表单 -->
			<el-form ref="AddForm2" :model="AddForm2" label-width="120px" :rules="AddRules2" style="width:100%;">
				<el-form-item label="职位名称" prop="duty_name">
					<el-input v-model="AddForm2.duty_name" placeholder="请输入职位名称"></el-input>
				</el-form-item>
				<el-form-item label="备注信息" prop="duty_remark">
					<el-input type="textarea" v-model="AddForm2.duty_remark" placeholder="请输入备注信息" rows="6"></el-input>
				</el-form-item>
				<el-form-item class="text-align-right">
					<el-button type="primary" @click="submitAddForm2('AddForm2')">提交</el-button>
					<el-button @click="cancleAddForm2('AddForm2')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 编辑模态框 -->
		<el-dialog 
			:visible.sync="EditDialogTableVisible2"
			title="修改职位" 
			top="8%"
			width="560px"
			@closed="cancleEditForm2('EditForm2')"
			:close-on-click-modal="false">
			<el-form ref="EditForm2" :model="EditForm2" label-width="120px" :rules="EditRules2">
				<el-form-item label="职位名称" prop="duty_name">
					<el-input v-model="EditForm2.duty_name" placeholder="请输入职位名称"></el-input>
				</el-form-item>
				<el-form-item label="备注信息" prop="duty_remark">
					<el-input type="textarea" v-model="EditForm2.duty_remark" placeholder="请输入备注信息" rows="6"></el-input>
				</el-form-item>
				<el-form-item class="text-align-right">
					<el-button type="primary" @click="submitEditForm2('EditForm2')">提交</el-button>
					<el-button @click="cancleEditForm2('EditForm2')">取消</el-button>
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
	name: 'departmentDuty',
	data() {
		return {
			/* 
			 * tableData: 表格数据
			 * loading: 加载状态（默认为true）
			 * total: 总条数（table数据总长度）
			 * start: 表格分页（默认第一页）
			 * limit: 每页显示条数
			 */
			tableDepartment : [],
			tableDuty : [],
			loading : true,
			total1: 0,
			start1 : 0,
			total2: 0,
			start2 : 0,
			limit : 10,

			currentDepartment : {},
			currentDuty : {},
			dutyDisabled: true,

			/* 新增部门 */
			AddDialogTableVisible1 : false, //默认隐藏
			AddForm1 : {
				dpm_name : '',
				dpm_remark : ''
			},
			AddRules1 : {
				dpm_name : [{required: true, message : '请输入部门名称', trigger: 'blur'}],
				dpm_remark : [{required: false, message : '请输入备注信息', trigger: 'blur'}]
			},

			/* 编辑部门 */
			EditDialogTableVisible1 : false, //默认隐藏
			EditForm1 : {
				dpm_name : '',
				dpm_remark : ''
			},
			EditRules1 : {
				dpm_name : [{required: true, message : '请输入部门名称', trigger: 'blur'}],
				dpm_remark : [{required: false, message : '请输入备注信息', trigger: 'blur'}]
			},

			/* 新增职位 */
			AddDialogTableVisible2 : false, //默认隐藏
			AddForm2 : {
				duty_name : '',
				duty_remark : ''
			},
			AddRules2 : {
				duty_name : [{required: true, message : '请输入部门名称', trigger: 'blur'}],
				duty_remark : [{required: false, message : '请输入备注信息', trigger: 'blur'}]
			},

			/* 编辑职位 */
			EditDialogTableVisible2 : false, //默认隐藏
			EditForm2 : {
				duty_name : '',
				duty_remark : ''
			},
			EditRules2 : {
				duty_name : [{required: true, message : '请输入部门名称', trigger: 'blur'}],
				duty_remark : [{required: false, message : '请输入备注信息', trigger: 'blur'}]
			},

			showDepartment: false,   // 默认为false,根据权限是否显示部门
			addDepartment: false,    // 默认为false,根据权限是否新建部门
			editDepartment: false,   // 默认为false,根据权限是否修改部门
			deleteDepartment: false, // 默认为false,根据权限是否删除部门
			showDuty: false,         // 默认为false,根据权限是否显示职位
			addDuty: false,          // 默认为false,根据权限是否新建职位
			editDuty: false,         // 默认为false,根据权限是否修改职位
			deleteDuty: false,       // 默认为false,根据权限是否删除职位
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
						if(item.p_name.indexOf('显示部门') > -1) {
							this.showDepartment = true;
						}else if(item.p_name.indexOf('新建部门') > -1) {
							this.addDepartment = true;
						}else if(item.p_name.indexOf('修改部门') > -1) {
							this.editDepartment = true;
						}else if(item.p_name.indexOf('删除部门') > -1) {
							this.deleteDepartment = true;
						}else if(item.p_name.indexOf('显示职位') > -1) {
							this.showDuty = true;
						}else if(item.p_name.indexOf('新建职位') > -1) {
							this.addDuty = true;
						}else if(item.p_name.indexOf('修改职位') > -1) {
							this.editDuty = true;
						}else if(item.p_name.indexOf('删除职位') > -1) {
							this.deleteDuty = true;
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
		getInfo(){
			this.$http.post(
				`${api.dev}/p/main/departmentDuty/showDepartment`,
				{
					access_token: getToken(),
					start: this.start1,
					limit: this.limit
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					this.tableDepartment = res.body.content.records;
					this.DepartmentChange(this.tableDepartment[0]);
					this.total1 = res.body.content.total;
					this.loading = false;
					this.$refs.tableDepartment.setCurrentRow(this.tableDepartment[0]);
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
		/* 选中部门 */
		DepartmentChange(val) {			
			console.log(val)
			this.$http.post(
				`${api.dev}/p/main/departmentDuty/showDuty`,
				{
					access_token: getToken(),
					start: this.start2,
					limit: this.limit,
					dpm_id: val.dpm_id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					this.tableDuty = res.body.content.records;
					this.total2 = res.body.content.total;
					this.loading = false;
					this.$nextTick(() => {
						this.currentDepartment = val;
						this.currentDuty = {};
						this.dutyDisabled = true;
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
		/* 选中职位 */
		DutyChange(val) {
			this.currentDuty = val;
			this.dutyDisabled = false;
		},
		/* 修改部门加载 */
		handleDepartment() {
			this.EditForm1 = this.currentDepartment;
			this.EditDialogTableVisible1 = true;			
		},
		/* 删除部门 */
		handleDeleteDepartment(){
			var prompt = '您确认删除【 ' + this.currentDepartment.dpm_name + ' 】？';
			this.$confirm(prompt, '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				this.$http.post(
					`${api.dev}/p/main/departmentDuty/deleteDepartment`,
					{
						access_token : getToken() ,
						dpm_id : this.currentDepartment.dpm_id
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
		/* 修改职位加载 */
		handleDuty() {
			if(this.currentDuty.dpm_id){
				this.EditForm2 = this.currentDuty;
				this.EditDialogTableVisible2 = true;
			}else{
				this.$message({
					message: '请选择要修改的职位',
					type: 'warning'
				});
			}		
		},
		/* 删除职位 */
		handleDeleteDuty(){
			if(this.currentDuty.dpm_id){
				var prompt = '您确认删除【 ' + this.currentDuty.duty_name + ' 】？';
				this.$confirm(prompt, '提示', {
					type: 'warning'
				}).then(() => {
					this.loading = true;
					this.$http.post(
						`${api.dev}/p/main/departmentDuty/deleteDuty`,
						{
							access_token : getToken() ,
							duty_id : this.currentDuty.duty_id,
							dpm_id : this.currentDepartment.dpm_id
						},
						{emulateJSON : true}
					).then(res => {
						if(res.body.code == 200) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.DepartmentChange(this.currentDepartment);
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
			}else{
				this.$message({
					message: '请选择要删除的职位',
					type: 'warning'
				});
			}
		},
		/* 新增部门 */
		submitAddForm1(formName) {
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
					formdata.append('dpm_remark',this.AddForm1.dpm_remark);
					formdata.append('dpm_name',this.AddForm1.dpm_name);
					this.$http.post(`${api.dev}/p/main/departmentDuty/saveDepartment`,formdata, {emulateJSON:true}).then(res => {
						loading.close();
						if(res.body.code == 200) {
							this.$message({
								message: res.body.msg,
								type: 'success'
							})
							this.cancleAddForm1(formName);
							this.loading = true;
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
		/* 编辑部门 */
		submitEditForm1(formName) {
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
					formdata.append('dpm_id',this.EditForm1.dpm_id);
					formdata.append('dpm_remark',this.EditForm1.dpm_remark);
					formdata.append('dpm_name',this.EditForm1.dpm_name);
					this.$http.post(`${api.dev}/p/main/departmentDuty/updateDepartment`,formdata, {emulateJSON:true}).then(res => {
						loading.close();
						if(res.body.code == 200) {
							this.$message({
								message: res.body.msg,
								type: 'success'
							})
							this.cancleEditForm1(formName);
							this.loading = true;
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
		/* 新增职位 */
		submitAddForm2(formName) {
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
					formdata.append('dpm_id',this.currentDepartment.dpm_id);
					formdata.append('duty_remark',this.AddForm2.duty_remark);
					formdata.append('duty_name',this.AddForm2.duty_name);
					this.$http.post(`${api.dev}/p/main/departmentDuty/saveDuty`,formdata, {emulateJSON:true}).then(res => {
						loading.close();
						if(res.body.code == 200) {
							this.$message({
								message: res.body.msg,
								type: 'success'
							})
							this.cancleAddForm2(formName);
							this.loading = true;
							this.DepartmentChange(this.currentDepartment);
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
		/* 编辑职位 */
		submitEditForm2(formName) {
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
					formdata.append('dpm_id',this.currentDepartment.dpm_id);
					formdata.append('duty_remark',this.EditForm2.duty_remark);
					formdata.append('duty_name',this.EditForm2.duty_name);
					formdata.append('duty_id',this.EditForm2.duty_id);
					this.$http.post(`${api.dev}/p/main/departmentDuty/updateDuty`,formdata, {emulateJSON:true}).then(res => {
						loading.close();
						if(res.body.code == 200) {
							this.$message({
								message: res.body.msg,
								type: 'success'
							})
							this.cancleEditForm2(formName);
							this.loading = true;
							this.DepartmentChange(this.currentDepartment);
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
		/* 取消新增部门 */
		cancleAddForm1(formName) {
			this.AddDialogTableVisible1 = false;
			this.$refs[formName].resetFields(); // 清除表单验证规则
		},
		/* 取消编辑部门 */
		cancleEditForm1(formName) {
			this.EditDialogTableVisible1 = false;
			this.$refs[formName].resetFields(); // 清除表单验证规则
		},
		/* 取消新增职位 */
		cancleAddForm2(formName) {
			this.AddDialogTableVisible2 = false;
			this.$refs[formName].resetFields(); // 清除表单验证规则
		},
		/* 取消编辑部门 */
		cancleEditForm2(formName) {
			this.EditDialogTableVisible2 = false;
			this.$refs[formName].resetFields(); // 清除表单验证规则
		},
		/* 分页 */
		handleCurrentChange1(val) {
			this.loading = true;
			this.start1 = 10 * (val - 1);
			this.getInfo();
		},
		handleCurrentChange2(val) {
			this.loading = true;
			this.start2 = 10 * (val - 1);
		}
	},
	created() {
		this.getSubPermission();
		this.getInfo();
	}
}
</script>


<style lang="stylus" scoped>
.pagination
	margin-top 10px
.margin-bottom-10
	margin-bottom 10px
.margin-bottom-6
	margin-bottom 6px
</style>
<style lang="stylus">

.departmentDuty{
	.el-table{
		&.table{
			border: 1px solid #ebebeb;
		}
		.cell{
			white-space: nowrap!important
		}
		&.el-table--medium{
			th{
				padding: 4px 0;
				background: #FAFAFA;
			}
			td{
				padding: 6px 0;
			}
		}
		.el-table__header-wrapper{
			width: 100%;
		}
		.el-table--striped .el-table__body tr.el-table__row--striped td{
			background: #fcfcfc;
		}
		.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td{
			background-color: rgba(123, 180, 208, 0.14);
		}
	}
	.el-button.is-circle{
		float: right;
		margin-left: 10px;
	}
	.el-row{
		span{
			line-height: 40px;
			font-size: 16px;
			color: #666;
		}
	}
} 
</style>