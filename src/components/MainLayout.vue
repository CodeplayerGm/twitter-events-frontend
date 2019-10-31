<template>
  <div id='main'>
    <div id='header'>
      <div id='header-caption'>
        <b id='header-caption-font'> 舆情监测 </b>
      </div>
      <el-button type="success" icon="el-icon-menu" id='header-toggle-btn' @click="shiftLeftSide"></el-button>
    </div>
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="el-menu-vertical-demo"
      :collapse="isCollapse" :collapse-transition="isCollapseTransition" :router="isRouter">
      <div style="height: 20px">
      </div>
      <el-menu-item index="1" id='menuItem'>
        <i class="el-icon-s-home"></i>
        <span slot="title">总览</span>
      </el-menu-item>
      <el-menu-item index="MonitorProgram" id='menuItem'>
        <i class="el-icon-location"></i>
        <span slot="title">监控方案</span>
      </el-menu-item>
      <el-menu-item index="3" id='menuItem'>
        <i class="el-icon-menu"></i>
        <span slot="title">事件分析</span>
      </el-menu-item>
      <el-menu-item index="4"  id='menuItem'>
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
    <div id='content'>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      isCollapse: false,
      isCollapseTransition: false,
      isRouter: true
    }
  },
  methods: {
    shiftLeftSide() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        document.getElementById('header-caption').style.width = '50px'
        // document.getElementById('content').style.width =
        //   (parseInt(document.getElementById('content').style.width.slice(0, -2)) + 150) + 'px'
        // alert(document.getElementById('content').style.width)
      } else {
        document.getElementById('header-caption').style.width = '200px'
        // document.getElementById('content').style.width =
        //   (parseInt(document.getElementById('content').style.width.slice(0, -2)) - 150) + 'px'
        // alert(document.getElementById('content').style.width)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main {
    width: 100%;
    min-width: 1200px;
    height: 930px;
    margin: 0 auto;
    /*background-image: url("../../assets/userBack.jpg");
    background-size: 100% 100%;*/
  }
  #header {
    width: 100%;
    height: 50px;
    margin: 0 auto;
    background:#4F9D9D;
  }
  #header-caption {
    width: 200px;
    height: 50px;
    line-height: 50px;
    float: left;
  }
  #header-caption-font {
    font-family:Microsoft YaHei;
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
  #header-toggle-btn {
    width: 60px;
    height: 50px;
    font-size: 20px;
    border: 0px;
    background:#4F9D9D;
    float: left;
  }
  #header-toggle-btn:hover {
    background:#336666;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 880px;
    margin: 0 auto;
    background:#E0E0E0;
    float: left;
  }
  .el-menu-vertical-demo {
    width: 50px;
    min-height: 880px;
    float: left;
  }
  #menuItem {
    height: 50px;
    text-align: left;
    margin: 0 0 0 0;
  }
  #content {
    width: 100%;
    height: 880px;
    background:#D1E9E9;
  }
</style>
