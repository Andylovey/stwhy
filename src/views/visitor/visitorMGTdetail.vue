<template>
	<div class="visitorMGTdetail">
		<!-- 表单 -->
		<el-form ref="DetailForm" :model="DetailForm" style="margin-bottom:60px; height:calc(100% - 60px);width:100%;">
			<el-tabs type="border-card">
				<el-tab-pane label="基本信息" class="base-info">
					<el-row type="flex" class="row-bg">
						<el-col style="width: 160px;">
							<el-form-item prop="user_image">
								<img :src="DetailForm.user_image" width="152" height="152" @click="showImg(DetailForm.user_nickname, DetailForm.user_image)">
							</el-form-item>
						</el-col>
						<el-col style="width: 320px;">
							<el-form-item label="真实姓名" prop="user_realname" label-width="90px">
								<el-input style="width:16em" v-model="DetailForm.user_realname" readonly></el-input>
							</el-form-item>
							<el-form-item label="昵称" prop="user_nickname" label-width="90px">
								<el-input style="width:16em" v-model="DetailForm.user_nickname" readonly></el-input>
							</el-form-item>
							<el-form-item label="电话" prop="user_phone" label-width="90px">
								<el-input style="width:16em" v-model="DetailForm.user_phone" readonly></el-input>
							</el-form-item>
							<el-form-item label="注册平台" prop="user_platform" label-width="90px">
								<el-input style="width:16em" v-model="DetailForm.user_platform" readonly></el-input>
							</el-form-item>
							<el-form-item label="注册来源" prop="user_source" label-width="90px">
								<el-input style="width:16em" v-model="DetailForm.user_source" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col style="width: 320px;">
							<el-form-item label="性别" prop="user_sex" label-width="90px" >
								<el-input style="width:16em" v-model="DetailForm.user_sexText" readonly></el-input>
							</el-form-item>
							<el-form-item label="生日" prop="user_birthday" label-width="90px">
								<el-input style="width:16em" v-model="DetailForm.user_birthday" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="用户预约">
					<el-table
						v-loading="loading"
						element-loading-text="拼命加载中"
						element-loading-spinner="el-icon-loading"
						element-loading-background="rgba(0, 0, 0, 0.8)"
						:data="tableData1"
						border
						style="width: 100%"
						height="calc(100% - 60px)">
						<el-table-column prop="br_id" label="序号" sortable align="center"  min-width="90"></el-table-column>
						<el-table-column prop="username" label="用户名" sortable align="center" min-width="160"></el-table-column>
						<el-table-column prop="bl_name" label="活动名称" sortable align="center" min-width="180"></el-table-column>
						<el-table-column prop="br_code" label="预约码" sortable align="center" min-width="140"></el-table-column>
						<el-table-column prop="br_statusText" label="验证状态" sortable align="center" min-width="160"></el-table-column>
						<el-table-column prop="br_bl_id" label="活动ID" sortable align="center" min-width="160"></el-table-column>
						<el-table-column prop="br_time" label="验证时间" sortable align="center" min-width="200"></el-table-column>
						<el-table-column prop="br_createtime" label="登记时间" sortable align="center" min-width="200"></el-table-column>
					</el-table>
					<!-- 分页 -->
					<div id="pagination1" class="pagination">
						<el-pagination
							background
							layout="prev, pager, next"
							:total="total1"
							:page-size="limit"
							@current-change="handleCurrentChange1">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="用户收藏">
					<el-table
						v-loading="loading"
						element-loading-text="拼命加载中"
						element-loading-spinner="el-icon-loading"
						element-loading-background="rgba(0, 0, 0, 0.8)"
						:data="tableData2"
						border
						style="width: 100%"
						height="calc(100% - 60px)">
						<el-table-column prop="username" label="用户名" sortable align="center" min-width="160"></el-table-column>
						<el-table-column prop="a_title" label="文章标题" sortable align="center" min-width="180"></el-table-column>
						<el-table-column prop="cr_typeText" label="类别" sortable align="center" min-width="160"></el-table-column>
						<el-table-column prop="cr_createtime" label="收藏时间" sortable align="center" min-width="180"></el-table-column>
					</el-table>
					<!-- 分页 -->
					<div id="pagination2" class="pagination">
						<el-pagination
							background
							layout="prev, pager, next"
							:total="total2"
							:page-size="limit"
							@current-change="handleCurrentChange2">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="用户投稿">
					<el-table
						v-loading="loading"
						element-loading-text="拼命加载中"
						element-loading-spinner="el-icon-loading"
						element-loading-background="rgba(0, 0, 0, 0.8)"
						:data="tableData3"
						border
						style="width: 100%"
						height="calc(100% - 60px)">
						<el-table-column prop="cr_id" label="序号" sortable align="center"  min-width="90"></el-table-column>
						<el-table-column prop="cr_author" label="作者" sortable align="center" min-width="160"></el-table-column>
						<el-table-column prop="cr_title" label="标题" sortable align="center" min-width="180"></el-table-column>
						<el-table-column prop="cl_name" label="活动名称" sortable align="center" min-width="180"></el-table-column>
						<el-table-column prop="cr_img" label="图片" sortable align="center" min-width="140">
							<template slot-scope="scope">
								<img
									:src="scope.row.cr_img"
									height="34px"
									class="showImg"
									@click="showImg(scope.row.cr_title, scope.row.cr_img)">
							</template>
						</el-table-column>
						<el-table-column prop="cr_date" label="日期" sortable align="center" min-width="200"></el-table-column>
						<el-table-column prop="cr_auditstatusText" label="审核状态" sortable align="center" min-width="160"></el-table-column>
						<el-table-column prop="cr_publishstatusText" label="发布状态" sortable align="center" min-width="160"></el-table-column>
					</el-table>
					<!-- 分页 -->
					<div id="pagination3" class="pagination">
						<el-pagination
							background
							layout="prev, pager, next"
							:total="total3"
							:page-size="limit"
							@current-change="handleCurrentChange3">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="用户票券">
					<div style="padding: 8px 0 0 8px;">
						<el-select v-model="SearchStatus" placeholder="请选择" style="width:180px; margin-bottom: 8px;" clearable>
							<el-option label="待使用" value="1"></el-option>
							<el-option label="已使用" value="2"></el-option>
							<el-option label="已过期" value="3"></el-option>
						</el-select>
						<el-button icon="el-icon-search" type="primary" @keyup.enter="selectTicket()" @click="selectTicket()" style="margin-left:10px;">搜索</el-button>
					</div>
					<el-table
						v-loading="loading"
						element-loading-text="拼命加载中"
						element-loading-spinner="el-icon-loading"
						element-loading-background="rgba(0, 0, 0, 0.8)"
						:data="tableData4"
						border
						style="width: 100%"
						height="calc(100% - 112px)">
						<el-table-column prop="tr_id" label="序号" sortable align="center"  min-width="90"></el-table-column>
						<el-table-column prop="tl_name" label="活动名称" sortable align="center" min-width="160"></el-table-column>
						<el-table-column prop="tr_code" label="票券码" sortable align="center" min-width="300"></el-table-column>
						<el-table-column prop="tr_status" label="票券状态" sortable align="center" min-width="180"></el-table-column>
						<el-table-column prop="tl_starttime" label="活动开始时间" sortable align="center" min-width="180"></el-table-column>
						<el-table-column prop="tl_endtime" label="过期时间" sortable align="center" min-width="180"></el-table-column>
						<el-table-column prop="tr_time" label="领票时间" sortable align="center" min-width="180"></el-table-column>
					</el-table>
					<!-- 分页 -->
					<div id="pagination4" class="pagination">
						<el-pagination
							background
							layout="prev, pager, next"
							:total="total4"
							:page-size="limit"
							@current-change="handleCurrentChange4">
						</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>

			<!-- 放大首图 -->
			<el-dialog 
				:visible.sync="ImgDialog"
				:title="ImgTitle" 
				width="500px"
				:close-on-click-modal="false">
				<img :src="ImgSrc" width="100%">
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
	name: 'visitorMGTdetail',
	data() {
		return {
			DetailForm : {},

			loading : true,
			limit: 10,
			requestPage1: 1,
			requestPage2: 1,
			requestPage3: 1,
			requestPage4: 1,
			total1: 0,
			total2: 0,
			total3: 0,
			total4: 0,
			tableData1: [],
			tableData2: [],
			tableData3: [],
			tableData4: [],

			ImgDialog: false,
			ImgTitle: '',
			ImgSrc: '',
			SearchStatus: '',
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
					this.selectBespeak();
					this.selectCollect();
					this.selectContribute();
					this.selectTicket();
				}else if(res.body.code == 500) {
					this.$message({
						message: res.body.msg,
						type: 'error'
					});
					this.selectBespeak();
					this.selectCollect();
					this.selectContribute();
					this.selectTicket();
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
		goBack() {
			this.$router.back(-1);
		},
		/* 基本信息 */
		getInfo() {
			// 开启加载器
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			this.$http.post(
				`${api.dev}/p/main/user/select`,
				{
					access_token:getToken(),
					user_id:this.$route.params.id
				},
				{emulateJSON: true}
			).then(res => {
				if(res.body.code == 200) {
					var data = res.body.content;
					data.user_birthday = (data.user_birthday) ? formatDate(new Date(data.user_birthday) , 'yyyy-MM-dd hh:mm:ss') : '';
					switch(data.user_sex){
						case 0:
							data.user_sexText = '未知';
							break;
						case 1:
							data.user_sexText = '男';
							break;
						case 2:
							data.user_sexText = '女';
							break;
					}
					if(data.user_image){
						if(data.user_image.indexOf('http://') != -1 || data.user_image.indexOf('https://') != -1){
							//data.user_image = `${api.dev}${data.user_image}`;  
						}else{
							data.user_image = `${api.dev}${data.user_image}`; 
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
		/* 用户预约 */
		selectBespeak(){
			this.$http.post(
				`${api.dev}/p/main/user/selectBespeak`,
				{
					access_token: getToken(),
					requestPage: this.requestPage1,
					pageSize: this.limit,
					user_id: this.$route.params.id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					res.body.content.resultList.forEach(i => {
						i.br_time = formatDate(new Date(i.br_time) , 'yyyy-MM-dd hh:mm:ss');
						i.br_createtime = formatDate(new Date(i.br_createtime) , 'yyyy-MM-dd hh:mm:ss');
						i.br_statusText = (i.br_status) ? '已验证' : '待验证';
						i.username = this.DetailForm.username;
					});
					this.tableData1 = res.body.content.resultList;
					this.total1 = res.body.content.totalCount;
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
		/* 用户收藏 */
		selectCollect(){
			this.$http.post(
				`${api.dev}/p/main/user/selectCollect`,
				{
					access_token: getToken(),
					requestPage: this.requestPage2,
					pageSize: this.limit,
					user_id: this.$route.params.id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					res.body.content.resultList.forEach(i => {
						i.cr_typeText = (i.cr_type == 0) ? '普通文章' : '';
						i.cr_createtime = formatDate(new Date(i.cr_createtime) , 'yyyy-MM-dd hh:mm:ss');
						i.username = this.DetailForm.username;
					});
					this.tableData2 = res.body.content.resultList;
					this.total2 = res.body.content.totalCount;
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
		/* 用户投稿 */
		selectContribute(){
			this.$http.post(
				`${api.dev}/p/main/user/selectContribute`,
				{
					access_token: getToken(),
					requestPage: this.requestPage3,
					pageSize: this.limit,
					user_id: this.$route.params.id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					res.body.content.resultList.forEach(i => {
						i.cr_date = formatDate(new Date(i.cr_date) , 'yyyy-MM-dd hh:mm:ss');
						i.cr_img = `${api.address}${i.cr_img}`;
						i.cr_auditstatusText = (i.cr_auditstatus) ? '已审核' : '未审核';
						i.cr_publishstatusText = (i.cr_publishstatus) ? '已发布' : '未发布';
					});
					this.tableData3 = res.body.content.resultList;
					this.total3 = res.body.content.totalCount;
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
		/* 用户票券 */
		selectTicket(){
			this.$http.post(
				`${api.dev}/p/main/user/selectTicket`,
				{
					access_token: getToken(),
					requestPage: this.requestPage3,
					pageSize: this.limit,
					status: this.SearchStatus,
					user_id: this.$route.params.id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					res.body.content.resultList.forEach(i => {
						i.tl_starttime = formatDate(new Date(i.tl_starttime) , 'yyyy-MM-dd hh:mm:ss');
						i.tl_endtime = formatDate(new Date(i.tl_endtime) , 'yyyy-MM-dd hh:mm:ss');
						i.tr_time = formatDate(new Date(i.tr_time) , 'yyyy-MM-dd hh:mm:ss');
						i.tr_statusText = (i.tr_status) ? '已领票' : '未领票';
					});
					this.tableData4 = res.body.content.resultList;
					this.total4 = res.body.content.totalCount;
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
		/* 分页 */
		handleCurrentChange1(val) {
			this.loading = true;
			this.requestPage1 = this.limit * (val - 1);
			this.selectBespeak();
		},
		handleCurrentChange2(val) {
			this.loading = true;
			this.requestPage2 = this.limit * (val - 1);
			this.selectCollect();
		},
		handleCurrentChange3(val) {
			this.loading = true;
			this.requestPage3 = this.limit * (val - 1);
			this.selectContribute();
		},
		handleCurrentChange4(val) {
			this.loading = true;
			this.requestPage4 = this.limit * (val - 1);
			this.selectTicket();
		},
		showImg(title, src){
			this.ImgDialog = true;
			this.ImgTitle = title;
			this.ImgSrc = src;
		},
	},
	created() {
		this.getInfo();
		this.getLimit();
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
	.visitorMGTdetail{
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
		.el-tabs__content{
			height: calc(100% - 40px);
			box-sizing: border-box;
			> div{
				height: 100%;
				.pagination{
					margin-top: 12px;
				}
			}
			#pane-0{
				padding 50px
			}	
		}
	}
</style>