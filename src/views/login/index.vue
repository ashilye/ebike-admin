<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="login-header">
        <img src="@/assets/images/login/police.png"/>
        <h1>平安电车管理系统</h1>
      </div>
      <el-card>
        <div class="login-content">
          <div class="login-form">
            <h2 class="login-user">用户登录</h2>
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

                <img class="img-code" v-bind:src="identifyCode" style="height:40px; width: 160px; cursor: pointer;" alt="点击更换"
                     title="点击更换" v-on:click="handleCode"/>
                <div>
                  <i class="el-icon-refresh" v-on:click="handleCode"></i>
                </div>
              </div>

              <el-form-item class="login-box">
                <el-button type="primary" v-on:click="submitForm('form')" style="width: 100%">登录</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="login-scan">
            <img class="login-qrcode" v-bind:src="qrcode"/>
            <h3 style="text-align: center">扫描二维码下载App</h3>
            <div class="login-app">
              <el-button type="primary" v-on:click="onUsual">APP民用</el-button>
              <el-button type="warning" v-on:click="onPolice">APP警用</el-button>
            </div>
          </div>
        </div>
      </el-card>
      <div class="login-footer">
        <img src="@/assets/images/login/hyn.jpg"/>
        <h3>Copyright © 2020 豫ICP备18006204号-1</h3>
      </div>
    </div>
  </div>
</template>

<script>
import {userLogin} from '@/api/userApi'

export default {
  name: 'login',
  data() {
    return {
      identifyCode: '',
      qrcode: require('@/assets/images/login/qrcode.jpg'),
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
        code: [
          {required: true, message: '验证码不能为空', trigger: 'blur'},
          {min: 4, max: 4, message: '验证码4位', trigger: 'blur'}
        ],
      }
    }
  },

  created() {},
  mounted() {
    this.handleCode()
  },

  methods: {
    handleCode(){
      this.identifyCode = 'https://nbadmin.hyntech.net/antitheft/login/getValidCode.do?temp=' + Math.random()
    },

    handleLogin(params){
      userLogin(params).then(res =>{
        console.log(res)
      })
    },



    submitForm(formName) {
      // alert(this.form.userName + this.form.passWord)
      console.log('用户名->', this.form.userName)
      console.log('密码->', this.form.passWord)
      console.log('验证码->', this.form.code)
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
          // if (this.form.code !== this.identifyCode) {
          //   this.$message.error('请输入正确的验证码')
          //   return false
          // }
          //登录
          //this.$router.push('/home')
          this.handleLogin({
            'userName':'cmsone',
            'password':'cmsone',
            'validcode':'KLSY',
            'random':Math.random()
          })
        } else {
          return false
        }
      })
    },

    onUsual() {
      this.qrcode = require('@/assets/images/login/qrcode.jpg')
    },
    onPolice() {
      this.qrcode = require('@/assets/images/login/qrcode.jpg')
    }
  }
}
</script>

<style lang="scss" scoped>


.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/login/head.jpg') fixed no-repeat;
  background-size: 100% 50%;
}

.login-wrap {
  padding-top: 80px;
  position: absolute;
  width: 100%;
  height: 100%;

  .el-card {
    background: url('~@/assets/images/login/bg.png') center center fixed no-repeat;
    background-size: cover;
    margin: 30px 10px 50px 10px;
    width: 50%;
    height: 50%;
    display: inline-block;
  }

  .login-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
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

  h3 {
    font-weight: normal;
    color: gray;
  }
}

.login-code {
  display: flex;
  align-items: center;
  position: center;
  justify-content: center;
  justify-items: center;
}

.img-code{
  padding-left: 10px;
  padding-right: 10px;
}

.login-app {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.login-box {
  padding-top: 20px;
}


.login-header {
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: bold;
    color: white;
    padding-left: 20px;
  }
}

.login-footer {
  text-align: center;

  h3 {
    font-weight: normal;
    color: gray;
  }
}

</style>
