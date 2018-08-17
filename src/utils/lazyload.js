/**
 *  lazyload.js
 *  Create By rehellinen
 *  Create On 2018/8/13 20:01
 */
export class LazyLoad {
  /**
   * 构造函数
   */
  constructor (data, page, start = 0) {
    this.page = page
    // 图片的NodesRef对象实例
    this.images = wx.createSelectorQuery().selectAll('.lazy')
    // 进行数据绑定的数据
    this.data = data
    // 获取可使用窗口高度
    this.windowHeight = wx.getSystemInfoSync().windowHeight
    // 是否加载完成
    this.isLoadedAll = false
    // 遍历的序号
    this.index = 0
    // 从第几个开始
    this.start = start
    // 滚动标志位
    this.isFresh = true
    // 懒加载的默认图片
    this.lazyImage = '__IMAGE__/theme/loading.jpg'
    setTimeout(() => {
      this.refresh()
    }, 200)
    this._processData()
  }

  /**
   * 每次滚动都进行刷新
   */
  refresh () {
    this.images.boundingClientRect(res => {
      let i = this.index + this.start
      while (i < res.length) {
        if (res[i].top <= (this.windowHeight + 40)) {
          console.log(res[i].top)
          let realIndex = i - this.start
          if (realIndex > this.index) {
            this.index = realIndex
            if (realIndex === this.data.length - 1) {
              this.index++
            }
          }

          if (realIndex === this.data.length - 1) {
            this.isLoadedAll = true
          }

          let newData = this.data[realIndex]

          newData.lazy_url = newData.image_id.image_url
          newData.transition = 'afterShow'
          this.page.$set(this.data, realIndex, newData)
        }
        i++
      }
    }).exec()
  }

  _processData () {
    this.data.forEach((item) => {
      item.lazy_url = this.lazyImage
    })
  }
}
