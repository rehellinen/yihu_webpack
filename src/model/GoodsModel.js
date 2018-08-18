import {BaseModel} from './BaseModel.js'
import {CartModel} from './CartModel'
import {GoodsType} from 'utils/config'

let Cart = new CartModel()

export class GoodsModel extends BaseModel {
  /**
   * 更新购物车中商品信息
   * @return Promise
   */
  updateGoods () {
    let goods = Cart.getCartStorage()
    let ids = []
    let idsStr = ''

    if (goods.length === 0) {
      return
    }

    for (let item of goods) {
      ids.push(item.id)
    }
    idsStr = ids.join('|')

    let params = {
      url: 'goods/check',
      data: {
        ids: idsStr
      }
    }
    return this.request(params).then((res) => {
      Cart.updateStorageGoods(res, goods)
    })
  }

  /**
   * 获取首页旧物漂流
   * @return {*}
   */
  getIndexOldGoods () {
    let params = {
      url: 'oldGoods/index'
    }
    return this.request(params)
  }

  /**
   * 获取首页发现鲜货
   * @return {*}
   */
  getIndexNewGoods () {
    let params = {
      url: 'newGoods/index'
    }
    return this.request(params)
  }

  // 获取所有二手 / 自营商品
  getGoods (type, page) {
    let url = `oldGoods`
    if (parseInt(type) === GoodsType.NEW_GOODS) {
      url = `newGoods`
    }
    let params = {
      url: url,
      data: {
        page: page,
        size: 14
      }
    }
    return this.request(params)
  }

  /**
   * 获取商品详情
   * @param id 商品id
   * @param type 商品类型
   */
  getGoodsDetail (id, type) {
    let url = `oldGoods/${id}`
    if (parseInt(type) === GoodsType.NEW_GOODS) {
      url = `newGoods/${id}`
    }

    let params = {
      url: url
    }
    return this.request(params)
  }

  /**
   * 根据商店id获取商品
   * @param id
   * @param page
   * @param size
   * @return {*}
   */
  getGoodsByShopId (id, page, size = 10) {
    let params = {
      url: 'newGoods/shop/' + id,
      data: {
        page,
        size
      }
    }

    return this.request(params)
  }

  // 获取自营商店最近新品
  getRecentGoodsByShopId (id, cb) {
    let params = {
      url: 'newGoods/recent/shop/' + id,
      callBack: function (data) {
        cb && cb(data)
      }
    }

    this.request(params)
  }

  // 根据分类获取商品
  getGoodsByCategoryID (page, id, cb, ecb) {
    let params = {
      url: 'goods/category/' + id,
      data: {
        page: page,
        size: 12
      },
      callBack (res) {
        cb && cb(res)
      },
      eCallBack (res) {
        ecb && ecb(res)
      }
    }
    this.request(params)
  }
}
