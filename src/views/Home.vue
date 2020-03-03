<template>
    <div id="home">
        <div class="header">
            <div class="headerTop" :style="{backgroundImage:'url('+data.avatar+')'}">
                <div>
                    <img :src='data.avatar' class="headImg">
                </div>
                <div>
                    <h3><img src="../assets/imgs/brand@2x.png">{{data.name}}</h3>
                    <p>{{data.description}} / {{data.deliveryTime}}分钟送达</p>
                    <p><img src="../assets/imgs/decrease_1@2x.png">{{data.supports?data.supports[0].description:""}}</p>
                </div>
                <div>
                    <div>5></div>
                </div>
            </div>
            <div class="headerBottom">
                <p><img src="../assets/imgs/bulletin@2x.png">{{data.bulletin}}</p>

            </div>
        </div>
        <div class="nav">
            <div :class="{active:active==hashPath[0]?true:false}" @click="tabCheck(0)">
                <router-link to="/">商品</router-link>
            </div>
            <div :class="{active:active==hashPath[1]?true:false}" @click="tabCheck(1)">
                <router-link to="/Evaluate">评价</router-link>
            </div>
            <div :class="{active:active==hashPath[2]?true:false}" @click="tabCheck(2)">
                <router-link to="/Business">商家</router-link>
            </div>
        </div>
        <router-view></router-view>
        <transition name="slide-fade">
            <ShopCar v-show="shopCarShow"></ShopCar>
        </transition>
        <div class="shopCar">
            <div class="shopCarImg" @click="shopCarShow=!shopCarShow">
                <img src="../assets/imgs/shopCar.png" alt="" v-show="$store.getters.allPrice==0">
                <img src="../assets/imgs/shopCarOn.png" alt="" v-show="$store.getters.allPrice>0">
            </div>
            <div class="allPrice" @click="shopCarShow=!shopCarShow">￥{{this.$store.getters.allPrice}}</div>
            <div class="otherPrice" @click="shopCarShow=!shopCarShow">另需配送费:￥{{data.deliveryPrice}}</div>
            <div class="checkShop">
                <p v-show="this.$store.getters.allPrice<20">￥{{data.minPrice}}起送</p>
                <p class="toPay" v-show="this.$store.getters.allPrice>=20">去结算</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getSeller
    } from "../api/apis.js";
    import ShopCar from "./ShopCar.vue"
    require("../assets/styles/reset.css")
    export default {
        data() {
            return {
                data: {

                },
                index: 0,
                hashPath: [],
                shopCarShow: false,
            }
        },
        mounted() {
            var that = this;
            getSeller().then((data) => {
                that.data = data.data.data;
                // console.log(that.data)
            })
            for (let obj of this.$router.options.routes[0].children) {
                this.hashPath.push(obj.path.split("/")[1])
            }
        },
        methods: {
            tabCheck(i) {
                this.index = i;
            },
        },
        computed: {
            getShopList() {
                return this.$store.state.list
            },
            active() {
                return this.$route.path.split("/")[1]
            }
        },
        components: {
            ShopCar,
        }
    }
</script>

<style lang="less">
    #home {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 999;

        .ivu-rate-star {
            margin-right: 2px;
        }

        .header {
            width: 100%;
            height: 145px;
            color: white;

            /* 商家信息的头部 */
            .headerTop {
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 16px 0;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;

                h3 {
                    img {
                        width: 30px;
                        margin-right: 5px;
                    }
                }

                div {
                    p {
                        color: #E4E1DB;

                        img {
                            height: 15px;
                            margin-right: 5px;
                        }
                    }

                    ;

                    .headImg {
                        width: 80px;
                    }

                    div {
                        text-align: center;
                        width: 40px;
                        border-radius: 10px;
                        background: #000;
                        opacity: 0.6;
                    }
                }

                div:nth-child(2) {
                    line-height: 26px;
                }

                div:last-child {
                    align-self: flex-end;
                }
            }

            /* 商家信息的底部特色 */
            .headerBottom {
                background: #41403E;

                p {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #fff;
                    font-size: 12px;
                    ;

                    img {
                        height: 16px;
                        margin: 9px;
                    }
                }
            }
        }

        .nav {
            height: 40px;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #ccc;

            div {
                flex: 1
            }

            a {
                display: block;
                text-align: center;
                flex: 1;
                color: #000;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
            }

            .active {
                a {
                    color: #FB352F;
                }
            }
        }

        /* 购物车划入划出动画 */

        .slide-fade-enter-active {
            transition: all .3s ease;
        }

        .slide-fade-leave-active {
            transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }

        .slide-fade-enter,
        .slide-fade-leave-to {
            transform: translateY(100%);
            opacity: 0;
        }

        /* 底部结账样式 */
        .shopCar {
            width: 100%;
            height: 50px;
            position: fixed;
            bottom: 0;
            background: #131D26;
            padding-left: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-self: center;

            .shopCarImg {
                border: 5px solid #131D26;
                border-radius: 50%;
                margin-top: -10px;

                img {
                    width: 50px;
                }
            }

            .allPrice {
                color: #929397;
                width: 70px;
                text-align: center;
                font-weight: bold;
                font-size: 16px;
            }

            .otherPrice {
                color: #929397;
                font-size: 12px;
                width: 100px;
                text-align: center;
            }

            .checkShop {
                height: 100%;
                line-height: 50px;
                text-align: center;
                width: 80px;
                color: #929397;
                background: #2B343B;

                .toPay {
                    width: 100%;
                    height: 100%;
                    color: #333333;
                    background: #FFC53F;
                }
            }
        }
    }
</style>