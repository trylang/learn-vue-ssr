<script>
  export default {
    // 建立这个组件是因为slot，我们无法监听watch，tab内容如果有需要监听内容时，vue内部实现总是会慢一拍，
    // 如果将tab内部slot部分的内容抽离成单独组件，vue就会监听到，做到实时更新数据。
    props: {
      panes: {
        type: Array,
        required: true
      }
    },
    render () {
      const content = this.panes.map(pane => {
        return pane.active ? pane.$slots.default : null
      })
      return (
        <div class="tab-content">
          {content}
        </div>
      )
    }
  }
</script>