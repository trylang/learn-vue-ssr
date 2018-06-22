<template>
    <section class="real-app">
        <div class="tab-container">
          <tabs :value="filter" @tabChange="handleChangeTab">
            <tab :label="tab" :key="tab" :index="tab" v-for="tab in states"></tab>
            <!-- <tab label="tab1" index="1">
              <p>tab content 11</p>
            </tab>
            <tab index="2">
              <span slot="label" style="color: red;">tab2</span>
              <p>tab content 22</p>
            </tab>
            <tab label="tab3" index="3">
              <p>tab content 33</p>
            </tab> -->
          </tabs>
        </div>       
        <input type="text"
               class="add-input"
               autofocus="autofocus"
               placeholder="接下来要做什么?"
               @keyup.enter="handleAdd"
        >

        <!-- 使用items组件 -->
        <!-- :todo="todo" 往子组件item.vue 传入todo对象
             v-for="todo in filteredTodos" 遍历 todos 数组
             @del="deleteTodo" 接收子组件要触发的del方法
        -->
        <APP-item :todo="todo"
                  v-for="todo in filteredTodos"
                  :key="todo.id"
                  @del="deleteTodo"
                  @toggle="toggleTodoState"
        >
        </APP-item>
        <!--
            用 key 管理可复用的元素
            Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
            这么做除了使 Vue 变得非常快之外，还有其它一些好处。
        -->


        <!-- 使用tabs组件 -->
        <APP-tabs :filter="filter"
                  :todos="todos"
                  @clearAllCompleted="clearAllCompleted"
        >
        </APP-tabs>
    </section>
</template>

<script>
import APPItem from './items.vue'
import APPTabs from './tabs.vue'
import { mapState, mapActions } from 'vuex'

export default {
  metaInfo: {
    title: 'Jane\'s app'
  },
  // data() 声明数据
  data () {
    return {
      states: ['all', 'active', 'completed'],
      filter: 'all'
    }
  },
  mounted () {
    this.fetchTodos()
  },
  asyncData ({store}) { // 自定义函数，vue默认是不会执行的。用于服务端渲染时调用
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('fafafafafa')
    //   }, 1000)
    // })
    return store.dispatch('fetchTodos')
    // if (store.state) {
    //   console.log('store.dispatch', store.dispatch('fetchTodos'))
    //   return store.dispatch('fetchTodos')
    // }
  },
  // 计算
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'

      // 将todos数组中，completed为true的值过滤出来，并返回一个新数组
      return this.todos.filter(todo => completed === todo.completed)
    }
  },

  // 组件
  components: {
    APPItem,
    APPTabs
  },
  // 方法
  methods: {
    ...mapActions(['fetchTodos', 'addTodo', 'deleteTodo', 'updataTodo', 'deleteAllCompleted']),
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入要做的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    toggleTodoState (todo) {
      this.updataTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {completed: !todo.completed})
      })
    },
    // deleteTodo (id) {
    //   this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    // },
    // toggleFilter (state) {
    //   this.filter = state
    // },
    clearAllCompleted () {
      console.log(222)
      // 给todos赋一个新的值（即todo.completed为false的值）
      // this.todos = this.todos.filter(todo => todo.completed === false)
      this.deleteAllCompleted()
    },
    handleChangeTab (value) {
      this.filter = value
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
.tab-container {
  background-color #fff
  padding 0 15px
}
</style>
