<template>
    <div id="home">
        <div class="header">
            <div class="headerTop" :style="{background:'url('+data.avatar+') repeat',backgroundSize:'cover',backgroundPosition:'center'}">
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
            <div :class="{active:index==0?true:false}" @click="tabCheck(0)">
                <router-link to="/">商品</router-link>
            </div>
            <div :class="{active:index==1?true:false}" @click="tabCheck(1)">
                <router-link to="/Evaluate">评价</router-link>
            </div>
            <div :class="{active:index==2?true:false}" @click="tabCheck(2)">
                <router-link to="/Business">商家</router-link>
            </div>
        </div>
        <router-view></router-view>
        <div class="shopCar">
            购物车
        </div>
    </div>
</template>

<script>
    import {
        getSeller
    } from "../api/apis.js"
    require("../assets/styles/reset.css")
    export default {
        data() {
            return {
                data: {

                },
                index: 0
            }
        },
        mounted() {
            var that = this;
            getSeller().then((data) => {
                that.data = data.data.data;
                // console.log(that.data)
            })
        },
        methods: {
            tabCheck(i) {
                this.index = i;
            },
        }
    }
</script>

<style lang="less" scoped>
    #home {
        width: 100%;
        height: 100%;
        position: fixed;

        .header {
            height: 145px;
            color: white;

            /* 商家信息的头部 */
            .headerTop {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 16px 0;
                background-position: center;

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

        .shopCar {
            width: 100%;
            height: 60px;
            position: fixed;
            bottom: 0;
            background: orange;
        }
    }
</style>