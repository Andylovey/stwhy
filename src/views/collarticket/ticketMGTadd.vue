<template>
	<div class="ticketMGTadd">
		<!-- 表单 -->
		<el-form ref="AddForm" :model="AddForm" label-width="140px" :rules="AddRules">
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="活动举办方" prop="tl_host">
						<el-input v-model="AddForm.tl_host" placeholder="请输入活动举办方"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="标题名称" prop="tl_name">
						<el-input v-model="AddForm.tl_name" placeholder="请输入标题名称"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="活动地点" prop="tl_place">
						<el-input v-model="AddForm.tl_place" placeholder="请输入活动地点"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="活动首图" prop="tl_imgurl" :class="{'hasImg': isHasImg}">
						<el-input v-model="AddForm.tl_imgurl" v-show="false"></el-input>
						<!--<el-upload
							class="avatar-uploader"
							:action="uploadAddressCover"
							:on-success="successAddUploadCover"
							:show-file-list="false">
							<img v-if="AddForm.tl_imgurl" :src="AddForm.tl_imgurl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>-->
						<el-upload
							:action="uploadAddressCover"
							:on-success="successAddUploadCover"
							:on-remove="handleAddUploadRemove"
							:on-preview="handlePictureCardPreview"
							list-type="picture-card"
							:limit="1"
							:before-upload="beforeUploadCover">
							<i class="el-icon-plus"></i>
						</el-upload>
						<p style="margin:0;color:red">图片格式：".bmp", ".jpg", ".jpeg", ".png"</p>
						<el-dialog :visible.sync="dialogVisible" width="40%">
							<img width="100%" :src="AddForm.tl_imgurl" alt="">
						</el-dialog>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="活动时间" prop="tl_time" placeholder="请输入活动时间">
						<el-date-picker
							v-model="AddForm.tl_time"
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
						<el-date-picker type="datetime" placeholder="选择领取时间" v-model="AddForm.tl_gettime" style="width: 100%;" value-format="yyyy-MM-dd hh:mm" format="yyyy-MM-dd hh:mm"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="是否需要身份证" prop="tl_isidentity">
						<el-radio v-model="AddForm.tl_isidentity" label="1">是</el-radio>
						<el-radio v-model="AddForm.tl_isidentity" label="0">否</el-radio>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="是否需要报名" prop="tl_issignup">
						<el-radio v-model="AddForm.tl_issignup" label="1">是</el-radio>
						<el-radio v-model="AddForm.tl_issignup" label="0">否</el-radio>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="库存数量" prop="tl_num">
						<el-input v-model.number="AddForm.tl_num" placeholder="请输入库存数量"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="每人限领数量" prop="tl_limitnum">
						<el-input v-model.number="AddForm.tl_limitnum" placeholder="请输入每人限领数量"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="排序" prop="tl_sort">
						<el-input v-model.number="AddForm.tl_sort" placeholder="请输入排序值（值越大越靠前）"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="描述信息" prop="tl_content">
						<el-input type="textarea" v-model="AddForm.tl_content" placeholder="请输入描述信息" rows="3"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="摘要信息" prop="tl_summary">
						<el-input type="textarea" v-model="AddForm.tl_summary" placeholder="请输入摘要信息" rows="3"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="7">
					<el-form-item label="分享的标题内容" prop="tl_share_title">
						<el-input v-model="AddForm.tl_share_title" placeholder="请输入分享的标题内容（需要分享功能时，必须填写）"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg">
				<el-col :span="14">
					<el-form-item label="分享的描述信息" prop="tl_share_content">
						<el-input type="textarea" v-model="AddForm.tl_share_content" placeholder="请输入分享的描述信息（需要分享功能时，必须填写）" rows="3"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<el-footer>
			<el-button type="primary" @click="goBack" size="small" icon="el-icon-arrow-left">返回</el-button>
			<el-button type="primary" @click="submitAddForm('AddForm')" size="small" icon="el-icon-edit-outline">保存</el-button>
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
				AddForm : {
					tl_host : '',
					tl_name : '',
					tl_place : '',
					tl_imgurl : '',
					tl_time : '',
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
				AddRules : {
					tl_host : [{required: true, message : '请输入活动举办方', trigger: 'blur'}],
					tl_name : [{required: true, message : '请输入标题名称', trigger: 'blur'}],
					tl_place : [{required: true, message : '请输入活动地点', trigger: 'blur'}],
					tl_imgurl : [{required: true, message : '请选择首图图片', trigger: 'change'}],
					tl_content : [{required: true, message : '请输入描述信息', trigger: 'blur'}],
					tl_time : [{required: true, message : '请输入活动时间', trigger: 'blur'}],
					tl_gettime : [{required: true, message : '请输入领取时间', trigger: 'blur'}],
					tl_isidentity : [{required: true, message : '请选择是否需要身份证', trigger: 'blur,change'}],
					tl_issignup : [{required: true, message : '请选择是否需要报名', trigger: 'blur,change'}],
					tl_num : [{required: true, message : '请输入库存数量（-1为无限制）', trigger: 'blur'}],
					tl_limitnum : [{required: true, message : '请输入每人限领数量', trigger: 'blur'}],
					tl_sort : [{required: true, message : '请选择排序', trigger: 'blur'}],
					tl_summary : [{required: true, message : '请输入活动名称', trigger: 'blur'}]
				},
				isHasImg: false,
			}
	},
	methods : {
		goBack() {
				this.$router.back(-1);
		},
		successAddUploadCover(res,file) {
			this.AddForm.tl_imgurl = `${api.address}${res.content}`;
			this.currentImgConent = res.content;
			this.isHasImg = true;
		},
		handleAddUploadRemove(file,fileList) {
			this.isHasImg = false;
			this.AddForm.tl_imgurl = '';
		},
		handlePictureCardPreview(file){
			//this.dialogImageUrl = file.url;
        	this.dialogVisible = true;
		},
		// 保存操作
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
						tl_starttime = formatDate(new Date(this.AddForm.tl_time[0]) , 'yyyy-MM-dd hh:mm'),
						tl_endtime = formatDate(new Date(this.AddForm.tl_time[1]) , 'yyyy-MM-dd hh:mm'),
						tl_gettime = formatDate(new Date(this.AddForm.tl_gettime) , 'yyyy-MM-dd hh:mm'),
						tl_imgurl = this.AddForm.tl_imgurl;
					var index = tl_imgurl.indexOf('/upload/');
						tl_imgurl = tl_imgurl.substring(index);
					formdata.append('access_token',getToken());
					formdata.append('tl_name',this.AddForm.tl_name);
					formdata.append('tl_summary',this.AddForm.tl_summary);
					formdata.append('tl_imgurl',tl_imgurl);
					formdata.append('tl_content',this.AddForm.tl_content);
					formdata.append('tl_num',this.AddForm.tl_num);
					formdata.append('tl_limitnum',this.AddForm.tl_limitnum);
					formdata.append('tl_issignup',this.AddForm.tl_issignup);
					formdata.append('tl_isidentity',this.AddForm.tl_isidentity);
					formdata.append('tl_place',this.AddForm.tl_place);
					formdata.append('tl_host',this.AddForm.tl_host);
					formdata.append('tl_share_title',this.AddForm.tl_share_title);
					formdata.append('tl_share_content',this.AddForm.tl_share_content);
					formdata.append('tl_gettime',tl_gettime);
					formdata.append('tl_starttime',tl_starttime);
					formdata.append('tl_endtime',tl_endtime);
					formdata.append('tl_sort',this.AddForm.tl_sort);

					this.$http.post(`${api.dev}/p/collarTicket/list/save`,formdata, {emulateJSON:true}).then(res => {
						loading.close();
						if(res.body.code == 200) {
							this.$message({
								message: res.body.msg,
								type: 'success'
							})
							this.$router.back(-1);
							this.loading = true;
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
.ticketMGTadd{
	.hasImg{
		.el-upload.el-upload--picture-card{
			display: none!important;
		}
	}
}
</style>
