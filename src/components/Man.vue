<template>
  <div style="margin-left: 5%;margin-right: 5%">


    <div style="float: left;width: 500px">

      <div style="height: 300px;padding-top: 20px;padding-bottom: 20px">
        <div ><a style="font-size: 30px">最新战绩 </a><el-button style="margin-left: 5px" @click="getResult();getHero()" size="mini" icon="el-icon-refresh-right" type="primary" round>刷新</el-button></div>
        <el-table :data="lastResult" style="width: 80%">
          <el-table-column
            type="index"
            width="20">
          </el-table-column>
          <el-table-column
            prop="name"
            label="英雄"
            width="120">
          </el-table-column>
          <el-table-column
            prop="score"
            label="评分"
            width="80">
          </el-table-column>
          <el-table-column
            prop="sub_score"
            label="得分"
            width="80">
          </el-table-column>
          <el-table-column
            prop="sub_total"
            :formatter='handleSubTotal'
            label="结算" width="120">
          </el-table-column>
        </el-table>

      </div>

      <h3 >英雄层级排行榜</h3>
      <el-table :data="heroList">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="英雄"
          width="130">
        </el-table-column>
        <el-table-column
          prop="count"
          label="场次"
          width="80">
        </el-table-column>
        <el-table-column
          :formatter='handleTier'
          prop="tier"
          width="100"
          label="层级">
        </el-table-column>
        <el-table-column
          prop="sum"
          label="赢得总金额" width="100">
        </el-table-column>
      </el-table>
    </div>

    <div style="width: 630px;float: right;margin-right: 10%">


    <div style="margin: 10px">



      <div>
        <el-button :size="mini[0]" :type="mini[0] === 'mini'?'primary':'danger'" @click="position = -1 ;filter();dealBtn(0)">全部</el-button>
        <el-button :size="mini[1]" :type="mini[1] === 'mini'?'primary':'danger'" @click="position=0; filter();dealBtn(1)">上单</el-button>
        <el-button :size="mini[2]" :type="mini[2] === 'mini'?'primary':'danger'" @click="position=1; filter();dealBtn(2)">打野</el-button>
        <el-button :size="mini[3]" :type="mini[3] === 'mini'?'primary':'danger'" @click="position=2; filter();dealBtn(3)">中单</el-button>
        <el-button :size="mini[4]" :type="mini[4] === 'mini'?'primary':'danger'" @click="position=3; filter();dealBtn(4)">ADC</el-button>
        <el-button :size="mini[5]" :type="mini[5] === 'mini'?'primary':'danger'" @click="position=4; filter();dealBtn(5)">辅助</el-button>
        <div style="margin: 10px;float:right">
          <el-button  @click="openDialog">游戏结算</el-button>
        </div>
      </div>



      <div style="margin-top: 10px">
          层级：
          <el-select v-model="selectTier"  size="mini" placeholder="请选择层级" style="width: 100px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          过滤条件：
          <el-select v-model="showHero"  size="mini" placeholder="显示条件" style="width: 100px">
            <el-option
              v-for="item in filterOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>



        <div style="font-size: 10px;color: gray;padding-top: 10px">剩余英雄数量：{{canSelectHero}}</div>
      </div>


    </div>
    <div>
      <div @dblclick="copy(item.name)" class="hero"   :class="{gray:item.disable}" :key="item.index" v-for="item in showList" :style="{'backgroundPosition':('0px -'+ item.y+'px')}">
            <div class="hero-name">{{item.name}}</div>
            <div class="hero-sum">¥{{item.sum}}元</div>
      </div>

    </div>
    </div>


    <el-dialog
      title="提示"
      :visible.sync="showJieSuan"
      :close-on-click-modal="false"
      width="80%">
      <div style="height: 400px">
      <div style="float: left;right: 100px">

        <div>
          <el-button @click="selectPlayerShow = true">服务器查询</el-button>

        </div>
      <div>
        价格：{{price + ' RMB'}}<el-slider v-model="price"  style="width: 300px"></el-slider>

      </div>


      <div>
        <el-input v-model="p1" placeholder="评分" style="width: 100px"></el-input>
        <el-select v-model="p1hero" filterable placeholder="请选择">
          <el-option
            v-for="item in heroList"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div>
      <el-input v-model="p2" placeholder="评分" style="width: 100px"></el-input>
      <el-select v-model="p2hero" filterable placeholder="请选择">
        <el-option
          v-for="item in heroList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      </div>

      <div>
      <el-input v-model="p3" placeholder="评分" style="width: 100px"></el-input>
      <el-select v-model="p3hero" filterable placeholder="请选择">
        <el-option
          v-for="item in heroList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      </div>

      <div>

      <el-input v-model="p4" placeholder="评分" style="width: 100px"></el-input>
      <el-select v-model="p4hero" filterable placeholder="请选择">
        <el-option
          v-for="item in heroList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

      </div>

      <div>
      <el-input v-model="p5" placeholder="评分" style="width: 100px"></el-input>
      <el-select v-model="p5hero" filterable placeholder="请选择">
        <el-option
          v-for="item in heroList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

      </div>

      <el-button style="margin-top: 5px" @click="jisuan">计算</el-button>
      <el-button style="margin-top: 5px" @click="submit">提交</el-button>
      </div>

      <div style="float: right;left: 5px">
        <el-table :data="result" style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="英雄"
            width="150">
          </el-table-column>
          <el-table-column
            prop="score"
            label="评分"
            width="100">
          </el-table-column>
          <el-table-column
            prop="subScore"
            label="得分"
            width="100">
          </el-table-column>
          <el-table-column
            prop="subtotal"
            label="赢得总金额" width="100">
          </el-table-column>
        </el-table>
      </div>
      </div>
      <span slot="footer" class="dialog-footer" >

  </span>
    </el-dialog>



    <el-dialog
      title="提示"
      :close-on-click-modal="false"
      width="80%"
      :visible.sync="selectPlayerShow"
    >
      <div width="80%">
        <el-checkbox-group v-model="selectPlayers" @change="handleChecked">
          <el-checkbox v-for="p in players" :label="p.id" :key="p.id">{{p.game_name}}</el-checkbox>
        </el-checkbox-group>
