<template>
  <div class="login-page">    
    <div class="login-wrap">
      <el-col :class="translateLeft" :span="10">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="密码登录" name="first">
              <div class="login-form" >
                    <el-form :model="formRule" :rules="pswRules" ref="formRule" style="width:100%;">
                      <el-form-item label="" prop="username">
                        <el-input v-model="formRule.username" placeholder="请输入用户名">
                          <template slot="prepend">账号</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="" prop="password">
                        <el-input v-model="formRule.password" type="password" ref="password">
                          <template slot="prepend">密码</template>
                        </el-input>
                      </el-form-item>
                      <el-form-item class="btn">
                        <el-button :loading="loading" type="primary" @click="handleUserLogin('formRule')">登 录</el-button>
                      </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="验证码登录" name="second">
                <div class="login-form">
                    <el-form :model="ruleForm" :rules="CodeRules" ref="ruleForm" style="width:100%;">
                      <el-form-item label="" prop="telphone">
                        <el-input v-model="ruleForm.telphone" placeholder="请输入手机号">
                          <template slot="prepend">手机号</template>
                        </el-input>
                      </el-form-item>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="" prop="checkCode" class="codeInp">
                            <el-input v-model="ruleForm.checkCode" class="pswInp" ref="checkCode">
                              <template slot="prepend">验证码</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item class="codeRecord">
                            <el-button type="primary" class="codeBtn" @click="getCode()" ref="getcode">获取验证码</el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-form-item class="btn">
                        <el-button :loading="loading" type="primary" @click="handleCodeLogin('ruleForm')">登 录</el-button>
                      </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
          </el-tabs>

      </el-col>

      <el-col :class="translateRight" :span="14">
        <div class="wallpaper"></div>
      </el-col>
    </div>
  </div>
</template>

<script>
import langselect from '@/components/langselect'
import storage from '@/utils/storage'

// 验证码插件
import {resend} from '@/code/code.js'

// 引入接口
import api from '@/api/api.js'

const useRegexp = {
  exist: /\S+/
}

