<template>
  <div>
    <el-button @click="showAddPage = true">新增</el-button>
    <el-button @click="resetAll">重置所有英雄</el-button>


    <el-dialog
      title="提示"
      :visible.sync="showAddPage"
      width="50%">
      <div>

      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="玩家名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="游戏名称">
          <el-input v-model="form.game_name"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="openId">
          <el-input v-model="form.open_id"></el-input>
        </el-form-item>
        <el-form-item label="rpc请求类型">
          <el-input v-model="form.request_type"></el-input>
        </el-form-item>
      </el-form>

        <el-button @click="showAddPage = false">取 消</el-button>
        <el-button type="primary" @click="submitCreate">提交</el-button>
      </div>

    </el-dialog>

    <el-table
      style="width: 800px;"
      :data="tableData">
      <el-table-column
        prop="id"
        label="id"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="game_name"
        label="游戏名"
      width="100">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="用户名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="open_id"
        label="开放id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="request_type"
        label="rpc类型"
        width="50">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="deleteReq(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import axios from "axios";
import qs from 'qs';
//let  rootPath = 'http://localhost:9999'
let  rootPath = 'http://114.96.105.111:9999'
export default {
  name: 'HelloWorld',
  data () {
    return {
      form:{
        name:'',
        game_name:'',
        user_name:'',
        open_id:'',
        request_type:''
      },
      showAddPage:false,
      tableData:[{
        id: '',
        name : '',
        game_name: '',
        user_name:'',
        open_id:'',
        request_type:''
      }],
    }
  },
  mounted () { //这个属性就可以，在里面声明初始化时要调用的方法即可
    // we can implement any method here like
    this.query()
  },
  methods:{
    resetAll(){
      axios.post(this.rootPath +"/v1/enable").then(res=>{
        alert("重置成功")
      })
    },
    query(){
      let that = this
      axios.get(rootPath + '/v1/user').then(res=>{
          that.tableData = res.data
        }
      )
    },
    update(){
      return axios.get(rootPath + '/v1/user')
    },
    submitCreate(){
      let that = this
      this.create().then(res=>{
        if (res.data.code === '1') {
          that.showAddPage = false
          that.query()
        }else {
          alert(res.data.msg)
        }
      })
    },
    create(){
      let data = qs.stringify(this.form);
      return axios.post(rootPath + '/v1/user',data)
    },
    deleteReq(id){
      let param = {
        id:id
      }
      let p = qs.stringify(param);
      let that = this
      axios.delete(rootPath + '/v1/user?'+p).then(res=>{
        that.query()
      })
    },
  }
}
</script>

<style>
</style>
