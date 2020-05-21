<template>
  <div>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'HelloWorld!'
    }
  }
}
</script>

<style scoped> /* 加上scoped,限制样式只对当前组件有效 */
h2 {
  color: blue;
}
</style>