<template>
	<div>
		<template v-if="permissionShow">
			<!-- 表单 -->
			<el-form ref="Form" :model="Form" label-width="140px" :rules="Rules" style="width:80%;">
				<el-form-item label="序号" prop="s_id">
					<el-input v-model="Form.s_id" disabled></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="s_name">
					<el-input v-model="Form.s_name" :disabled="!permissionSave"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="s_address">
					<el-input v-model="Form.s_address" :disabled="!permissionSave"></el-input>
				</el-form-item>
				<el-form-item label="访问量" prop="s_view">
					<el-input v-model="Form.s_view" disabled></el-input>
				</el-form-item>
				<el-form-item label="版权所有" prop="s_authorization">
					<el-input v-model="Form.s_authorization" :disabled="!permissionSave"></el-input>
				</el-form-item>
				<el-form-item label="备案号" prop="s_recordation">
					<el-input v-model="Form.s_recordation" :disabled="!permissionSave"></el-input>
				</el-form-item>
				<el-form-item label="联系我们" prop="s_contact">
					<el-input v-model="Form.s_contact" :disabled="!permissionSave"></el-input>
				</el-form-item>
				<el-form-item label="政权声明" prop="s_declaraction">
					<vue-ueditor-wrap 
                        v-model="Form.s_declaraction"
                        :disabled="!permissionSave" 
                        :config="editorConfig">
                    </vue-ueditor-wrap>
					<!-- <el-input v-model="Form.s_declaraction" :disabled="!permissionSave" type="textarea" :rows="20"></el-input> -->
				</el-form-item>
				<el-form-item label="隐私政策" prop="s_policy">
					<el-input v-model="Form.s_policy" :disabled="!permissionSave"></el-input>
				</el-form-item>
				<el-form-item class="text-align-right">
					<template v-if="permissionSave">
						<el-button type="primary" @click="submitForm">保存</el-button>
						<el-button @click="cancleForm">重置</el-button>
					</template>
					<template v-else>
						<el-button type="primary" disbaled>保存</el-button>
						<el-button disbaled>重置</el-button>
					</template>
				</el-form-item>
			</el-form>
		</template>
		<template v-else>
			您的权限不足！
		</template>
	</div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

// 引入富文本框插件
import VueUeditorWrap from 'vue-ueditor-wrap' 

export default {
	name: 'website',
	data() {
		return {
			/* 
			 * loading: 加载状态（默认为true）
			 */
			loading : true,

			Form : {},
			Rules : {
				s_name : [{required: true, message : '请输入名称', trigger: 'blur'}],
			},

			permissionShow: false, // 默认为false,根据权限是否显示
			permissionSave: false, // 默认为false,根据权限是否修改

			// msg : 'dasda',
            editorConfig : {
                // 如果需要上传功能,找后端小伙伴要服务器接口地址
                // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
                serverUrl: `${api.dev}/api/main/ueditor/ueditorConfig`,
                // 你的UEditor资源存放的路径,相对于打包后的index.html
                UEDITOR_HOME_URL: '/ueditor/',
                // UEDITOR_HOME_URL: '/ueditor/',
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 工具栏是否可以浮动
                autoFloatEnabled: false,
                // 初始容器高度
                initialFrameHeight: 500,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 关闭自动保存
                enableAutoSave: true,
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'simpleupload', 'emotion', 'pagebreak', 'template', 'background', '|',
                    'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                    'print', 'preview', 'searchreplace', 'drafts', 'help'
                ]]
            },
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
						if(item.p_name.indexOf('查询') > -1) {
							this.permissionShow = true;
						}else if(item.p_name.indexOf('保存') > -1) {
							this.permissionSave = true;
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
				`${api.dev}/p/main/website/show`,
				{
					access_token: getToken(),
				},
				{emulateJSON : true}
			).then(res => {
				if(res.body.code == 200) {
					this.Form = res.body.content;
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
		/* 保存 */
		submitForm() {
			var formdata = new FormData();
			formdata.append('access_token',getToken());
			formdata.append('s_id',parseInt(this.Form.s_id));
			formdata.append('s_name',this.Form.s_name);
			formdata.append('s_address',this.Form.s_address);
			formdata.append('s_authorization',this.Form.s_authorization);
			formdata.append('s_policy',this.Form.s_policy);
			formdata.append('s_declaraction',this.Form.s_declaraction);
			formdata.append('s_contact',this.Form.s_contact);
			formdata.append('s_recordation',this.Form.s_recordation);
			this.$http.post(
				`${api.dev}/p/main/website/save`,
				formdata,
				{emulateJSON:true}
			).then(res => {
				if(res.body.code == 200) {
					this.$message({
						message: res.body.msg,
						type: 'success'
					});
					this.cancleForm();
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
				this.loading = true;
				this.getInfo();
			})
		},
		/* 取消 */
		cancleForm(){
			this.getInfo();
			this.$refs.Form.clearValidate(); // 清除表单验证规则
		}
	},
	components : {
        VueUeditorWrap
    },
	created() {
		this.getSubPermission();
		this.getInfo();
	}
}
</script>


<style lang="stylus" scoped>

</style>
