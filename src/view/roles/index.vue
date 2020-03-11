<template>
  <div>
    <i-row :gutter="10">
      <i-col span="5" :sm="24" :md="24" :lg="5">
        <Card :dis-hover="true" :shadow="true">
          <!-- <Tree :data="roles"></Tree> -->
          <p slot="title">
            <Icon type="md-contacts"></Icon>角色列表
          </p>
          <a slot="extra" @click.prevent="addRole()" v-if="!isEdit">
            <Icon type="md-add"></Icon>新增
          </a>
          <ul class="imooc-card">
            <li
              v-for="(item,index) in roles"
              :key="'roles' + index"
              class="flex"
              :class="{'selected': roleIndex === index}"
              @click="selectRole(index)"
            >
              <div class="flex1 round">{{ item.title }}</div>
              <span>
                <Icon type="md-build" size="22" color="#2d8cf0" @click.stop="editRole(item,index)"></Icon>
                <Icon type="md-trash" size="22" color="#ed4014"></Icon>
              </span>
            </li>
          </ul>
        </Card>
      </i-col>
      <i-col span="6" :sm="24" :md="8" :lg="6">
        <Card :dis-hover="true" :shadow="true" title="菜单权限" icon="md-menu">
          <div href="#" slot="extra">
            <ButtonGroup class="imooc-btn-group" v-if="isEdit">
              <Button size="small" icon="ios-create" type="primary" @click="submit()">确定</Button>
              <Button size="small" icon="md-trash" @click="cancel()">取消</Button>
            </ButtonGroup>
          </div>
          <Tree :data="menuData" show-checkbox></Tree>
        </Card>
      </i-col>
      <i-col span="13" :sm="24" :md="16" :lg="13">
        <Card :title="$t('resources')" icon="md-exit" :dis-hover="true" :shadow="true">
          <OperationsTable
            :columns="columns"
            :tableData="tableData"
            :isEdit="isEdit"
            @on-change="handleTableChange"
          ></OperationsTable>
        </Card>
      </i-col>
    </i-row>
    <Modal v-model="showAdd" title="添加角色" @on-ok="modelSubmit()" @on-cancel="modelCancel()">
      <Form :model="formItem" :label-width="80" :rules="formRules">
        <FormItem label="角色名称" prop="name">
          <Input v-model="formItem.name" placeholder="请输入角色名称"></Input>
        </FormItem>
        <FormItem label="角色编码" prop="role">
          <Input v-model="formItem.role" placeholder="请输入角色编码"></Input>
        </FormItem>
        <FormItem label="角色描述">
          <Input v-model="formItem.desc" placeholder="请输入角色描述"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import OperationsTable from './operations.vue'
export default {
  components: {
    OperationsTable
  },
  data () {
    return {
      isEdit: false,
      showAdd: false,
      roles: [
        {
          title: 'parent 1'
        },
        {
          title: 'parent 2'
        },
        {
          title: 'parent 3'
        },
        {
          title: 'parent 4'
        },
        {
          title: 'parent 5'
        }
      ],
      roleIndex: '',
      formItem: {
        name: '',
        desc: ''
      },
      formRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        role: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
      },
      menuData: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ],
      selectNode: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          hidden: true
        },
        {
          title: '资源名称',
          key: 'name',
          search: {
            type: 'input'
          },
          align: 'center'
        },
        {
          title: '资源路径',
          key: 'path',
          search: {
            type: 'input'
          },
          align: 'center'
        },
        {
          title: '请求类型',
          key: 'method',
          search: {
            type: 'input'
          },
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.method.toUpperCase())
          }
        },
        {
          title: '资源类型',
          key: 'type',
          search: {
            type: 'radio',
            options: [
              {
                key: '全部',
                value: ''
              },
              {
                key: '接口',
                value: 'api'
              },
              {
                key: '按钮',
                value: 'btn'
              }
            ]
          },
          align: 'center'
        },
        {
          title: '资源描述',
          key: 'regmark',
          search: {
            type: 'input'
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    addRole () {
      this.showAdd = true
    },
    selectRole (value) {
      if (this.roleIndex === '' || this.roleIndex !== value) {
        this.roleIndex = value
      } else {
        this.roleIndex = ''
      }
    },
    editRole (item, index) {
      this.isEdit = true
      this.roleIndex = index
    },
    submit () {
      this.isEdit = false
    },
    cancel () {
      this.isEdit = false
    },
    modelSubmit () {},
    modelCacnel () {},
    handleTreeChange (item) {
      if (item.length === 0) {
        return
      }
      // 非编辑状态
      if (!this.isEdit) {
        this.selectNode = item
        if (item[0].operations && item[0].operations.length > 0) {
          this.tableData = [...item[0].operations]
        }
      } else {
        this.$Message.error('当前为编辑状态，请取消编辑后查看！')
      }
    },
    handleTableChange (table) {
      this.tableData = table
    }
  }
}
</script>

<style lang="scss" scoped>
.imooc-card {
  li {
    list-style: none;
    line-height: 24px;
  }
  span {
    display: none;
    // float: right;
    i:first-child {
      margin-right: 7px;
    }
  }
  // selected #d5e8fc
  // hover #eaf4fe
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row nowrap;
    &:hover {
      span {
        display: block;
      }
      .flex1 {
        background-color: #eaf4fe;
      }
    }
    &.flex1 {
      flex: 1;
    }
    &.selected {
      .flex1 {
        background-color: #d5e8fc;
      }
    }
  }
  .round {
    padding: 1px 2px;
    border-radius: 3px;
  }
}
</style>
