<template>
  <div>
    <el-tabs @tab-click="handleClickSystem" tab-position="left" type="border-card" style="height:100%;" class="tabs-topic">
        <el-tab-pane v-for="item in systemMsg" :key="item.id">
            <span slot="label">{{item.name}}</span>

            <div style="height:100%">
                <el-select v-model="topic" placeholder="专题" clearable style="width:180px;margin-top:10px;margin-right:10px;" @change="SelectTopic">
                <el-option
                    v-for="item in topicOptions"
                    :key="item.t_id"
                    :label="item.t_name"
                    :value="item.t_id">
                </el-option>
                </el-select>

                <el-cascader
                    style="margin-right:10px;width:180px;"
                    v-if="categoryIsShow"
                    :options="CategoryOptions"
                    @change="onProvincesChange"
                    :props="props"
                    placeholder="栏目">
                </el-cascader>

                <el-select v-model="status" placeholder="状态" clearable style="margin-right:10px;width:180px;">
                    <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>

                <el-input v-model="searchKeyWord" placeholder="请输入内容" style="width:220px;margin-right:10px;"></el-input>
                <el-button type="primary" @click="handleSearch">搜索</el-button>



                <el-table
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    border
                    stripe
                    :data="tableData"
                    style="width: 100%;margin-top:10px;margin-bottom:10px;"
                    height="calc(100% - 130px)"
                    @cell-mouse-enter="handleMouseEnter"
                    @cell-mouse-leave="handleMouseLeave">
                        <el-table-column
                        prop="a_topic"
                        label="专题"
                        sortable
                        min-width="160"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="a_category"
                        label="栏目"
                        sortable
                        min-width="160"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="a_title"
                        label="文章标题"
                        sortable
                        min-width="160"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        label="关联记录"
                        sortable
                        min-width="160"
                        align="center"
                        ref="records">
                        <template slot-scope="scope">
                            <span>{{scope.row.a_link_name}}</span>
                            <!-- <el-button type="primary" size="small" style="float:right" v-if="clearIsShow">清除</el-button> -->
                            <el-button type="primary" size="small" style="float:right" @click="handleClear(scope.row)" v-if="scope.row.a_link_name">清除</el-button>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        align="center"
                        width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleSet(scope.row)">关联</el-button>
                        </template>
                        </el-table-column>
                </el-table>
            </div>

            <div id="pagination">
            <el-pagination
                background
                layout="prev, pager, next, total , jumper"
                :total="total"
                @current-change="handleCurrentChange">
            </el-pagination>
            </div>
        </el-tab-pane>
    </el-tabs>


    <el-dialog 
      :visible.sync="DialogTableVisible"
      title="设置关联" 
      :close-on-click-modal="false"
      @close="handleClose"
      width="750px">
      <el-form label-width="80px" style="width:100%;">
          <el-form-item label="文章标题">
                <el-input v-model="articleTitle" readonly></el-input>
          </el-form-item>
          <el-form-item label="关联记录">
                <!-- <el-input v-model="relationRecord" readonly></el-input> -->
                <el-select v-model="rs_s_id" clearable>
                <el-option
                    v-for="item in RecordsOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setForm()">关联</el-button>
            <el-button @click="cancleForm()">取消</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