export default {
  name: 'login',
  components: {
    langselect
  },
  data() {
    const validobj = {
      telphone: [
        { ruleName: 'exist',error: '请输入手机号' }
      ],
      checkCode: [{ ruleName: 'exist', error: '请输入验证码' }]
    }

    const _typeof = val =>
      Object.prototype.toString
        .call(val)
        .replace(/^\S+\s/, '')
        .replace(/]$/, '')
        .toLocaleLowerCase()

    const validfn = (rule, value, callback) => {
      const _validobj = validobj[rule.field.replace(/^\S+(?=\.)\./g, '')]
      for (let i = 0; i < _validobj.length; i++) {
        let _rule = useRegexp[_validobj[i].ruleName]
        if (_typeof(_rule) === 'regexp') {
          if (!_rule.test(value)) {
            return callback(new Error(_validobj[i].error))
          }
        } else if (_typeof(_rule) === 'function') {
          if (_rule(value, _validobj[i].params)) {
            return callback(new Error(_validobj[i].error))
          }
        }
      }
      callback()
    }
    // 手机验证
    var checkPhone = (rule, value, callback) => {        
      if (!value) {           
        return callback(new Error('手机号不能为空'));         
      } else {          
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));          
        if (reg.test(value)) {            
          callback();         
        } else {            
          return callback(new Error('请输入正确的手机号'));          
        }       
    }};

    // 验证码验证
    var checkCode = (rule, value, callback) => {        
      if (!value) {           
        return callback(new Error('验证码不能为空'));         
      } else {          
        const reg = /^\d{6}$/;
        console.log(reg.test(value));          
        if (reg.test(value)) {            
          callback();         
        } else {            
          return callback(new Error('请输入正确的验证码'));          
        }       
    }};

    return {
      activeName: 'first',
      lang: this.$store.state.app.language,
      ruleForm: {
        telphone: '',
        checkCode: ''
      },
      CodeRules: {
        telphone: [{ validator: checkPhone, trigger: 'blur', required: true }],
        checkCode: [{ validator: checkCode, trigger: 'blur', required: true }]
      },
      formRule: {
        username: '',
        password: '',
      },
      pswRules : {
        username: [{ message: '请输入账号', trigger: 'blur', required: true }],
        password: [{ message: '请输入密码', trigger: 'blur', required: true }]
      },
      remember: true,
      loading: false,
      switchLeft: false,
      switchRight: false,
      notforget: true,
      forgetForm: {
        email: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    translateLeft() {
      return {
        'translate-left': true,
        'login-col': true,
        'switch-left': this.switchLeft
      }
    },
    translateRight() {
      return {
        'translate-right': true,
        'login-col': true,
        'switch-right': this.switchLeft
      }
    }
  },
  methods: {
    wrapSwitch(state) {
      this.switchLeft = !this.switchLeft
      this.switchRight = !this.switchRight
      setTimeout(() => {
        this.notforget = state
        this.$refs['ruleForm'].resetFields()
      }, 300)
    },
    handleCodeLogin(formName) {
      console.log(formName);
      this.loading = true
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证输入的手机号与验证码
            var that = this;
            var xhr = new XMLHttpRequest();
            xhr.open('post',`${api.dev}/loginPhone`,true);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send('phone=' + this.ruleForm.telphone +'&'+ 'code=' + this.ruleForm.checkCode);
            xhr.onreadystatechange = function () {
              if(xhr.status == 200 && xhr.readyState == 4) {
                var res = JSON.parse(xhr.responseText);
                console.log(res);
                if(res.code == 200) {
                  
                  that.$message({
                    message: res.msg,
                    type: 'success',
                    duration: 1000
                  });

                  let telphone = 'admin';
                  let {checkCode} = that.ruleForm;

                  const response = that.$store.dispatch('loginbyUser', {
                    username: telphone.trim(),
                    password: checkCode,
                    token: res.content.access_token
                  })

                  that.$notify.closeAll()
                  that.$store.dispatch('closeAllView')
                  
                  setTimeout(() => {
                    that.$router.push({name: 'dashboard'})
                  }, 1500);

                }else if(res.code == 500) {
                  that.$message.error(res.msg);
                  that.loading = false;
                }
              }
            }          
        } else {
          this.loading = false
          // this.$message.error(this.$t('login.validfaild'))
          this.$message({
            message : '请输入手机号及验证码',
            type: 'error'
          })
        }
      })
    },
    handleUserLogin(formName) {
      this.loading = true
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证输入的账号密码
          this.$http.post(`${api.dev}/login`,{username : this.formRule.username,password: this.formRule.password},{emulateJSON : true}).then(res => {
              if(res.body.code == 200) {
                    
                this.$message({
                  message: res.body.msg,
                  type: 'success',
                  duration: 1000
                });
                
                //let username = 'admin';
                let {username, password} = this.formRule;

                localStorage.setItem('hasAddRoutes', 'false');

                const response = this.$store.dispatch('loginbyUser', {
                  username: username.trim(),
                  password: password,
                  token: res.body.content.access_token
                })

                this.$notify.closeAll()
                this.$store.dispatch('closeAllView')
                setTimeout(() => {
                  this.$router.push({name: 'dashboard'})
                }, 1500);

              }else if(res.body.code == 500) {
                this.$message.error(res.body.msg);
                this.loading = false;
              }
          })  
        } else {
          this.loading = false
          // this.$message.error(this.$t('login.validfaild'))
          this.$message({
            message : '请输入账号及密码',
            type: 'error'
          })
        }
      })
    },
    forgetHandle() {
      this.$message.success(this.$t('login.pwdChanged'))
      this.wrapSwitch(true)
    },
    getCode() {
      if(this.ruleForm.telphone != '' && this.ruleForm.telphone.length == 11) {
        this.$http.post(`${api.dev}/api/main/user/sendSmsCode`,{phone : this.ruleForm.telphone, type : 1} , {emulateJSON:true}).then(res => {
          console.log(res);
        })
        this.$refs.checkCode.focus();
        resend(this.$refs.getcode.$el)
      }
    },
    /* tab切换 */
    handleClick(tab, event) {
        console.log(tab.name, tab.name=='first');
        this.keydown(tab.name);
    },
    /* 回车键绑定对应登录 */
    keydown(name){
      var _self = this;
      document.onkeydown = function(e){
          var key = window.event.keyCode;
          if(key == 13){
            if(name=='first'){
              console.log(name);
              _self.handleUserLogin('formRule');
            }
            else{
              console.log(name);
              _self.handleCodeLogin('ruleForm');
            }
          }
      }
    }
  },
  created(){
    this.keydown('first')
  }
}
</script>

