<template>
	<div>
		<uploader :options="uploadOptions" class="uploader-example"> 
            <uploader-drop>
                <p>Drop files here to upload or</p>
                <uploader-btn>上传视频</uploader-btn>
            </uploader-drop>
            <uploader-list :isPause="false" ></uploader-list>
        </uploader>
	</div>
</template>

<script>
	import api from '@/api/api.js'

	export default {
		name: "UploadFile",
		data(){
			return {
				 uploadOptions: {
		          target: `${api.dev}/p/main/upload/video`,
		          testChunks: false
		        },
		        statusText: {
		          success: '成功了',
		          error: '出错了',
		          uploading: '上传中',
		          paused: '暂停中',
		          waiting: '等待中'
		        },
			}
		},
		methods:{
			/*uploadSectionFile(param){
		        var fileObj = param.file;
		        var form = new FormData();
		        form.append("file", fileObj);
		        //let requestId = uuid.v1().replace(/-/g, '')
		        //
		        this.$http.post(`${api.dev}/p/main/upload/video`,
                    form,
                    {progress:function(event){
                      param.file.percent = event.loaded/event.total*100
                      param.onProgress(param.file)
                    }
		        }).then((res)=>{
		          console.log(res)
		          param.data.list.push({
		            name:res.data.name,
		            status:"success",
		            uid:new Date().getTime(),
		            url:res.data.url
		          })
		        },response => {
		          console.log('--->>>>>',response)
		        })

		    },
		    beforeAvatarUpload(){

		    }*/
		}
	}
</script>

<style scoped>
	

</style>