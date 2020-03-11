<template>
  <div>
    <tables
      ref="tables"
      :columns="columns"
      v-model="localData"
      @on-row-edit="handleRowEdit"
      @on-row-remove="handleRowRemove"
      @on-selection-change="handleSelect"
      @searchEvent="handleSearch"
    >
      <template v-slot:table-header>
        <Button @click="handleAdd" class="search-btn" type="primary" v-if="isEdit">
          <Icon type="md-person-add" />&nbsp;&nbsp;添加
        </Button>
      </template>
    </tables>
    <Row type="flex" justify="space-between" align="middle">
      <Col>
        <Page
          v-if="total.length > 0"
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
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Tables
  },
  data () {
    return {
      showModel: false,
      showEdit: false,
      showSet: false,
      page: 1,
      limit: 10,
      total: 0,
      pageArr: [10, 20, 30, 50, 100],
      selectItem: {},
      selection: [],
      current: 0,
      localData: []
    }
  },
  watch: {
    localData () {
      this.$emit('on-change', this.localData)
    },
    tableData (newval, oldval) {
      this.localData = newval
    }
  },
  methods: {
    handleRowEdit (item, index) {
      if (!this.isEdit) {
        this.$Message.error('非编辑状态，无法进行修改！')
        return
      }
      this.selectItem = item
      this.current = index
      this.showEdit = true
      this.showModel = true
    },
    handleRowRemove (row, index) {
      if (!this.isEdit) {
        this.$Message.error('非编辑状态，无法进行删除！')
        return
      }
      this.$Modal.confirm({
        title: '确定删除吗？',
        content: `删除${row.name}的名称，请求路径${row.path}资源？`,
        onOk: () => {
          this.localData.splice(index, 1)
        },
        onCancel: () => {
          this.$Message.info('取消操作！')
        }
      })
    },
    handleSelect (selection) {
      this.selection = selection
    },
    handleSearch () {},
    onPageChange (page) {
      this.page = page
    },
    onPageSizeChange (size) {
      this.limit = size
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
