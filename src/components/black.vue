<template>

</template>

<script>
    export default {
        name: "black",
      beforeCreate () {
          this.$router.push(`/play/${this.$route.params.id}`)
      }
    }
</script>

<style scoped>

</style>
