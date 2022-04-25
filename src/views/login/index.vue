<template>
    <div class='login_container'>
        <div class="login_box">
            <h2>电商后台管理</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>

                 <el-form-item prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="login">登录</el-button>
                  <el-button >重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "输入的用户长度必需要5~20位之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //字符长度处理
          {
            min: 5,
            max: 20,
            message: '输入的密码长度必需要5~20位之间',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    login() {
      this.$refs["ruleForm"].validate((valid) => {
        if(valid){
          this.$axios.post('http://www.ysqorz.top:8888/api/private/v1/login',this.ruleForm).then(res =>{
            console.log(res.data.data);
            this.$store.commit('initToken',res.data.data)
            this.$axios.get('http://www.ysqorz.top:8888/api/private/v1/menus',res.data.data).then(res =>{
              console.log(res.data.data);
              this.$store.commit('initmenuData',res.data.data)
            })
            this.$router.push({path:'/home'})
          })
        }
      //   if (!valid) return false
      //   //开始调用后台登录接口
      //   // let res = await 
      //   // console.log('是否登录成功：', res)
      //   this.$router.push('/home')
      })
    }
  },
  components: {}
};
</script>

<style lang='scss' scoped>
html {
  background-color: #2b4b6b;
}
.login_container {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    border-radius: 10px;
    padding: 0 30px;
    box-sizing: border-box;
    text-align: center;
    width: 30%;
    min-width: 500px;
    height: 300px;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    box-shadow: 0 0 10px #ddd;
  }
}
</style>

