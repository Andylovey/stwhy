<template>
	<div>
		<router-link :to="'/collarticket/ticketMGT/ticketMGTadd/add'" v-if="permissionAdd">
			<el-button type="primary" class="AddVillageBtn margin-bottom-10"><i class="el-icon-edit"></i> 新增</el-button>
		</router-link>
		<el-table
			v-if="permissionShow"
			v-loading="loading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.8)"
			:data="tableData"
			border
			style="width: 100%;"
			height="calc(100% - 100px)"
			row-style="height: 56px">
			<el-table-column prop="tl_id" label="序号" sortable align="center"  min-width="90"></el-table-column>
			<el-table-column prop="tl_name" label="标题名称" sortable align="center" min-width="180"></el-table-column>
			<el-table-column prop="tl_host" label="活动举办方" sortable align="center" min-width="180"></el-table-column>
			<el-table-column prop="tl_place" label="活动地点" sortable align="center" min-width="200"></el-table-column>
			<el-table-column label="首图" sortable align="center" min-width="160">
				<template slot-scope="scope">
					<img :src="scope.row.tl_img" height="34px" class="showImg" @click="showImg(scope.row)">
				</template>
			</el-table-column>
			<el-table-column prop="tl_starttime" label="开始时间" sortable align="center" min-width="190"></el-table-column>
			<el-table-column prop="tl_endtime" label="结束时间" sortable align="center" min-width="190"></el-table-column>
			<el-table-column prop="tl_gettime" label="领取时间" sortable align="center" min-width="190"></el-table-column>
			<el-table-column prop="tl_isidentityText" label="是否需要身份证" sortable align="center" min-width="168"></el-table-column>
			<el-table-column prop="tl_issignupText" label="是否需要报名" sortable align="center" min-width="168"></el-table-column>
			<el-table-column prop="tl_num" label="库存数量" sortable align="center" min-width="168"></el-table-column>
			<el-table-column prop="tl_limitnum" label="每人限领数量" sortable align="center" min-width="168"></el-table-column>
			<el-table-column prop="tl_summary" label="摘要信息" sortable align="center" min-width="280"></el-table-column>
			<el-table-column prop="tl_sort" label="排序" sortable align="center" min-width="120"></el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				align="center"
				min-width="180"
				v-if="permissionDetail || permissionEdit || permissionDelete">
				<template slot-scope="scope">
					<router-link :to="'/collarticket/ticketMGT/ticketMGTdetail/'+scope.row.tl_id" v-if="permissionDetail">
						<el-button type="text" size="small">查看</el-button>
					</router-link>
					<router-link :to="'/collarticket/ticketMGT/ticketMGTedit/'+scope.row.tl_id"  v-if="permissionEdit">
						<el-button type="text" size="small" style="margin-left:10px">编辑</el-button>
					</router-link>
					<el-button v-if="permissionDelete" @click="handleDelete(scope.row)" style="margin-left:10px" type="text" size="small">删除</el-button> 
				</template>
			</el-table-column>
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

		<!-- 放大首图 -->
		<el-dialog 
			:visible.sync="ImgDialog"
			:title="currentImg.tl_name +'首图'" 

			width="40%"
			:close-on-click-modal="false">
			<img :src="currentImg.tl_img" width="100%">
		</el-dialog>
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
	name: 'ticketMGT',
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
			ImgDialog: false,
			currentImg: {},

			permissionShow: false, // 默认为false,根据权限是否显示
			permissionDetail: false, // 默认为false,根据权限是否新建
			permissionEdit: false, // 默认为false,根据权限是否修改
			permissionAdd: false, // 默认为false,根据权限是否新建
			permissionDelete: false, // 默认为false,根据权限是否查看

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
						}else if(item.p_name.indexOf('查看') > -1) {
							this.permissionDetail = true;
						}else if(item.p_name.indexOf('修改') > -1) {
							this.permissionEdit = true;
						}else if(item.p_name.indexOf('新建') > -1) {
							this.permissionAdd = true;
						}else if(item.p_name.indexOf('删除') > -1) {
							this.permissionDelete = true;
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
		getInfo(){
			this.$http.post(
				`${api.dev}/p/collarTicket/list/show`,
				{
					access_token: getToken(),
					start: this.start,
					limit: this.limit
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					res.body.content.records.forEach(i => {
						i.tl_starttime = formatDate(new Date(i.tl_starttime) , 'yyyy-MM-dd hh:mm');
						i.tl_endtime = formatDate(new Date(i.tl_endtime) , 'yyyy-MM-dd hh:mm');
						i.tl_gettime = formatDate(new Date(i.tl_gettime) , 'yyyy-MM-dd hh:mm');
						i.tl_time = [i.tl_starttime, i.tl_endtime];
						if(i.tl_isidentity) {
							i.tl_isidentityText = '是';
						}else{
							i.tl_isidentityText = '否';
						}
						if(i.tl_issignup) {
							i.tl_issignupText = '是';
						}else{
							i.tl_issignupText = '否';
						}
						i.tl_img = `${api.address}${i.tl_imgurl}`;
					});
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
		/* 票券删除 */
		handleDelete(row) {
			var prompt = '您确认删除 ' + row.tl_name + ' 此票券？';
			this.$confirm(prompt, '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				this.$http.post(
					`${api.dev}/p/collarTicket/list/delete`,
					{
						access_token : getToken() ,
						tl_id : row.tl_id
					},
					{emulateJSON : true}
				).then(res => {
					if(res.body.code == 200) {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getInfo();
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

			})
		},
		/* 大图查看 */
		showImg(row){
			this.ImgDialog = true;
			this.currentImg = row;
		},
		/* 分页 */
		handleCurrentChange(val) {
			this.loading = true;
			this.start = this.limit * (val - 1);
			this.getInfo();
		}
	},
	created() {
		this.getSubPermission();
		this.getLimit();
	},
	watch : {
		$route : {
			handler : function (val,oldval) {
				if(val.name == 'ticketMGT') {
					this.getInfo()
				}
			}
		}
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
.text-align-right
	text-align right;
.el-dialog__body .el-form
	max-height 500px
	overflow-y auto
.showImg
	vertical-align middle
.showImg:hover
	cursor zoom-in
</style>

<style>
.el-date-editor .el-range-input[placeholder='开始日期']{
	text-align: left!important;
}

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

.el-table .cell{
	white-space: nowrap!important
}
</style>
