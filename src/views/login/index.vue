<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="logon-form" :rules="rules">
      <h2 class="login-title">管理系统</h2>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="form.passWord" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '用户名3-10位', trigger: 'blur'}
        ],
        passWord: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '密码3-10位', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // alert(this.form.userName + this.form.passWord)
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
          alert('验证成功')
          this.$router.push('/layout')
        } else {
          alert('验证失败')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.logon-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255); /* 透明背景色 最后一个参数是透明程度*/
  padding: 30px;
  border-radius: 20px; /*圆角 */
}
/* 背景*/
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;

}
/* 标题*/
.login-title {
  color: #42b983;
  text-align: center;
}
</style>
