<template lang="pug">
  div
    .placeholder(:style="placeHolderStyle")
    .search-container(:style="containerStyle")
      .input-container(:style="inputStyle")
        .input-fake
          img(src="__IMAGE__/icon/search.png")
          p 请输入搜索内容

</template>

<script>
export default {
  created () {
    this._setStyle()
  },
  data () {
    return {
      containerStyle: '',
      inputStyle: '',
      placeHolderStyle: ''
    }
  },
  methods: {
    _setStyle () {
      const position = wx.getMenuButtonBoundingClientRect()
      // define the parameters of the search box and the container
      const inputWidth = position.left
      const containerHeight = position.bottom - position.top
      const containerPaddingTop = position.top
      const containerPaddingBottom = 15 / 2 - 1

      this.inputStyle = `width:${inputWidth}px`
      this.containerStyle = `height:${containerHeight}px;
      padding-top:${containerPaddingTop}px`
      this.placeHolderStyle = `height:${containerHeight + containerPaddingTop + containerPaddingBottom}px`
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .search-container
    display: flex
    align-items: center
    width: 100%
    padding-bottom: $nav-bottom
    background-color: $nav-color
    position: fixed
    z-index: 100
    top: 0
    .input-container
      display: flex
      justify-content: center
      height: 95%
      .input-fake
        display: flex
        align-items: center
        width: 90%
        height: 100%
        border-radius: 40rpx
        background-color: white
        img
          width: 40rpx
          height: 40rpx
          margin-left: 35rpx
        p
          margin-left: 20rpx
          font-size: $small-font-size
          color: $base-font-color
</style>
