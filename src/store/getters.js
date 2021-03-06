/**
 *  getters.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:43
 */
import {CartModel} from 'model/CartModel'

const getters = {
  cartData (state) {
    return state.cartData
  },

  // 购物车详细的数据
  cartDetail (state) {
    return CartModel.calTotalCountAndPrice(state.cartData)
  },

  // 是否有新订单
  ordersChange (state) {
    return state.ordersChange
  },

  // 选中的商品
  selectedCartData (state) {
    let newRes = []
    for (let item of state.cartData) {
      if (item.selected) {
        newRes.push(item)
      }
    }
    return newRes
  },

  // 获取页面是否出于加载中的状态
  loadState (state) {
    let newObj = {}
    for (let key in state.loadState) {
      newObj[key] = state.loadState[key].showLoading
    }
    return newObj
  }
}

export {getters}
