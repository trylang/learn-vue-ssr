<template>
    <!-- app.vue 的template标签内只能有一个节点 -->
    <div id="app">
        <div id="cover"></div>
        <div id="loading" v-show="loading">
          <loading />
        </div>
        <APP-header></APP-header>
        <h1 style="color: #fff;">{{fullName}} || {{counter}}</h1>
        <!-- <router-link to="app">app</router-link>
        <router-link to="login">login</router-link> -->
        <transition name="fade">
          <router-view/>
        </transition>
        <!-- <APP-todo></APP-todo> -->
        <!-- <notification content="test notify" /> -->
        <button @click="notify">点击试试</button>
        <APP-footer></APP-footer>
    </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
// 引入header.vue组件
import APPHeader from './layout/header.vue'

// 引入footer.jsx组件
import APPFooter from './layout/footer.jsx'

import Loading from './components/loading/loading.vue'

// 引入todo.vue组件
// import APPTodo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: 'Jane\'s app'
  },
  // 声明组件，之后便可以使用组件标签
  components: {
    APPHeader,
    APPFooter,
    Loading
    // APPTodo
  },
  mounted () {
    // console.log(this.$store)
    // this.updateCountAsync({num: 5, time: 1000})
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
  },
  computed: {
    ...mapState({
      // counter: 'count'
      loading: (state) => state.loading,
      counter: (state) => state.count + 21
    }),
    ...mapGetters(['fullName'])
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    ...mapMutations(['updateCount']),
    ...mapActions(['updateCountAsync']),
    notify () {
      this.$notify({
        content: 'test $notify haha',
        btn: 'close',
        autoClose: 5000
      })
    }
  }
}
</script>

<!-- 设置scoped 表示当前组件下的id只在当前组件起作用，不会跟其他组件引起冲突 -->
<style lang="stylus" scoped>
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }

    #cover {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #555
        opacity 0.5
        z-index -1
    }
    #loading{
      position fixed
      top 0
      right 0
      bottom 0
      left 0
      background-color rgba(255,255,255,.3)
      z-index 99
      display flex
      align-items center
      justify-content center
    }

</style>
