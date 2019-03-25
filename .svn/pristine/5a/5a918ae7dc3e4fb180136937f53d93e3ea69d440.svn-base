<template>
  <div class="set-function-ticket">
    <div class="components-container">
    <el-button type="primary" @click="dialogTableVisible = true" class="addBtn"><i class="el-icon-edit"></i> 新增</el-button>
    <el-dialog :visible.sync="dialogTableVisible" title="新建票券" top="25px" :close-on-click-modal="false">
      <!-- <el-select ref="select" v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select> -->
      <!-- <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150"/>
        <el-table-column property="name" label="Name" width="200"/>
        <el-table-column property="address" label="Address"/>
      </el-table> -->
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="tl_name">
              <el-input v-model="form.tl_name"></el-input>
            </el-form-item>
            <el-form-item label="剩余数量" prop="tl_num">
              <el-input v-model.number="form.tl_num"></el-input>
            </el-form-item>
            <el-form-item label="活动时间" prop="functionTime">
              <div class="block">
                <el-date-picker
                  v-model="form.value"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  :default-time="['12:00:00', '08:00:00']"
                  @change="handleChange">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="领取时间" prop="gettingTime">
              <div class="block">
                <el-date-picker
                  v-model="form.gettingTime"
                  type="datetime"
                  placeholder="领取时间"
                  @change="gettingChange">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="排序" prop="tl_sort">
              <el-input v-model.number="form.tl_sort"></el-input>
            </el-form-item>
            <el-form-item label="限领数量" prop="tl_limitnum">
              <el-input v-model.number="form.tl_limitnum"></el-input>
            </el-form-item>
            <el-form-item label="摘要信息" prop="tl_summary">
              <el-input v-model="form.tl_summary"></el-input>
            </el-form-item>
            <el-form-item label="活动地点" prop="tl_place">
              <el-input v-model="form.tl_place"></el-input>
            </el-form-item>
            <el-form-item label="举办方" prop="tl_host">
              <el-input v-model="form.tl_host"></el-input>
            </el-form-item>
            <el-form-item label="报名" prop="tl_issignup">
              <el-radio v-model="form.tl_issignup" label="true">是</el-radio>
              <el-radio v-model="form.tl_issignup" label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="身份证" prop="tl_isidentity">
              <el-radio v-model="form.tl_isidentity" label="true">是</el-radio>
              <el-radio v-model="form.tl_isidentity" label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="活动首图" prop="tl_imgurl">
              <!-- <el-upload
                accept="image/*"
                action="http://oa.ea-mall.com:51888/CollarTicket/admin/uploadFile"
                name="file"
                ref="upload"
                :on-change="getfile"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="getImgUrl"
                :on-remove="removePic">
                <i class="el-icon-plus"></i>
              </el-upload> -->
              <!-- <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog> -->
              <!-- 裁剪工具 -->
              <div class="cut-pic">
                <a class="btn" @click="toggleShow">上传首图</a>
                <my-upload field="file"
                      method = "POST"
                      @crop-success="cropSuccess"
                      @crop-upload-success="cropUploadSuccess"
                      @crop-upload-fail="cropUploadFail"
                      v-model="show"
                  :width="150"
                  :height="150"
                  url="http://oa.ea-mall.com:51888/CollarTicket/admin/uploadFile"
                  :headers="headers"
                  img-format="png"
                  class="myupload"
                  ></my-upload>
                <img :src="imgDataUrl" style="margin-top:50px;border-radius:8px">      
              </div>
            </el-form-item>
            <el-form-item label="描述信息" prop="tl_content">
              <quill-editor ref="myTextEditor"
							    :content="form.tl_content"
							    :options = "editorOption"
							    @change="onEditorChange($event)">
							</quill-editor>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                <el-button @click="cancleAdd('form')">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
  </div>
    <!-- 编辑页面 编辑框 -->
    <el-dialog :visible.sync="editFormVisible" title="编辑票券" top="25px" :close-on-click-modal="false">
      <el-form ref="form" :model="editForm" label-width="80px" :rules="validaterules" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="tl_name">
              <el-input v-model="editForm.tl_name"></el-input>
            </el-form-item>
            <el-form-item label="剩余数量" prop="tl_num">
              <el-input v-model.number="editForm.tl_num"></el-input>
            </el-form-item>
            <el-form-item label="活动时间" prop="functionTime">
              <div class="block">
                <el-date-picker
                  v-model="editForm.value"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  @change="editChange">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="领取时间" prop="gettingTime">
              <div class="block">
                <el-date-picker
                  v-model="editForm.gettingTime"
                  type="datetime"
                  placeholder="领取时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="排序" prop="tl_sort">
              <el-input v-model.number="editForm.tl_sort"></el-input>
            </el-form-item>
            <el-form-item label="限领数量" prop="tl_limitnum">
              <el-input v-model.number="editForm.tl_limitnum"></el-input>
            </el-form-item>
            <el-form-item label="摘要信息" prop="tl_summary">
              <el-input v-model="editForm.tl_summary"></el-input>
            </el-form-item>
            <el-form-item label="活动地点" prop="tl_place">
              <el-input v-model="editForm.tl_place"></el-input>
            </el-form-item>
            <el-form-item label="举办方" prop="tl_host">
              <el-input v-model="editForm.tl_host"></el-input>
            </el-form-item>
            <el-form-item label="报名">
              <el-radio v-model="editForm.tl_issignup" label="true">是</el-radio>
              <el-radio v-model="editForm.tl_issignup" label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="身份证">
              <el-radio v-model="editForm.tl_isidentity" label="true">是</el-radio>
              <el-radio v-model="editForm.tl_isidentity" label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="活动首图">
              <!-- <el-upload
                accept="image/*"
                action="http://oa.ea-mall.com:51888/CollarTicket/admin/uploadFile"
                name="file"
                ref="upload"
                :on-change="getfile"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="picList"
                :limit="1"
                :on-exceed="exceedHandle"
                :on-success="picUrl">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog> -->
              <div class="cut-pic">
                <a class="btn" @click="toggleShow">上传首图</a>
                <my-upload field="file"
                      method = "POST"
                      @crop-success="editcropSuccess"
                      @crop-upload-success="editcropUploadSuccess"
                      @crop-upload-fail="editcropUploadFail"
                      v-model="show"
                  :width="150"
                  :height="150"
                  url="http://oa.ea-mall.com:51888/CollarTicket/admin/uploadFile"
                  :headers="headers"
                  img-format="png"
                  class="myupload"
                  ></my-upload>
                <img :src="editimgDataUrl" style="margin-top:50px;border-radius:8px">      
              </div>
            </el-form-item>
            <el-form-item label="描述信息" prop="tl_content">
              <quill-editor ref="myTextEditor"
							    :content="editForm.tl_content"
							    :options = "editorOption"
							    @change="onEditorFormChange($event)">
							</quill-editor>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onEditForm('form')">修改</el-button>
                <el-button @click="cancleEdit('form')">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>


    <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'tl_id'}"
    >
    <el-table-column
      prop="tl_id"
      label="ID"
      sortable
      align="center">
    </el-table-column>
    <el-table-column
      prop="tl_name"
      label="名称"
      sortable
      align="left">
    </el-table-column>
    <el-table-column
      prop="tl_num"
      label="数量"
      sortable
      align="left">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit-outline"></i> 编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i> 删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange">
    </el-pagination>
    
  </div>

  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import elDragDialog from '@/directive/el-dragDialog'; // base on element-ui
