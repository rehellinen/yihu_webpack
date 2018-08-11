module.exports = {
  // 配置1：URL基地址
  restUrl: 'http://fleamarket.cn/api/v1/',
  // Config.restUrl = 'https://20298479.rehellinen.cn/fleamarket/public/api/v1/'

  // 配置2：加载中图标自动隐藏时间
  loadingHiddenTime: 4000,

  // 配置3：关于全局字符串替换
  replace: {
    static: {
      origin: '__STATIC__',
      replacement: '/static'
    },
    image: {
      origin: '__IMAGE__',
      replacement: '/static/images'
    }
  }
}
