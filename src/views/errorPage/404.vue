<template>
  <div class="notfound-wrap">
    <div class="content">
      <div class="con"></div>
      <div class="sub">即将离开本页，<span>{{count}}</span>秒后自动返回上一页</div>
      <el-button type="primary" @click="returnPrevPage">立即返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page404',
  data() {
    return {
      count: '',
      timer: ''
    }
  },
  methods: {
    returnPrevPage() {
      clearInterval(this.timer);
      this.$router.back(-1);
      /*this.$router.push({
        path: '/'
      })*/
    },
    countDown(){
      const seconds = 3;
      if(!this.timer){
        this.count = seconds;
        this.timer = setInterval(() => {         
          if(this.count > 0 && this.count <= seconds){
            this.count--;
          }else{
            this.returnPrevPage();
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    }
  },
  created() {
    this.countDown();
  }
}
</script>

<style lang="stylus" scoped>
.notfound-wrap
  width 100%
  height 100%
  display block
  background #fff url('../../assets/images/404_bg.jpg') left bottom no-repeat
  background-size auto 98%
  .content
    position absolute
    left 50%
    top 46%
    width 27.6%
    transform translate(-50%, -50%)
    text-align center
    .con
      width 100%
      padding-top 72%
      background url('../../assets/images/404_con.png') center center no-repeat
      background-size 100% auto
    .sub
      margin-top 60px
      font-size 18px
      color #666
      text-align center
      span
        padding 0 6px
        font-size 20px
        color #aa2216
    button
      margin-top 30px
      padding 10px 30px
      background #aa2216
      border-color #aa2216
      color #fff
</style>
