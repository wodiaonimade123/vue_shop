<template>
    <div class='userList_Wrap'>
        <el-input v-model="inputVal" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="dialogVisible = true">添加</el-button>
         <el-table :data="userList" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="username" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180">
            </el-table-column>
            <el-table-column prop="mobile" label="电话"  width="180">
            </el-table-column>
            <el-table-column prop="role_name" label="角色"  >
            </el-table-column>
            <el-table-column label="状态"  >
                <el-tooltip :content="'Switch value: ' + value" placement="top">
                    <el-switch
                        v-model="value"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="100"
                        inactive-value="0">
                    </el-switch>
                </el-tooltip>
            </el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit"></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="remove(scope.row.id)"></el-button>
                    <el-button type="warning" icon="el-icon-setting"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pagenum"
        :page-sizes="[2, 5, 8, 10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userList.length">
        </el-pagination>

        <el-dialog
            title="添加用户"
            :visible.sync="dialogVisible"
            width="30%" :before-close="handleClose">
            <el-form :model="addruleForm" :rules="addrules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名:" prop="username">
                    <el-input  v-model="addruleForm.username"></el-input>
                </el-form-item>

                <el-form-item label="密码:" prop="password">
                    <el-input v-model="addruleForm.password"></el-input>
                </el-form-item>

                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="addruleForm.email"></el-input>
                </el-form-item>

                <el-form-item label="电话:" prop="mobile">
                    <el-input v-model="addruleForm.mobile"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">添加</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      inputVal: "",
      query: {
        pagenum: 1,
        pagesize: 100
      },
      value: 100,
      userList: [],
      dialogVisible: false,
      addruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addrules: {
        username: [
          { required: "true", message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "最少三位最多12位", trigger: "blur" }
        ],
        password: [
          { required: "true", message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{6,12}$/,
            message: "数字字母最小6位最多12位",
            trigger: "blur"
          }
        ],
        email: [
          { required: "true", message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请正确输入邮箱",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: "true", message: "请输入电话号码", trigger: "blur" },
          {
            pattern: /^[1]+[3,8]+\d{9}$/,
            message: "请输入正确电话号码",
            trigger: "blur"
          }
        ]
      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("http://www.ysqorz.top:8888/api/private/v1/users", {
          params: this.query
        })
        .then(res => {
          console.log(res.data.data.users);
          this.userList = res.data.data.users;
        });
    },
    handleClose() {},
    add() {
      this.$axios
        .post(
          "http://www.ysqorz.top:8888/api/private/v1/users",
          this.addruleForm
        )
        .then(res => {
          console.log(res.data.meta.msg);
        });
      this.dialogVisible = false;
      this.getData();
    },
    remove(id) {
      console.log(id);
      this.$axios
        .delete(`http://www.ysqorz.top:8888/api/private/v1/users/` + id)
        .then(res => {
          console.log(res);
          this.getData();
        });
    },
    handleSizeChange(val) {
      this.query.pagesize = val
      console.log(`每页 ${val} 条`);
      this.getData()
    },
    handleCurrentChange(val) {
      this.query.pagenum = val
      console.log(`当前页: ${val}`);
      this.getData()
    }
  },
  components: {}
};
</script>

<style lang='scss'>
.userList_Wrap {
  background-color: #fff;
  padding: 20px;
  .el-input {
    width: 200px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
.el-pagination {
  margin-top: 20px;
}
</style>
