import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    foodsList: [],
    shopCarList: []
  },
  mutations: {
    getList(state, content) {
      state.list = content
    },
    getShopCarList(state, content) {
      state.shopCarList = content
    },
    addNum(state, i) {
      /* 循环遍历,每个name相同的食物都增加1/-1 */
      for (let index = 0; index < state.list.length; index++) {
        for (let j = 0; j < state.list[index].foods.length; j++) {
          if(state.list[index].foods[j].name==i.name){
            state.list[index].foods[j].num+=i.num;
          }
        }
      }
    },
    clearShopCar(state, item) {
      for (let i = 0; i < state.list.length; i++) {
        for (let j = 0; j < state.list[i].foods.length; j++) {
          state.list[i].foods[j].num = item;
        }
      }
    }
  },
  getters: {
    /* 获取到每个被选中的商品 */
    shopCar(state) {
      var foodsList = [];
      var resList=[];
      console.log(state.shopCarList)
      /* 拿到食物 */
      for (let i = 0; i < state.list.length; i++) {
        for (let j = 0; j < state.list[i].foods.length; j++) {
          /* 去重 */
          if (resList.indexOf(state.list[i].foods[j].name) === -1) {
            /* 将所有不重复食物加入新数组 */
            resList.push(state.list[i].foods[j].name)
            foodsList.push(state.list[i].foods[j]);
          }
        }
      }
      /* num不为0的渲染出来 */
      return foodsList.filter(obj => obj.num > 0)
    },
    /* 计算总价 */
    allPrice(state, getters) {
      var allPrice = 0;
      getters.shopCar.forEach((obj) => {
        allPrice += obj.num * obj.price
      })
      return allPrice
    }
  },
  actions: {},
  modules: {}
})