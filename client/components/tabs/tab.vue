<script>
  export default {
    name: 'Tab',
    props: {
      index: {
        type: [String, Number],
        required: true
      },
      label: {
        type: String,
        default: 'tab'
      }
    },
    mounted () {
      this.$parent.panes.push(this)
    },
    // inject: ['value'],
    computed: {
      active () {
        return this.$parent.value === this.index
        // return this.value === this.index 引入provide和inject时，如此调用
      }
    },
    render () {
      const tab = this.$slots.label || <span>{this.label}</span>
      const classNames = {
        tab: true,
        active: this.active
      }
      return (
        <li class={classNames} on-click={this.handleClick}>
          {tab}
        </li>
      )
    },
    methods: {
      handleClick () {
        this.$parent.onChange(this.index)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.tab
  list-style none
  line-height 40px
  margin-right 30px
  position relative
  bottom -2px
  cursor pointer
  &.active
    border-bottom 2px solid blue
  &:last-child
    margin-right 0
</style>