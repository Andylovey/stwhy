<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {},
  created() {
    // window.addEventListener('beforeunload',() => {
    //   if(this.$store.state.tagsView.cachedViews) {
    //     localStorage.setItem('cachedComponent',this.$store.state.tagsView.cachedViews)
    //   }
    // })
    // window.addEventListener('load',() => {
      // this.$store.dispatch('addVisitedTag',this.$store.state.tagsView.visitedViews)
      // this.$store.state.tagsView.cachedViews.push('information')
      // console.log(this.$store.state.tagsView)
    // })
  }
}
</script>

<style>
/*表格滚动条设置为10px*/
.el-table__header-wrapper{
    width: calc(100% - 10px);
}
.el-table__fixed-right-patch{
    width: 10px!important;
}
.el-table__fixed-header-wrapper{
    height: 56px!important;
}
.el-table__fixed-body-wrapper{
    height: calc(100% - 56px)!important;
}
.el-table__body-wrapper{
    overflow-y: scroll !important;
}
.el-table__body-wrapper::-webkit-scrollbar{
    width: 10px;
    height: 10px;
}
.el-table__fixed-right{
    //right: 10px!important;
    height: calc(100% - 10px)!important; /*前提是表格高度设置500*/
}
#pagination{
  position: absolute;
  bottom: 20px;
}
.main>div{
  height: 100%;
}

form.el-form {
    width:100% !important;
}
.el-tabs__nav-scroll {
    padding: 0px !important;
}
.disabled .el-upload--picture-card {
    display: block;
}
</style>
