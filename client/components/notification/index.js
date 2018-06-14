import Notification from './notification.vue'

// 创建notification的扩展组件，是方便在其他使用此组件时使用template去书写
// 如此，既可以复用原来基础代码，又可以加以扩展

export default (Vue) => {
  Vue.component(Notification.name, Notification)
}
