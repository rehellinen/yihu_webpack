<template lang="pug">
  div.goods-more-container.header
    my-loading(:showLoading="showLoading")
    //search(:pullDown="pullDown")
    div(v-show="!showLoading")
      title-panel(:title="title", :image="image()")
      goods-list(:goods="goods", backgroundColor="#f9f9f9", :from="pageEnum.GOODS_MORE")
      page-loading(:hasMore="hasMore")
</template>

<script>
import GoodsList from '../../components/goods-list/goods-list'
import PageLoading from '../../components/page-loading/page-loading'
import {GoodsModel} from '../../model/GoodsModel'
import {LazyLoad} from '../../utils/lazyload'
import TitlePanel from '../../components/title-panel/title-panel'
import Search from '../../components/search/search'
import MyLoading from '../../components/my-loading/my-loading'
import {mapGetters} from 'vuex'

let Goods = new GoodsModel()

export default {
  data () {
    return {
      page: 1,
      goods: [],
      title: '',
      size: 12,
      pageEnum: this.$config.pageEnum
    }
  },
  computed: {
    showLoading () {
      return this.loadState[this.$config.pageEnum.GOODS_MORE]
    },
    ...mapGetters([
      'loadState'
    ])
  },
  onLoad () {
    this.type = this.$root.$mp.query.type
    if (parseInt(this.type) === this.$config.GoodsType.NEW_GOODS) {
      this.title = '发现鲜货'
    } else {
      this.title = '旧物漂流'
    }
    this._loadData()
  },
  methods: {
    _loadData () {
      Goods.getGoods(this.type, this.page, this.size).then(res => {
        this.goods = this.goods.concat(res)
        if (this.lazyLoad) {
          this.lazyLoad.reset({
            data: this.goods
          })
        } else {
          this.lazyLoad = new LazyLoad({
            data: this.goods,
            page: this,
            dataLength: res.length
          })
        }
      }).catch(ex => {
        this.hasMore = false
      })
    },
    image () {
      if (parseInt(this.type) === this.$config.GoodsType.NEW_GOODS) {
        return '__IMAGE__/icon/find.png'
      } else {
        return '__IMAGE__/icon/old.png'
      }
    }
  },
  components: {
    GoodsList,
    TitlePanel,
    Search,
    MyLoading,
    PageLoading
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import '~css/base'
  .goods-more-container
    background-color: $background-color
    min-height: 100vh
    overflow: hidden
</style>
