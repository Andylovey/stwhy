<template>
	<div>
		<div class="margin-bottom-10">
			<el-select class="padding-right-12" v-model="searchID" slot="prepend" placeholder="请选择抽奖ID" style="width:200px" clearable >
				<template v-for="item in searchIdList">
					<el-option :label="item.dl_id" :value="item.dl_id"></el-option>
				</template>
			</el-select>
			<el-input v-model="searchName" placeholder="请输入用户名称搜索" style="width:200px" @keyup.enter.native="getInfo('search')"></el-input>
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
			<el-table-column prop="dr_id" label="序号" sortable align="center"  min-width="90"></el-table-column>
			<el-table-column prop="dr_code" label="兑奖码" sortable align="center" min-width="120"></el-table-column>
			<el-table-column prop="pl_name" label="奖品名称" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="username" label="用户名" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="user_phone" label="手机号码" sortable align="center" min-width="180"></el-table-column>
			<el-table-column prop="dl_name" label="抽奖活动名称" sortable align="center" min-width="180"></el-table-column>
			<el-table-column prop="dr_status" label="发奖状态" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="dr_date" label="抽奖日期" sortable align="center" min-width="200"></el-table-column>
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
	name: 'userLuckDrawMGT',
	data() {
		return {
			/* 
			 * tableData: 表格数据
			 * loading: 加载状态（默认为true）
			 * total: 总条数（table数据总长度）
			 * start: 表格分页（默认第一页）
			 * limit: 每页显示条数
			 * searchName: 搜索（用户名称）
			 * searchID: 搜索（抽奖ID）,
			 */
			tableData : [],
			loading : true,
			total: 0,
			start : 0,
			limit : 10,
			searchName: '',
			searchID: '',
			searchIdList: [],

			permissionShow: false, // 默认为false,根据权限是否显示
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
		/* 获取投稿ID */
		getID(){
			this.$http.post(
				`${api.dev}/p/luckDraw/list/selectAll`,
				{
					access_token: getToken()
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					this.searchIdList = res.body.content;
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
			var searchId = (searchName == 'search') ? this.searchID : '';
			this.$http.post(
				`${api.dev}/p/luckDraw/record/show`,
				{
					access_token: getToken(),
					start: this.start,
					limit: this.limit,
					id1: searchId,
					name1: searchVal
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					//debugger;
					res.body.content.records.forEach(i => {
						i.dr_date = formatDate(new Date(i.dr_date) , 'yyyy-MM-dd hh:mm:ss');
						i.dr_status = (i.dr_status) ? '已发奖' : '未发奖';
					});
					this.tableData = res.body.content.records;
					this.total = res.body.content.total;
					console.log('total:'+this.total)
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
				`${api.dev}/p/contribute/record/select`,
				{
					access_token: getToken(),
					cr_id: row.cr_id
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					var data = res.body.content;
						data.cr_createtime = formatDate(new Date(data.cr_createtime) , 'yyyy-MM-dd hh:mm:ss');
						data.cr_publishtime = formatDate(new Date(data.cr_publishtime) , 'yyyy-MM-dd hh:mm:ss');
						data.cr_date = formatDate(new Date(data.cr_date) , 'yyyy-MM-dd hh:mm:ss');
						data.cr_audittime = formatDate(new Date(data.cr_audittime) , 'yyyy-MM-dd hh:mm:ss');
						data.cr_img = `${api.address}${data.cr_img}`;
						data.cr_auditstatus = (data.cr_auditstatus) ? '1' : '0';
						data.cr_publishstatus = (data.cr_publishstatus) ? '1' : '0';
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
		/* 分页 */
		handleCurrentChange(val) {
			this.loading = true;
			this.start = this.limit * (val - 1);
			console.log('limit:'+this.limit)
			this.getInfo();
		}
	},
	created() {
		this.getSubPermission();
		this.getID();
		this.getLimit();
	}
}
</script>


<style lang="stylus" scoped>
#pagination
	margin-top 10px
.margin-bottom-10
	margin-bottom 10px
.padding-right-12
	padding-right 12px

</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #41B883;
  }
  .avatar-uploader.disabled .el-upload{
  	border-color: #d9d9d9!important;
	cursor: not-allowed!important;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
