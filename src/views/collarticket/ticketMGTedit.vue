<template>
	<div class="ticketMGTedit">
		<!-- 表单 -->
		<el-form ref="EditForm" :model="EditForm" label-width="140px" :rules="EditRules" class="ee">
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="活动举办方" prop="tl_host">
						<el-input v-model="EditForm.tl_host" placeholder="请输入活动举办方"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="标题名称" prop="tl_name">
						<el-input v-model="EditForm.tl_name" placeholder="请输入标题名称"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="活动地点" prop="tl_place">
						<el-input v-model="EditForm.tl_place" placeholder="请输入活动地点"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="活动首图" prop="tl_imgurl" :class="{'hasImg': isHasImg}">
						<el-input v-model="EditForm.tl_imgurl" v-show="false"></el-input>
						<!-- <el-upload
							class="avatar-uploader"
							:action="uploadAddressCover"
							:on-success="successAddUploadCover"
							:show-file-list="false">
							<img v-if="EditForm.tl_imgurl" :src="EditForm.tl_imgurl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload> -->
						<el-upload
							:action="uploadAddressCover"
							:on-success="successAddUploadCover"
							:on-remove="handleAddUploadRemove"
							:on-exceed="errorAddUploadCover"
							:on-preview="handlePictureCardPreview"
							list-type="picture-card"
							:limit="1"
							:file-list="editUploadFileList"
							:before-upload="beforeUploadCover">
							<i class="el-icon-plus"></i>
						</el-upload>
						<p style="margin:0;color:red">图片格式：".bmp", ".jpg", ".jpeg", ".png"</p>
						<el-dialog :visible.sync="dialogVisible" width="40%">
							<img width="100%" :src="EditForm.tl_imgurl" alt="">
						</el-dialog>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="活动时间" prop="tl_time" placeholder="请输入活动时间">
						<el-date-picker
							v-model="EditForm.tl_time"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="yyyy-MM-dd hh:mm"
							format="yyyy-MM-dd hh:mm"
							style="width: 100%;"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="领取时间" prop="tl_gettime">
						<el-date-picker type="datetime" placeholder="选择领取时间" v-model="EditForm.tl_gettime" style="width: 100%;" value-format="yyyy-MM-dd hh:mm" format="yyyy-MM-dd hh:mm"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="是否需要身份证" prop="tl_isidentity">
						<el-radio v-model="EditForm.tl_isidentity" label="1">是</el-radio>
						<el-radio v-model="EditForm.tl_isidentity" label="0">否</el-radio>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="是否需要报名" prop="tl_issignup">
						<el-radio v-model="EditForm.tl_issignup" label="1">是</el-radio>
						<el-radio v-model="EditForm.tl_issignup" label="0">否</el-radio>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="库存数量" prop="tl_num">
						<el-input v-model.number="EditForm.tl_num" placeholder="请输入库存数量"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="每人限领数量" prop="tl_limitnum">
						<el-input v-model.number="EditForm.tl_limitnum" placeholder="请输入每人限领数量"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="排序" prop="tl_sort">
						<el-input v-model.number="EditForm.tl_sort" placeholder="请输入排序值（值越大越靠前）"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="描述信息" prop="tl_content">
						<el-input type="textarea" v-model="EditForm.tl_content" placeholder="请输入描述信息" rows="3"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="摘要信息" prop="tl_summary">
						<el-input type="textarea" v-model="EditForm.tl_summary" placeholder="请输入摘要信息" rows="3"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="分享的标题内容" prop="tl_share_title">
						<el-input v-model="EditForm.tl_share_title" placeholder="请输入分享的标题内容（需要分享功能时，必须填写）"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="分享的描述信息" prop="tl_share_content">
						<el-input type="textarea" v-model="EditForm.tl_share_content" placeholder="请输入分享的描述信息（需要分享功能时，必须填写）" rows="3"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<el-footer>
			<el-button type="primary" @click="goBack" size="small" icon="el-icon-arrow-left">返回</el-button>
			<el-button type="primary" @click="submitEditForm('EditForm')" size="small" icon="el-icon-edit-outline">保存</el-button>
		</el-footer>
	</div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'
