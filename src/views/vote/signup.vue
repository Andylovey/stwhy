<template>
	<div class="signup">
		<div class="search">
			<dl>
				<dt>参赛人员</dt>
				<dd><el-input v-model="searchName1" placeholder="可搜索参赛姓名/手机" style="width:200px"></el-input></dd>
			</dl>
			<dl>
				<dt>关联投票搜索</dt>
				<dd><el-input v-model="searchName3" placeholder="可搜索投票名称/编码" style="width:200px"></el-input></dd>
			</dl>
			<dl>
				<dt>投票状态</dt>
				<dd>
					<el-select v-model="searchID2" slot="prepend" placeholder="请选择" style="width:140px" clearable>
						<el-option label="未开始" value="0"></el-option>
						<el-option label="进行中" value="1"></el-option>
						<el-option label="已结束" value="2"></el-option>
					</el-select>
				</dd>
			</dl>
			<br/>
			<dl>
				<dt>投票搜索</dt>
				<dd><el-input v-model="searchName2" placeholder="可搜索投票名称/编码" style="width:200px"></el-input></dd>
			</dl>
			<dl>
				<dt>审核状态</dt>
				<dd>
					<el-select v-model="searchID1" slot="prepend" placeholder="请选择" style="width:140px" clearable>
						<el-option label="未审核" value="0"></el-option>
						<el-option label="已审核" value="1"></el-option>
					</el-select>
				</dd>
			</dl>
			<el-button slot="append" icon="el-icon-search" type="primary" @click="handleSearch()" style="margin-left:10px; margin-bottom: 10px;">搜索</el-button>
		</div>
		<el-table
			v-if="permissionShow"
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.8)"
			stripe
			border
			:data="tableData"
			style="width: 100%;"
			height="calc(100% - 146px)">
			<el-table-column prop="sl_id" label="序号" sortable align="center"></el-table-column>
			<el-table-column prop="sl_name" label="参赛者姓名" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="sl_phone" label="参赛者手机" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="sl_number" label="参赛编号" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="sl_content" label="参赛内容名称" sortable align="center" min-width="180"></el-table-column>
			<el-table-column prop="sl_img" label="首图" sortable align="center">
				<template slot-scope="scope">
					<img
						:src="scope.row.sl_img"
						height="34px"
						class="showImg"
						@click="showImg(scope.row)">
				</template>
			</el-table-column>
			<el-table-column prop="vl_name" label="关联投票名称" sortable align="center" min-width="180">
				<template slot-scope="scope">
					<router-link :to="'/vote/ballot/ballotdetail/'+scope.row.sl_vl_id">
						<el-button type="text" size="small">{{scope.row.vl_name}}</el-button>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column prop="vl_status" label="投票状态" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="sl_auditText" label="审核状态" sortable align="center" min-width="160"></el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				width="200"
				align="center">
				<template slot-scope="scope">
					<router-link :to="'/vote/signup/signupdetail/'+scope.row.sl_id">
						<el-button v-if="permissionDetail" type="text" size="small">查看</el-button>
					</router-link>
					<router-link :to="'/vote/signup/signupedit/'+scope.row.sl_id">
						<el-button v-if="permissionEdit && scope.row.vl_status != '已结束'" type="text" size="small" style="margin-left:10px">编辑</el-button>
					</router-link>
					<el-button v-if="scope.row.vl_status != '已结束'" type="text" size="small" style="margin-left:10px" @click="handleAudit(scope.row)">
						<template v-if="scope.row.sl_audit">反审核</template>
						<template v-else>审核</template>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<div id="pagination">
			<el-pagination
				v-if="total!=0"
				background
				layout="prev, pager, next,total ,jumper"
				:total="total"
				:page-size="limit"
				@current-change="handleCurrentChange">
			</el-pagination>
		</div>

		<!-- 放大首图 -->
		<el-dialog 
			:visible.sync="ImgDialog"
			:title="currentImg.sl_name" 
			width="40%"
			:close-on-click-modal="false">
			<img :src="currentImg.sl_img" width="100%">
		</el-dialog>
	</div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

export default {
	name: 'signup',
	data() {
		return {
			// 权限按钮控制
			permissionShow : false,
			permissionEdit : false,
			permissionDetail : false,

			total : 0, // 总条数
			start : 0, // 默认为0
			limit : 10, // 默认为10
			name1 : '', // 搜索框文本
			loading : true, // 默认为true
			tableData : [],
			searchName1: '',
			searchName2: '',
			searchName3: '',
			searchID1: '',
			searchID2: '',
			searchID3: '',
			ImgDialog : false,
			currentImg: '',
			isFirst: true
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
		getSubPermission() {
			this.$http.get(`${api.dev}/p/permission/getSub`,{params: {access_token: getToken(),p_id : this.$route.params.id}}).then(res => {
				if(res.body.code == 200) {
					res.body.content.forEach(item => {
						if(item.p_name.indexOf('显示') > -1) {
							this.permissionShow = true
						}else if(item.p_name.indexOf('修改') > -1) {
							this.permissionEdit = true
						}else if(item.p_name.indexOf('查看') > -1) {
							this.permissionDetail = true;
						}
					})
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
		},
		getInfo() {
			this.searchID3 = (this.$route.query.vlid && this.isFirst) ? this.$route.query.vlid : '';
			this.isFirst = false;
			this.$http.post(
				`${api.dev}/p/vote/signup/show`,
				{
					access_token: getToken(),
					start: this.start,
					limit : this.limit,
					name1 : this.searchName1,
					name2: this.searchName2,
					name3: this.searchName3,
					id1: this.searchID1,
					id2: this.searchID2,
					id3: this.searchID3
				},
				{emulateJSON: true}
			).then(res => {
				if(res.body.code == 200) {
					res.body.content.records.forEach( item => {
						item.sl_img = `${api.address}${item.sl_img[0]}`;
						item.sl_auditText = (item.sl_audit) ? '已审核' : '待审核';
					})
					this.tableData = res.body.content.records;
					this.total = res.body.content.total;
					this.loading = false;
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
		},
		handleSearch() {
			this.loading = true;
			this.getInfo();
		},
		// 分页
		handleCurrentChange(val) {
			this.loading = true;
			this.start = this.limit * (val - 1);
			this.getInfo();
		},
		/* 大图查看 */
		showImg(row){
			this.ImgDialog = true;
			this.currentImg = row;
		},
		handleAudit(row){
			this.$http.post(`${api.dev}/p/vote/signup/audit`,{access_token: getToken(), sl_id: row.sl_id},{emulateJSON:true}).then(res => {
				if(res.body.code == 200) {
					this.$message({
						message: res.body.msg,
						type: 'success'
					});
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
.showImg
	vertical-align middle
.showImg:hover
	cursor zoom-in
.search{
	text-align left
	dl{
		display inline-block
		margin-top 0
		margin-bottom 10px
		dd, dt{
			display inline-block
		}
		dt{
			margin-right 12px
			color #999
			font-size 14px
		}
		dd{
			margin-left 0
			margin-right 24px
		}
	}
}

</style>
<style lang="stylus">
.signup{
	.el-input--medium .el-input__inner{
		line-height: 28px;
	}
}
</style>
