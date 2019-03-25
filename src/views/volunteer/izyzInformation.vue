<template>
  <div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      border
      :data="tableData"
      style="width: 100%"
      height="500">
        <el-table-column
          prop="cn_createtime"
          label="发布时间"
          sortable
          align="center">
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入接口
import api from '@/api/api.js'
// 获取token
import { getToken , removeToken } from '@/utils/auth'

import {asyncRouterMap} from '@/router/asyncRouterMap.js'

export default {
  name: 'izyzInformation',
  data() {
      return {
          loading : true, // 加载条
          tableData : [],
          total : 0 , // 总条数
          start : 0, // 默认第一页
          limit : 10, // 每页10条
      }
  },
  methods : {
      getInfo() {
        //   this.$http.post(`${api.dev}/p/main/izyzInformation/show`,{access_token: getToken(),start : this.start,limit: this.limit},{emulateJSON : true}).then(res => {
            
        //   })
      }
  },
  created() {
      this.getInfo();
  }
}
</script>

<style lang="stylus" scoped>

</style>
