<template>
  <div>
    <el-form ref="AddForm" :model="AddForm" label-width="100px" style="margin-top:10px;margin-bottom:60px;" :rules="AddRules">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="名称" prop="b_name">
            <el-input v-model="AddForm.b_name"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="7">
                <el-form-item label="代码" prop="b_code">
                    <el-input v-model="AddForm.b_code"></el-input>
                </el-form-item>
          </el-col> -->
          <el-col :span="7">
            <el-form-item label="地区名称" prop="b_area">
                <el-select v-model="AddForm.b_area" placeholder="请选择" style="width:100%;">
                <el-option
                    v-for="item in selectAreaOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="经度" prop="b_lon">
            <el-input v-model="AddForm.b_lon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="纬度" prop="b_lat">
            <el-input v-model="AddForm.b_lat"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="负责人" prop="b_director">
                <el-select v-model="AddForm.b_director" multiple placeholder="请选择">
                <el-option
                    v-for="item in selectAdminOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="地区名称" prop="b_area">
                <el-select v-model="AddForm.b_area" placeholder="请选择">
                <el-option
                    v-for="item in selectAreaOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="描述" prop="b_desc">
            <el-input type="textarea" :rows="4" v-model="AddForm.b_desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="封面图片" prop="b_cover">
            <el-upload
                :class="{disabled:uploadDisabled}"
                :limit="1"
                :action="AddUploadUrl"
                list-type="picture-card"
                :on-success="handleAddUploadSuccess"
                :on-preview="handleAddPreview"
                :on-remove="handleAddUploadRemove"
                :file-list="AddUploadFileList"
                :before-upload="beforeUploadCover">
                <i class="el-icon-plus"></i>
            </el-upload>
            <p style="margin:0;color:red">图片格式：".bmp", ".jpg", ".jpeg", ".png"</p>
            <el-dialog :visible.sync="AddPreviewDialogVisible">
                <img width="100%" :src="AddPreviewDialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="村落图片" prop="b_village_photos">
            <el-upload
                :action="AddUploadUrl"
                list-type="picture-card"
                :on-success="handleAddUploadPhotosSuccess"
                :on-preview="handleAddPhotosPreview"
                :on-remove="handleAddUploadPhotosRemove"
                :file-list="AddUploadFileListPhotos"
                :before-upload="beforeUploadCover">
                <i class="el-icon-plus"></i>
            </el-upload>
            <p style="margin:0;color:red">图片格式：".bmp", ".jpg", ".jpeg", ".png"</p>
            <el-dialog :visible.sync="AddPreviewPhotosDialogVisible">
                <img width="100%" :src="AddPreviewPhotosDialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="视频封面" prop="b_video_snapshots">
            <el-upload
                :action="AddUploadUrl"
                list-type="picture-card"
                :on-success="handleAddUploadVideoCoverSuccess"
                :on-preview="handleAddVideoCoverPreview"
                :on-remove="handleAddUploadVideoCoverRemove"
                :file-list="AddUploadFileListVideoCover"
                :on-progress="uploadOnProgress"
                :before-upload="beforeUploadCover">
                <i class="el-icon-plus"></i>
            </el-upload>
            <p style="margin:0;color:red">图片格式：".bmp", ".jpg", ".jpeg", ".png"</p>
            <el-dialog :visible.sync="AddPreviewVideoCoverDialogVisible">
                <img width="100%" :src="AddPreviewVideoCoverDialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
            <el-form-item label="村落视频" prop="b_village_videos">
                <!-- <el-upload
                    ref="villageVideo"
                    :action="AddUploadVideo"
                    list-type="picture-card"
                    :before-upload="beforeUploadVideo"
                    :on-success="handleAddUploadVideoSuccess"
                    :on-preview="handleAddVideoPreview"
                    :on-remove="handleAddUploadVideoRemove"
                    :file-list="AddUploadFileListVideo">
                    <i class="el-icon-plus"></i>
                </el-upload> -->
                <el-button type="primary" @click="handleUploadVideoTable">上传视频</el-button>
                <div class="videoSourceBasePlace" style="margin-top:10px;"></div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="14">
              <el-form-item>
                  <div id="videoPlaySource">
                        <span v-for="item in videoPlaySource" :key="item" style="position:relative;display:inline-block;width:200px;height:150px;">
                          <video controls :src="videoUrl + item" width="200px" height="150px" ref="deleteVideo"></video>
                          <span style="position:absolute;right:0;top:0;width:25px;height:25px;background-color:red;border-radius:50%;text-align:center;line-height:25px;color:#fff;cursor:pointer;" @click="handleDeleteVideo(item)">X</span>
                        </span>
                  </div>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 视频上传 -->
      <!-- <el-dialog 
      :visible.sync="uploadVideoVisible"
      :close-on-click-modal="false"
      title="上传视频"
      width="650px">
        <span style="width:300px;height:150px;display:inline-block" id="loadArea" v-if="loadIsShow"></span>
        <span v-if="videoSrcIsShow" ref="videoSourceBase" id="videoSourceBase">
            <div v-for="item in videoSrc" :key="item" style="position:relative;width:300px;height:150px;display:inline-block">
                <video :src="item" width="300" height="150" controls="controls"></video>
            </div>
        </span>
        <div class="el-upload el-upload--picture-card" style="margin-left:10px;">
            <i class="el-icon-plus" @click="uploadVideoPlus"></i>
        </div>
        <input type="file" id="uploadVideo" ref="uploadVideo" @change="uploadVideoChange">
      </el-dialog> -->
      
      
      <el-dialog 
      :visible.sync="uploadVideoVisible"
      :close-on-click-modal="false"
      title="上传文件"
      class="uploadFileDialog"
      @close="handleClose"
      width="800px">
        <el-button type="primary" id="btn" @click="handleUploadVideo" class="addBtn">添加视频</el-button>
        <span style="color:red;font-size:14px;margin-left:15px;">支持格式：mp4，flv，wmv</span>
        <div class="fileInfo" style="margin-top:10px;">
            <input type="file" name="file" id="file" style="display:none" @change="handleUploadVideoChange">
            <table cellpadding="10" id="table" width="100%" cellspacing="2">
                <tr bgcolor="#ececec">
                    <th width="250">文件名</th>
                    <th>大小</th>
                    <th width="280">状态</th>
                    <th>操作</th>
                </tr>
            </table>
        </div>
        <el-button type="primary" size="small" style="margin-top:10px;position:absolute;right:20px" @click="handleConfirm" class="confirmBtn">确定</el-button>
      </el-dialog>

      <el-footer>
        <el-button type="primary" @click="goBack" size="small" icon="el-icon-arrow-left">返回</el-button>
        <el-button type="primary" @click="AddSave('AddForm')" size="small" icon="el-icon-edit-outline">保存</el-button>
      </el-footer>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