// import {format} from '../../directive/filter.js';
import {formatDate} from '@/filter/date.js';

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import api from '@/api/api.js';

import 'babel-polyfill'; // es6 shim
import myUpload from 'vue-image-crop-upload';


  export default {
    name: 'editor',
    components: {
      quillEditor,
      'my-upload': myUpload
    },
    directives: { elDragDialog },
    data() {
      return {
        editorOption : {
          theme: 'snow',
          boundary: document.body, 
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          },
          placeholder: 'Insert text here ...',
          readOnly: false
        },
        tableData: [],
        loading : true,
        dialogTableVisible: false,
        start : 0,
        limit : 10,
        total : 0,
        bool : true,
      // options: [
      //   { value: '选项1', label: '黄金糕' },
      //   { value: '选项2', label: '双皮奶' },
      //   { value: '选项3', label: '蚵仔煎' },
      //   { value: '选项4', label: '龙须面' }
      // ],
      value: '',
      // gridData: [{
      //   date: '2016-05-02',
      //   name: 'John Smith',
      //   address: 'No.1518,  Jinshajiang Road, Putuo District'
      // }, {
      //   date: '2016-05-04',
      //   name: 'John Smith',
      //   address: 'No.1518,  Jinshajiang Road, Putuo District'
      // }, {
      //   date: '2016-05-01',
      //   name: 'John Smith',
      //   address: 'No.1518,  Jinshajiang Road, Putuo District'
      // }, {
      //   date: '2016-05-03',
      //   name: 'John Smith',
      //   address: 'No.1518,  Jinshajiang Road, Putuo District'
      // }]
        form: {
          tl_name: '',
          tl_num: '',
          fileList : '',
          value : [],
          gettingTime : '',
          tl_sort : '',
          tl_limitnum : '',
          tl_summary : '',
          tl_place : '',
          tl_host : '',
          tl_issignup : '',
          tl_isidentity : '',
          tl_content : '',
          imgurl : '',
        },
        editForm: {
          tl_name: '',
          tl_num: '',
          fileList : '',
          value : [],
          gettingTime : '',
          tl_sort : '',
          tl_limitnum : '',
          tl_summary : '',
          tl_place : '',
          tl_host : '',
          tl_issignup : '',
          tl_isidentity : '',
          tl_content : '',
          tl_id : '',
          tl_imgurl : ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        flag : false,
        rules: {
          tl_name : [
            {required: true , message : '请输入活动名称', trigger : 'blur'}
          ],
          tl_num : [
            {required: true , message : '请输入剩余数量', trigger : 'blur' },
            {type : 'number' , message : '必须为数字值' , trigger : 'blur'}
          ],
          // funtime : [
          //   {required: true , type: 'date',  message : '请选择活动时间' , trigger : 'blur'}
          // ],
          // gettime : [
          //   {required: true ,  message : '请选择领取时间' , trigger : 'change'}
          // ],
          tl_sort : [
            {required: true , message : '请选择排序' , trigger : 'blur'},
            {type : 'number' , message : '必须为数字值' , trigger : 'blur'}
          ],
          tl_limitnum : [
            {required: true , message : '请选择数量' , trigger : 'blur'},
            {type : 'number' , message : '必须为数字值' , trigger : 'blur'}
          ],
          tl_summary : [
            {required: true , message : '请输入摘要信息' , trigger : 'blur'}
          ],
          tl_place : [
            {required: true , message : '请输入活动地点' , trigger : 'blur'}
          ],
          tl_host : [
            {required: true , message : '请输入活动主办方' , trigger : 'blur'}
          ],
          // funpic : [
          //   {required: true , message : '请选择图片' , trigger : 'change'}
          // ]
          tl_issignup : [
            {required: true , message : '请选择是否需要报名' , trigger : 'change'}
          ],
          tl_isidentity : [
            {required: true , message : '请选择是否需要身份证' , trigger : 'change'}
          ],
          functionTime : [
            {required: true , message : '请选择活动时间' , trigger : 'change'}
          ],
          gettingTime : [
            {required: true , message : '请选择领取时间' , trigger : 'change'}
          ],
          tl_imgurl : [
            {required: true , message : '请选择一张活动首图' , trigger : 'change'}
          ],
          tl_content : [
            {required: true , message : '请输入描述信息' , trigger : 'blur'}
          ]
        },
      validaterules : {
          tl_name : [
            {required: true , message : '请输入活动名称', trigger : 'blur'}
          ],
          tl_num : [
            {required: true , message : '请输入剩余数量', trigger : 'blur' },
            {type : 'number' , message : '必须为数字值' , trigger : 'blur'}
          ],
          // funtime : [
          //   {required: true , type: 'date',  message : '请选择活动时间' , trigger : 'blur'}
          // ],
          // gettime : [
          //   {required: true ,  message : '请选择领取时间' , trigger : 'change'}
          // ],
          tl_sort : [
            {required: true , message : '请选择排序' , trigger : 'blur'},
            {type : 'number' , message : '必须为数字值' , trigger : 'blur'}
          ],
          tl_limitnum : [
            {required: true , message : '请选择数量' , trigger : 'blur'},
            {type : 'number' , message : '必须为数字值' , trigger : 'blur'}
          ],
          tl_summary : [
            {required: true , message : '请输入摘要信息' , trigger : 'blur'}
          ],
          tl_place : [
            {required: true , message : '请输入活动地点' , trigger : 'blur'}
          ],
          tl_host : [
            {required: true , message : '请输入活动主办方' , trigger : 'blur'}
          ],
          // funpic : [
          //   {required: true , message : '请选择图片' , trigger : 'change'}
          // ]
          // tl_imgurl : [
          //   {required: true , message : '请选择一张活动首图' , trigger : 'change'}
          // ]
          functionTime : [
            {required: true , message : '请选择活动时间' , trigger : 'change'}
          ],
          gettingTime : [
            {required: true , message : '请选择领取时间' , trigger : 'change'}
          ],
          tl_content : [
            {required: true , message : '请输入描述信息' , trigger : 'blur'}
          ]
        },

      editFormVisible: false,
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' }
      ],
      value: '',
      gridData: [{
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }],

      picList : [],

      show: false,
			headers: {
				// smail: '*_~'
			},
			imgDataUrl: '', // the datebase64 url of created image
      editimgDataUrl : ''

      }
    },
    methods: {
      onEditorChange({ editor, html, text }) {//富文本编辑器  文本改变时 设置字段值
          // console.log(text);
	        this.form.tl_content = html;
      },
      onEditorFormChange({editor, html, text}){
          this.editForm.tl_content = html;
      },
      formatter(row, column) {
        return row.address;
      },
      getInfo() {
        this.$http.get(`${api.dev}/admin/selectTicketList`,{params:{start:this.start,limit:this.limit}}).then(res => {
          // console.log(res);
          this.tableData = res.body.content.records;
          console.log(this.tableData);
          this.loading = false;

          this.total = res.body.content.total;
        })
      },
      onSubmit(formName) {
        if(this.imgDataUrl != '') {
          this.rules.tl_imgurl[0].required = false;
        }
        // console.log(this.form.gettingTime);
        // 验证表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
              
              // 获取开始时间以结束时间
              for(var i = 0 ; i < this.form.value.length ; i++){
                this.form.value[i] = formatDate(this.form.value[i] , 'yyyy-MM-dd hh:mm:ss');
              }
              // 获取领取时间
              this.form.gettingTime = formatDate(this.form.gettingTime , 'yyyy-MM-dd hh:mm:ss');

              this.dialogTableVisible = false;

              // this.$http.post('http://oa.ea-mall.com:51888/CollarTicket/admin/buildTicket',{tl_name:this.form.tl_name,tl_num:this.form.tl_num,tl_gettime:this.form.gettingTime,tl_starttime:this.form.value[0],tl_endtime:this.form.value[1],tl_sort:this.form.tl_sort,tl_limitnum:this.form.tl_limitnum},{emulateJSON:true}).then(res => {
              //   console.log(res);
              //   console.log(this);
              // }, err => {
              //   console.log(err);
              // })

              // var that = this;
              var xhr = new XMLHttpRequest();
              xhr.open('post',`${api.dev}/admin/buildTicket`,true);
              xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
              xhr.send('tl_name=' + this.form.tl_name +'&'+ 'tl_num=' + this.form.tl_num +'&'+ 'tl_gettime=' + this.form.gettingTime +'&'+ 'tl_starttime=' + this.form.value[0] +'&'+ 'tl_endtime=' + this.form.value[1] +'&'+ 'tl_sort=' + this.form.tl_sort +'&'+ 'tl_limitnum=' + this.form.tl_limitnum +'&'+ 'tl_imgurl=' + this.form.imgurl +'&'+ 'tl_summary=' + this.form.tl_summary +'&'+ 'tl_place=' + this.form.tl_place +'&'+ 'tl_host=' + this.form.tl_host +'&'+ 'tl_issignup=' + this.form.tl_issignup +'&'+ 'tl_isidentity=' + this.form.tl_isidentity +'&'+ 'tl_content=' + this.form.tl_content );
              var that = this;
              xhr.onreadystatechange = function () {
                if(xhr.readyState == 4 && xhr.status == 200) {
                  console.log(JSON.parse(xhr.responseText));
                  // console.log(that.form.tl_name);
                  that.form.fileList = that.form.imgurl = that.form.tl_name = that.form.tl_num = that.form.value = that.form.gettingTime = that.form.tl_sort = that.form.tl_limitnum = that.form.tl_summary = that.form.tl_place = that.form.tl_host = that.form.tl_issignup = that.form.tl_isidentity = that.form.tl_content = '';
                  // that.$refs.upload.clearFiles();
                  that.flag = false;
                  that.$refs[formName].resetFields();

                  that.loading = true;
                  that.getInfo();
                  console.log(that.tableData);

                  that.imgDataUrl = '';

                  // 创建成功后重新设置验证规则为true
                  that.rules.functionTime[0].required = true;
                  that.rules.tl_imgurl[0].required = true;

                  var res = JSON.parse(xhr.responseText);
                  if(res.code == 200) {
                    that.$message({
                      message: '新增成功',
                      type: 'success'
                    });
                  }else {
                    that.$message.error('创建失败');
                  }
                }
              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });

        
        // console.log(this.form.fileList);
        // 获取开始时间以结束时间
        // for(var i = 0 ; i < this.form.value.length ; i++){
        //   this.form.value[i] = this.form.value[i].getTime();
        // }
        // // 获取领取时间
        // this.form.gettingTime = this.form.gettingTime.getTime();
        // console.log(this.form.gettingTime);

        // this.dialogTableVisible = false;
        
        

        // var formdata = new FormData();  
        // formdata.append('file',this.form.fileList);
        // formdata.append('tl_name',this.form.tl_name);
        // formdata.append('tl_num',this.form.tl_num);
        // formdata.append('tl_gettime',this.form.gettingTime);
        // formdata.append('tl_starttime',this.form.value[0]);
        // formdata.append('tl_endtime',this.form.value[1]);
        // formdata.append('tl_sort',this.form.tl_sort);
        // formdata.append('tl_limitnum',this.form.tl_limitnum);
        // console.log(formdata);

        //{file:this.form.fileList,tl_name:this.form.tl_name,tl_num:this.form.tl_num,tl_gettime:this.form.gettingTime,tl_starttime:this.form.value[0],tl_endtime:this.form.value[1],tl_sort:this.form.tl_sort,tl_limitnum:this.form.tl_limitnum}

        // 提交到后台
        // this.$http.post('http://oa.ea-mall.com:51888/CollarTicket/admin/buildTicket',{tl_name:this.form.tl_name,tl_num:this.form.tl_num,tl_gettime:this.form.gettingTime,tl_starttime:this.form.value[0],tl_endtime:this.form.value[1],tl_sort:this.form.tl_sort,tl_limitnum:this.form.tl_limitnum}).then(res => {
        //   console.log(res);
        //   console.log(this);
        // }, err => {
        //   console.log(err);
        // })

        // var xhr = new XMLHttpRequest();
        // xhr.open('post','http://oa.ea-mall.com:51888/CollarTicket/admin/buildTicket',true);
        // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // xhr.send(formdata);
        // xhr.onreadystatechange = function () {
        //   if(xhr.readyState == 4 && xhr.status == 200) {
        //     console.log(xhr.responseText);
        //   }
        // }

        // $.ajax({
        //   url : 'http://oa.ea-mall.com:51888/CollarTicket/admin/buildTicket',
        //   type : 'post',
        //   data : {file:this.form.fileList,tl_name:this.form.tl_name,tl_num:this.form.tl_num,tl_gettime:this.form.gettingTime,tl_starttime:this.form.value[0],tl_endtime:this.form.value[1],tl_sort:this.form.tl_sort,tl_limitnum:this.form.tl_limitnum},
        //   processData: false,
        //   success : function (res) {
        //     console.log(res);
        //   }
        // })

        // let headerConfig = {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // }
        // axios.post('http://oa.ea-mall.com:51888/CollarTicket/admin/buildTicket',formdata,headerConfig).then(res => {
        //   console.log(res);
        // })
      },
      cancleAdd(formName) {
        this.dialogTableVisible = false;
        this.$refs[formName].resetFields();

        // if(this.editForm.value[0] != null) {
        //   this.validaterules.functionTime[0].required = false;
        // }else {
        //   this.validaterules.functionTime[0].required = true;
        // }


      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getfile(file,fileList) {
        // this.$refs.upload.validate(valid => {
        //   if(valid) {
        //     console.log('yes')
        //   }else{
        //     console.log('no');
        //   }
        // })
        // console.log(this.$refs.upload);
        // this.$refs.upload.elForm.validate(valid => {
        //   if(valid) {
        //     console.log('yes')
        //   }else {
        //     console.log('no');
        //   }
        // })
        
        //  console.log(fileList[0].raw);
        // console.log(event);
        this.form.fileList = fileList[0].raw;
        console.log(this.form.fileList);
        if(this.fileList !== '') {
          this.flag = true;
        }
      },
      handleDelete(index,row) {
        // console.log(row.tl_id);

        // this.$http.post('http://oa.ea-mall.com:51888/CollarTicket/admin/deleteTicket',{tl_id:row.tl_id}).then(res => {
        //   console.log(res);
        // })
        this.$confirm('此操作将永久删除该票券, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          var that = this;
          var xhr = new XMLHttpRequest();
          xhr.open('post',`${api.dev}/admin/deleteTicket`,true);
          xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          xhr.send('tl_id=' + row.tl_id);
          xhr.onreadystatechange = function () {
            if(xhr.readyState == 4 && xhr.status == 200) {
              console.log(JSON.parse(xhr.responseText));

              that.loading = true;
              that.getInfo();

              var res = JSON.parse(xhr.responseText);
              if(res.code == 200) {
                that.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }else {
                that.$message.error('删除失败');
              }
            }
          }

        }).catch(() => {
          console.log('已取消删除')         
        });


        
      },
      getImgUrl(res,file) {
        this.form.imgurl = res.content;
        this.rules.tl_imgurl[0].required = false;
      },
      handleCurrentChange(val) {
        this.start = 10 * (val - 1);
        this.getInfo();
      },
      handleEdit(index,row) {
        console.log(index,row);
        this.editFormVisible = true;

        this.editForm.tl_name = this.editForm.tl_num = this.editForm.gettingTime = this.editForm.tl_sort = this.editForm.tl_limitnum = '';
        this.editForm.value = [];

        this.editForm.tl_name = row.tl_name;
        this.editForm.tl_num = row.tl_num;
        this.editForm.value[0] = row.tl_starttime;
        this.editForm.value[1] = row.tl_endtime;
        this.editForm.gettingTime = row.tl_gettime;
        this.editForm.tl_sort = row.tl_sort;
        this.editForm.tl_limitnum = row.tl_limitnum;
        this.editFormVisible = true;

        // this.$http.post('http://oa.ea-mall.com:51888/admin/selectTicketDetails',{tl_id:row.tl_id}).then(res => {
        //   console.log(res);
        // })

        var xhr = new XMLHttpRequest();
        xhr.open('post',`${api.dev}/admin/selectTicketDetails`,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send('tl_id=' + row.tl_id);
        var that = this;
        xhr.onreadystatechange = function () {
          if(xhr.readyState == 4 && xhr.status == 200) {
            // that.editFormVisible = true;
            // console.log(JSON.parse(xhr.responseText));
            var res = JSON.parse(xhr.responseText);
            console.log(res);
            // that.editForm.tl_name = res.content.tl_name;
            // that.editForm.tl_num = res.content.tl_num;
            // that.editForm.value[0] = 1538010312193;
            // that.editForm.value[1] = 1538010312193;
            // that.editForm.gettingTime = res.content.tl_gettime;
            // that.editForm.tl_sort = res.content.tl_sort;
            // that.editForm.tl_limitnum = res.content.tl_limitnum;
            that.picList = [];
            that.picList.push({url:`${api.address}${res.content.tl_imgurl}`});
            that.editForm.tl_summary = res.content.tl_summary;
            that.editForm.tl_place = res.content.tl_place;
            that.editForm.tl_host = res.content.tl_host;
            that.editForm.tl_issignup = String(res.content.tl_issignup);
            that.editForm.tl_isidentity = String(res.content.tl_isidentity);
            that.editForm.tl_content = res.content.tl_content;
            that.editForm.tl_id = res.content.tl_id;
            that.editForm.tl_imgurl = res.content.tl_imgurl;

            that.editimgDataUrl = api.address + res.content.tl_imgurl;
          }
        }
      },
      onEditForm(formName) {
        // 进来判断活动时间是否为空 不是则... , 是则... 
        if(this.editForm.value[0] != null) {
          this.validaterules.functionTime[0].required = false;
        }else {
          this.validaterules.functionTime[0].required = true;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(new Date(this.editForm.gettingTime));
              // 获取开始时间以结束时间
              for(var i = 0 ; i < this.editForm.value.length ; i++){
                this.editForm.value[i] = formatDate(new Date(this.editForm.value[i]) , 'yyyy-MM-dd hh:mm:ss');
              }
              // 获取领取时间
              this.editForm.gettingTime = formatDate(new Date(this.editForm.gettingTime) , 'yyyy-MM-dd hh:mm:ss');
              // console.log(this.editForm.gettingTime);
              // console.log(this.editForm.value);

              this.editFormVisible = false;

              // this.$http.post('http://oa.ea-mall.com:51888/CollarTicket/admin/buildTicket',{tl_name:this.form.tl_name,tl_num:this.form.tl_num,tl_gettime:this.form.gettingTime,tl_starttime:this.form.value[0],tl_endtime:this.form.value[1],tl_sort:this.form.tl_sort,tl_limitnum:this.form.tl_limitnum},{emulateJSON:true}).then(res => {
              //   console.log(res);
              //   console.log(this);
              // }, err => {
              //   console.log(err);
              // })

              // var that = this;
              var xhr = new XMLHttpRequest();
              xhr.open('post',`${api.dev}/admin/updateTicket`,true);
              xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
              xhr.send('tl_name=' + this.editForm.tl_name +'&'+ 'tl_num=' + this.editForm.tl_num +'&'+ 'tl_gettime=' + this.editForm.gettingTime +'&'+ 'tl_starttime=' + this.editForm.value[0] +'&'+ 'tl_endtime=' + this.editForm.value[1] +'&'+ 'tl_sort=' + this.editForm.tl_sort +'&'+ 'tl_limitnum=' + this.editForm.tl_limitnum +'&'+ 'tl_imgurl=' + this.editForm.tl_imgurl +'&'+ 'tl_summary=' + this.editForm.tl_summary +'&'+ 'tl_place=' + this.editForm.tl_place +'&'+ 'tl_host=' + this.editForm.tl_host +'&'+ 'tl_issignup=' + this.editForm.tl_issignup +'&'+ 'tl_isidentity=' + this.editForm.tl_isidentity +'&'+ 'tl_content=' + this.editForm.tl_content +'&'+ 'tl_id=' + this.editForm.tl_id );
              var that = this;
              xhr.onreadystatechange = function () {
                if(xhr.readyState == 4 && xhr.status == 200) {
                  console.log(JSON.parse(xhr.responseText));
                  // console.log(that.form.tl_name);
                  
                  // that.form.tl_name = that.form.tl_num = that.form.value = that.form.gettingTime = that.form.tl_sort = that.form.tl_limitnum = that.form.tl_summary = that.form.tl_place = that.form.tl_host = that.form.tl_issignup = that.form.tl_isidentity = that.form.tl_content = '';
                  // that.$refs.upload.clearFiles();
                  // that.flag = false;
                  that.editForm.tl_id = that.editForm.fileList = that.editForm.tl_imgurl = that.editForm.tl_name = that.editForm.tl_num = that.editForm.value = that.editForm.gettingTime = that.editForm.tl_sort = that.editForm.tl_limitnum = that.editForm.tl_summary = that.editForm.tl_place = that.editForm.tl_host = that.editForm.tl_issignup = that.editForm.tl_isidentity = that.editForm.tl_content = '';
                  // that.$refs.upload.clearFiles();
                  that.flag = false;

                  that.loading = true;
                  that.getInfo();
                  // console.log(that.tableData);
                  that.$refs[formName].resetFields();

                  setTimeout(function () {
                    that.editForm.tl_limitnum = that.editForm.tl_name = that.editForm.tl_num = that.editForm.tl_sort = '';
                  })

                  var res = JSON.parse(xhr.responseText);
                  if(res.code == 200) {
                    that.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                  }else {
                    that.$message.error('修改失败');
                  }
                }
              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancleEdit(formName) {
        this.editFormVisible = false;
        this.$refs[formName].resetFields();

        this.editForm.tl_id = this.editForm.fileList = this.editForm.tl_imgurl = this.editForm.tl_name = this.editForm.tl_num = this.editForm.value = this.editForm.gettingTime = this.editForm.tl_sort = this.editForm.tl_limitnum = this.editForm.tl_summary = this.editForm.tl_place = this.editForm.tl_host = this.editForm.tl_issignup = this.editForm.tl_isidentity = this.editForm.tl_content = '';
        // this.$refs.upload.clearFiles();
      },
      handleRemove() {
        this.editForm.tl_imgurl = '';
        this.bool = false;
      },
      handleExceed() {
        this.$message.warning('不好意思，只能上传一张图片');
      },
      exceedHandle() {
        this.$message.warning('不好意思，只能上传一张图片');
      },
      picUrl(res,file) {
        this.editForm.tl_imgurl = res.content
      },
      handleChange(val) {
        // this.rules.functionTime[0].required = false;
        if(val != null) {
          this.rules.functionTime[0].required = false;
        }else {
          this.rules.functionTime[0].required = true;
        }
      },
      editChange(val) {
        if(val != null) {
          this.validaterules.functionTime[0].required = false;
        }else {
          this.validaterules.functionTime[0].required = true;
        }
      },
      gettingChange(val) {
        console.log(val);
      },
      removePic() {
        this.form.imgurl = '';
        this.rules.tl_imgurl[0].required = true;
      },
      toggleShow() {
				this.show = !this.show;
			},
			cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
			},
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
        console.log('field: ' + field);
        this.form.imgurl = jsonData.content;
			},
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
      },
      editcropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.editimgDataUrl = imgDataUrl;
			},
			editcropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
        console.log('field: ' + field);
        this.editForm.tl_imgurl = jsonData.content;
			},
			editcropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			}
    },
    created(){
      this.getInfo();
    }
  }
</script>

<style scoped>
.addBtn {
  margin-bottom: 10px;
}
.pagination {
  margin-top: 10px;
}
#editor {
    margin: auto;
    width: 80%;
    height: 580px;
    margin-top: 5rem;
  }

.cut-pic {
  position: relative;
}
.btn {
  position: absolute;
  top: 0;
  width: 120px;
  height: 40px;
  background-color: #41B883;
  color: #fff;
  text-align: center;
  border-radius: 5px;
}
</style>
