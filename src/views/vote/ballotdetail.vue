<template>
	<div class="ballot">
		<!-- 表单 -->
		<el-form ref="DetailForm" :model="DetailForm" style="margin-bottom:60px; height:calc(100% - 50px)">
			<el-tabs type="border-card">
				<el-tab-pane label="投票设置">
					<el-row type="flex" class="row-bg">
						<el-col style="width: 466px;">
							<el-form-item label="投票活动名称" prop="vl_name" label-width="130px">
								<el-input style="width:24em" v-model="DetailForm.vl_name" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="投票编码" prop="vl_code" label-width="130px">
								<el-input style="width:13em" v-model="DetailForm.vl_code" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col style="width: 396px;">
							<el-form-item label="活动开始时间" prop="vl_starttime" label-width="130px">
								<el-date-picker
									readonly
									type="datetime"
									value-format="timestamp"
									v-model="DetailForm.vl_starttime"
									style="width:18em">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="活动结束时间" prop="vl_endtime" label-width="130px">
								<el-date-picker
									readonly
									type="datetime"
									value-format="timestamp"
									v-model="DetailForm.vl_endtime"
									style="width:18em">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="投票手机验证" prop="vl_need_binding" label-width="130px">
								<el-radio v-model="DetailForm.vl_need_binding" label="1" disabled>开启</el-radio>
								<el-radio v-model="DetailForm.vl_need_binding" label="0" disabled>关闭</el-radio>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col style="width: 670px">
							<el-form-item label="投票限制" prop="vl_set_permission" label-width="130px">
								<el-radio-group v-model="DetailForm.vl_set_permission" disabled>
									<el-radio label="每个ID只限一票">每个ID只限一票</el-radio>
									<el-radio label="每个ID每日一票">每个ID每日一票</el-radio>
									<el-radio label="每个ID每日n票">自定义</el-radio>
								</el-radio-group>
								<span style="color: #c0c4cc">（每个ID每日</span><el-input style="width:3em; margin: 0 6px;" v-model.number="DetailForm.num" disabled></el-input><span style="color: #c0c4cc">票）</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="投票编号" prop="vl_numtype" label-width="130px">
								<el-radio v-model="DetailForm.vl_numtype" label="1" disabled>以编码为前缀自增</el-radio>
								<el-radio v-model="DetailForm.vl_numtype" label="2" disabled>纯数字自增</el-radio>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg"> 
						<el-col :span="14">
							<el-form-item label="投票性质" prop="vl_type" label-width="130px" >
								<el-radio-group v-model="DetailForm.vl_type">
									<el-radio label="1" disabled>常规</el-radio>
									<el-radio label="2" disabled>报名式</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<template v-if="Number(DetailForm.vl_type) != 1">
						<el-row class="row-bg"> 
							<el-col style="width: 830px;">
								<el-form-item label="报名时提交内容" label-width="130px" class="inline-block">
									<el-checkbox-group v-model="DetailForm.vl_isneed_name" disabled>
										<el-checkbox label="参赛者姓名"></el-checkbox>
									</el-checkbox-group>
									<el-checkbox-group v-model="DetailForm.vl_isneed_phone" disabled>
										<el-checkbox label="参赛者手机"></el-checkbox>
									</el-checkbox-group>
									<el-checkbox-group v-model="DetailForm.vl_isneed_img" class="no-width" disabled>
										<el-checkbox label="参赛图片"></el-checkbox>
									</el-checkbox-group>
									<span style="color: #c0c4cc">（图片</span>
								</el-form-item>
								<el-form-item prop="vl_isneed_img_count" class="inline-block">
									<span style="color: #c0c4cc">张数</span>
									<el-input class="smallInput" style="width:3em; margin: 0 6px;" v-model.number="DetailForm.vl_isneed_img_count" readonly></el-input>
									<span style="color: #c0c4cc">张，尺寸要求</span>
								</el-form-item>
								<el-form-item prop="vl_isneed_img_width" class="inline-block">
									<el-input class="smallInput" style="width:3.5em; margin: 0 6px;" v-model.number="DetailForm.vl_isneed_img_width" readonly></el-input>
									<span style="color: #c0c4cc">X</span>
								</el-form-item>
								<el-form-item prop="vl_isneed_img_height" class="inline-block">
									<el-input class="smallInput" style="width:3.5em; margin: 0 6px;" v-model.number="DetailForm.vl_isneed_img_height" readonly></el-input>
									<span style="color: #c0c4cc">）</span>
								</el-form-item>
								<el-form-item label-width="130px">
									<el-checkbox-group v-model="DetailForm.vl_isneed_content" disabled>
										<el-checkbox label="参赛内容名称"></el-checkbox>
									</el-checkbox-group>
									<el-checkbox-group v-model="DetailForm.vl_isneed_desc" disabled>
										<el-checkbox label="简介/描述"></el-checkbox>
									</el-checkbox-group>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row type="flex" class="row-bg"> 
							<el-col :span="14">
								<el-form-item label="报名是否需审核" prop="vl_sign_isaudit" label-width="130px">
									<el-radio v-model="DetailForm.vl_sign_isaudit" label="1" disabled>是</el-radio>
									<el-radio v-model="DetailForm.vl_sign_isaudit" label="0" disabled>否</el-radio>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row type="flex" class="row-bg">
							<el-col style="width: 396px;">
								<el-form-item label="报名开始时间" prop="vl_sign_starttime" label-width="130px">
									<el-date-picker
										readonly
										type="datetime"
										value-format="timestamp"
										v-model="DetailForm.vl_sign_starttime"
										style="width:18em">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="7">
								<el-form-item label="报名结束时间" prop="vl_sign_endtime" label-width="130px">
									<el-date-picker
										readonly
										type="datetime"
										value-format="timestamp"
										v-model="DetailForm.vl_sign_endtime"
										style="width:18em">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
					</template>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="投票规则说明" prop="vl_rule" label-width="130px" class="margin-bottom-0">
								<el-input type="textarea" v-model="DetailForm.vl_rule" rows="5" readonly style="width:648px"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="版面设置">
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="广告轮播图" prop="ad_imgs" label-width="130px">
								<el-upload
									disabled
									:action="UploadUrl"
									list-type="picture-card"
									:on-success="handleUploadSuccess1"
									:on-preview="handlePreview"
									:file-list="UploadFileList1"
									:limit="4">
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>
						</el-col>
					</el-row>   
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="投票排列顺序" prop="vl_vote_sort" label-width="130px">
								<el-radio v-model="DetailForm.vl_vote_sort" label="1" disabled>按票数倒序</el-radio>
								<el-radio v-model="DetailForm.vl_vote_sort" label="2" disabled>按时间正序</el-radio>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="展示方式" prop="vl_img_show" label-width="130px">
								<el-radio v-model="DetailForm.vl_img_show" label="1" disabled>瀑布流（适合竖图）</el-radio>
								<el-radio v-model="DetailForm.vl_img_show" label="2" disabled>水平铺满（适合横图）</el-radio>
							</el-form-item>
						</el-col>
					</el-row>   
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="色调" prop="vl_color" label-width="130px">
								<el-color-picker
									disabled
									v-model="DetailForm.vl_color"
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
								<el-input v-model="DetailForm.vl_share_title" maxlength="80" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="分享描述" prop="vl_share_content" label-width="130px">
								<el-input type="textarea" v-model="DetailForm.vl_share_content" rows="5" maxlength="200" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" class="row-bg">
						<el-col :span="14">
							<el-form-item label="分享图片" prop="vl_share_img" label-width="130px">
								<el-upload
									disabled
									:action="UploadUrl"
									list-type="picture-card"
									:on-success="handleUploadSuccess2"
									:on-preview="handlePreview"
									:on-remove="handleUploadRemove2"
									:file-list="UploadFileList2">
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>

			<el-dialog :visible.sync="PreviewDialogVisible">
				<img width="100%" :src="PreviewDialogImageUrl" alt="">
			</el-dialog>
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
			DetailForm : {
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
			UploadUrl : `${api.dev}/p/vote/manager/uploadFile?access_token=${getToken()}`, // 上传图片路径
			UploadFileList1 : [], // 上传图片的组成的一个数组
			UploadFileList2 : [],
			PreviewDialogVisible : false, // 默认放大图片为false
			PreviewDialogImageUrl : '' , // 放大图片的路径
		}
	},
	methods : {
		goBack() {
			this.$router.back(-1);
		},
		/*getInfo() {
			this.$http.post(`${api.dev}/p/vote/manager/select`,{access_token:getToken(),vl_id:this.$route.params.id},{emulateJSON: true}).then(res => {
				if(res.body.code == 200) {
					if(res.body.content.vl_has_sponsor == true) {
						res.body.content.vl_has_sponsor = '1'
					}else {
						res.body.content.vl_has_sponsor = '0'
					}

					if(res.body.content.vl_has_ad == true) {
						res.body.content.vl_has_ad = '1'
					}else {
						res.body.content.vl_has_ad = '0'
					}

					if(res.body.content.vl_has_design == true) {
						res.body.content.vl_has_design = '1'
					}else {
						res.body.content.vl_has_design = '0'
					}
					
					if(res.body.content.vl_need_binding == '0') {
						res.body.content.vl_need_binding = '0'
					}else if(res.body.content.vl_need_binding == '1') {
						res.body.content.vl_need_binding = '1'
					}else {
						res.body.content.vl_need_binding = '2'
					}

					this.DetailForm = res.body.content;

					for(var i = 0 ; i < res.body.content.ad_imgs.length ; i++) {
						this.DetailUploadFileList.push({url: `${api.address}${res.body.content.ad_imgs[i]}`})
					}
					// 过滤
					this.DetailForm.vl_type = (res.body.content.vl_type).toString();
					this.DetailForm.vl_vote_sort = (res.body.content.vl_vote_sort).toString();
				}else if(res.body.code == 500) {
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
		},*/
		getInfo() {
			// 开启加载器
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			this.$http.post(
				`${api.dev}/p/vote/manager/select`,
				{
					access_token:getToken(),
					vl_id:this.$route.params.id
				},
				{emulateJSON: true}
			).then(res => {
				if(res.body.code == 200) {
					var data = res.body.content;

						data.vl_starttime = (data.vl_starttime) ? data.vl_starttime : '';
						data.vl_endtime = (data.vl_endtime) ? data.vl_endtime : '';
						console.log('vl_starttime:'+data.vl_starttime)
						if(data.vl_type)
							data.vl_type = (data.vl_type).toString();
						if(data.vl_vote_sort)
							data.vl_vote_sort = (data.vl_vote_sort).toString();
						if(data.vl_numtype)
							data.vl_numtype = (data.vl_numtype).toString();
						if(data.vl_img_show)
						data.vl_img_show  = (data.vl_img_show).toString();
					if(data.vl_type == '2'){
						data.vl_sign_starttime = (data.vl_sign_starttime) ? data.vl_sign_endtime : '';
						console.log('data.vl_sign_starttime:'+data.vl_sign_starttime);
						data.vl_sign_endtime = (data.vl_sign_endtime) ? data.vl_sign_endtime : '';
					}
					if(data.vl_need_binding){
						data.vl_need_binding = '1';
					}else if(data.vl_need_binding == false){
						data.vl_need_binding = '0';
					}else{
						data.vl_need_binding = '';
					}
					if(data.vl_sign_isaudit){
						data.vl_sign_isaudit = '1';
					}else if(data.vl_sign_isaudit == false){
						data.vl_sign_isaudit = '0';
					}else{
						data.vl_sign_isaudit = '';
					}
					if(data.vl_isneed_img){
						var parameter = data.vl_isneed_img.split(',');
						data.vl_isneed_img_count = (parseInt(parameter[0])) ? parameter[0] : '';
						data.vl_isneed_img_width = (parseInt(parameter[1])) ? parameter[1] : '';
						data.vl_isneed_img_height = (parseInt(parameter[2])) ? parameter[2] : '';
						data.vl_isneed_img = true;
						this.isneed_img = true;
					}
					if(data.vl_set_permission != '每个ID只限一票' && data.vl_set_permission != '每个ID每日一票'){
						var i = data.vl_set_permission.indexOf('每日') + 2;
						data.num = parseInt(data.vl_set_permission.substring(i, data.vl_set_permission.length-1));
						data.vl_set_permission = '每个ID每日n票';
					}else{
						//data.vl_set_permission = '每个ID每日n票';
						data.num = '';
					}
					

					if(data.ad_imgs){
						for(var i = 0 ; i < data.ad_imgs.length ; i++) {
							this.UploadFileList1.push({url: `${api.address}${data.ad_imgs[i]}`})
						}
					}
					if(data.vl_share_img){
						for(var i = 0 ; i < data.vl_share_img.length ; i++) {
							this.UploadFileList2.push({url: `${api.address}${data.vl_share_img[i]}`})
						}
					}
					this.$nextTick( () => {
						this.DetailForm = data;
					})
					
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
		// 上传成功后图片的处理函数
		handleUploadSuccess1(res,file,fileList) {
			this.DetailForm.ad_imgs.push(res.content);
			this.UploadFileList1.push(file);
		},
		// 上传成功后图片的处理函数 -- 分享图片
		handleUploadSuccess2(res,file,fileList) {
			this.DetailForm.vl_share_img.push(res.content);
			this.UploadFileList2.push(file);
		},
		// 删除图片的回调函数
		handleUploadRemove1(file,fileList) {
				
		},
		// 删除图片的回调函数 -- 分享图片
		handleUploadRemove2(file,fileList) {
			/*for(var i = 0 ; i < this.DetailForm.vl_share_img.length ; i++) {
				if(file.response.content == this.DetailForm.vl_share_img[i]) {
					this.DetailForm.vl_share_img.splice(i,1);
				}
			}*/
		},
		// 放大图片
		handlePreview(file) {
			this.PreviewDialogVisible = true;
			this.PreviewDialogImageUrl = file.url;
		}
	},
	created() {
		this.getInfo();
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