<style lang="stylus">
.el-tabs__nav-scroll
    height 40px
    padding-left 20px
  .el-tabs__nav.is-top
    height 40px

// .el-tabs__item 
//     height 60px
//     line-height 60px

.el-tabs__item 
    height 40px
    line-height 40px

.forget-form,
.login-form
  .el-form-item__content
    line-height 40px
  .el-input__inner
    padding-top: 2px;
    height 40px
    line-height 40px

.btn button
    width: 100%
    padding 12px 20px
</style>

<style lang="stylus" scoped>
@import "../../assets/styl/variables.styl"

.login-col
  height 100%

.login-page
  display flex
  justify-content center
  align-items center
  position absolute
  height 100%
  width 100%
  background url('../../assets/images/login_bg.jpg') center center no-repeat
  background-size 100% 100%
  .lang
    position absolute
    right 59px
    top 24px
  .svg-github
    position absolute
    right 29px
    top 25px
  .translate-left
  .translate-right
    will-change auto
    transform translateX(0px)
    transition transform .6s ease-in-out
  .switch-left
    transform translateX(525px)
  .switch-right
    transform translateX(-375px)
  
.login-wrap
  overflow hidden
  width 900px
  height 400px
  background white
  border-radius 4px
  transform translateY(-10px)
  box-shadow 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04)

  .logo
    padding-top 26px
    text-align center

  .title
    font-weight bold
    color main-color
    padding-top 8px
    font-size 22px

    a
      cursor cell
    a:before
      content '['
      opacity 0
      margin-right 10px
      transform translateX(-10px)
      transition transform .2s, opacity .2s

    a:after
      content ']'
      opacity 0
      margin-left 10px
      transform translateX(10px)
      transition transform .2s, opacity .2s

    a:hover:before
    a:hover:after
      opacity 1
      transform translateX(0)

    .subtitle
      color sub-color

  .forgetwrap-title
    padding-top 30px
    padding-left 15px

  .forget-form
    padding 20px 30px 30px
    padding-bottom 0

  .login-form
    padding 30px
    padding-bottom 0

  .login-footer
    padding 0 30px 
    .forgetpwd
      text-align right 
      span
        cursor pointer
        font-size 14px
        font-weight 500
        color #606266

  .wallpaper
    width 100%
    height 100%
    background url('../../assets/images/login_banner.jpg')
    background-size cover
    position relative
  
  .codeRecord
    float right

</style>
<style lang="stylus">
  .login-page{
    .login-form{
      padding-top: 50px!important;
      .el-input-group__prepend{
        padding: 0 12px 0 15px;
        background-color: transparent;
        border-top-left-radius: 22px;
        border-bottom-left-radius: 22px;
      }
      .el-input__inner{
        border-left: none;
        border-top-right-radius: 22px!important;
        border-bottom-right-radius: 22px!important;
        height: 44px;
        line-height: 44px;
      }
      .el-form-item{
        .el-input__inner{
          &:focus, &:hover{
            border-color: #dcdfe6;
          }
        }
        &.is-success{
          .el-input-group__prepend{
            border-color: #67c23a;
          }
          .el-input__inner{
            &:focus, &:hover{
              border-color: #67c23a;
            }
          }
        }
        &.is-error{
          .el-input-group__prepend{
            border-color: #f56c6c;
          }
          .el-input__inner{
            &:focus, &:hover{
              border-color: #f56c6c;
            }
          }
        }
      }
      .el-button--primary{
        background: #aa2216;
        border-color: #aa2216;
        padding: 14px 20px;
        border-radius: 22px!important;
        &:focus, &:hover{
          background: #BD2D21;
          border-color: #BD2D21;
        }
      }
      .el-form-item__error{
        margin-left: 2em;
      }
    }
    
    .el-tabs__item{
      &.is-active, &:hover{
        color: #aa2216;
      }
    }
    .el-tabs__active-bar{
      background-color: #aa2216;
    }
    
    .wallpaper{
      border-left: 4px solid #aa2216;
    }
  }
</style>