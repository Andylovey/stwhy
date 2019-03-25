<template>
	<div class="ballot">
		<el-form ref="AddForm" :model="AddForm" style="margin-bottom:60px; height:calc(100% - 50px)" :rules="AddRules">
			<el-tabs type="border-card" @tab-click="handleClick">
				<el-tab-pane label="投票设置">
					<el-row type="flex" class="row-bg">
						<el-col style="width: 466px;">
							<el-form-item label="投票活动名称" prop="vl_name" label-width="130px">
								<el-input style="width:24em" v-model="AddForm.vl_name" placeholder="请输入活动名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="投票编码" prop="vl_code" label-width="130px">
								<el-input style="width:13em" v-model="AddForm.vl_code" placeholder="投票唯一标识"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col style="width: 396px;">
							<el-form-item label="活动开始时间" prop="vl_starttime" label-width="130px">
								<el-date-picker
									type="datetime"
									value-format="timestamp"
									v-model="AddForm.vl_starttime"
									style="width:18em"
									placeholder="选择活动开始时间">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="活动结束时间" prop="vl_endtime" label-width="130px">
								<el-date-picker
									type="datetime"
									value-format="timestamp"
									v-model="AddForm.vl_endtime"
									style="width:18em"
									placeholder="选择活动结束时间">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="投票手机验证" prop="vl_need_binding" label-width="130px">
								<el-radio v-model="AddForm.vl_need_binding" label="1">开启</el-radio>
								<el-radio v-model="AddForm.vl_need_binding" label="0">关闭</el-radio>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col style="width: 670px">
							<el-form-item label="投票限制" prop="vl_set_permission" label-width="130px">
								<el-radio-group v-model="AddForm.vl_set_permission" @change="handleCheckedSetPermission">
									<el-radio label="每个ID只限一票">每个ID只限一票</el-radio>
									<el-radio label="每个ID每日一票">每个ID每日一票</el-radio>
									<el-radio label="每个ID每日n票">自定义</el-radio>
								</el-radio-group>
								<span style="color: #606266">（每个ID每日</span><el-input style="width:3em; margin: 0 6px;" v-model.number="AddForm.num" :disabled="!isSetPermission"></el-input><span style="color: #606266">票）</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="投票编号" prop="vl_numtype" label-width="130px">
								<el-radio v-model="AddForm.vl_numtype" label="1">以编码为前缀自增</el-radio>
								<el-radio v-model="AddForm.vl_numtype" label="2">纯数字自增</el-radio>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">	
						<el-col :span="14">
							<el-form-item label="投票性质" prop="vl_type" label-width="130px" >
								<el-radio-group v-model="AddForm.vl_type" @change="handleCheckedType">
									<el-radio label="1">常规</el-radio>
									<el-radio label="2">报名式</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<template v-if="Number(AddForm.vl_type) != 1">
						<el-row class="row-bg">	
							<el-col style="width: 830px;">
								<el-form-item label="报名时提交内容" label-width="130px" class="inline-block">
									<el-checkbox-group v-model="AddForm.vl_isneed_name">
										<el-checkbox label="参赛者姓名"></el-checkbox>
									</el-checkbox-group>
									<el-checkbox-group v-model="AddForm.vl_isneed_phone">
										<el-checkbox label="参赛者手机"></el-checkbox>
									</el-checkbox-group>
									<el-checkbox-group v-model="AddForm.vl_isneed_img" class="no-width" @change="handleCheckedIsneed_img">
										<el-checkbox label="参赛图片"></el-checkbox>
									</el-checkbox-group>
									<span style="color: #606266">（图片</span>
								</el-form-item>
								<el-form-item prop="vl_isneed_img_count" class="inline-block">
									<span style="color: #606266">张数</span>
									<el-input class="smallInput" style="width:3em; margin: 0 6px; " v-model="AddForm.vl_isneed_img_count" :disabled="!isneed_img"></el-input>
									<span style="color: #606266">张，尺寸要求</span>
								</el-form-item>
								<el-form-item prop="vl_isneed_img_width" class="inline-block">
									<el-input class="smallInput" style="width:3.5em; margin: 0 6px;" v-model="AddForm.vl_isneed_img_width" :disabled="!isneed_img"></el-input>
									<span style="color: #606266">X</span>
								</el-form-item>
								<el-form-item prop="vl_isneed_img_height" class="inline-block">
									<el-input class="smallInput" style="width:3.5em; margin: 0 6px;" v-model="AddForm.vl_isneed_img_height" :disabled="!isneed_img"></el-input>
									<span style="color: #606266">）</span>
								</el-form-item>
								<el-form-item label-width="130px">
									<el-checkbox-group v-model="AddForm.vl_isneed_content">
										<el-checkbox label="参赛内容名称"></el-checkbox>
									</el-checkbox-group>
									<el-checkbox-group v-model="AddForm.vl_isneed_desc">
										<el-checkbox label="简介/描述"></el-checkbox>
									</el-checkbox-group>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row type="flex" class="row-bg">	
							<el-col :span="14">
								<el-form-item label="报名是否需审核" prop="vl_sign_isaudit" label-width="130px">
									<el-radio v-model="AddForm.vl_sign_isaudit" label="1">是</el-radio>
									<el-radio v-model="AddForm.vl_sign_isaudit" label="0">否</el-radio>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row type="flex" class="row-bg">
							<el-col style="width: 396px;">
								<el-form-item label="报名开始时间" prop="vl_sign_starttime" label-width="130px">
									<el-date-picker
										type="datetime"
										value-format="timestamp"
										v-model="AddForm.vl_sign_starttime"
										style="width:18em"
										placeholder="选择报名开始时间">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="7">
								<el-form-item label="报名结束时间" prop="vl_sign_endtime" label-width="130px">
									<el-date-picker
										type="datetime"
										value-format="timestamp"
										v-model="AddForm.vl_sign_endtime"
										style="width:18em"
										placeholder="选择报名结束时间">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
					</template>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="投票规则说明" prop="vl_rule" label-width="130px" class="margin-bottom-0">
								<el-input type="textarea" v-model="AddForm.vl_rule" rows="5" placeholder="请输入投票规则说明" style="width:648px"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="版面设置">
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="广告轮播图" prop="ad_imgs" label-width="130px">
								<el-upload
									:action="AddUploadUrl"
									list-type="picture-card"
									:on-success="handleAddUploadSuccess1"
									:on-preview="handleAddPreview"
									:on-remove="handleAddUploadRemove1"
									:limit="4"
									:before-upload="beforeUploadCover">
									<i class="el-icon-plus"></i>
								</el-upload>
								<p style="margin:0;color:red">图片格式：".bmp", ".jpg", ".jpeg", ".png"</p>
							</el-form-item>
						</el-col>
					</el-row>		
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="投票排列顺序" prop="vl_vote_sort" label-width="130px">
								<el-radio v-model="AddForm.vl_vote_sort" label="1">按票数倒序</el-radio>
								<el-radio v-model="AddForm.vl_vote_sort" label="2">按时间正序</el-radio>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="展示方式" prop="vl_img_show" label-width="130px">
								<el-radio v-model="AddForm.vl_img_show" label="1">瀑布流（适合竖图）</el-radio>
								<el-radio v-model="AddForm.vl_img_show" label="2">水平铺满（适合横图）</el-radio>
							</el-form-item>
						</el-col>
					</el-row>		
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="色调" prop="vl_color" label-width="130px">
								<el-color-picker
									v-model="AddForm.vl_color"
									color-format="rgb">
								</el-color-picker>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="分享设置">
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="分享标题" prop="vl_share_title" label-width="130px">
								<el-input v-model="AddForm.vl_share_title" placeholder="最多不超过80个字" maxlength="80"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="分享描述" prop="vl_share_content" label-width="130px">
								<el-input type="textarea" v-model="AddForm.vl_share_content" placeholder="最多不超过200个字" rows="5" maxlength="200"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="分享图片" prop="vl_share_img" label-width="130px">
								<el-upload
									:action="AddUploadUrl"
									list-type="picture-card"
									:on-success="handleAddUploadSuccess2"
									:on-preview="handleAddPreview"
									:on-remove="handleAddUploadRemove2"
									:before-upload="beforeUploadCover">
									<i class="el-icon-plus"></i>
								</el-upload>
								<p style="margin:0;color:red">图片格式：".bmp", ".jpg", ".jpeg", ".png"</p>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</el-form>

		<el-dialog :visible.sync="AddPreviewDialogVisible">
			<img width="100%" :src="AddPreviewDialogImageUrl" alt="">
		</el-dialog>
		<el-footer>
			<el-button type="primary" @click="goBack" icon="el-icon-arrow-left">返回</el-button>
			<el-button type="primary" @click="Save('AddForm')" icon="fa fa-save"> 保存</el-button>
			<el-button type="primary" @click="AddSubmit('AddForm')" icon="fa fa-check"> 提交</el-button>
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
		// 投票限制
		var checkSetPermission = (rule, value, callback) => {
			if(!value){
				return callback(new Error('请选择权限设置'));
			} else {
				//console.log(value);
				if(value == '每个ID每日n票' && this.AddForm.num == '') {
					return callback(new Error('请输入票数'));
				} else {
					callback();
				}
			}
		};
		return {
			AddForm : {
				vl_name : '',
				vl_type : '',
				vl_rule : '',
				vl_starttime : '',
				vl_endtime : '',
				vl_set_permission : '',
				vl_need_binding : '',
				vl_img_show : '',
				vl_vote_sort : '',
				vl_color : '',
				vl_share_title : '',
				vl_share_content : '',
				vl_share_img : [],
				vl_code : '',
				vl_numtype : '',
				vl_sign_starttime : '',
				vl_sign_endtime : '',
				vl_sign_isaudit : '',
				vl_isneed_name : '',
				vl_isneed_phone : '',
				vl_isneed_img : '',
				vl_isneed_content : '',
				vl_isneed_desc : '',
				ad_imgs : [],
				num : '',
				vl_isneed_img_count : '',
				vl_isneed_img_width : '',
				vl_isneed_img_height : ''
			},
			AddUploadUrl : `${api.dev}/p/vote/manager/uploadFile?access_token=${getToken()}`, // 上传图片路径
			AddPreviewDialogVisible : false, // 默认放大图片为false
			AddPreviewDialogImageUrl : '' , // 放大图片的路径
			isneed_img: false,
			isSetPermission : false,
			AddRules : {
				vl_name : [{required: true, message : '请输入活动名称', trigger: 'blur'}],
				vl_rule : [{required: true, message : '请输入投票规则说明', trigger: 'blur'}],
				vl_need_binding : [{required: true, message : '请选择手机验证绑定', trigger: 'change'}],
				vl_starttime : [{required: true, message : '请选择开始时间', trigger: 'change'}],
				vl_endtime : [{required: true, message : '请选择结束时间', trigger: 'change'}],
				vl_vote_sort : [{required: true, message : '请选择投票排列顺序', trigger: 'change'}],
				vl_type : [{required: true, message : '请选择投票类别', trigger: 'change'}],
				vl_set_permission : [{required: true, validator: checkSetPermission, trigger: 'change'}],
				vl_img_show : [{required: true, message : '请选择图片展示方式', trigger: 'change'}],
				ad_imgs : [{required: true, message : '请选择广告轮播图', trigger: 'change'}],
				vl_numtype : [{required: true, message : '请选择投票编号类型', trigger: 'change'}],
				vl_code : [{required: true, message : '请选择投票编码', trigger: 'blur'}],
				vl_color : [{required: true, message : '颜色选择器', trigger: 'blur'}],
				vl_isneed_img_count : [{required: false, message: '请输入参数图片数量', trigger: 'blur'}],
				vl_isneed_img_width : [{required: false, message: '请填写宽度', trigger: 'blur'}],
				vl_isneed_img_height : [{required: false, message: '请填写高度', trigger: 'blur'}],				
				vl_sign_isaudit : [{required: false, message: '请选择报名是否需审核', trigger: 'change'}],
				vl_sign_starttime : [{required: false, message: '请选择报名开始时间', trigger: 'change'}],
				vl_sign_endtime : [{required: false, message: '请选择报名结束时间', trigger: 'change'}]
			},
		}
	},
	methods : {
		handleCheckedIsneed_img(value) {
			console.log(value);
			this.AddRules.vl_isneed_img_count = [{required: value, message: '请输入参数图片数量', trigger: 'blur'}];
			this.AddRules.vl_isneed_img_width = [{required: value, message: '请填写宽度', trigger: 'blur'}];
			this.AddRules.vl_isneed_img_height = [{required: value, message: '请填写高度', trigger: 'blur'}];
			this.isneed_img = value;
		},
		handleCheckedType(){
			if(this.AddForm.vl_type == '1'){
				this.AddForm.vl_isneed_img = '';
				this.AddRules.vl_isneed_img_count = [{required: false, message: '请输入参数图片数量', trigger: 'blur'}];
				this.AddRules.vl_isneed_img_width = [{required: false, message: '请填写宽度', trigger: 'blur'}];
				this.AddRules.vl_isneed_img_height = [{required: false, message: '请填写高度', trigger: 'blur'}];
				this.AddRules.vl_sign_isaudit = [{required: false, message: '请选择报名是否需审核', trigger: 'change'}];
				this.AddRules.vl_sign_starttime = [{required: false, message: '请选择报名开始时间', trigger: 'change'}];
				this.AddRules.vl_sign_endtime = [{required: false, message: '请选择报名结束时间', trigger: 'change'}];
				this.isneed_img = false;
				this.AddForm.vl_isneed_img_count = '';
				this.AddForm.vl_isneed_img_width = '';
				this.AddForm.vl_isneed_img_height = '';
			}else if(this.EditForm.vl_type == '2'){
				this.AddRules.vl_sign_isaudit = [{required: true, message: '请选择报名是否需审核', trigger: 'change'}];
				this.AddRules.vl_sign_starttime = [{required: true, message: '请选择报名开始时间', trigger: 'change'}];
				this.AddRules.vl_sign_endtime = [{required: true, message: '请选择报名结束时间', trigger: 'change'}];
			}
		},
		handleCheckedSetPermission(){
			if(this.AddForm.vl_set_permission == '每个ID每日n票'){
				this.isSetPermission = true;
			}else{
				this.isSetPermission = false;
			}
		},
		handleClick(tab, event) {
			console.log(tab, event);
		},
		goBack() {
			this.$router.back(-1);
		},
		// 上传成功后图片的处理函数 -- 广告轮播
		handleAddUploadSuccess1(res,file,fileList) {
			this.AddForm.ad_imgs.push(res.content);
		},
		// 上传成功后图片的处理函数 -- 分享图片
		handleAddUploadSuccess2(res,file,fileList) {
			this.AddForm.vl_share_img.push(res.content);
		},
		// 删除图片的回调函数 -- 广告轮播
		handleAddUploadRemove1(file,fileList) {
			for(var i = 0 ; i < this.AddForm.ad_imgs.length ; i++) {
				if(file.response.content == this.AddForm.ad_imgs[i]) {
					this.AddForm.ad_imgs.splice(i,1);
				}
			}
		},
		// 删除图片的回调函数 -- 分享图片
		handleAddUploadRemove2(file,fileList) {
			for(var i = 0 ; i < this.AddForm.vl_share_img.length ; i++) {
				if(file.response.content == this.AddForm.vl_share_img[i]) {
					this.AddForm.vl_share_img.splice(i,1);
				}
			}
		},
		// 放大图片
		handleAddPreview(file) {
			this.AddPreviewDialogVisible = true;
			this.AddPreviewDialogImageUrl = file.url;
		},
		// 保存操作
		Save(formName) {
			// 开启加载器
			const loading = this.$loading({
				lock: true,
				text: '正在保存中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			
			var params = {
				access_token : getToken(),
				vl_color : this.AddForm.vl_color,
				vl_img_show : this.AddForm.vl_img_show,
				vl_name : this.AddForm.vl_name,
				vl_need_binding : this.AddForm.vl_need_binding,
				vl_rule : this.AddForm.vl_rule,
				vl_share_content : this.AddForm.vl_share_content,
				vl_share_title : this.AddForm.vl_share_title,
				vl_type : this.AddForm.vl_type,
				vl_vote_sort : this.AddForm.vl_vote_sort,
				vl_numtype : this.AddForm.vl_numtype,
				vl_code : this.AddForm.vl_code,
			}
			if(this.AddForm.vl_type != '1'){ //报名式
				params.vl_isneed_name = this.AddForm.vl_isneed_name;
				params.vl_isneed_phone = this.AddForm.vl_isneed_phone;
				params.vl_isneed_content = this.AddForm.vl_isneed_content;
				params.vl_isneed_desc = this.AddForm.vl_isneed_desc;
				params.vl_sign_isaudit = this.AddForm.vl_sign_isaudit;
				if(this.AddForm.vl_isneed_img){
					params.vl_isneed_img = this.AddForm.vl_isneed_img_count + ',' 
						+ this.AddForm.vl_isneed_img_width + ','
						+ this.AddForm.vl_isneed_img_height;
				}
				if(this.AddForm.vl_sign_endtime && this.AddForm.vl_sign_endtime != ''){
					params.vl_sign_endtime = formatDate(new Date(this.AddForm.vl_sign_endtime),'yyyy-MM-dd hh:mm:ss');
				}
				if(this.AddForm.vl_sign_starttime && this.AddForm.vl_sign_starttime != ''){
					params.vl_sign_starttime = formatDate(new Date(this.AddForm.vl_sign_starttime),'yyyy-MM-dd hh:mm:ss');
				}
			}			
			if(this.AddForm.vl_set_permission == '每个ID每日n票'){
				params.vl_set_permission = '每个ID每日' + this.AddForm.num +'票';
			}else{
				params.vl_set_permission = this.AddForm.vl_set_permission;
			}
			if(this.AddForm.vl_endtime && this.AddForm.vl_endtime != ''){
				params.vl_endtime = formatDate(new Date(this.AddForm.vl_endtime),'yyyy-MM-dd hh:mm:ss');
			}
			if(this.AddForm.vl_starttime && this.AddForm.vl_starttime != ''){
				params.vl_starttime = formatDate(new Date(this.AddForm.vl_starttime),'yyyy-MM-dd hh:mm:ss');
			}
			if(this.AddForm.ad_imgs.length > 0){
				params.ad_imgs = JSON.stringify(this.AddForm.ad_imgs)
			}
			if(this.AddForm.vl_share_img.length > 0){
				params.vl_share_img = JSON.stringify(this.AddForm.vl_share_img)
			}
			this.$http.post(`${api.dev}/p/vote/manager/cache`,params,{emulateJSON : true}).then(res => {
				if(res.body.code == 200) {
					loading.close();
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
				}else if(res.body.code == 510) {
					this.$message({
						message: res.body.msg,
						type: 'error'
					});
					removeToken();
					setTimeout(function () {
						this.$router.push({path: '/login'})
						//this.$router.push({path: '/login'})
					},2000)
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
		// 保存操作
		AddSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if(valid) {
					// 开启加载器
					const loading = this.$loading({
						lock: true,
						text: '正在保存中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					
					var params = {
						access_token : getToken(),
						vl_color : this.AddForm.vl_color,
						vl_img_show : this.AddForm.vl_img_show,
						vl_name : this.AddForm.vl_name,
						vl_need_binding : this.AddForm.vl_need_binding,
						vl_rule : this.AddForm.vl_rule,
						vl_share_content : this.AddForm.vl_share_content,
						vl_share_title : this.AddForm.vl_share_title,
						vl_type : this.AddForm.vl_type,
						vl_vote_sort : this.AddForm.vl_vote_sort,
						vl_numtype : this.AddForm.vl_numtype,
						vl_code : this.AddForm.vl_code,	
						vl_endtime : formatDate(new Date(this.AddForm.vl_endtime),'yyyy-MM-dd hh:mm:ss'),
						vl_starttime : formatDate(new Date(this.AddForm.vl_starttime),'yyyy-MM-dd hh:mm:ss'),
						ad_imgs : JSON.stringify(this.AddForm.ad_imgs)
					}
					if(this.AddForm.vl_type != '1'){ //报名式
						params.vl_isneed_name = this.AddForm.vl_isneed_name;
						params.vl_isneed_phone = this.AddForm.vl_isneed_phone;
						params.vl_isneed_content = this.AddForm.vl_isneed_content;
						params.vl_isneed_desc = this.AddForm.vl_isneed_desc;
						params.vl_sign_isaudit = this.AddForm.vl_sign_isaudit;
						if(this.AddForm.vl_isneed_img){
							params.vl_isneed_img = this.AddForm.vl_isneed_img_count + ',' 
								+ this.AddForm.vl_isneed_img_width + ','
								+ this.AddForm.vl_isneed_img_height;
						}
						if(this.AddForm.vl_sign_endtime != ''){
							params.vl_sign_endtime = formatDate(new Date(this.AddForm.vl_sign_endtime),'yyyy-MM-dd hh:mm:ss');
						}
						if(this.AddForm.vl_sign_starttime != ''){
							params.vl_sign_starttime = formatDate(new Date(this.AddForm.vl_sign_starttime),'yyyy-MM-dd hh:mm:ss');
						}
					}
					if(this.AddForm.vl_set_permission == '每个ID每日n票'){
						params.vl_set_permission = '每个ID每日' + this.AddForm.num +'票';
					}else{
						params.vl_set_permission = this.AddForm.vl_set_permission;
					}
					if(this.AddForm.vl_share_img.length > 0){
						params.vl_share_img = JSON.stringify(this.AddForm.vl_share_img)
					}
					this.$http.post(`${api.dev}/p/vote/manager/save`,params,{emulateJSON : true}).then(res => {
						if(res.body.code == 200) {
							loading.close();
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
				}else {
					console.log('submit error');
					this.$message({
						message: '还有必填项未填',
						type: 'error'
					});
					return false;
				}
			})
		}
	},
	created() {
	}
}
</script>

<style lang="stylus" scoped>
.el-footer 
		background-color #A3C0D1;
		color #333;
		line-height 60px;
		position absolute;
		width 100%;
		bottom 0;
		z-index 9999
</style>

<style lang="stylus">
	.ballot{
		.el-tabs{
			height: 100%;
		}
		.el-tabs__nav.is-top{
			height: 40px;

			.el-tabs__item{
				height: 40px;
				line-height: 40px;
			}
		}
		.el-tabs__content{
			height: calc(100% - 40px);
			overflow-y: auto;
			box-sizing: border-box;
		}
		.el-tabs__nav-scroll{
			height: 39px;
		}
		.el-checkbox-group{
			display: inline-block;
			padding-right: 36px;
		}
		.el-checkbox-group{
			width: 130px;
			padding-right: 0;
			&.no-width{
				width: auto;
				padding-right: 0;
			}
		}
		.inline-block{
			display: inline-block !important;
			margin-bottom: 0;
			.el-form-item__content{
				height: 41px;
			}
		}
		.smallInput input{
			padding: 6px !important;
			text-align: center;
		}
		.margin-bottom-0{
			margin-bottom: 0;
		}
	}
</style>