import $ from 'jquery'

export default {
  name: 'componentspage1',
  data() {
      return {
          AddForm : {
            // b_code : '',
            // b_lat : '',
            // b_director : [],
            b_desc : '',
            b_cover : [],
            b_id : '',
            b_name : '',
            b_area : '',
            // b_lon : '',
            b_village_photos : [],
            b_video_snapshots : [],
          },
          AddRules : {
              b_name : [{required: true,message : '请输入名称', trigger: 'blur'}],
            //   b_lon : [{required: true,message : '请输入经度', trigger: 'blur'}],
            //   b_lat : [{required: true,message : '请输入纬度', trigger: 'blur'}],
              b_area : [{required: true,message : '请选择地区名称', trigger: 'change'}],
              b_cover : [{required: true,message : '请上传封面图片', trigger: 'change'}],
              b_village_photos : [{required: true,message : '请上传村落图片', trigger: 'change'}],
              b_video_snapshots : [{required: true,message : '请上传视频封面', trigger: 'change'}],
            //   b_village_videos : [{required: true,message : '请上传视频', trigger: 'change'}],
          },
          selectAdminOptions : [], // 负责人
          selectAreaOptions : [], // 地区

          AddUploadUrl : `${api.dev}/p/main/upload/image`,  // 上传图片的地址
          AddUploadVideo : `${api.dev}/p/main/upload/video`,  // 上传图片的地址
          AddUploadFileList : [],
          AddPreviewDialogVisible : false,
          AddPreviewDialogImageUrl : '',

          AddUploadFileListPhotos : [],
          AddPreviewPhotosDialogVisible : false,
          AddPreviewPhotosDialogImageUrl : '',    
          
          AddUploadFileListVideoCover : [],
          AddPreviewVideoCoverDialogVisible : false,
          AddPreviewVideoCoverDialogImageUrl : '', 

          uploadVideoVisible : false,
          videoSrcIsShow : false,
          videoSrc : [],
          loadIsShow : false,

          // 存储视频是数组
          videoSaveSource: [],
          videoPlaySource : [],
          videoUrl : `${api.address}`,
          flag : true,
      }
  },
  methods : {
      // 获取负责人
      getSelectAdmin() {
        this.$http.get(`${api.dev}/p/main/drop/selectAdmin`,{params: {access_token: getToken(), type : 0}}).then(res => {
          if(res.body.code == 200) {
            this.selectAdminOptions = res.body.content;
          }else if(res.body.code == 500) {
            this.$message({
              message: res.body.msg,
              type: 'error'
            });
            removeToken();
            setTimeout(function () {
              window.location.href = '';
            },2000)
          }
        })
      },
      getSelectArea() {
          this.$http.get(`${api.dev}/p/main/drop/selectArea`,{params: {access_token: getToken(), type : 0}}).then(res => {
                if(res.body.code == 200) {
                    this.selectAreaOptions = res.body.content;
                }else if(res.body.code == 500) {
                    this.$message({
                        message: res.body.msg,
                        type: 'error'
                    });
                    removeToken();
                    setTimeout(function () {
                        window.location.href = '';
                    },2000)
                }
          })
      },
      // 上传成功时
    handleAddUploadSuccess(res,file,fileList) {
        this.AddUploadFileList.push({url: `${api.address}${res.content}`})
        this.AddForm.b_cover = res.content
        
    },
          // 放大图片
    handleAddPreview(file) {
        this.AddPreviewDialogVisible = true;
        this.AddPreviewDialogImageUrl = file.url;
    },
    // 删除图片
    handleAddUploadRemove(file,fileList) {
        for(var i = 0 ; i < this.AddUploadFileList.length ; i++) {
            if(file.url == this.AddUploadFileList[i].url) {
                this.AddUploadFileList.splice(i,1)
            }
        }
       
    //    var reg = new RegExp(`${api.address}`);
    //    file.url = file.url.replace(reg,'');

        // for(var j = 0 ; j < this.AddForm.b_cover.length ; j++) {
        //     if(file.url == this.AddForm.b_cover[j]) {
        //         this.AddForm.b_cover.splice(j,1)
        //     }
        // }

        this.AddForm.b_cover = ''
    },
      // 上传成功时
    handleAddUploadPhotosSuccess(res,file,fileList) {
        this.AddUploadFileListPhotos.push({url: `${api.address}${res.content}`})
        this.AddForm.b_village_photos.push(res.content)
    },
          // 放大图片
    handleAddPhotosPreview(file) {
        this.AddPreviewPhotosDialogVisible = true;
        this.AddPreviewPhotosDialogImageUrl = file.url;
    },
    handleAddUploadPhotosRemove(file,fileList) {
        for(var i = 0 ; i < this.AddUploadFileListPhotos.length ; i++) {
            if(file.url == this.AddUploadFileListPhotos[i].url) {
                this.AddUploadFileListPhotos.splice(i,1)
            }
        }
       
       var reg = new RegExp(`${api.address}`);
       file.url = file.url.replace(reg,'');

        for(var j = 0 ; j < this.AddForm.b_village_photos.length ; j++) {
            if(file.url == this.AddForm.b_village_photos[j]) {
                this.AddForm.b_village_photos.splice(j,1)
            }
        }
    },
      // 上传成功时
    handleAddUploadVideoCoverSuccess(res,file,fileList) {
        // console.log(this.$refs.test);
        // console.log(this.$refs.test.$children[0].$el.children[0].innerHTML);
        // var reg = new RegExp('img');
        // var str = this.$refs.test.$children[0].$el.children[0].innerHTML;
        // str = str.replace(reg,'video');

        // this.$refs.test.$children[0].$el.children[0].innerHTML = str;
        // console.log(str);

        this.AddUploadFileListVideoCover.push({url: `${api.address}${res.content}`})
        this.AddForm.b_video_snapshots.push(res.content)
    },
          // 放大图片
    handleAddVideoCoverPreview(file) {
        this.AddPreviewVideoCoverDialogVisible = true;
        this.AddPreviewVideoCoverDialogImageUrl = file.url;
    },
    handleAddUploadVideoCoverRemove(file,fileList) {
        for(var i = 0 ; i < this.AddUploadFileListVideoCover.length ; i++) {
            if(file.url == this.AddUploadFileListVideoCover[i].url) {
                this.AddUploadFileListVideoCover.splice(i,1)
            }
        }
       
       var reg = new RegExp(`${api.address}`);
       file.url = file.url.replace(reg,'');

        for(var j = 0 ; j < this.AddForm.b_video_snapshots.length ; j++) {
            if(file.url == this.AddForm.b_video_snapshots[j]) {
                this.AddForm.b_video_snapshots.splice(j,1)
            }
        }
    },
    beforeUploadVideo(file) {
        if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
            this.$message.error('请上传正确的视频格式');
            return false;
        }
    },
    // handleAddUploadVideoSuccess(res,file,fileList) {
    //     var reg = new RegExp('img');
    //     var video = this.$refs.villageVideo.$children[0].$el.children[0].innerHTML;
    //     video = video.replace(reg,'video');

    //     this.$refs.villageVideo.$children[0].$el.children[0].innerHTML = video;
    // },
    // 返回
    goBack() {
        this.$router.back(-1);
    },
    // 保存
    AddSave(formName) {
        this.$refs[formName].validate((valid) => {
            if(valid) {
                // 开启加载器
                const loading = this.$loading({
                    lock: true,
                    text: '正在保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                var reg = new RegExp(`${api.address}`);

                // 村落图片截取字符串
                var villageSrc = [];
                this.AddUploadFileListPhotos.forEach(item => {
                    villageSrc.push(item.url.replace(reg,''))
                })

                // 视频封面截取字符串
                var videoCover = [];
                this.AddUploadFileListVideoCover.forEach(item => {
                    videoCover.push(item.url.replace(reg,''))
                })
                
                // 视频截取字符串
                var videoSrcSave = [];
                // this.videoSrc.forEach(item => {
                //     videoSrcSave.push(item.replace(reg,''))
                // })

                // this.videoSaveSource.forEach(item => {
                //     videoSrcSave.push(item)
                // })
                this.videoPlaySource.forEach(item => {
                    videoSrcSave.push(item)
                })

                var formdata = new FormData();
                formdata.append('access_token',getToken());
                formdata.append('b_name',this.AddForm.b_name);
                formdata.append('b_cover',this.AddForm.b_cover);
                // formdata.append('b_code',this.AddForm.b_code);
                formdata.append('b_desc',this.AddForm.b_desc);
                // formdata.append('b_director',JSON.stringify(this.AddForm.b_director));
                formdata.append('b_area',this.AddForm.b_area);
                formdata.append('b_village_photos',JSON.stringify(villageSrc))
                formdata.append('b_video_snapshots',JSON.stringify(videoCover))
                formdata.append('b_village_videos',JSON.stringify(videoSrcSave))
                // formdata.append('b_lon',this.AddForm.b_lon);
                // formdata.append('b_lat',this.AddForm.b_lat);
                this.$http.post(`${api.dev}/p/main/village/save`,formdata,{emulateJSON:true}).then(res => {
                    if(res.body.code == 200) {
                        loading.close();
                        this.$message({
                            message: res.body.msg,
                            type: 'success'
                        });
                        this.$router.back(-1);
                    }else if(res.body.code == 500) {
                        loading.close();
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
                        window.location.href = '';
                        },2000)
                    }
                })
            }else {
                console.log('submit error');
                return false;
            }
        })
    },
    uploadOnProgress(e) {
        console.log(e);
    },
    uploadVideoPlus() {
        $('#uploadVideo').click();
    },
    uploadVideoChange(e) {
        var _this = this;
        var formdata = new FormData();
        formdata.append('file',e.srcElement.files[0]);
        $.ajax({
            url: `${api.dev}/p/main/upload/video`,
            type: "POST",
            data:formdata,
            cache:false,         //不设置缓存
            processData: false,  // 不处理数据
            contentType: false,   // 不设置内容类型
            beforeSend : function () {
                _this.loadIsShow = true;
                setTimeout(() => {
                    const loading = _this.$loading({
                        lock: true,
                        text: '正在上传中，请稍候...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)',
                        target: document.querySelector('#loadArea')
                    });
                })
            },
            success : function(res) {
                // 关闭loading
                $('.el-loading-mask').hide();
                $('.el-loading-spinner').hide();
                _this.loadIsShow = false;
                _this.videoSrcIsShow = true;
                // _this.videoSrc = `${api.address}${res.content}`
                _this.videoSrc.push(`${api.address}${res.content}`) 

                // var videoDataBase = this.$refs.videoSourceBase;
                // $('.videoSourceBasePlace').append($('#videoSourceBase'));
                setTimeout(() => {
                    $('.videoSourceBasePlace').append($('#videoSourceBase')[0])
                })
            }
        }); 
    },
    // confirmUpload() {
    //     // if(this.videoSrc.length == 0) {
    //     //     this.$message({
    //     //         message:'请上传视频',
    //     //         type:'error'
    //     //     })
    //     // }
    //     this.uploadVideoVisible = false;
    //     // this.videoSrc = [];
    //     var videoDataBase = this.$refs.videoSourceBase;
    //     $('.videoSourceBasePlace').append(videoDataBase);
    // }
    handleUploadVideo() {
        $('#file').click()
    },
    handleUploadVideoChange() {
        const _this = this;
        var data = $('#file')[0].files[0]
        console.log(data)
        var url = URL.createObjectURL(data);
        console.log(url.duration)

        // 发送请求前先验证
        // const isLt500M = data.size / 1024 / 1024  < 500;
        if (['video/mp4', 'video/flv', 'video/wmv'].indexOf(data.type) == -1) {
            this.$message.error('请上传正确的视频格式');
            return false;
        }
        // if (!isLt500M) {
        //     this.$message.error('上传视频大小不能超过500MB!');
        //     return false;
        // } 

        var formdata = new FormData();
        formdata.append('file',data);
        
        $('#table').append(`
            <tr>
                <td style="text-align:left;border-bottom:1px solid #ccc">${data.name}</td> 
                <td style="text-align:center;border-bottom:1px solid #ccc">${(data.size / 1024 / 1024).toFixed(2)}MB</td> 
                <td style="position:relative;border-bottom:1px solid #ccc">
                    <progress max="100" class="progress"></progress>
                    <span class='percent' style="position:absolute;left:65px;"></span>
                    <span class="reqInfo" style="font-size:12px;">正在请求...</span>
                </td> 
                <td style="text-align:center;border-bottom:1px solid #ccc">
                    <button class="deleteBtn el-button el-button--primary el-button--small" style="cursor: pointer">取消</button>
                </td> 
            </tr>
        `)

        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (evt) {
            if(evt.lengthComputable){
                var loading = Math.round(evt.loaded / evt.total * 100);
                $('#table tr:last .progress').val(loading)
                $('#table tr:last .percent').html(loading + '%')
                $('#table tr:last .reqInfo').html('已上传：' + (evt.loaded / 1024 / 1024).toFixed(2) + 'MB')

                $('.addBtn').css({
                    'cursor' : 'not-allowed',
                    'background-color' : '#f4f4f5',
                    'border-color' : '#f4f4f5',
                    'color' : '#c0c4cc',
                })
                $('.addBtn').attr('disabled',true)

                $('.confirmBtn').css({
                    'cursor' : 'not-allowed',
                    'background-color' : '#f4f4f5',
                    'border-color' : '#f4f4f5',
                    'color' : '#c0c4cc',
                })
                $('.confirmBtn').attr('disabled',true)

                if(loading == 100) {
                    $('#table tr:last .deleteBtn').css({
                        'cursor' : 'not-allowed',
                        'background-color' : '#f4f4f5',
                        'border-color' : '#f4f4f5',
                        'color' : '#c0c4cc',
                    })
                    $('#table tr:last .deleteBtn').attr('disabled',true)
                    $('#table tr:last .reqInfo').html('已完成')

                    $('.addBtn').css({
                        'cursor' : 'pointer',
                        'background-color' : '#41B883',
                        'border-color' : '#41B883',
                        'color' : '#fff',
                    })
                    $('.addBtn').removeAttr('disabled')

                    $('.confirmBtn').css({
                        'cursor' : 'pointer',
                        'background-color' : '#41B883',
                        'border-color' : '#41B883',
                        'color' : '#fff',
                    })
                    $('.confirmBtn').removeAttr('disabled')
                }
            }
        }
        xhr.open('post',`${api.dev}/p/main/upload/video`,true);
        xhr.send(formdata);
        xhr.onreadystatechange = function () {
            if(xhr.status == 200 && xhr.readyState == 4) {
                // _this.$message({
                //     type: 'success',
                //     message : '上传成功'
                // })
                var res = JSON.parse(xhr.responseText);
                _this.videoSaveSource.push(res.content)

                //console.log($('#file').val())
                $('#file').val('');                // 防止二次选择相同名字后不能被选中
                //console.log($('#file').val())
            }
        }
        xhr.onabort = function () {
            console.log('取消AJAX请求')
        }
        // 防止点击多次 所以先解除绑定click事件
        $('.deleteBtn').unbind('click').click(function () {
            // var rowIndex = $(this).parent().parent()[0].rowIndex
            // _this.videoSaveSource.splice(rowIndex - 1 , 1)
            // console.log(_this.videoSaveSource)
            _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                xhr.abort()
                $(this).parent().parent().remove()

                $('#file').val('');

                $('.addBtn').css({
                    'cursor' : 'pointer',
                    'background-color' : '#41B883',
                    'border-color' : '#41B883',
                    'color' : '#fff',
                })
                $('.addBtn').removeAttr('disabled')

                $('.confirmBtn').css({
                    'cursor' : 'pointer',
                    'background-color' : '#41B883',
                    'border-color' : '#41B883',
                    'color' : '#fff',
                })
                $('.confirmBtn').removeAttr('disabled')
            })
        })
        $('.el-dialog__headerbtn').unbind('click').click(function () {
            xhr.abort()
            $('#file').val('');
            $('.addBtn').css({
                'cursor' : 'pointer',
                'background-color' : '#41B883',
                'border-color' : '#41B883',
                'color' : '#fff',
            })
            $('.addBtn').removeAttr('disabled')

            $('.confirmBtn').css({
                'cursor' : 'pointer',
                'background-color' : '#41B883',
                'border-color' : '#41B883',
                'color' : '#fff',
            })
            $('.confirmBtn').removeAttr('disabled')    
        })
    },
    handleConfirm() {
        // console.log(this.videoSaveSource)

        // for(var i = 0 ; i < this.videoSaveSource.length ; i++) {
        //     for(var j = 0 ; j < this.videoPlaySource.length ; j++) {
        //         this.videoPlaySource[j] = this.videoSaveSource[i]
        //     }
        // }

        // this.videoPlaySource = []
        // this.videoSaveSource.forEach(item => {
        //     this.videoPlaySource.push(item)
        // })

        this.videoPlaySource = this.videoPlaySource.concat(this.videoSaveSource)

        // this.videoPlaySource = this.videoSaveSource  // 数组的直接赋值会导致指向同一个物理地址，一个数组一改变另一个数组也直接跟着改变，确定按钮变得没意义
        this.uploadVideoVisible = false
        // console.log($('#table tr').eq(0).siblings())
        $('#table tr').eq(0).show().siblings().hide()
    },
    handleClose() {
        this.videoSaveSource = [];
        $('#table tr').eq(0).show().siblings().hide()
    },
    handleUploadVideoTable() {
        this.uploadVideoVisible = true;
    },
    handleDeleteVideo(item) {
        //console.log(item)
        //console.log($(this))
        //console.log(this.$refs.deleteVideo)
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            for(var i = 0 ; i < this.videoSaveSource.length ; i++) {
                if(this.videoSaveSource[i] == item) {
                    this.videoSaveSource.splice(i , 1)
                }
            }
            for(var i = 0 ; i < this.videoPlaySource.length ; i++) {
                if(this.videoPlaySource[i] == item) {
                    this.videoPlaySource.splice(i , 1)
                }
            }
            this.$http.post(`${api.dev}/p/main/upload/delete`,{fileName:item},{emulateJSON:true}).then(res => {
                if(res.body.code == 200) {
                    this.$message({
                        type: 'success',
                        message : res.body.msg
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
                        window.location.href = '';
                        },2000)
                }
            })
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
  },
  created() {
      this.getSelectAdmin()
      this.getSelectArea()
  },
  computed : {
      uploadDisabled : function () {
          return this.AddForm.b_cover != ''
      }
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
    z-index 9
    margin-left -15px
#uploadVideo
    display none
</style>

<style>
.uploadFileDialog .el-dialog__header{
    border-bottom : 1px solid #ccc
}
.uploadFileDialog .el-dialog__body {
    padding-top: 15px;
    padding-bottom: 50px;
}
</style>
