<template>
  <div id='main'>
    <!-- 表格面板 -->
    <el-tabs type="border-card" id='panel-area'>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-data"></i> 事件可视化</span>
        <div id='selection-area'>
          <div id='selection-title-area'><span id='selection-title-font'>展示图表：</span></div>
          <div id='selection-tags-area'>
            <el-tag id='selection-tag' effect="dark" v-show="wordCloudShow"> <span id='selection-tag-font'>关键词云</span> </el-tag>
            <el-tag id='selection-tag' effect="dark" v-show="mapHotShow"> <span id='selection-tag-font'>热点地图</span> </el-tag>
            <el-tag id='selection-tag' effect="dark" v-show="discussionTrendShow"> <span id='selection-tag-font'>事件趋势</span> </el-tag>
            <el-tag id='selection-tag' effect="dark" v-show="levelPieShow"> <span id='selection-tag-font'>等级统计</span> </el-tag>
            <el-tag id='selection-tag' effect="dark" v-show="popularTweeterShow"> <span id='selection-tag-font'>意见领袖</span> </el-tag>
            <el-tag id='selection-tag' effect="dark" v-show="timeTrackShow"> <span id='selection-tag-font'>传播途径</span> </el-tag>
          </div>
        </div>
        <!-- 事件概述 -->
        <div id='eventSummaryTitle' class='commonTitle'> <span class='commonTitle-font'><span class="el-icon-s-flag"></span> 事件概述 </span> </div>
        <div id='eventSummaryArea' class='common-chart' style="width: 1535px;">
          <div id='eventSummary-content'>
            <span id='eventSummary-content-font'> </span>
          </div>
        </div>
        <!-- 事件趋势 -->
        <div id='discussionTrendTitle' class='commonTitle' v-show="discussionTrendShow"> <span class='commonTitle-font'><span class="el-icon-s-flag"></span> 事件趋势 </span> </div>
        <div id='discussionTrendArea' class='common-chart' style="width: 1535px; height: 500px;" v-show="discussionTrendShow">
        </div>
        <!-- 事件等级统计 -->
        <div id='levelPieTitle' class='commonHalfTitle' v-show="levelPieShow"> <span class='commonTitle-font'><span class="el-icon-s-flag"></span> 事件等级 </span> </div>
        <div class='commonHalfTitle' v-show="!wordCloudShow"></div>
        <div id='wordCloudTitle' class='commonHalfTitle' v-show="wordCloudShow"> <span class='commonTitle-font'><span class="el-icon-s-flag"></span> 关键词云 </span> </div>
        <div class='commonHalfTitle' v-show="!levelPieShow"></div>
        <div id='levelPieArea' class='common-chart' style="width: 730px; height: 400px;" v-show="levelPieShow">
        </div>
        <!-- 关键词云 -->
        <div id='wordCloudArea' class='common-chart' style="width: 730px; height: 400px;" v-show="wordCloudShow">
        </div>
        <!-- 事件热点地图 -->
        <div id='mapHotTitle' class='commonTitle' v-show="mapHotShow"> <span class='commonTitle-font'><span class="el-icon-s-flag"></span> 热点地图 </span> </div>
        <div id='mapHotArea' class='common-chart' style="width: 1535px; height: 800px;" v-show="mapHotShow">
        </div>
        <!-- 事件意见领袖 -->
        <div id='popularTweeterTitle' class='commonTitle' v-show="popularTweeterShow"> <span class='commonTitle-font'><span class="el-icon-s-flag"></span> 意见领袖 </span> </div>
        <div id='popularTweeterArea' class='common-chart' style="width: 1535px; height: 600px;" v-show="popularTweeterShow">
          <el-card id='popularTweeter-card' :body-style="{ padding: '0px' }" shadow="hover" v-for="(item, index) in popularTweeterData" :key="index">
            <img id='popularTweeter-userHead' :src="tweeterHeadFiles[item.userName]" />
            <div id='popularTweeter-userText'>
              <span id='popularTweeter-userText-Font'> {{item.userName}} </span>
            </div>
            <div id='popularTweeter-time'>
              <span id='popularTweeter-tweetTime-Font'> {{item.time}} </span>
            </div>
            <div id='popularTweeter-tweetText'>
              <span id='popularTweeter-tweetText-Font'> {{item.text}} </span>
            </div>
            <div id='popularTweeter-tweetAction'>
              <span id='popularTweeter-tweetAction-Font'><i class='el-icon-chat-dot-square'></i> 回复({{item.tweetNums.replyNum}}) </span>
              <span id='popularTweeter-tweetAction-Font'><i class='el-icon-share'></i> 转发({{item.tweetNums.retweetNum}}) </span>
              <span id='popularTweeter-tweetAction-Font'><i class='el-icon-star-on'></i> 喜欢({{item.tweetNums.likeNum}}) </span>
            </div>
          </el-card>
        </div>
        <!-- 事件传播途径 -->
        <div id='timeTrackTitle' class='commonTitle' v-show="timeTrackShow"> <span class='commonTitle-font'><span class="el-icon-s-flag"></span> 传播途径 </span> </div>
        <div id='timeTrackArea' class='common-chart' style="width: 1535px;" v-show="timeTrackShow">
          <ul class="cbp_tmtimeline">
            <li v-for="(item, index) in timeTrackData" :key="index">
              <time class="cbp_tmtime">
                <span id='timeTrack-time'>{{item.time.ymd}}</span>
                <!-- <span id='timeTrack-time'>{{item.time.hm}}</span> -->
              </time>
              <div class="cbp_tmicon el-icon-s-promotion"></div>
              <el-card id='timeTrack-card' :body-style="{ padding: '0px' }" shadow="hover">
                <div id='timeTrack-tweetText'>
                  <span id='timeTrack-tweetText-Font'> {{item.time.hm}} [ {{item.userName}} ]： {{item.text}} </span>
                </div>
                <div id='timeTrack-tweetAction'>
                  <span id='timeTrack-tweetAction-Font'><i class='el-icon-chat-dot-square'></i> 回复({{item.tweetNums.replyNum}}) </span>
                  <span id='timeTrack-tweetAction-Font'><i class='el-icon-share'></i> 转发({{item.tweetNums.retweetNum}}) </span>
                  <span id='timeTrack-tweetAction-Font'><i class='el-icon-star-on'></i> 喜欢({{item.tweetNums.likeNum}}) </span>
                </div>
              </el-card>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 书签按钮 -->
    <div id='navigationTagArea'>
      <el-button id='eventSummaryTag' class='navigationTag' @click="pageNavigation('eventSummaryTag')"> <span id='navigationTag-font'>事件概述</span> </el-button>
      <el-button id='discussionTrendTag' class='navigationTag'
        @click="pageNavigation('discussionTrendTag')" v-show="discussionTrendShow"> <span id='navigationTag-font'>事件趋势</span> </el-button>
      <el-button id='levelPieTag' class='navigationTag'
        @click="pageNavigation('levelPieTag')" v-show="levelPieShow"> <span id='navigationTag-font'>等级统计</span> </el-button>
      <el-button id='wordCloudTag' class='navigationTag'
        @click="pageNavigation('wordCloudTag')" v-show="wordCloudShow"> <span id='navigationTag-font'>关键词云</span> </el-button>
      <el-button id='mapHotTag' class='navigationTag'
        @click="pageNavigation('mapHotTag')" v-show="mapHotShow"> <span id='navigationTag-font'>热点地图</span> </el-button>
      <el-button id='popularTweeterTag' class='navigationTag'
        @click="pageNavigation('popularTweeterTag')" v-show="popularTweeterShow"> <span id='navigationTag-font'>意见领袖</span> </el-button>
      <el-button id='timeTrackTag' class='navigationTag'
        @click="pageNavigation('timeTrackTag')" v-show="timeTrackShow"> <span id='navigationTag-font'>传播途径</span> </el-button>
    </div>
  </div>
