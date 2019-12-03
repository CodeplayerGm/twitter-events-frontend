<template>
  <div id='main'>
    <!-- 表格面板 -->
    <el-tabs type="border-card" id='panel-area'>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-setting"></i> 系统设置</span>
        <div id='eventAnalysisArea'>
          <div id='eventAnalysis-title'> <span id='eventAnalysis-title-font'>设置事件分析图表加载项</span> </div>
          <div id='eventAnalysis-content'>
            <el-checkbox v-model="wordCloud" label="关键词云" border ></el-checkbox>
            <el-checkbox v-model="mapHot" label="地区热点" border ></el-checkbox>
            <el-checkbox v-model="discussionTrend" label="讨论走势" border ></el-checkbox>
            <el-checkbox v-model="levelPie" label="等级统计" border ></el-checkbox>
            <el-checkbox v-model="popularTweeter" label="热门tweeter" border ></el-checkbox>
            <el-checkbox v-model="timeTrack" label="时间轨迹" border ></el-checkbox>
          </div>
          <div id='eventAnalysis-action'>
            <el-button size="large" type="primary" id='eventAnalysis-change-btn' @click="changeEventAnalysisConfig()">修改</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'SystemConfig',
  data () {
    return {
      wordCloud: false,
      mapHot: false,
      discussionTrend: false,
      levelPie: false,
      popularTweeter: false,
      timeTrack: false
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
    changeEventAnalysisConfig() {
      this.$confirm('确认要修改事件加载项吗？', '提示', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        let that = this
        let params = {
          data: {
            wordCloud: this.wordCloud,
            mapHot: this.mapHot,
            discussionTrend: this.discussionTrend,
            levelPie: this.levelPie,
            popularTweeter: this.popularTweeter,
            timeTrack: this.timeTrack
          }
        }
        that.$axios.post('/changeEventAnalysis', params)
          .then((response) => {
            let data = response.data
            // console.log(data)
            if (data.resCode === 0) {
              that.errorMessage(data.resStr)
            } else if (data.resCode === 1) {
              that.successMessage(data.resStr)
            }
          })
          .catch((e) => {
            console.log(e)
          })
      }).catch(() => {
      })
    }
  },
  mounted () {
    let that = this
    that.$axios.get('getEventAnalysisConfigData')
      .then((response) => {
        let data = response.data
        if (data.resCode === 1) {
          let config = data.resObject
          that.wordCloud = config.wordCloud
          that.mapHot = config.mapHot
          that.discussionTrend = config.discussionTrend
          that.levelPie = config.levelPie
          that.popularTweeter = config.popularTweeter
          that.timeTrack = config.timeTrack
        } else {
          that.errorMessage(data.resStr)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main {
    width: 100%;
    height: 100%;
    /* background: greenyellow; */
  }
  #panel-area {
    width: 1640px;
    height: 830px;
    margin: 20px auto 0 50px;
    overflow: hidden;
    overflow-y: scroll;
    float: left;
  }
  #eventAnalysisArea {
    width: 1550px;
    height: 220px;
    margin: 20px auto 0 auto;
    border: 4px solid #808040;
    border-radius: 8px
  }
  #eventAnalysis-title {
    width: 330px;
    height: 50px;
    margin: 5px 0 0 5px;
    line-height: 50px;
    /* border: 1px solid #000 */
  }
  #eventAnalysis-title-font {
    font-size: 28px;
    font-weight: 600;
  }
  #eventAnalysis-content {
    width: 1530px;
    height: 80px;
    line-height: 80px;
    margin: 5px auto 0 auto;
    border: 3px dashed #BEBEBE;
    border-radius: 4px;
  }
  #eventAnalysis-action {
    width: 600px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin: 5px auto 0 auto;
    /* border: 3px dashed #BEBEBE; */
  }
  #eventAnalysis-change-btn {
    font-size: 16px;
  }
</style>
