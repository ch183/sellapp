<template>
    <div id="shopCar">
        <p class="tipsOk" v-show="this.$store.getters.allPrice>=20">已满足起送费</p>
        <p class="tipsNo" v-show="this.$store.getters.allPrice<20">未满足起送费</p>
        <div class="shopCarControls">
            <p>购物车</p>
            <p @click="clearShopCar">清空购物车</p>
        </div>
        <div class="main">
            <ul class="content">
                    <div v-for="obj in this.$store.getters.shopCar" :key="obj.name" class="foods" v-show="obj.num>0">
                        <div class="foodsName">
                            {{ obj.name}}
                        </div>
                        <div class="foodsPrice">
                            ￥{{ $store.getters.allPrice }}
                        </div>
                        <div class="foodsAdd">
                            <span class="minus" v-show="obj.num>0" @click="add(-1,obj.name)">-</span>
                            <span class="num" v-show="obj.num>0">{{obj.num}}</span>
                            <span class="add" @click="add(1,obj.name)">+</span>
                        </div>
                    
                </div>
                <div class="space"></div>
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getShopList;
    // console.log(this.getShopList)
  },
  mounted() {
    new BScroll(document.querySelector(".main"), {
      click: true
    });
  },
  methods: {
    add(num, name) {
      this.$store.commit("addNum", {
        num,
        name
      });
      this.$store.commit("getShopCarList", this.$store.getters.shopCar);
      // console.log(this.$store.state.shopCarList)
      console.log(name);
    },
    /* 清空购物车 */
    clearShopCar() {
      this.$store.commit("clearShopCar", 0);
    }
  },
  computed: {
    getShopList() {
      return this.$store.state.list;
    }
  }
};
</script>

<style lang="less">
#shopCar {
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #fff;
  position: fixed;
  bottom: 50px;

  .tipsOk {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    background: #fff1d0;
  }

  .tipsNo {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    color: red;
    background: #fff1d0;
  }

  .shopCarControls {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 10px;
    background: #f4f4f4;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .main {
    height: 100%;
    overflow: auto;

    .foods {
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;

      .foodsName {
        width: 150px;
        font-size: 16px;
      }

      .foodsPrice {
        width: 100px;
        color: red;
        text-align: center;
      }

      /* 添加食物 */
      .foodsAdd {
        width: 120px;
        padding-right: 10px;
        align-self: flex-end;
        display: flex;
        justify-content: flex-end;

        span {
          display: block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          // align-self:center;
        }

        .add,
        .minus {
          line-height: 15px;
          border: 2px solid #000;
          border-radius: 50%;
          font-size: 20px;
        }
      }
    }
    .space {
      height: 60px;
    }
  }
}
</style>