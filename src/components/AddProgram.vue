<template>
  <div id='main'>
    <!-- 新建方案面板 -->
    <el-tabs type="border-card" id='panel-area'>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-platform"></i> 新的方案</span>
        <div id='form-basic'>
          <div id='form-item-div'>
            <span id='form-item-font'>
              <i class=" el-icon-circle-check"></i>方案名：</span>
            <el-input placeholder="限定50字符" v-model="addProgramForm.pname"
              maxlength="50" style="width: 250px; margin:auto 22px auto 50px; float: left">
            </el-input>
            <span id='form-item-font'>方案描述：</span>
            <el-input placeholder="限定100字符" v-model="addProgramForm.desc"
              maxlength="100" style="width: 670px; margin:auto 0 auto 10px; float: left">
            </el-input>
          </div>
          <div id='form-item-div'>
            <span id='form-item-font'>
              <i class=" el-icon-circle-check"></i>数据库名称：</span>
            <el-input placeholder="限定20字符，只能使用英文或数字" v-model="addProgramForm.dbName"
              maxlength="20" style="width: 250px; margin:auto 20px auto 20px; float: left">
            </el-input>
            <span id='form-item-font'>
              <i class=" el-icon-circle-check"></i>单次查询最大推文数：</span>
            <el-input placeholder="正整数" v-model="addProgramForm.maxNum"
              maxlength="50" style="width: 80px; margin:auto 40px auto 10px; float: left">
            </el-input>
            <span id='form-item-font'>
              <i class=" el-icon-circle-check"></i>时间范围：</span>
            <el-date-picker
              v-model="addProgramForm.timeRange"
              type="daterange" value-format="yyyy-MM-DD" format="yyyy年MM月DD日"
              style="margin:10px 0 10px 10px; float: left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div id='form-keywords-area'>
            <span id='form-item-font'>
              <i class=" el-icon-circle-check"></i>设置关键词组：</span>
            <div id='form-keywords-div'>
              <div id='form-item-div'
                v-for="(item, index) in addProgramForm.keywords" :key="index">
                <span id='form-item-font'>关键词组名：</span>
                <el-input placeholder="限定50字符" v-model="item.kname"
                  maxlength="50" style="width: 150px; margin:auto 20px auto 10px; float: left">
                </el-input>
                <span id='form-item-font'>表达式：</span>
                <el-input placeholder="限定20个关键词  格式：(xxx|xxx|xxx| ......)" v-model="item.exp"
                  maxlength="" style="width: 550px; margin:auto 0 auto 10px; float: left">
                </el-input>
                <el-button type="danger" icon="el-icon-delete" circle
                  @click="removeKeyWordsGroup(index, 1)"></el-button>
              </div>
              <el-button icon='el-icon-plus' type="success"
                @click="addKeyWordsGroup" style="margin-top: 15px; margin-bottom: 15px">添加组</el-button>
            </div>
          </div>
          <div id='form-item-div'>
            <span id='form-item-font'>设置过滤词：</span>
            <el-input placeholder="限定20个过滤词  格式：(xxx|xxx|xxx| ......)" v-model="addProgramForm.ignorewords"
              style="width: 650px; margin:auto 0 auto 35px; float: left">
            </el-input>
          </div>
          <div id='form-item-div'>
            <span id='form-item-font'>设置匹配话题：</span>
            <el-input placeholder="限定20个话题  格式：(xxx|xxx|xxx| ......)" v-model="addProgramForm.topics"
              style="width: 650px; margin:auto 0 auto 19px; float: left">
            </el-input>
          </div>
          <el-button icon='el-icon-finished' type="primary"
            @click="submitAddProgram" style="margin-top: 15px; margin-bottom: 30px">提交方案</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 确认方案信息弹出框 -->
    <el-dialog
      title="确认提交新方案吗"
      :visible.sync="confirmProgramVisible"
      width="900px">
      <div id='confirm-dialog-div'>
        <div id='form-item-div'>
          <span id='form-item-font'>方案名：</span>
          <el-input v-model="addProgramForm.pname" :disabled="true"
            style="width: 150px; margin:auto 40px auto 26px; float: left">
          </el-input>
          <span id='form-item-font'>数据库：</span>
          <el-input v-model="addProgramForm.dbName" :disabled="true"
            style="width: 150px; margin:auto 40px auto 15px; float: left">
          </el-input>
          <span id='form-item-font'>最大推文数：</span>
          <el-input v-model="addProgramForm.maxNum" :disabled="true"
            style="width: 150px; margin:auto 40px auto 15px; float: left">
          </el-input>
        </div>
        <div id='form-item-textarea-div'>
          <span id='form-item-font'>方案描述：</span>
          <el-input type="textarea" autosize :disabled="true"
            style="width: 700px; margin:30px 20px auto 10px; float: left"
            v-model="addProgramForm.desc">
          </el-input>
        </div>
        <div id='form-item-div'>
          <span id='form-item-font'>起止时间：</span>
          <el-date-picker
            v-model="addProgramForm.timeRange"
            type="daterange" value-format="yyyy-MM-DD" format="yyyy年MM月DD日"
            style="margin:10px 0 10px 10px; float: left"
            unlink-panels :disabled="true"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div id='form-item-words-div' v-for="(item, index) in keywordsList" :key="index">
          <span id='form-item-font'>关键词组：</span>
          <el-input v-model="item.kname" :disabled="true"
            style="width: 150px; margin:auto 0 auto 10px; float: left">
          </el-input>
          <div id='tags-div'>
            <el-tag effect="dark" id='tag-item'
              v-for="(subItem, subIndex) in item.words" :key="subIndex">{{subItem}}</el-tag>
          </div>
        </div>
        <div id='form-item-words-div'>
          <span id='form-item-font'>过滤词：</span>
          <div id='tags-div' style="margin-left: 160px">
            <el-tag type="danger" effect="dark" id='tag-item'
              v-for="(item, index) in ignorewordsList" :key="index">{{item}}</el-tag>
          </div>
        </div>
        <div id='form-item-words-div'>
          <span id='form-item-font'>话题：</span>
          <div id='tags-div' style="margin-left: 160px">
            <el-tag type="warning" effect="dark" id='tag-item'
             v-for="(item, index) in topicsList" :key="index">{{item}}</el-tag>
          </div>
        </div>
      </div>
      <div id='form-item-div'>
        <el-button type="success" icon="el-icon-check"
          @click="confirmSubmit">确定提交</el-button>
        <el-button type="warning" icon="el-icon-back"
          @click="confirmProgramVisible = false">返回修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {isAlnum, isNum} from '../util/util.js'

