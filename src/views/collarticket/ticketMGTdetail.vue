<template>
	<div>
	<!-- 表单 -->
	<el-form ref="DetailForm" :model="DetailForm" label-width="140px">
		<el-row type="flex" class="row-bg">
			<el-col :span="7">
				<el-form-item label="活动举办方" prop="tl_host">
					<el-input v-model="DetailForm.tl_host" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="7">
				<el-form-item label="标题名称" prop="tl_name">
					<el-input v-model="DetailForm.tl_name" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="14">
				<el-form-item label="活动地点" prop="tl_place">
					<el-input v-model="DetailForm.tl_place" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="14">
				<el-form-item label="活动首图" prop="tl_imgurl">
					<el-input v-model="DetailForm.tl_imgurl" v-show="false"></el-input>
					<!-- <el-upload
						class="avatar-uploader disabled"
						action=""
						readonly
						>
						<img v-if="DetailForm.tl_imgurl" :src="DetailForm.tl_imgurl" class="avatar">
					</el-upload> -->
					<el-upload
						:action="uploadAddressCover"
						:on-success="successAddUploadCover"
						:on-preview="handlePictureCardPreview"
						list-type="picture-card"
						:limit="1"
						:file-list="detailUploadFileList"
						disabled
						class="disabled"
						>
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible" width="40%">
						<img width="100%" :src="DetailForm.tl_imgurl" alt="">
					</el-dialog>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="14">
				<el-form-item label="活动时间" prop="tl_time">
					<el-date-picker
						v-model="DetailForm.tl_time"
						type="daterange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						style="width: 100%;"
						readonly
					>
					</el-date-picker>
				</el-form-item>
				</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="7">
				<el-form-item label="领取时间" prop="tl_gettime">
					<el-date-picker type="date"  v-model="DetailForm.tl_gettime" style="width: 100%;" readonly></el-date-picker>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="7">
				<el-form-item label="是否需要身份证" prop="tl_isidentity" disabled>
					<el-radio v-model="DetailForm.tl_isidentityText" label="1" disabled>是</el-radio>
					<el-radio v-model="DetailForm.tl_isidentityText" label="0" disabled>否</el-radio>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="7">
				<el-form-item label="是否需要报名" prop="tl_issignup" disabled>
					<el-radio v-model="DetailForm.tl_issignupText" label="1" disabled>是</el-radio>
					<el-radio v-model="DetailForm.tl_issignupText" label="0" disabled>否</el-radio>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="7">
				<el-form-item label="库存数量" prop="tl_num">
					<el-input v-model.number="DetailForm.tl_num" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="7">
				<el-form-item label="每人限领数量" prop="tl_limitnum">
					<el-input v-model.number="DetailForm.tl_limitnum" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="7">
				<el-form-item label="排序" prop="tl_sort">
					<el-input v-model.number="DetailForm.tl_sort" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="14">
				<el-form-item label="描述信息" prop="tl_content">
					<el-input type="textarea" v-model="DetailForm.tl_content" rows="3" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="14">
				<el-form-item label="摘要信息" prop="tl_summary">
					<el-input type="textarea" v-model="DetailForm.tl_summary" rows="3" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="7">
				<el-form-item label="分享的标题内容" prop="tl_share_title">
					<el-input v-model="DetailForm.tl_share_title" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg">
			<el-col :span="14">
				<el-form-item label="分享的描述信息" prop="tl_share_content">
					<el-input type="textarea" v-model="DetailForm.tl_share_content" rows="3" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>

	<el-footer>
		<el-button type="primary" @click="goBack" size="small" icon="el-icon-arrow-left">返回</el-button>
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
		detailUploadFileList: [],
		dialogVisible: false,
		DetailForm : {
			tl_host : '',
			tl_name : '',
			tl_place : '',
			tl_imgurl : '',
			tl_starttime : '',
			tl_endtime : '',
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
		}
	},
	methods : {
		goBack() {
			this.$router.back(-1);
		},
		getInfo() {
			// 开启加载器
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
						data.tl_isidentityText = '1';
					}else{
						data.tl_isidentityText = '0';
					}
					if(data.tl_issignup) {
						data.tl_issignupText = '1';
					}else{
						data.tl_issignupText = '0';
					}
					data.tl_time = [data.tl_starttime, data.tl_endtime];
					this.detailUploadFileList.push({url: `${api.address}${data.tl_imgurl}`});
					data.tl_imgurl = `${api.address}${data.tl_imgurl}`
					this.DetailForm = data;
					this.DetailDialogTableVisible = true;
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
		},
		handlePictureCardPreview(file){
			//this.currentImgConent = file.url;
        	this.dialogVisible = true;
		}
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