// 时间过滤器
import {formatDate} from '@/filter/date.js';

export default {
	name: 'componentspage1',
	data() {
			return {
				uploadAddressCover : `${api.dev}/p/collarTicket/list/uploadFile?access_token=${getToken()}`,
				currentImgConent: '',
				dialogVisible: false,
				editUploadFileList : [], // 上传图片的组成的一个数组
				EditForm : {
					tl_host : '',
					tl_name : '',
					tl_place : '',
					tl_imgurl : '',
					tl_content: '',
					tl_time: '',
					tl_gettime : '',
					tl_isidentity : '',
					tl_issignup : '',
					tl_num : '',
					tl_limitnum : '',
					tl_sort : '',
					tl_summary : '',
					tl_share_title: '',
					tl_share_content: ''
				},
				EditRules : {
					tl_host : [{required: true, message : '请输入活动举办方', trigger: 'blur'}],
					tl_name : [{required: true, message : '请输入标题名称', trigger: 'blur'}],
					tl_place : [{required: true, message : '请输入活动地点', trigger: 'blur'}],
					tl_imgurl : [{required: true, message : '请输入首图地址', trigger: 'blur'}],
					tl_content : [{required: true, message : '请输入描述信息', trigger: 'blur'}],
					tl_time : [{required: true, message : '请输入活动时间', trigger: 'blur'}],
					tl_gettime : [{required: true, message : '请输入领取时间', trigger: 'blur'}],
					tl_isidentity : [{required: true, message : '请选择是否需要身份证', trigger: 'blur'}],
					tl_issignup : [{required: true, message : '请选择是否需要报名', trigger: 'blur'}],
					tl_num : [{required: true, message : '请输入库存数量（-1为无限制）', trigger: 'blur'}],
					tl_limitnum : [{required: true, message : '请输入每人限领数量', trigger: 'blur'}],
					tl_sort : [{required: true, message : '请选择排序', trigger: 'blur'}],
					tl_summary : [{required: true, message : '请输入活动名称', trigger: 'blur'}],
					tl_share_title : [{required: false, message : '请输入分享的标题内容（需要分享功能时，必须填写）', trigger: 'blur'}],
					tl_share_content : [{required: false, message : '请输入分享的描述信息（需要分享功能时，必须填写）', trigger: 'blur'}]
				},
				isHasImg: false,
			}
	},
	methods : {
		goBack() {
				this.$router.back(-1);
		},
		getInfo() {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			this.$http.post(
				`${api.dev}/p/collarTicket/list/select`,
				{
					access_token: getToken(),
					tl_id: this.$route.params.id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					var data = res.body.content;
						data.tl_starttime = formatDate(new Date(data.tl_starttime) , 'yyyy-MM-dd hh:mm');
						data.tl_endtime = formatDate(new Date(data.tl_endtime) , 'yyyy-MM-dd hh:mm');
						data.tl_gettime = formatDate(new Date(data.tl_gettime) , 'yyyy-MM-dd hh:mm');
						data.tl_time = [data.tl_starttime, data.tl_endtime];
						if(data.tl_isidentity) {
							data.tl_isidentity = '1';
						}else{
							data.tl_isidentity = '0';
						}
						if(data.tl_issignup) {
							data.tl_issignup = '1';
						}else{
							data.tl_issignup = '0';
						}
						data.tl_time = [data.tl_starttime, data.tl_endtime];
						
						//data.tl_imgurl = `${api.address}${data.tl_imgurl}`;
						if(data.tl_imgurl){
							this.editUploadFileList.push({url: `${api.address}${data.tl_imgurl}`});
							data.tl_imgurl = `${api.address}${data.tl_imgurl}`;
							this.isHasImg = true;
						}
						
					console.log(this.editUploadFileList)
					this.EditForm = data;
					this.EditDialogTableVisible = true;
					loading.close();
				}else if(res.body.code == 500) {
					this.$message({
						message: res.body.msg,
						type: 'error'
					});
					loading.close();
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
		successAddUploadCover(res,file) {
			this.EditForm.tl_imgurl = `${api.address}${res.content}`;
			this.currentImgConent = res.content;
			this.isHasImg = true;
		},
		handleAddUploadRemove(file,fileList) {
			this.isHasImg = false;
			this.EditForm.tl_imgurl = '';
		},
		errorAddUploadCover(res,file) {
			this.$message({
				message: '只能上传一张图片',
				type: 'error'
			});
		},
		handlePictureCardPreview(file){
			this.currentImgConent = file.url;
        	this.dialogVisible = true;
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
					var formdata = new FormData(),
						tl_starttime = formatDate(new Date(this.EditForm.tl_time[0]) , 'yyyy-MM-dd hh:mm'),
						tl_endtime = formatDate(new Date(this.EditForm.tl_time[1]) , 'yyyy-MM-dd hh:mm'),
						tl_gettime = formatDate(new Date(this.EditForm.tl_gettime) , 'yyyy-MM-dd hh:mm'),
						tl_imgurl = this.EditForm.tl_imgurl;
					var index = tl_imgurl.indexOf('/upload/');
						tl_imgurl = tl_imgurl.substring(index);
					formdata.append('access_token',getToken());
					formdata.append('tl_id',this.EditForm.tl_id);
					formdata.append('tl_name',this.EditForm.tl_name);
					formdata.append('tl_summary',this.EditForm.tl_summary);
					formdata.append('tl_imgurl',tl_imgurl);
					formdata.append('tl_content',this.EditForm.tl_content);
					formdata.append('tl_num',this.EditForm.tl_num);
					formdata.append('tl_limitnum',this.EditForm.tl_limitnum);
					formdata.append('tl_issignup',this.EditForm.tl_issignup);
					formdata.append('tl_isidentity',this.EditForm.tl_isidentity);
					formdata.append('tl_place',this.EditForm.tl_place);
					formdata.append('tl_host',this.EditForm.tl_host);
					formdata.append('tl_share_title',this.EditForm.tl_share_title);
					formdata.append('tl_share_content',this.EditForm.tl_share_content);
					formdata.append('tl_gettime',tl_gettime);
					formdata.append('tl_starttime',tl_starttime);
					formdata.append('tl_endtime',tl_endtime);
					formdata.append('tl_sort',this.EditForm.tl_sort);
					this.$http.post(
						`${api.dev}/p/collarTicket/list/update`,
						formdata,
						{emulateJSON:true}
					).then(res => {
						loading.close();
						if(res.body.code == 200) {
							this.$message({
								message: res.body.msg,
								type: 'success'
							});
							this.$router.back(-1);
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
		beforeUploadCover(file) {
			const isLt5M = file.size / 1024 / 1024  < 5;
			if (['image/jpg', 'image/jpeg', 'image/bmp','image/png'].indexOf(file.type) == -1) {
				this.$message.error('请上传正确的图片格式');
				return false;
			}
			if (!isLt5M) {
				this.$message.error('上传图片大小不能超过5MB!');
				return false;
			}
    	},
	},
	created() {
		this.getInfo();
	}
}
</script>

<style lang="stylus" scoped>
.el-form
	padding-bottom 100px;
.el-footer 
		background-color #A3C0D1;
		color #333;
		line-height 60px;
		position absolute;
		width 100%;
		bottom 0;
		z-index 9999
		margin-left -15px
</style>
<style lang="stylus">
.ticketMGTedit{
	.hasImg{
		.el-upload.el-upload--picture-card{
			display: none!important;
		}
	}
}
</style>
