<template>
  <footer class="footer" v-once>Copyright &copy; {{getYear}}</footer>
</template>
<script type="text/javascript">
  export default {
    computed: {
      getYear(){
        return new Date().getFullYear()
      }
    }
  }
</script>
<style lang="scss" scoped>
.footer {
  text-align: center;
}
</style>

