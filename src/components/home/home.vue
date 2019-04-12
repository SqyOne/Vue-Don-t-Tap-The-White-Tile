<template>
  <div class="home">
    <div class="header">
      <h1 class="title">Don't Tap The White Tile</h1>
      <span class="preScore">上次分数：{{preScore}}</span>
      <span class="maxScore">历史最高分：{{maxScore}}</span>
    </div>
    <div class="start">
      <button class="startGame" @click="gameStart">
        <router-link to="/game">开始游戏</router-link></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      preScore: 0,
      maxScore: 0
    }
  },
  methods: {
    gameStart () {
      console.log('开始游戏')
    }
  }
}
</script>

<style lang="stylus">
.home
  .header
    width 100%
    .title
      height 10px
      text-align center
      line-height 10px
      font-size 20px
      margin-top 30px
    .preScore, .maxScore
      display block
      height 10px
      text-align center
      line-height 10px
      font-size 15px
    .preScore
      margin-top 50px
    .maxScore
      margin-top 20px
  .start
    width 100%
    text-decoration none
    .startGame
      display block
      width 80%
      height 30px
      margin 80px auto
      border-radius 40%
      background #ef9ea0
      text-decoration none
</style>
