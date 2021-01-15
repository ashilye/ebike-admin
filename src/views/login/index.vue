<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-title">
        <img src="@/assets/images/login/ic_police.png"/>
        <h1>平安电车管理系统</h1>
      </div>
      <el-card class="login-card">
        <div class="login-box">
          <div class="login-form">
            <h3 class="login-user">用户登录</h3>
            <el-form ref="form" :model="form" label-width="80px" class="logon-form" :rules="rules">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="form.userName" placeholder="请输入用户名">
                  <i slot="prefix" class="el-icon-s-custom"></i>
                </el-input>
              </el-form-item>

              <el-form-item label="密码" prop="passWord" placeholder="请输入密码">
                <el-input v-model="form.passWord" show-password>
                  <i slot="prefix" class="el-icon-key"></i>
                </el-input>
              </el-form-item>


              <div class="login-code">
                <el-form-item label="验证码" prop="code" placeholder="验证码">
                  <el-input v-model="form.code">
                    <i slot="prefix" class="el-icon-mouse"></i>
                  </el-input>
                </el-form-item>
                <div style="width: 50%" v-on:click="changeCode">
                  <!-- 引入验证码组件 -->
                  <s-identify :identifyCode="identifyCode"></s-identify>
                </div>

                <div>
                  <i class="el-icon-refresh" v-on:click="changeCode"></i>
                </div>
              </div>

              <el-form-item>
                <el-button type="primary" v-on:click="submitForm('form')" style="width: 100%">登录</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="login-scan">
            <img class="login-qrcode" src="@/assets/images/login/qrcode.jpg"/>
            <h3 style="text-align: center">扫描二维码下载App</h3>
            <div class="login-app">
              <el-button type="primary">APP民用</el-button>
              <el-button type="warning">APP警用</el-button>
            </div>
          </div>
        </div>
      </el-card>
      <div class="login-com">
        <img src="@/assets/images/login/hyn.jpg"/>
        <h3>Copyright © 2020 豫ICP备18006204号-1</h3>
      </div>
    </div>
  </div>
</template>

<script>
import SIdentify from "@/components/common/identify";


export default {
  components: {SIdentify},
  name: 'login',
  data() {
    return {
      identifyCode:'1234',
      identifyCodes:'1234567890',
      form: {
        userName: '',
        passWord: '',
        code: ''
      },
      rules: {
        userName: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '用户名3-10位', trigger: 'blur'}
        ],
        passWord: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '密码3-10位', trigger: 'blur'}
        ],

        code: [{required: true, validator: function (rule,value, callback){
            if(!value){
              return callback(new Error('请输入验证码'))
            }else if(this.identifyCode === '1234'){
              callback()
            }else {
              return callback(new Error('验证码不正确'))
            }
          },trigger: 'blur'}]
      }
    }
  },
  mounted() {
    // 刷新页面就生成随机验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },

  methods: {
    changeCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },

    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum (min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },

    // 随机生成验证码字符串
    makeCode (data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
    },

    submitForm(formName) {
      // alert(this.form.userName + this.form.passWord)
      console.log('用户名->',this.form.userName)
      console.log('密码->',this.form.passWord)
      console.log('验证码->',this.form.code)
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
          this.$router.push('/home')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

h1 {
  font-weight: bold;
  color: white;
}

h3 {
  font-weight: normal;
}

/* 背景*/
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/login/login_head.jpg') fixed no-repeat;
  background-size: 100% 50%;
}

.login-content {
  padding-top: 80px;
  position: absolute;
  width: 100%;
  height: 100%;
}

/*card*/
.login-card {
  background: url('~@/assets/images/login/login_bg.png') center center fixed no-repeat;
  background-size: cover;
  margin: 30px 10px 50px 10px;
  width: 50%;
  height: 50%;
  display: inline-block;
}

.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}


/* 标题*/
.login-title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-user {
  font-weight: bold;
  color: dodgerblue;
}

/*登录*/
.login-form {
  width: 50%;
  margin-right: 40px;
  align-items: center;
  align-content: center;
}

/*扫码*/
.login-scan {
  width: 50%;
  margin-left: 40px;
  align-items: center;
  align-content: center;
}

.login-code {
  display: flex;
  align-items: center;
}

.login-app {
  display: flex;
  justify-content: center;
}

/*公司*/
.login-com {
  text-align: center;
  color: gray;
}
</style>
