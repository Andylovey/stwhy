<template>
	<div class="friendchain">
		<el-button type="primary" @click="handleAdd()" class="AddVillageBtn"><i class="el-icon-edit"></i> 新增</el-button>
		<el-table
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.8)"
			border
			:data="tableData"
			style="width: 100%"
			height="calc(100% - 100px)">
			<!-- <el-table-column prop="fl_id" label="序号" sortable align="center" min-width="90"></el-table-column> -->
			<el-table-column prop="fl_name" label="名称" sortable align="center" min-width="180"></el-table-column>
			<el-table-column prop="fl_cover" label="封面图" sortable align="center" min-width="160">
				<template slot-scope="scope">
					<img
						:src="scope.row.fl_cover"
						height="34px"
						class="showImg"
						v-if="scope.row.fl_cover"
						@click="showImg(scope.row)">
				</template>
			</el-table-column>
			<el-table-column prop="fl_status" label="状态" sortable align="center" min-width="160"></el-table-column>
			<!-- <el-table-column prop="t_name" label="专题" sortable align="center" min-width="180"></el-table-column> -->
			<el-table-column prop="fl_url" label="链接" sortable align="center" min-width="220"></el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				align="center"
				min-width="180">
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
			@closed="DetailDialogClosed('DetailForm')"
			title="友链管理详情" 
			:close-on-click-modal="false">
			<!-- 表单 -->
			<el-form ref="DetailForm" :model="DetailForm" label-width="80px" style="width:100%;">
				<el-form-item label="名称">
					<el-input v-model="DetailForm.fl_name" disabled></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<!-- <el-input v-model="DetailForm.fl_status" disabled></el-input> -->
					<el-radio v-model="DetailForm.fl_status" label="0" disabled>隐藏</el-radio>
					<el-radio v-model="DetailForm.fl_status" label="1" disabled>显示</el-radio>
				</el-form-item>
				<el-form-item label="封面图" prop="fl_cover" class="hasImg">
					<el-input v-model="AddForm.fl_cover" v-show="false"></el-input>
					<el-upload
						:action="uploadAddressCover"
						:on-preview="handleDetailPictureCardPreview"
						:file-list="uploadFileList"
						disabled
						list-type="picture-card"
						:limit="1">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<!-- <el-form-item label="专题">
					<el-select v-model="DetailForm.fl_topic" style="width:300px" clearable disabled>
						<el-option v-for="item in selectTopic" :key="item.t_id" :label="item.t_name" :value="item.t_id"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="链接">
					<el-input v-model="DetailForm.fl_url" disabled></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 编辑的模态框 -->
		<el-dialog
			v-elDragDialog
			:visible.sync="EditDialogTableVisible"
			title="友链管理编辑" 
			@closed="EditDialogClosed('EditForm')"
			:close-on-click-modal="false">
			<!-- 表单 -->
			<el-form ref="EditForm" :model="EditForm" label-width="80px" :rules="EditRules" style="width:100%;">
				<el-form-item label="名称" prop="fl_name">
					<el-input v-model="EditForm.fl_name"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="fl_status">
					<!-- <el-input v-model="EditForm.fl_status"></el-input> -->
					<el-radio v-model="EditForm.fl_status" label="0">隐藏</el-radio>
					<el-radio v-model="EditForm.fl_status" label="1">显示</el-radio>
				</el-form-item>
				<el-form-item label="封面图" prop="fl_cover" :class="{'hasImg': isHasImg}" class="picBox">
					<el-input v-model="EditForm.fl_cover" v-show="false"></el-input>
					<el-upload
						:action="uploadAddressCover"
						:on-success="successEditUploadCover"
						:on-preview="handleEditPictureCardPreview"
						:on-remove="handleEditUploadRemove"
						:file-list="uploadFileList"
						:before-upload="beforeUpload"
						list-type="picture-card"
						:limit="1">
						<i class="el-icon-plus"></i>
					</el-upload>
					<span>上传图片大小: 180px * 48px</span>
				</el-form-item>
				<!-- <el-form-item label="专题" prop="fl_topic">
					<el-select v-model="EditForm.fl_topic" placeholder="请选择专题" style="width:300px" clearable>
						<el-option v-for="item in selectTopic" :key="item.t_id" :label="item.t_name" :value="item.t_id"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="链接" prop="fl_url">
					<el-input v-model="EditForm.fl_url"></el-input>
				</el-form-item>
				<el-form-item>
						<el-button type="primary" @click="submitEditForm('EditForm')">提交</el-button>
						<el-button @click="cancleEditForm('EditForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 新增的模态框 -->
		<el-dialog 
			v-elDragDialog
			:visible.sync="AddDialogTableVisible"
			title="新建友链管理" 
			@closed="AddDialogClosed('AddForm')"
			:close-on-click-modal="false">
			<!-- 表单 -->
			<el-form ref="AddForm" :model="AddForm" label-width="80px" :rules="AddRules" style="width:100%;">
				<el-form-item label="名称" prop="fl_name">
					<el-input v-model="AddForm.fl_name"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="fl_status">
					<!-- <el-input v-model="AddForm.fl_status"></el-input> -->
					<el-radio v-model="AddForm.fl_status" label="0">隐藏</el-radio>
					<el-radio v-model="AddForm.fl_status" label="1">显示</el-radio>
				</el-form-item>
				<el-form-item label="封面图" prop="fl_cover" :class="{'hasImg': isHasImg }" class="picBox">
					<el-input v-model="AddForm.fl_cover" v-show="false"></el-input>
					<el-upload
						:action="uploadAddressCover"
						:on-success="successAddUploadCover"
						:on-preview="handleAddPictureCardPreview"
						:on-remove="handleAddUploadRemove"
						:file-list="uploadFileList"
						:before-upload="beforeUpload"
						list-type="picture-card"
						:limit="1">
						<i class="el-icon-plus"></i>
					</el-upload>
					<span class="tip">上传图片大小: 180px * 48px</span>
				</el-form-item>
				<!-- <el-form-item label="专题" prop="fl_topic">
					<el-select v-model="AddForm.fl_topic" placeholder="请选择专题" style="width:300px" clearable>
						<el-option v-for="item in selectTopic" :key="item.t_id" :label="item.t_name" :value="item.t_id"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="链接" prop="fl_url">
					<el-input v-model="AddForm.fl_url"></el-input>
				</el-form-item>
				<el-form-item>
						<el-button type="primary" @click="submitAddForm('AddForm')">提交</el-button>
						<el-button @click="cancleAddForm('AddForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 放大首图 -->
		<el-dialog 
			:visible.sync="ImgDialog"
			:title="currentImg.title" 
			width="500px"
			:close-on-click-modal="false">
			<img :src="currentImg.src" width="100%">
		</el-dialog>

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
	name: 'friendchain',
	directives: { elDragDialog }, // 拖拽指令
	data() {
		return {
			loading : true , // 加载条
			tableData : [],
			total: 0, // 分页总条数
			start: 0, // 默认第一页
			limit: 10,  // 每页10条

			// 查看详情的数据
			DetailDialogTableVisible : false, // 详情框默认的模态框
			DetailForm : {
				fl_name : '',
				fl_status : '',
				// fl_topic : '',
				fl_url : ''
			},

			// 编辑的数据
			EditDialogTableVisible : false, // 编辑框默认的模态框
			EditForm : {
				fl_name : '',
				fl_status : '',
				// fl_topic : '',
				fl_url : ''
			},
			EditRules : {
				fl_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
				fl_status : [{required: true,message : '请选择状态', trigger: 'blur'}],
				// fl_topic : [{required: true,message : '请输入专题', trigger: 'change'}],
				fl_url : [{required: true,message : '请输入链接', trigger: 'blur'}],
			},

			// 新建的数据
			AddDialogTableVisible : false,
			AddForm : {
				fl_id : '',
				fl_name : '',
				fl_status : '',
				// fl_topic : '',
				fl_url : '',
			},
			AddRules : {
				fl_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
				fl_status : [{required: true,message : '请选择状态', trigger: 'blur'}],
				// fl_topic : [{required: true,message : '请输入专题', trigger: 'change'}],
				fl_url : [{required: true,message : '请输入链接', trigger: 'blur'}],
			},

			uploadAddressCover : `${api.dev}/p/collarTicket/list/uploadFile?access_token=${getToken()}`,
			dialogVisible: false,
			isHasImg: false,
			//currentImgConent: '',
			selectTopic: [],
			uploadFileList: [],

			ImgDialog: false,
			currentImg: {
				title: '',
				src: ''
			},
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
						this.$router.push({path: '/login'});
					},2000)
				}
			})
		},
		/* 查询专题信息 */
		getSelectTopic(){
			this.$http.get(
				`${api.dev}/p/main/drop/selectTopic`,
				{
					params:{
						access_token:getToken(),
						type: 0
					}
				}
			).then(res => {
				if(res.body.code == 200) {
					this.selectTopic = res.body.content;
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
						this.$router.push({path: '/login'});
					},2000)
				}
			})
		},
		getInfo() {
			this.$http.get(`${api.dev}/p/main/friendlink/show`,{params : {access_token: getToken() , start : this.start, limit : this.limit}}).then(res => {
				if(res.body.code == 200) {
					// 先过滤
					res.body.content.records.forEach( i => {
						if(i.fl_status == 0) {
							i.fl_status = '隐藏'
						}else if(i.fl_status == 1) {
							i.fl_status = '显示'
						}
						i.fl_cover = (i.fl_cover) ? `${api.address}${i.fl_cover}` : '';
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
						this.$router.push({path: '/login'});
					},2000)
				}
			})
		},
		handleAdd(row) {
			this.AddDialogTableVisible = true;
			//this.uploadFileList = [];
		},
		// 处理查看操作
		handleDetail(row) {
			// 开启加载器
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			this.$http.get(`${api.dev}/p/main/friendlink/select`,{params : {access_token : getToken() , fl_id : row.fl_id}}).then(res => {
				if(res.body.code == 200) {
					loading.close();
					this.DetailDialogTableVisible = true;

					this.DetailForm.fl_id = res.body.content.fl_id;
					this.DetailForm.fl_name = res.body.content.fl_name;
					this.DetailForm.fl_status = (res.body.content.fl_status).toString();
					// this.DetailForm.fl_topic = res.body.content.fl_topic;
					this.DetailForm.fl_url = res.body.content.fl_url;
					if(res.body.content.fl_cover){
						this.DetailForm.fl_cover = `${api.address}${res.body.content.fl_cover}`;
						this.uploadFileList.push({url: `${api.address}${res.body.content.fl_cover}`});
					}
				}else if(res.body.code == 500) {
					this.$message({
						message: res.body.msg,
						type: 'error'
					});
					removeToken();
					setTimeout(function () {
						this.$router.push({path: '/login'});
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
			this.$http.get(`${api.dev}/p/main/friendlink/select`,{params : {access_token : getToken() , fl_id : row.fl_id}}).then(res => {
				if(res.body.code == 200) {
					loading.close();
					this.EditDialogTableVisible = true;

					this.EditForm.fl_id = res.body.content.fl_id;
					this.EditForm.fl_name = res.body.content.fl_name;
					this.EditForm.fl_status = (res.body.content.fl_status).toString();
					// this.EditForm.fl_topic = res.body.content.fl_topic;
					this.EditForm.fl_url = res.body.content.fl_url;
					if(res.body.content.fl_cover){
						this.EditForm.fl_cover = `${api.address}${res.body.content.fl_cover}`;
						this.uploadFileList.push({url: `${api.address}${res.body.content.fl_cover}`});
						this.isHasImg = true;
					}
				}else if (res.body.code == 500) {
					this.$message({
						message: res.body.msg,
						type: 'error'
					});
					removeToken();
					setTimeout(function () {
						this.$router.push({path: '/login'});
					},2000)
				}
			})
		},
		// 处理删除操作
		handleDelete(row) {
			console.log(row);
			this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.loading = true;
				this.$http.post(`${api.dev}/p/main/friendlink/delete`,{access_token : getToken() , fl_id : row.fl_id},{emulateJSON : true}).then(res => {
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
							this.$router.push({path: '/login'});
						},2000)
					}
				})
			})
		},
		// 提交编辑操作
		submitEditForm(formName){
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
						fl_cover = this.EditForm.fl_cover;
					if(fl_cover){
						var index = fl_cover.indexOf('/upload/');
						fl_cover = fl_cover.substring(index);
					}
					formdata.append('access_token',getToken());
					formdata.append('fl_id',this.EditForm.fl_id);
					formdata.append('fl_name',this.EditForm.fl_name);
					formdata.append('fl_status',this.EditForm.fl_status);
					// formdata.append('fl_topic',this.EditForm.fl_topic);
					formdata.append('fl_url',this.EditForm.fl_url);
					formdata.append('fl_cover',fl_cover);
					this.$http.post(`${api.dev}/p/main/friendlink/update`,formdata,{emulateJSON : true}).then(res => {
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
						}else if (res.body.code == 500) {
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
		// 提交新增操作
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
						fl_cover = this.AddForm.fl_cover;
					if(fl_cover){
						var index = fl_cover.indexOf('/upload/');
						fl_cover = fl_cover.substring(index);
					}
					formdata.append('access_token',getToken());
					formdata.append('fl_name',this.AddForm.fl_name);
					formdata.append('fl_status',this.AddForm.fl_status);
					// formdata.append('fl_topic',this.AddForm.fl_topic);
					formdata.append('fl_url',this.AddForm.fl_url);
					if(this.AddForm.fl_cover) formdata.append('fl_cover', fl_cover);
					formdata.append('fl_id',this.AddForm.fl_id);
					this.$http.post(`${api.dev}/p/main/friendlink/save`,formdata,{emulateJSON: true}).then(res => {
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
						}else if (res.body.code == 500) {
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
		// 关闭新增框
		AddDialogClosed(formName) {
			this.$refs[formName].resetFields(); // 清除表单验证规则
			this.isHasImg = false;
			this.uploadFileList = [];
		},
		// 关闭编辑框
		EditDialogClosed(formName) {
			this.$refs[formName].clearValidate(); // 清除表单验证规则
			this.uploadFileList = [];
			this.isHasImg = false;
		},
		DetailDialogClosed(formName) {
			this.$refs[formName].clearValidate(); // 清除表单验证规则
			this.uploadFileList = [];
		},
		// 取消新增
		cancleAddForm(formName) {
			this.AddDialogTableVisible = false;
			this.$refs[formName].clearValidate(); // 清除表单验证规则
			this.isHasImg = false;
			this.uploadFileList = [];
		},
		// 取消编辑操作
		cancleEditForm(formName) {
			this.EditDialogTableVisible = false;
			this.$refs[formName].clearValidate(); // 清除表单验证规则
			this.uploadFileList = [];
			this.isHasImg = false;
		},
		handleCurrentChange(val) {
			this.loading = true;
			this.start = this.limit * (val - 1);
			this.getInfo();
		},
		successAddUploadCover(res,file) {
			this.AddForm.fl_cover = `${api.address}${res.content}`;
			//this.currentImgConent = res.content;
			this.isHasImg = true;
		},
		successEditUploadCover(res,file) {
			this.EditForm.fl_cover = `${api.address}${res.content}`;
			//this.currentImgConent = res.content;
			this.isHasImg = true;
		},
		handleAddPictureCardPreview(file){
			this.dialogVisible = true;
			this.currentImg.title = '';
			this.currentImg.src = this.AddForm.fl_cover;
		},
		handleEditPictureCardPreview(file){
			this.dialogVisible = true;
			this.currentImg.title = '';
			this.currentImg.src = this.EditForm.fl_cover;
		},
		handleDetailPictureCardPreview(file){
			this.dialogVisible = true;
			this.currentImg.title = '';
			this.currentImg.src = this.DetailForm.fl_cover;
		},
		handleAddUploadRemove(file,fileList) {
			this.isHasImg = false;
			this.AddForm.fl_cover = '';
		},
		handleEditUploadRemove(file,fileList) {
			this.isHasImg = false;
			this.EditForm.fl_cover = '';
		},
		/* 大图查看 */
		showImg(row){
			this.ImgDialog = true;
			this.currentImg.title = row.fl_name;
			this.currentImg.src = row.fl_cover;
		},
		beforeUpload(file){
			const testmsg= /^image\/(jpeg|png|jpg)$/.test(file.type);
			let that = this;
			console.log(file)
			if (!testmsg) {
	            this.$message({
					message: '请上传图片格式的文件',
					type: 'warning'
				})
	            return false;
        	}
			const isSize = new Promise(function(resolve, reject) {
				let width = 180;
				let height = 48;
				let _URL = window.URL || window.webkitURL;
				let img = new Image();
				img.onload = function() {
					let valid = img.width == width && img.height == height;
					valid ? resolve() : reject();
				}
				img.src = _URL.createObjectURL(file);
			}).then(() => {
				return file;
			}, () => {
				that.$message({
					message: '上传图片大小: 180px * 48px',
					type: 'error'
				})
				return Promise.reject();
  			});
 			return isSize
		},
	},
	created() {
		this.getLimit();
		this.getSelectTopic();
	}
}
</script>

<style lang="stylus" scoped>
.AddVillageBtn 
	margin-bottom 10px

</style>
<style lang="stylus">
.friendchain{
	.hasImg{
		.el-upload.el-upload--picture-card{
			display: none!important;
		}
	}
	.picBox{
		span.tip{
			font-size: 12px;
			color: #41B883;
			position: absolute;
			bottom: -4px;
			left: 0;
			line-height: 20px;
		}
	}
	.el-upload-list--picture-card .el-upload-list__item{
		width: 180px;
		height: 48px;
	}
	.el-upload--picture-card{
		width: 48px;
		height: 48px;
		line-height: 56px;
		margin-bottom: 21px;
	}
}
</style>