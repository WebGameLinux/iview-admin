<template>
  <div>
    <Card>
      <tables
        ref="tables"
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        @on-row-edit="handleRowEdit"
        @on-row-remove="handleRowRemove"
      />
      <Row type="flex" justify="space-between" align="middle">
        <Col class="ctrls">
          <Button @click="handleSelectAll(true)">批量全选</Button>
          <Button @click="handleSelectAll(false)">取消全选</Button>
          <Button style="margin: 10px 0;" type="primary" @click="exportExcel">
            <Icon type="md-download"></Icon>导出表格
          </Button>
        </Col>
        <Col>
          <Page
            :total="total"
            :current="page"
            :page-size="limit"
            :page-size-opts="pageArr"
            show-elevator
            show-sizer
            show-total
            @on-change="onPageChange"
            @on-page-size-change="onPageSizeChange"
          />
        </Col>
      </Row>
    </Card>
    <EditModel
      :isShow="showEdit"
      :item="currentItem"
      @editEvent="handleItemEdit"
      @changeEvent="handleChangeEvent"
    ></EditModel>
  </div>
</template>

<script>
import { getUserList, updateUserById, deleteUserById } from '@/api/admin'
import Tables from '_c/tables'
import EditModel from './edit'
import dayjs from 'dayjs'
export default {
  name: 'user_management',
  components: {
    Tables,
    EditModel
  },
  data () {
    return {
      page: 1,
      limit: 10,
      total: 0,
      showEdit: false,
      currentIndex: 0,
      currentItem: {},
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户昵称',
          key: 'name',
          minWidth: 140
        },
        {
          title: '登录名',
          key: 'username',
          minWidth: 160
        },
        {
          title: '角色',
          key: 'roles',
          align: 'center',
          minWidth: 160,
          render: (h, params) => {
            return h('div', [h('span', params.row.roles.join(','))])
          }
        },
        {
          title: '积分',
          key: 'favs',
          align: 'center',
          minWidth: 80
        },
        {
          title: '是否禁用',
          key: 'status',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h('div', [
              h('span', params.row.status === '0' ? '否' : '是')
            ])
          }
        },
        {
          title: '是否是VIP',
          key: 'isVip',
          align: 'center',
          minWidth: 120,
          render: (h, params) => {
            return h('div', [h('span', params.row.isVip === '0' ? '否' : '是')])
          }
        },
        {
          title: '创建时间',
          key: 'created',
          align: 'center',
          minWidth: 180,
          render: (h, params) => {
            return h('div', [
              h('span', dayjs(params.row.created).format('YYYY-MM-DD hh:mm:ss'))
            ])
          }
        },
        {
          title: '设置',
          key: 'settings',
          slot: 'action',
          fixed: 'right',
          width: 100,
          align: 'center'
        }
      ],
      pageArr: [10, 20, 30, 50, 100],
      tableData: []
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    handleChangeEvent (value) {
      this.showEdit = value
    },
    handleItemEdit (item) {
      updateUserById(item).then((res) => {
        if (res.code === 200) {
          console.log('更新成功')
          // this.tableData[this.currentIndex] = item
          this.tableData.splice(this.currentIndex, 1, item)
        }
      })
      this.showEdit = false
    },
    handleRowEdit (row, index) {
      this.showEdit = true
      this.currentIndex = index
      this.currentItem = { ...row }
    },
    handleRowRemove (row, index) {
      this.$Modal.confirm({
        title: '确定删除用户吗？',
        content: `删除${row.name}的用户`,
        onOk: () => {
          deleteUserById(row._id).then((res) => {
            this.tableData.splice(index, 1)
            this.$Message.success('删除成功！')
          })
        },
        onCancel: () => {
          this.$Message.info('取消操作！')
        }
      })
    },
    onPageChange (page) {
      this.page = page
    },
    onPageSizeChange (size) {
      this.limit = size
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    _getList () {
      getUserList({ page: this.page - 1, limit: this.limit }).then((res) => {
        this.tableData = res.data
        this.total = res.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ctrls {
  button {
    margin-right: 10px;
  }
}
</style>
