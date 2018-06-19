// 通过方法调用的扩展notification组件
import Notification from './notification.vue'

export default {
  extends: Notification,
  computed: {
    style () { // 用来覆盖原来的style
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  beforeDestroy () {
    this.clearTimer()
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      // debugger // eslint-diable-line
      // 动画完成之后才能获得元素高度
      this.height = this.$el.offsetHeight
    }
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false // 继承组件里要默认visible为false不显示，在$notify中改变成true。如此才会触发transition组件中after-enter事件，从而计算高度
    }
  }
}
