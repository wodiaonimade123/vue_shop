<template>
    <div class='home_wrap'>
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="4">logo</el-col>
                    <el-col :span="16"><h1>后台管理系统</h1></el-col>
                    <el-col :span="4"></el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="199px">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#ffd04b">

                        <el-submenu :index="item.id+''" v-for="(item,index) in $store.state.menuData" :key="index" >
                            <template slot="title">
                                <span>
                                <i class="el-icon-user-solid"></i>
                                    {{item.authName}}
                                </span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item v-for="(it,i) in item.children" :index="it.id+''" :key="i" @click="$router.push('/'+it.path)">
                                <i class="el-icon-menu"></i>
                                    {{it.authName}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
      console.log(this.$store.state.menuData);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toUser(){
        this.$router.push('/user')
    }
  },
  components: {}
};
</script>

<style lang='scss'>
.el-header {
  background-color: #373d41;
  color: #fff;
  text-align: center;
  line-height: 60px;
  height: 60px;
}

.el-aside {
  background-color: #333744;
  color: #333;
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 800px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-submenu__title {
  min-width: 200px;
}

.el-submenu .el-menu-item {
  min-width: 200px;
}

.el-menu-item-group__title {
  padding: 0;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
