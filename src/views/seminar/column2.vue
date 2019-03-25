<template>
  <div>
    <el-tabs tab-position="left" @tab-click="handleClickTopic" style="height:600px">
        <el-tab-pane v-for="item in topicMsg" :key="item.t_id">
            <span slot="label">{{item.t_name}}</span>
            <el-button type="primary" @click="AddDialogTableVisible = true" class="AddVillageBtn"><i class="el-icon-edit"></i> 新增</el-button>

            <el-cascader
                :options="options"
                @change="onProvincesChange"
                @focus="getCategory"
                :props="props"
                placeholder="请选择栏目"
                >
            </el-cascader>
            <el-button type="primary" style="margin-left: 10px" @click="getTableData">查询</el-button>

            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="c_name"
                label="名称"
                sortable
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="c_type"
                label="类型"
                sortable
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="c_status"
                label="状态"
                sortable
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="c_single"
                label="页面"
                sortable
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="c_sort"
                label="排序值"
                sortable
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="c_amount"
                label="记录数"
                sortable
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="c_director"
                label="栏目负责人"
                sortable
                align="center"
                width="120">
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'
// 引用拖拽
import elDragDialog from '@/directive/el-dragDialog';

import { Loading } from 'element-ui';

export default {
  name: 'column',
  data() {
      return {
          topicMsg : [], // 专题信息
          loading : true, // 加载条
          tableData : [], // 存放各个专题对应的栏目信息
          
          topicId: '', // 默认进来之后的专题ID为获取到专题的第一条
          options: [],
          props : {
            value: 'c_id',
            label:'c_name',
            children: 'c_children'
          },
          categoryId : ''
      }
  },
  methods : {
    // 进入页面后全屏加载
    openFullScreen() {
          var load = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
          });
          return load;  // 把load这个变量return出去好让获取到数据的时候会调用到它
    },
    // 获取所有专题
    getAllTopic() {
        this.$http.get(`${api.dev}/p/main/topic/getAll`,{params : {access_token : getToken()}}).then(res => {
            if(res.body.code == 200) {
                this.openFullScreen().close();
                this.topicMsg = res.body.content;
                this.topicId = res.body.content[0].t_id;
            }else if(res.body.code == 500) {
                this.$message({
                message: res.body.msg,
                type: 'error'
                });
                removeToken();
                setTimeout(function () {
                window.location.href = '/stwhy';
                },2000)
            }
        })
    },
    getCategory(e) {
        this.$http.get(`${api.dev}/p/main/category/show`,{params: {access_token:getToken(),c_topic:this.topicId}}).then(res => {
            if(res.body.code == 200) {
                this.options = res.body.content;
            }else if(res.body.code == 500) {
                this.$message({
                    message: res.body.msg,
                    type: 'error'
                });
                removeToken();
                setTimeout(function () {
                    window.location.href = '/stwhy';
                },2000)
            }
        })
    },
    handleClickTopic(tab,event) {
         this.topicId = this.topicMsg[tab.index].t_id; // 获取专题索引值的对应的ID
         this.options = [];
    },
    // 获取最后一级的id值
    onProvincesChange(item) {
        for(var i = 0 ; i < item.length ; i++) {
            if(i == item.length - 1) {
                this.categoryId = item[i];
            }
        }
    },
    getTableData() {
        if(this.categoryId == '') {
            this.$message({
                message: '请输入栏目',
                type: 'warning'
            });
            return false;
        }
        this.loading = true;
        this.$http.get(`${api.dev}/p/main/category/select`,{params: {access_token : getToken() , c_id:this.categoryId}}).then(res => {
            if(res.body.code == 200) {
               this.tableData = res.body.content.category;
               this.loading = false;
            }else if(res.body.code == 500) {

            }
        })
    }
  },
  created() {
      this.getAllTopic();
      this.openFullScreen();
  }
}
</script>

<style lang="stylus" scoped>

</style>