export default {
  name: 'MonitorProgram',
  data () {
    return {
      // 新方案数据
      addProgramForm: {
        pname: '',
        desc: '',
        dbName: '',
        maxNum: 0,
        timeRange: [],
        keywords: [],
        ignorewords: '',
        topics: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近半年',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 183)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一年',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      maxKeyWordsNum: 20,
      maxIgnoreWordsNum: 20,
      maxTopicsNum: 20,
      // 确认方案弹出框数据
      confirmProgramVisible: false,
      keywordsList: [],
      ignorewordsList: [],
      topicsList: []
    }
  },
  methods: {
    errorMessage (msg) {
      this.$message.error({
        message: msg
      })
    },
    successMessage (msg) {
      this.$message.success({
        message: msg
      })
    },
    addKeyWordsGroup () {
      this.addProgramForm.keywords.push({
        kname: '',
        exp: ''
      })
    },
    removeKeyWordsGroup (index) {
      this.addProgramForm.keywords.splice(index, 1)
    },
    submitAddProgram () {
      let form = this.addProgramForm
      // 表单 方案名、时间、数据库名称、单次查询最大推文数检查
      if (form.pname === '' || form.timeRange.length === 0) {
        this.errorMessage('方案名和推文时间范围不能为空！')
        return
      }
      // 数据库名称检查
      if (form.dbName === '' || !isAlnum(form.dbName)) {
        this.errorMessage('数据库名称不合法，请检查！')
        return
      }
      // 最大数量检查
      if (form.maxNum === '' || !isNum(form.maxNum)) {
        this.errorMessage('最大推文数量只能填写正整数！')
        return
      }
      // 关键词组表达式检查
      if (form.keywords.length === 0) {
        this.errorMessage('关键词组不能为空！')
      } else if (this.keyWordsCheck()) {
        // 过滤词表达式检查
        let ignoreResultCode = this.wordsNumCheck(form.ignorewords, this.maxIgnoreWordsNum)
        if (form.ignorewords === '' || ignoreResultCode === 1) {
          // 话题表达式检查
          let topicResultCode = this.wordsNumCheck(form.topics, this.maxTopicsNum)
          if (form.topics === '' || topicResultCode === 1) {
            // this.successMessage('表达式正常')
            // 检查 方案描述、关键词组名是否为空，并补全
            this.descAndKeyWordsGroupNameCheck()
            // 生成确认表单的words列表
            this.generateWordsList()
            this.confirmProgramVisible = true
          } else {
            if (topicResultCode === -1) {
              this.errorMessage('话题表达式格式错误，请检查！')
            } else if (topicResultCode === 2) {
              this.errorMessage('话题个数太多，请检查！')
            } else if (topicResultCode === 0) {
              this.errorMessage('没有解析出有效话题，请检查！')
            }
          }
        } else {
          if (ignoreResultCode === -1) {
            this.errorMessage('过滤词表达式格式错误，请检查！')
          } else if (ignoreResultCode === 2) {
            this.errorMessage('过滤词个数太多，请检查！')
          } else if (ignoreResultCode === 0) {
            this.errorMessage('没有解析出有效过滤词，请检查！')
          }
        }
      }
    },
    keyWordsCheck () {
      let keywords = this.addProgramForm.keywords
      for (let i = 0; i < keywords.length; i++) {
        let group = keywords[i]
        let kname = group.kname
        let exp = group.exp
        let resultCode = this.wordsNumCheck(exp, this.maxKeyWordsNum)
        if (resultCode === -1) {
          this.errorMessage('关键词组：' + kname + ' 的表达式格式错误，请检查！')
          return false
        } else if (resultCode === 2) {
          this.errorMessage('关键词组：' + kname + ' 的关键词个数太多，请检查！')
          return false
        } else if (resultCode === 0) {
          this.errorMessage('关键词组：' + kname + ' 没有有效关键词，请检查！')
          return false
        }
      }
      return true
    },
    wordsNumCheck (exp, num) {
      if (exp[0] === '(' && exp[exp.length - 1] === ')') {
        exp = exp.substring(1, exp.length - 1)
        let words = exp.split('|')
        // console.log(words)
        if (words.length === 0 || words[0] === '') {
          return 0
        } else if (words.length > num) {
          return 2
        } else {
          return 1
        }
      } else {
        // 字符串格式错误
        return -1
      }
    },
    descAndKeyWordsGroupNameCheck () {
      if (this.addProgramForm.desc === '') {
        this.addProgramForm.desc = '暂无'
      }
      for (let i = 0; i < this.addProgramForm.keywords.length; i++) {
        if (this.addProgramForm.keywords[i].kname === '') {
          this.addProgramForm.keywords[i].kname = 'keyWordsGroup' + (i + 1)
        }
      }
    },
    wordsExpToWordsList (exp) {
      exp = exp.substring(1, exp.length - 1)
      return exp === '' ? [] : exp.split('|')
    },
    generateWordsList () {
      let form = this.addProgramForm
      this.keywordsList = []
      for (let i = 0; i < form.keywords.length; i++) {
        let kg = form.keywords[i]
        this.keywordsList.push({
          kname: kg.kname,
          words: this.wordsExpToWordsList(kg.exp)
        })
      }
      this.ignorewordsList = this.wordsExpToWordsList(form.ignorewords)
      this.topicsList = this.wordsExpToWordsList(form.topics)
      console.log('单词列表')
      console.log(this.keywordsList)
      console.log(this.ignorewordsList)
      console.log(this.topicsList)
    },
    confirmSubmit () {
      let that = this
      let params = {
        data: that.addProgramForm
      }
      // console.log(params)
      that.$axios.post('addProgram', params)
        .then((response) => {
          let data = response.data
          console.log(data)
          if (data.resCode === 1) {
            that.successMessage(data.resStr)
            // 等待1秒后跳转到监控方案页面
            // const TIME_COUNT = 1
            // if (!that.timer) {
            //   let count = TIME_COUNT
            //   that.timer = setInterval(() => {
            //     if (count > 0 && count <= TIME_COUNT) {
            //       count--
            //     } else {
            that.$router.push('/main/MonitorProgram')
            //   }
            // }, 1000)
            // }
          } else {
            that.errorMessage(data.resStr)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main {
    width: 100%;
    height: 100%;
    /* background: greenyellow */
  }
  #panel-area {
    width: 1220px;
    height: 780px;
    margin: 50px auto 0 260px;
    float: left;
    /* background:#B3D9D9; */
    /* background-image: url("../assets/editBack.jpg");
    background-size: 100% 100%; */
  }
  #form-basic {
    margin: 0 auto 0 auto;
  }
  #form-item-div {
    height: 60px;
    line-height: 60px;
    /* background: blue; */
    margin-top: 15px;
  }
  #form-item-font {
    font-size: 16px;
    font-weight: 500;
    color: #3C3C3C;
    display: block;
    float: left;
  }
  #form-keywords-area {
    /* width: 1120px; */
    height: 330px;
    margin-top: 15px;
    /* background: yellowgreen; */
  }
  #form-keywords-div {
    width: 1020px;
    height: 320px;
    margin: 0 0 0 130px;
    /* float: left; */
    padding-left: 10px;
    border: 2px solid #01814A;
    border-radius: 8px;
    overflow: hidden;
    overflow-y: scroll;
  }
  #confirm-dialog-div {
    width: 880px;
  }
  #form-item-textarea-div {
    height: 100px;
    line-height: 100px;
    /* background: blue; */
    margin-top: 15px;
  }
  #form-item-words-div {
    height: 85px;
    line-height: 85px;
    /* background: blue; */
    margin-top: 15px;
  }
  #tags-div {
    width: 500px;
    height: 70px;
    margin: 15px auto;
    padding-left: 10px;
    border: 2px solid #01814A;
    border-radius: 8px;
    overflow: hidden;
    overflow-y: scroll;
  }
  #tag-item {
    font-size: 16px;
    font-weight: 500;
    margin: 5px 5px 0 0;
  }
</style>
