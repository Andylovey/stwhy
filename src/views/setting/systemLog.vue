<template>
	<div>
		<el-button v-if="permissionExport" type="primary" @click="handleExport()" class="AddVillageBtn margin-bottom-10"><i class="el-icon-download"></i> 导出</el-button>
		<div style="float: right; margin-bottom: 10px;">
			<el-input v-model="searchName" placeholder="请输入相关搜索" style="width:200px" @keyup.enter.native="getInfo('search')"></el-input>
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
			<!--<el-table-column prop="sl_id" label="序号" sortable align="center"  min-width="90"></el-table-column>-->
			<el-table-column prop="sl_log_type" label="操作类别" sortable align="center" min-width="160"></el-table-column>
			<el-table-column prop="sl_content" label="操作内容" sortable align="center" min-width="300"></el-table-column>
			<el-table-column prop="sl_ip" label="ip地址" sortable align="center" min-width="180"></el-table-column>
			<el-table-column prop="username" label="操作用户" sortable align="center" min-width="140"></el-table-column>
			<el-table-column prop="sl_time" label="操作时间" sortable align="center" min-width="180"></el-table-column>
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
	name: 'systemLog',
	data() {
		return {
			/* 
			 * tableData: 表格数据
			 * loading: 加载状态（默认为true）
			 * total: 总条数（table数据总长度）
			 * start: 表格分页（默认第一页）
			 * limit: 每页显示条数
			 * searchName: 搜索（用户名）
			 */
			tableData : [],
			loading : true,
			total: 0,
			start : 0,
			limit : 10,
			searchName: '',
			searchVal: '',

			permissionShow: false, // 默认为false,根据权限是否显示
			permissionExport: false, // 默认为false,根据权限是否修改
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
						if(item.p_name.indexOf('显示') > -1) {
							this.permissionShow = true;
						}else if(item.p_name.indexOf('导出') > -1) {
							this.permissionExport = true;
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
		getInfo(searchName){
			//console.log('searchName:'+searchName);
			this.searchVal = (searchName == 'search') ? this.searchName : '';
			this.$http.post(
				`${api.dev}/p/main/systemLog/show`,
				{
					access_token: getToken(),
					start: this.start,
					limit: this.limit,
					name1: this.searchVal
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					res.body.content.records.forEach(i => {
						i.sl_time = formatDate(new Date(i.sl_time) , 'yyyy-MM-dd hh:mm:ss');
					})

					this.tableData = res.body.content.records;
					this.total = res.body.content.total;
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
		/* 导出 */
		handleExport() {
			this.$confirm('是否要导出系统日志', '提示', {
				type: 'info'
			}).then(() => {
				window.location.href = `${api.dev}/p/main/systemLog/export?access_token=${getToken()}&start=${this.start}&limit=${this.limit}&name1=${this.searchVal}`;
			})
		},
		/* 分页 */
		handleCurrentChange(val) {
			this.loading = true;
			this.start = 10 * (val - 1);
			this.getInfo();
		}
	},
	created() {
		this.getSubPermission();
		this.getInfo();
	}
}
</script>


<style lang="stylus" scoped>
#pagination
	margin-top 10px
.margin-bottom-10
	margin-bottom 10px

</style>
