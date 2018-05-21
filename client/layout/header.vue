<template>
    <header :class="$style['main-header']">
        <h1>TodoAPP</h1>
    </header>
</template>
<script>
export default {
  name: '',
  mounted () {
    console.log(this.$style)
  }
}
</script>

<style lang="stylus" module>
    .main-header {
        text-align center
        h1 {
            font-size 100px
            color rgba(175, 47, 47, 0.4)
            margin 20px
        }

    }


</style>