export default {
  name: 'subsystem',
  data() {
      return {
          systemMsg : [],
          topicOptions : [],
          topic : '',
          CategoryOptions : [],
          category : '',
          categoryIsShow : false,
          props : {
                value: 'c_id',
                label:'c_name',
                children: 'c_children'
          },
          statusOptions : [
              {
                  value: '0',
                  label: '全部'
              },
              {
                  value: '1',
                  label: '已设置'
              },
              {
                  value: '2',
                  label: '未设置'
              },
          ],
          status : '',
          searchKeyWord : '',

          loading : true,
          tableData: [],
          subsystemId : '',
          start : 0,
          limit : 10,
          total : 0,

          DialogTableVisible : false,
          articleTitle : '',
        //   relationRecord : '',
          rs_a_id : '',
          rs_s_id : '',
          rs_type : '',
        //   clearIsShow : false,
        RecordsOptions : [],
        // setRecords : '',
      }
  },
  methods : {
      getInfo() {
         this.$http.post(`${api.dev}/p/main/subsystem/show`,{access_token:getToken},{emulateJSON:true}).then(res => {
             if(res.body.code == 200) {
                 console.log(res)
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
      },
      getSubSystem() {
          this.$http.get(`${api.dev}/p/main/drop/selectSubsystem`,{params: {access_token:getToken}}).then(res => {
              if(res.body.code == 200) {
                this.systemMsg = res.body.content;
                this.subsystemId = this.systemMsg[0].id;
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
      },
      getAllTopic() {
          this.$http.get(`${api.dev}/p/main/drop/selectTopic`,{params : {access_token : getToken()}}).then(res => {
              if(res.body.code == 200) {
                  this.topicOptions = res.body.content;
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
      },
      SelectTopic() {
          if(this.topic) {
              this.categoryIsShow = true;
              this.getCategory()
          }else {
              this.categoryIsShow = false;
              this.category = ''
          }
      },
      getCategory() {
          this.$http.get(`${api.dev}/p/main/category/show`,{params : {access_token:getToken,c_topic:this.topic}}).then(res => {
              if(res.body.code == 200) {
                  this.CategoryOptions = res.body.content;
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
      },
    // 获取最后一级的id值
    onProvincesChange(item) {
        for(var i = 0 ; i < item.length ; i++) {
            if(i == item.length - 1) {
                this.category = item[i];
            }
        }
    },
    getTableData() {
        this.$http.post(`${api.dev}/p/main/subsystem/show`,{access_token : getToken, start : this.start, limit : this.limit, name1 : this.searchKeyWord,id1: this.topic,id2: this.category,subsystemId : this.subsystemId,status : this.status},{emulateJSON:true}).then(res => {
            if(res.body.code == 200) {
                this.loading = false;
                this.tableData = res.body.content.records;
                this.total = res.body.content.total;
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
    },
    handleSearch() {
        this.loading = true;
        this.getTableData();
    },
    handleSet(row) {
        // this.relationRecord = row.a_link_name;
        this.articleTitle = row.a_title;
        this.DialogTableVisible = true;
        this.getSetRecords();
        this.$http.post(`${api.dev}/p/main/subsystem/select`,{access_token:getToken,subsystemId: this.subsystemId,articleId:row.a_id},{emulateJSON:true}).then(res => {
            if(res.body.code == 200) {
                if(res.body.content) {
                    this.rs_type = res.body.content.rs_type;
                    this.rs_a_id = res.body.content.rs_a_id;
                    this.rs_s_id = res.body.content.rs_s_id;
                }else {
                    this.rs_type = this.subsystemId;
                    this.rs_a_id = row.a_id;
                }
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
    },
    setForm() {
        this.$http.post(`${api.dev}/p/main/subsystem/set`,{access_token : getToken,rs_type : this.rs_type, rs_a_id : this.rs_a_id, rs_s_id : this.rs_s_id},{emulateJSON:true}).then(res => {
            if(res.body.code == 200) {
                this.$message({
                    message: res.body.msg,
                    type: 'success'
                });
                this.DialogTableVisible = false;
                this.getTableData();
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
    },
    cancleForm() {
        this.DialogTableVisible = false;
        this.rs_a_id = '';
        this.rs_s_id = '';
        this.rs_type = '';
    },
    handleMouseEnter(row, column, cell, event) {
        console.log(row)
        console.log(column)
        console.log(cell)
        console.log(event)
        // this.clearIsShow = true;
        console.log(this.$refs)
    },
    handleMouseLeave(row, column, cell, event) {
        // this.clearIsShow = false;
    },
    handleClear(row) {
        this.$http.post(`${api.dev}/p/main/subsystem/delete`,{access_token:getToken,subsystemId : this.subsystemId, articleId : row.a_id},{emulateJSON: true}).then(res => {
            if(res.body.code == 200) {
                this.$message({
                    message: res.body.msg,
                    type: 'success'
                });
                this.getTableData()
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
    },
    getSetRecords() {
        this.$http.get(`${api.dev}/p/main/drop/selectSubsystemAssociation`,{params:{access_token:getToken,subsystemId:this.subsystemId}}).then(res => {
            if(res.body.code == 200) {
                this.RecordsOptions = res.body.content;
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
    },
    handleClose() {
        this.rs_a_id = '';
        this.rs_s_id = '';
        this.rs_type = '';
    },
    handleClickSystem(tab,event) {
        console.log(tab,event)
        this.subsystemId = this.systemMsg[tab.index].id;
        this.topic = '';
        this.category = '';
        this.status = '';
        this.searchKeyWord = '';
        this.categoryIsShow = false;
        this.getTableData();
    },
    handleCurrentChange(val) {
        this.loading = true;
        this.start = this.limit * (val - 1);
        this.getTableData();
      },
  },
  created() {
      this.getInfo()
      this.getSubSystem()
      this.getAllTopic()
      this.getTableData()
  }
}
</script>

<style lang="stylus">
.tabs-topic{
    .el-tabs__content {
        height 100%
    }
}
.tabs-topic{
    .el-tab-pane {
        height 90%
    }
}
.el-tabs--border-card{
    .el-tabs__content {
        padding 0
    }
}
.el-tabs__nav-scroll {
    padding 0
}
</style>
