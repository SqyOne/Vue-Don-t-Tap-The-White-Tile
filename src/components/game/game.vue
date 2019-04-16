<template>
  <div class="game">
    <div class="time-score">
      <span class="time">剩余时间：{{remainingTime}}</span>
      <span class="score">分数：{{score}}</span>
    </div>
    <table class="tile">
      <tr class="row" v-for="(row, index) in rows" :key="index">
        <td class="column" v-for="column in columns" :key="column.id">
          <div class="box black" v-show="row === column" @touchend="right(index, column)"></div>
          <div class="box white" v-show="row !== column" @touchend="fail"></div>
        </td>
      </tr>
    </table>
    <transition name="gameOver">
      <div class="gameOver" v-show="gameOverShow">
        <div class="title">
          <h1 class="end">游戏结束</h1>
        </div>
        <div class="score">
          <span class="preScore">本次得分：{{preScore}}</span>
          <span class="maxScore">历史最高分：{{maxScore}}</span>
        </div>
        <div class="choose">
          <span class="again" @click="again">再来一局</span>
          <div class="exit" @click="exit">退出</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import {urlParse} from '../../common/js/util'

const time = 60
export default {
  name: 'game',
  data () {
    return {
      remainingTime: time,
      score: 0,
      preScore: 0,
      maxScore: 0,
      gaming: false,
      countdown: null,
      black: 0,
      rows: [],
      rowLength: 4,
      columns: [1, 2, 3],
      gameOverShow: false,
      id: (() => {
        let queryParam = urlParse()
        return queryParam.id
      })()
    }
  },
  created () {
    for (let i = 0; i < this.rowLength; i++) {
      let black = Math.floor(Math.random() * this.columns.length + 1)
      // console.log(black)
      this.rows.push(black)
    }
  },
  methods: {
    startGame () {
      this.gaming = true
      this.score = 0
      this.countdown = window.setInterval(() => {
        this.remainingTime -= 1
        if (this.remainingTime <= 0) {
          window.clearInterval(this.countdown)
        }
      }, 1000)
    },
    gameEnd () {
      window.clearInterval(this.countdown)
      this.gaming = false
      this.gameOverShow = true
    },
    right (rowIndex, column) {
      if ((rowIndex + 1) !== this.rows.length) {
        return
      }
      if (!this.gaming) {
        this.startGame()
      }
      this.score += 1
      this.black = Math.floor(Math.random() * this.columns.length + 1)
      this.rows.unshift(this.black)
      this.rows.pop()
    },
    fail () {
      this.gameEnd()
      this.preScore = this.score
      if (this.preScore > this.maxScore) {
        this.maxScore = this.preScore
      }
      this.score = 0
    },
    again () {
      this.remainingTime = time
      this.gameOverShow = false
    },
    exit () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus">
.game
  width 100%
  height 100%
  .time-score
    position absolute
    width 100%
    height 20px
    line-height 20px
    text-align center
    font-size 20px
    color red
    .time
      margin-right 30px
  .tile
    width 100%
    height 100%
    border-collapse collapse
    background #a9a9a9
    .box
      display table-cell
      width 33vw
      height 24vh
      margin 0
      padding 0
    .black
      background #000
    .white
      background #fff
  .gameOver
    position fixed
    z-index 100
    top 0
    left 0
    width 100%
    height 100%
    overflow auto
    color #fff
    background rgba(7, 17, 27, 0.8)
    &.gameOver-enter-active, &.gameOver-leave-active
      transition all 0.5s
    &.gameOver-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
    .title
      margin-top 160px
      padding-bottom 30px
      .end
        line-height 16px
        text-align center
        font-size 30px
        font-weight 600
    .score
      .preScore, .maxScore
        display block
        line-height 16px
        text-align center
        font-size 15px
        padding-bottom 10px
    .choose
      position relative
      margin-top 50px
      .again, .exit
        position absolute
        line-height 20px
        font-size 18px
      .again
        left 100px
        color cornflowerblue
      .exit
        right 100px
        .router-link-active
          color red
          text-decoration none
</style>