<!--        <el-select v-model="selectPlayers" multiple placeholder="请选择玩家" width="80%">-->
<!--          <el-option-->
<!--            v-for="item in players"-->
<!--            :key="item.id"-->
<!--            :label="item.game_name"-->
<!--            :value="item.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
      </div>

      <el-button @click="queryWegame()">查询</el-button>

    </el-dialog>
    <a :data-clipboard-text="copyName" class="icon-copy"></a>

  </div>
</template>
<script>
import axios from 'axios';
import { Loading } from 'element-ui';
import Clipboard from 'clipboard'



export default {
  name: 'HelloWorld',
  data () {
    return {
      copyName:'',
      position:-1,
      showHero:1,
      selectTier:0,
      rootPath:'http://114.96.105.111:9999',
      // rootPath:'http://localhost:9999',
      mini:['medium','mini','mini','mini','mini','mini'],
      p1:null,
      p2:null,
      p3:null,
      p4:null,
      p5:null,
      p1hero:null,
      p2hero:null,
      p3hero:null,
      p4hero:null,
      p5hero:null,
      showJieSuan: false,
      selectPlayerShow: false,

      lastResult:[],
      filterOptions: [
        {label: "全部", value: 0},
        {label: "可用", value: 1},
        {label: "禁用", value: 2}
      ],
      options:[
        {label:"全部",value:0},
        {label:"T1",value:1},
        {label:"T2",value:2},
        {label:"T3",value:3},
        {label:"T4",value:4},
        {label:"T5",value:5},
      ],
      heroList:[],
      showList:[],
      hideList:[],
      top:[],
      result:[],
      price:10,
      selectPlayers:[],
      players:[
        {id:1,game_name:"碧血葬香魂"},
        {id:2,game_name:"为什么顽固而专一"},
        {id:3,game_name:"123456789LIRUI"},
        {id:4,game_name:"shamer"},
        {id:5,game_name:"桐汪汪的小太阳"},
      ],
      battles:[]
    }
  },
  mounted(){
    const clipboard = new Clipboard('.icon-copy');
    clipboard.on('success', e => {
      this.$message.success(e.text + ' 已复制到剪贴板！');
    });
  },
  computed: {
    canSelectHero: function () {
      // `this` 指向 vm 实例
      return this.heroList.filter(item=> !item.disable).length
    }
  },
  created() {
   this.getHero()
    this.getResult()
    this.queryPlayer()
    setInterval(this.getHero,30000);
    setInterval(this.getResult,30000);
  },
  watch:{
    selectTier(){
      this.filter()
    },
    showHero(){
      this.filter()
    }
  },
  methods:{
    copy(name){
      let that = this
      this.$copyText(name).then( e => {
        that.$notify({
          title: '成功',
          message: '复制:'+name,
          type: 'success'
        })
      }, function (e) {
        alert('复制失败')
        console.log(e)
      })


    },
    handleChecked(res){
      console.log(res)
    },
    queryPlayer() {
      let that = this
      axios.get(this.rootPath + '/v1/user').then(res=>{
          that.players = res.data
        }
      )
    },
    queryWegame(){
      let that = this
      that.battles = []
      axios.post(this.rootPath +"/v1/rpc_wegame",this.selectPlayers).then(res=>{
        that.battles = res.data
        that.selectPlayerShow = false

        let gameId = ""
        let ww = false
        that.battles.forEach(ele=>{
           if(gameId===""){
             gameId = ele.game_id
           }else{
             if (gameId !== ele.game_id) {
               ww = true
             }
           }
        })

        if (ww){
          alert('不在一个对局！')
        }

        res.data.forEach((ele,i)=>{
          let heroId = ele.champion_id
          let score = (ele.game_score / 10000).toFixed(1)
          if (i===0){
            that.p1hero = heroId
            that.p1 = score
          }
          if (i===1){
            that.p2hero = heroId
            that.p2 = score
          }
          if (i===2){
            that.p3hero = heroId
            that.p3 = score
          }
          if (i===3){
            that.p4hero = heroId
            that.p4 = score
          }
          if (i===4){
            that.p5hero = heroId
            that.p5 = score
          }
        })
      })
    }
    ,
    dealBtn(index){
      this.mini = this.mini.map(item=>{
        return 'mini'
      })
      this.mini[index] = 'medium'
    },
    handleTier(row,cellValue){
    return 'T' + row.tier
    },
    handleSubTotal(row,cellValue){
      return  '¥  ' + row.sub_total
    },
    filter(){
      let position = this.position;
      let filter = this.heroList

      filter = filter.filter(item => {
        return (item.position+ '').indexOf(position+'') !== -1 || position === -1
      })

      if (this.showHero !== 0){
        filter = filter.filter(item=> item.disable === !(this.showHero === 1))
      }
      filter = filter.filter(item=> item.tier >= this.selectTier )
      this.showList = filter
    },
    resetAll(){
      axios.post(this.rootPath +"/v1/enable").then(res=>{
        alert("重置成功")
      })
    },
    openDialog(){
      this.showJieSuan = true
       this.p1 =null
       this.p2 =null
       this.p3=null
       this.p4=null
       this.p5=null
       this.p1hero = null
       this.p2hero = null
       this.p3hero = null
       this.p4hero = null
       this.p5hero = null
       this.result = []
    },
    submit(){
      if (this.result.length < 1) {
        alert('请先计算')
        return
      }
      let badParam = false
      let tmp
      this.result.forEach(item=>{
        let hero = this.heroList.filter(f=>f.id === item.hero)[0];
        if (hero.disable ) {
          alert('英雄：' + hero.name + '已使用过')
          badParam = true
        }
        if(tmp === item.hero){
          alert('不能使用同样的英雄')
          badParam = true
        }
        tmp = item.hero
      })
      if(badParam)
        return;
      axios.post(this.rootPath + "/v1/jiesuan",this.result).then(res=>{
        alert("提交成功")
      })
    },
    getHeroNameById(id){
      return this.heroList.filter(item=> item.id === id)[0].name
    },
    jisuan(){
      this.result = []
      let array = []
      if (this.p1) {
        array.push({score: parseFloat(this.p1),hero:this.p1hero,name:this.getHeroNameById(this.p1hero)})
      }
      if (this.p2) {
        array.push({score: parseFloat(this.p2),hero:this.p2hero,name:this.getHeroNameById(this.p2hero)})
      }
      if (this.p3) {
        array.push({score:parseFloat(this.p3),hero:this.p3hero,name:this.getHeroNameById(this.p3hero)})
      }
      if (this.p4) {
        array.push({score:parseFloat(this.p4),hero:this.p4hero,name:this.getHeroNameById(this.p4hero)})
      }
      if (this.p5) {
        array.push({score:parseFloat(this.p5),hero:this.p5hero,name:this.getHeroNameById(this.p5hero)})
      }


      array.sort((a, b) => {
        return a.score - b.score
      });
      array.reverse()
      let money = []
      array.forEach(a => {
        let sum = 0
        array.forEach(b => {
          let score = (a.score * 10 - b.score * 10) / 10
          if (score < 0) {
            if (score % 1 !== 0) {
              score = Math.ceil((score * 10 - 10) / 10)
            }
          } else {
            score = Math.ceil(score)
          }
          sum += score * this.price
        })
        a.subtotal = sum
        a.subScore = sum / this.price
      })
      this.result = array
    },
    sort(array){
      return array.sort((item1,item2)=>{
          return item1.index - item2.index
        })
    },
    getResult(){
      let that = this
      axios.get(this.rootPath + '/v1/recent').then(res=>{
        that.lastResult = res.data
      })
    },
    getHero() {
      let loading = Loading.service({ fullscreen: true });
      let that  = this
       axios.get(this.rootPath +"/v1/getAllHero").then(res => {
        let heros = res.data

         heros = heros.sort((t1,t2)=>{
           return  t2.sum - t1.sum
         })

         let step = heros.length / 5
         heros = heros.map((item,index) => {
          let t = Math.ceil((index +1) /step  )
          return {
            id: item.id,
            index: item.sort,
            name: item.heroName,
            position: item.position,
            y: item.imgPosition,
            disable: item.disable,
            sum:item.sum,
            count:item.count,
            tier:t
          }
        })

         that.heroList = heros
       }).finally(()=>{
         that.filter()
         loading.close()
    })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gray {
  filter: grayscale(100%);
}
.hero{
  text-align: center;
  float: left;
  margin: 3px;
  width: 84px;
  height: 84px;
  color: wheat;
  background-image: url("../assets/champion82.png");
  background-repeat: no-repeat;
}
.hero-name{
  width: 82px;
  color: white;
  background-color: rgba(147, 147, 147, 0.62);
  font-size: 8px;
}
.hero-sum{
  width: 82px;
  color: #c4baba;
  background-color: rgba(147, 147, 147, 0.62);
  font-size: 8px;
}
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
</style>
