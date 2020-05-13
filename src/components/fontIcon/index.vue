<template>
    <i class="iconfont"
    :class="fontClass"
    ></i>
</template>

<script>
  export default {
    name: "fontIcon",
    props:{
      iconName:{
        type:String,
        required:true
      },
      addClass:{
        type:String,
      }
    },
    computed:{
      fontClass() {
        return `${this.iconName} ${this.addClass}`
      }
    }
  };
</script>

<style scoped lang="scss">

</style>