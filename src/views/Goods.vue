<template>
    <div id="goods">
        <div class="businessLeft">
            <ul class="content">
                <div v-for="(obj,i) in foodsList" :key="obj.name" @click="leftCheck(i)"
                    :class="{selected:index==i?true:false}">
                    <p>
                        <img src="../assets/imgs/discount_1@2x.png" v-show="obj.type==1">
                        <img src="../assets/imgs/decrease_1@2x.png" v-show="obj.type==2">
                        <img src="../assets/imgs/invoice_1@2x.png" v-show="obj.type==3">
                        <img src="../assets/imgs/guarantee_1@2x.png" v-show="obj.type==4">
                        {{ obj.name }}</p>
                </div>
                <div class="space"></div>
            </ul>

        </div>
        <div class="rightContent">
            <ul class="content">
                <div v-for="(obj,i) in foodsList" :key="obj.name" :id="i">
                    <h2 class="title">{{ obj.name }}</h2>
                    <div v-for="obj1 in obj.foods" :key="obj1.name" class="goods">
                        <div class="goodsImg"><img :src='obj1.image'></div>
                        <div class="goodsContent">
                            <h3>
                                {{obj1.name}}
                            </h3>
                            <p>{{obj1.description}}</p>
                            <p>月销售 {{obj1.sellCount}}份</p>
                            <p>好评率 {{obj1.rating}}%</p>
                            <p><span class="price">￥{{obj1.price}}</span> <span><del>{{obj1.oldPrice}}</del></span></p>
                        </div>
                        <div class="goodsAdd">
                            <span class="minus" v-show="obj1.num>0" @click="add(-1,obj1.name)">-</span>
                            <span class="num" v-show="obj1.num>0">{{obj1.num}}</span>
                            <span class="add" @click="add(1,obj1.name)">+</span>
                        </div>
                    </div>
                </div>
                <div class="space"></div>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        getGoods
    } from "../api/apis.js";
    import BScroll from 'better-scroll'
    export default {
        data() {
            return {
                index: 0,
            };
        },
        created() {
            getGoods().then(data => {
                this.$store.commit("getList", data.data.data);
                this.$store.commit("getShopCarList",this.$store.getters.shopCar)
                // console.log(this.$store.state.list)
            });
        },
        mounted() {
            /* 左边滚动 */
            this.left = new BScroll(document.querySelector(".businessLeft"), {
                click: true,
            })
            /* 右边滚动 */
            this.right = new BScroll(document.querySelector(".rightContent"), {
                click: true,
                probeType: 3,
            })
            this.right.on("scroll", (o) => {
                for (let i = 0; i < this.getHight.length; i++) {
                    if (this.getHight[i].min < Math.abs(o.y) && Math.abs(o.y) < this.getHight[i].max) {
                        this.index = i;
                    }
                }
            })
        },
        methods: {
            leftCheck(i) {
                this.index = i
                this.right.scrollToElement(document.getElementById(this.index), 300)
            },
            add(num,name){
                this.$store.commit("addNum",{num,name});
                this.$store.commit("getShopCarList",this.$store.getters.shopCar)
            }
        },
        computed: {
            getHight() {
                var arr = []
                var allHeight = 0;
                for (let i = 0; i < this.foodsList.length; i++) {
                    var nowHeight = allHeight;
                    allHeight += document.getElementById(i).offsetHeight;
                    arr.push({
                        min: nowHeight - 1,
                        max: allHeight,
                        index: i
                    })
                }
                return arr
            },
            foodsList() {
                return this.$store.state.list
            },
        }
    };
</script>

<style lang="less">
    #goods {
        height: 100%;

        /* 左侧边栏样式 */
        .businessLeft {
            width: 80px;
            height: 100%;
            position: fixed;
            left: 0;
            overflow: auto;

            div {
                height: 60px;
                padding: 0px 10px;
                background: #f4f5f7;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #ccc;

                p {
                    font-size: 14px;

                    img {
                        width: 16px;
                    }
                }
            }

            .selected {
                background: #fff;
            }

            .space {
                width: 100%;
                height: 235px;
            }
        }

        /* 右边内容样式 */
        .rightContent {
            flex: 1;
            height: 100%;
            padding-left: 80px;
            overflow: auto;

            .title {
                border-left: 2px solid #D9DCE1;
                background: #f4f5f7;
                text-align: left;
                padding-left: 15px;
                font-size: 14px;
            }

            div {
                width: 100%;

                .goods {
                    padding: 10px 5px;
                    border-bottom: 1px solid #DBDEE1;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-start;

                    .goodsImg {
                        padding-right: 10px;

                        img {
                            width: 80px;
                        }
                    }

                    .goodsContent {
                        font-size: 10px;

                        .price {
                            color: red;
                            font-size: 14px;
                        }
                    }

                    .goodsAdd {
                        width: 150px;
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
            }

            .space {
                width: 100%;
                height: 245px;
            }
        }
    }
</style>