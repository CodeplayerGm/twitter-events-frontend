<template>
  <div id='main'>
    <!-- 表格面板 -->
    <el-tabs type="border-card" id='panel-area'>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-platform"></i> 我的方案</span>
        <div id='search-bar'>
          <el-select v-model="searchId"
            placeholder="请选择查询条件" style="width: 120px">
            <el-option label="方案名" value='1'></el-option>
            <el-option label="关键词" value='2'></el-option>
            <el-option label="过滤词" value='3'></el-option>
            <el-option label="话题" value='4'></el-option>
            <el-option label="状态" value='5'></el-option>
          </el-select>
          <el-input placeholder="请输入内容" v-model="searchContent"
            style="width: 500px">
          </el-input>
          <el-button icon="el-icon-search" type='primary'
            v-on:click="doSearchProgram" style="width: 90px">查询</el-button>
          <el-button icon="el-icon-plus" type='success'
            v-on:click="addProgram" style="width: 120px; margin-left: 0px">添加方案</el-button>
        </div>
        <el-table ref="testTable" :data="programData"
          style="width:1350px; margin:15px auto 25px auto"
          border
          :default-sort = "{prop: 'id', order: 'ascending'}">
          <el-table-column prop="id" label="Id" width="60px" align="center"
            sortable>
          </el-table-column>
          <el-table-column prop="pname" label="方案名" width="120px" align="center"
            sortable show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="stime" label="起始时间" width="120px" align="center"
            sortable show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="etime" label="结束时间" width="120px" align="center"
            sortable>
          </el-table-column>
          <el-table-column prop="keywords" label="关键词组" width="220px" align="center">
          </el-table-column>
          <el-table-column prop="ignorewords" label="过滤词" width="220px" align="center">
          </el-table-column>
          <el-table-column prop="topics" label="话题" width="220px" align="center">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100px" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div>
                <el-button size="small" type="success" id='program-operate-btn'
                  @click="getDetail(scope.$index, scope.row)">查看</el-button>
                <el-button size="small" type="warning" id='program-operate-btn'
                  @click="editProgram(scope.$index, scope.row)">编辑</el-button>
              </div>
              <div>
                <el-button size="small" type="primary" id='program-operate-btn'
                  @click="startProgram(scope.$index, scope.row)">启动</el-button>
                <el-button size="small" type="danger" id='program-operate-btn'
                  @click="deleteProgram(scope.$index, scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div align="center" style="margin-bottom: 25px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2,3,4,5,6,7,8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'MonitorProgram',
  data () {
    return {
      programData: [],
      pageSize: 5,
      currentPage: 1,
      totalCount: 0,
      searchId: '1',
      searchContent: ''
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
    doSearchProgram () {
      alert('no search')
    },
    addProgram () {
      // alert('no add')
      this.$router.push('/main/AddProgram')
    },
    searchDetail (index, row) {
      alert('no detail')
    },
    editProgram (index, row) {
      alert('no edit')
    },
    deleteProgram (index, row) {
      this.$confirm('确认要删除方案：' + row.pname + ' 吗?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '手滑了',
        type: 'warning'
      }).then(() => {
        let that = this
        let params = {
          data: row.pname
        }
        that.$axios.post('/deleteProgram', params)
          .then((response) => {
            let data = response.data
            console.log(data)
            if (data.resCode === 0) {
              that.errorMessage(data.resStr)
            } else if (data.resCode === 1) {
              that.successMessage(data.resStr)
              that.doSearchProgram()
            }
          })
          .catch((e) => {
            console.log(e)
          })
      }).catch(() => {
      })
    },
    startProgram (index, row) {
      let pname = row.pname
      this.$confirm('确认要启动方案：' + pname + '吗? 方案爬取推文数据的过程可能会花费较长时间。', '提示', {
        confirmButtonText: '启动',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        let that = this
        let params = {
          data: row.pname
        }
        that.$axios.post('/startProgram', params)
          .then((response) => {
            let data = response.data
            console.log(data)
            // if (data.resCode === 0) {
            //   that.errorMessage(data.resStr)
            // } else if (data.resCode === 1) {
            //   that.successMessage(data.resStr)
            //   that.doSearchProgram()
            // }
          })
          .catch((e) => {
            console.log(e)
          })
      }).catch(() => {
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.doSearchProgram()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.doSearchProgram()
    }
  },
  mounted () {
    let that = this
    that.$axios.get('getAllPrograms')
      .then((response) => {
        let data = response.data
        if (data.resCode === 1) {
          that.successMessage(data.resStr)
          that.programData = data.resList
          that.totalCount = data.resList.length
        } else if (data.resCode === 0) {
          that.errorMessage(data.resStr)
        }
        // console.log(data)
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
    width: 1500px;
    height: 800px;
    margin: 50px auto 0 120px;
    overflow: hidden;
    overflow-y: scroll;
    float: left;
  }
  #search-bar {
    width: 950px;
    margin: 15px auto 15px auto;
  }
  #program-operate-line {
    height: 50px;
    text-align: center;
  }
  #program-operate-btn {
    margin-bottom: 5px;
    margin-left: 5px;
  }
</style>