</template>

<script>
import 'echarts/extension/bmap/bmap'
import {initMapHot} from '../util/baiduMapMethod.js'
const echarts = require('echarts')
require('echarts-wordcloud')

export default {
  name: 'EventVisible',
  data () {
    return {
      currentBtnName: '',
      wordCloudShow: false,
      mapHotShow: false,
      discussionTrendShow: false,
      levelPieShow: false,
      popularTweeterShow: false,
      timeTrackShow: false,
      tagDomIDList: ['eventSummaryTag', 'discussionTrendTag', 'levelPieTag', 'wordCloudTag', 'mapHotTag', 'popularTweeterTag', 'timeTrackTag'],
      tagDomObj: {},
      wordCloudData: [],
      mapAddressData: [], // 热点地图请求获得的原始数据
      mapCountryData: [], // 热点地图国家柱状图数据
      mapCountryYAxisData: [], // 热点地图 国家柱状图 国家名数据
      bmapChart: null,
      discussionTrendXAxisData: [],
      discussionTrendYAxisData: [],
      levelPieData: [],
      levelPieLegendData: [],
      popularTweeterData: [],
      headFilePrefix: '/static/userHeads/',
      tweeterHeadFiles: {},
      timeTrackData: []
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
    initWordCloudChart() {
      let myChart = echarts.init(document.getElementById('wordCloudArea'))
      let option = {
        // title: {
        //   text: '关键词云'
        // },
        tooltip: {
          show: true
        },
        series: [{
          type: 'wordCloud',
          gridSize: 10,
          // shape: 'circle',
          grid: {
            width: '2000',
            height: '1500'
          },
          sizeRange: [15, 75],
          rotationRange: [-45, 90],
          // shape: 'circle',
          textPadding: 0,
          // autoSize: {
          //   enable: true,
          //   minSize: 3
          // },
          textStyle: {
            normal: {
              color: function() {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              },
              fontWeight: 550
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: this.wordCloudData
        }]
      }
      myChart.setOption(option)
    },
    initMapHotChart() {
      let myChart = echarts.init(document.getElementById('mapHotArea'))
      let option = {
        title: [
          {
            text: '全球事件热点地区',
            left: 'center',
            textStyle: {
              color: '#000',
              fontSize: 24
            }
          },
          {
            show: true,
            text: '国家热度总值TOP10',
            right: '200',
            textStyle: {
              color: '#000',
              fontSize: 16
            }
          }],
        bmap: {
          // center: [39, 116],
          // zoom: 4,
          roam: true,
          mapStyle: {
            styleJson: [{
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'land',
              'elementType': 'all',
              'stylers': {
                'color': '#f3f3f3'
              }
            }, {
              'featureType': 'railway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'all',
              'stylers': {
                'color': '#fdfdfd'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'poi',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'green',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'subway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'local',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'labels',
              'stylers': {
                'visibility': 'off'
              }
            }, {
              'featureType': 'boundary',
              'elementType': 'all',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'building',
              'elementType': 'all',
              'stylers': {
                'color': '#d1d1d1'
              }
            }, {
              'featureType': 'label',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#999999'
              }
            }]
          }
        },
        visualMap: {
          dimension: 0,
          right: 10,
          top: 10,
          itemWidth: 12,
          min: 10,
          max: this.mapCountryData[this.mapCountryData.length - 1].value,
          text: ['High', 'Low'],
          textStyle: {
            color: '#000'
          },
          inRange: {
            color: ['purple', 'yellow', 'orangered', 'red']
          }
        },
        grid: {
          right: 80,
          top: 20,
          width: '500',
          height: '320'
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          },
          data: this.mapCountryYAxisData
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params, ticket, callback) {
            return params.data.name + '平均热度: ' + params.data.value[3]
          }
        },
        series: [
          {
            name: '地区热度',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: this.mapAddressData,
            symbolSize: function (val) {
              return val[2] / 4
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'purple'
              }
            }
          },
          {
            id: 'bar',
            type: 'bar',
            barMaxWidth: 20,
            barGap: 0,
            tooltip: {
              show: false
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: '#000'
                }
              }
            },
            data: this.mapCountryData
          }]
      }
      myChart.setOption(option)
      return myChart
    },
    initDiscussionTrendChart() {
      let myChart = echarts.init(document.getElementById('discussionTrendArea'))
      let option = {
        // title: {
        //   text: '事件讨论走势图'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.discussionTrendXAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [{
          // name:'邮件营销',
          type: 'line',
          // stack: '总量',
          areaStyle: {},
          data: this.discussionTrendYAxisData
        }]
      }
      myChart.setOption(option)
    },
    initLevelPieChart() {
      let myChart = echarts.init(document.getElementById('levelPieArea'))
      let option = {
        // title: {
        //   text: '事件等级统计'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: this.levelPieLegendData
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: this.levelPieData,
            label: {
              fontSize: 16
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    initPopularTweeterChart() {
      let myChart = echarts.init(document.getElementById('levelPieArea'))
      let option = {
        title: {
          text: '事件等级统计'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: this.levelPieLegendData
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: this.levelPieData,
            label: {
              fontSize: 16
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    // 控制按钮样式变化
    pageTagStyleChange(tagName) {
      if (this.currentBtnName !== null && this.currentBtnName !== '') {
        let curBtn = document.getElementById(this.currentBtnName)
        curBtn.style.backgroundColor = '#fff'
        curBtn.style.color = '#000'
      }
      let tagBtn = document.getElementById(tagName)
      tagBtn.style.backgroundColor = '#409EFF'
      tagBtn.style.color = '#fff'
      this.currentBtnName = tagName
    },
    pageNavigation(tagName) {
      this.pageTagStyleChange(tagName)
      // 跳转
      document.querySelector('#' + tagName.slice(0, tagName.length - 3) + 'Title').scrollIntoView()
    }
  },
  mounted () {
    // 设置加载动画
    const loading = this.$loading({
      lock: true,
      text: '正在加载图表数据',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    let that = this
    let pname = that.$store.state.eventAnalysisPname
    // alert(pname)
    that.$axios.post('getEventAnalysisFullData', {data: pname})
      .then((response) => {
        let data = response.data
        if (data.resCode === 1) {
          let fullResult = data.resObject
          // console.log(data.resObject)
          // 图表加载项信息
          let config = fullResult.config
          that.discussionTrendShow = config.discussionTrend
          that.levelPieShow = config.levelPie
          that.mapHotShow = config.mapHot
          that.popularTweeterShow = config.popularTweeter
          that.wordCloudShow = config.wordCloud
          that.timeTrackShow = config.timeTrack
          // 根据加载项，绘制图表
          // 事件概述
          let eventSummaryDom = document.getElementById('eventSummary-content-font')
          eventSummaryDom.innerText = fullResult.eventSummary
          // 关键词云
          if (that.wordCloudShow) {
            that.wordCloudData = fullResult.wordCloudData
            that.initWordCloudChart()
          }
          // 事件讨论走势
          if (that.discussionTrendShow) {
            that.discussionTrendXAxisData = fullResult.discussionTrendXAxisData
            that.discussionTrendYAxisData = fullResult.discussionTrendYAxisData
            that.initDiscussionTrendChart()
          }
          // 事件等级统计
          if (that.levelPieShow) {
            that.levelPieLegendData = fullResult.levelPieLegendData
            that.levelPieData = fullResult.levelPieData
            that.initLevelPieChart()
          }
          // 热点地图
          if (that.mapHotShow) {
            that.mapAddressData = fullResult.mapAddressData
            that.mapCountryData = fullResult.mapCountryData
            that.mapCountryYAxisData = fullResult.mapCountryYAxisData
            that.bmapChart = that.initMapHotChart()
          }
          // 意见领袖
          if (that.popularTweeterShow) {
            that.popularTweeterData = fullResult.popularTweeterData
            for (let i = 0; i < that.popularTweeterData.length; i++) {
              let tweeter = that.popularTweeterData[i]
              let userName = tweeter.userName
              that.tweeterHeadFiles[userName] = that.headFilePrefix + tweeter.headFile
            }
            console.log(that.tweeterHeadFiles)
          }
          // 传播途径
          if (that.timeTrackShow) {
            that.timeTrackData = fullResult.timeTrackData
          }
          loading.close()
          that.successMessage('加载事件分析结果数据成功！')
          // 地图设置
          initMapHot(that.bmapChart)
          // 添加滚动条监听事件
          let panelDom = document.getElementById('panel-area')
          panelDom.addEventListener('scroll', () => {
            let offsetTop = panelDom.scrollTop
            console.log(offsetTop)
            // 获取书签元素
            for (let i = 0; i < that.tagDomIDList.length; i++) {
              let tagId = that.tagDomIDList[i]
              if (!(tagId in that.tagDomObj)) {
                let newTagDom = document.getElementById(tagId)
                that.tagDomObj[tagId] = newTagDom
              }
            }
            // 计算已展示书签 对应的 title距离顶部的距离
            for (let i = 0; i < that.tagDomIDList.length; i++) {
              let tagId = that.tagDomIDList[i]
              let tagDom = that.tagDomObj[tagId]
              if (tagDom.style.display !== 'none') {
                let titleDom = document.getElementById(tagId.slice(0, tagId.length - 3) + 'Title')
                if (titleDom.getBoundingClientRect().top > 0) {
                  that.pageTagStyleChange(tagId)
                  break
                }
              }
            }
          }, false)
        } else {
          that.errorMessage(data.resStr)
          loading.close()
          that.$router.push('/main/MonitorProgram')
        }
      })
      .catch((e) => {
        console.log(e)
        loading.close()
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../static/style.css';
  #main {
    width: 100%;
    height: 100%;
    /* background: greenyellow; */
  }
  #panel-area {
    width: 1635px;
    height: 877px;
    margin: 0 auto 0 105px;
    overflow: hidden;
    overflow-y: scroll;
    float: left;
  }
  #selection-area {
    width: 1536px;
    height: 70px;
    line-height: 70px;
    margin: 20px auto 30px auto;
    border: 4px solid #4F9D9D;
    border-radius: 4px;
  }
  #selection-title-area {
    width: 200px;
    height: 70px;
    line-height: 70px;
    margin: 0 auto 0 240px;
    float: left;
    /* border: 1px solid #4F9D9D; */
  }
  #selection-tags-area {
    width: 700px;
    height: 70px;
    line-height: 70px;
    float: left;
    /* border: 1px solid #4F9D9D; */
  }
  #selection-title-font {
    font-size: 26px;
    font-weight: 600;
  }
  #selection-tag {
    height: 40px;
  }
  #selection-tag-font {
    font-size: 18px;
    font-weight: 500;
    display: inline-block;
    line-height: 40px;
  }
  .common-chart {
    margin: 0 30px 30px 30px;
    float: left;
    border: 1px #000 solid;
  }
  #popularTweeterArea {
    overflow: hidden;
    overflow-y: scroll;
  }
  #popularTweeter-card {
    width: 440px;
    /* min-height: 210px; */
    margin: 0 30px 35px 30px;
    background: #D2E9FF;
    border-radius: 20px;
    float: left;
  }
  #popularTweeter-userHead {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 10px 0 0 10px;
    float: left;
  }
  #popularTweeter-userText {
    width: 300px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    margin: 10px 0 0 10px;
    float: left;
    /* border: 1px solid #000 */
  }
  #popularTweeter-time {
    width: 300px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    margin: 0 0 0 10px;
    float: left;
    /* border: 1px solid #000 */
  }
  #popularTweeter-userText-Font {
    font-size: 18px;
    font-weight: 600;
    color: #000
  }
  #popularTweeter-userInfo-Font {
    font-size: 14px;
    font-weight: 400;
    color: #000
  }
  #popularTweeter-tweetText {
    width: 400px;
    min-height: 120px;
    line-height: 20px;
    margin: 10px 0 0 15px;
    text-align: left;
    float: left;
    /* border: 1px solid #000 */
  }
  #popularTweeter-tweetTime-Font {
    font-size: 14px;
    font-weight: 500;
    color: #000
  }
  #popularTweeter-tweetText-Font {
    font-size: 16px;
    font-weight: 400;
    color: #5B5B5B
  }
  #popularTweeter-tweetAction {
    width: 400px;
    height: 30px;
    line-height: 30px;
    margin: 5px 0 5px 15px;
    float: left;
    /* border: 1px solid #000 */
  }
  #popularTweeter-tweetAction-Font {
    font-size: 16px;
  }
  .commonTitle {
    width: 1535px;
    height: 50px;
    margin: 0 0 0 30px;
    float: left;
    text-align: left;
    line-height: 50px;
    /* border: 1px solid #000 */
  }
  .commonHalfTitle {
    width: 760px;
    height: 50px;
    margin: 0 0 0 30px;
    float: left;
    text-align: left;
    line-height: 50px;
    /* border: 1px solid #000 */
  }
  .commonTitle-font {
    font-size: 26px;
    font-weight: 600;
  }
  #eventSummary-content {
    width: 1520px;
    /* height: 160px; */
    margin: 0 auto 20px auto;
    line-height: 30px;
    text-align: left;
    /* border: 1px solid #000 */
  }
  #eventSummary-content-font {
    font-size: 16px;
    font-weight: 500;
  }
  #timeTrack-card {
    width: 1000px;
    /* height: 170px; */
    margin: 0 0 15px 25%;
    background: #D2E9FF;
    border-radius: 20px;
  }
  #timeTrack-userHead {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px 0 0 10px;
    float: left;
  }
  #timeTrack-userText {
    width: 850px;
    height: 50px;
    line-height: 50px;
    margin: 10px 0 0 20px;
    text-align: left;
    float: left;
    /* border: 1px solid #000 */
  }
  /* #timeTrack-userTime {
    width: 250px;
    height: 20px;
    line-height: 20px;
    margin: 0 0 0 10px;
    text-align: left;
    float: left;
    border: 1px solid #000
  } */
  #timeTrack-userText-Font {
    font-size: 18px;
    font-weight: 600;
    color: #000
  }
  /* #timeTrack-time-Font {
    font-size: 14px;
    font-weight: 400;
    color: #000
  } */
  #timeTrack-tweetText {
    width: 970px;
    /* height: 60px; */
    line-height: 20px;
    margin: 10px 0 0 15px;
    text-align: left;
    float: left;
    /* border: 1px solid #000 */
  }
  #timeTrack-tweetText-Font {
    font-size: 16px;
    font-weight: 400;
    color: #5B5B5B
  }
  #timeTrack-tweetAction {
    width: 970px;
    height: 30px;
    line-height: 30px;
    margin: 10px 0 10px 15px;
    float: left;
    /* border: 1px solid #000 */
  }
  #timeTrack-tweetAction-Font {
    font-size: 16px;
  }
  #navigationTagArea {
    position: absolute;
    top: 50px;
    left: 177px;
    width: 90px;
    /* border: #000 solid 1px; */
  }
  .navigationTag {
    width: 90px;
    margin: 0 0 15px 0;
    padding: 10px 5px 10px 5px;
  }
  #navigationTag-font {
    font-size: 16px;
  }
  #areaTag {
    font-size: 16px;
    margin: 0 0 15px 0;
  }
</style>
