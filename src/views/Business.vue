<template>
    <div id="business">
        <div class="businessBody">
            <ul class="content">
                <!-- 头部 -->
                <div class="businessHead">
                    <div class="headleft">
                        <h2>{{data.name}}</h2>
                        <Rate allow-half disabled show-text v-model="data.serviceScore">
                            <span class="titleOther">({{data.ratingCount}})</span>
                            <span class="titleOther">月销售{{data.sellCount}}单</span>
                        </Rate>
                    </div>
                    <div class="headRight">
                        <Icon type="md-heart" />
                        <p>已收藏</p>
                    </div>

                </div>
                <!-- 介绍 -->
                <div class="other">
                    <div class="mintPrice">
                        <h4>起送价</h4>
                        <p>{{data.minPrice}}元</p>
                    </div>
                    <div class="otherPrice">
                        <h4>商家配送</h4>
                        <p>{{data.deliveryPrice}}元</p>
                    </div>
                    <div class="arriveTime">
                        <h4>平均配送时间</h4>
                        <p>{{data.deliveryTime}}分钟</p>
                    </div>
                </div>
                <!-- 背景占位 -->
                <div class="backg"></div>
                <div class="active">
                    <h3>公告与活动</h3>
                    <p class="bulletin">{{data.bulletin}}</p>
                    <p v-for="item in data.supports" :key="item.id">
                        <img src="../assets/imgs/decrease_3@2x.png" alt="" v-show="item.type==0">
                        <img src="../assets/imgs/special_3@2x.png" alt="" v-show="item.type==1">
                        <img src="../assets/imgs/discount_3@2x.png" alt="" v-show="item.type==2">
                        {{ item.description }}
                    </p>
                    <p v-for="item in data.supports" :key="item.id">
                        <img src="../assets/imgs/decrease_3@2x.png" alt="" v-show="item.type==0">
                        <img src="../assets/imgs/special_3@2x.png" alt="" v-show="item.type==1">
                        <img src="../assets/imgs/discount_3@2x.png" alt="" v-show="item.type==2">
                        {{ item.description }}
                    </p>
                </div>
                <div class="backg"></div>
                <div class="shopPhoto">
                    <h3>商店实景</h3>
                    <div class="photo">
                        <div v-for="item in data.pics" :key="item">
                            <img :src="item">
                        </div>
                    </div>
                </div>
                <div class="backg"></div>
                <div class="info">
                    <h3>商店信息</h3>
                    <p v-for="item in data.infos" :key="item.id">
                        {{ item }}
                    </p>
                </div>
                <div class="space"></div>
            </ul>
        </div>

    </div>
</template>

<script>
    import {
        getSeller
    } from "../api/apis.js";
    import BScroll from 'better-scroll';
    export default {
        data() {
            return {
                data: {},
            }
        },
        created() {
            getSeller().then(data => {
                this.data = data.data.data;
            })
        },
        mounted() {
            new BScroll(document.querySelector(".businessBody"), {
                click: true,
            })
        }
    }
</script>

<style lang="less">
    #business {
        width: 100%;
        height: 100%;
        overflow:hidden;

        .businessBody {
            height: 100%;

        }

        h3 {
            font-size: 16px;
            font-weight: bold;
            padding: 5px;
        }

        .businessHead {
            display: flex;
            justify-content: space-between;

            .headleft {
                padding: 10px;

                h2 {
                    font-size: 16px;
                    font-weight: bold;
                }

                .titleOther {
                    font-size: 12px;
                    display: inline-block;
                    margin: 0px 5px;
                }
            }

            .headRight {
                padding:10px 20px 10px 0;
                text-align: center;

                p {
                    font-size: 14px;
                    text-align: center;
                }

                i {
                    font-size: 30px;
                    color: red;
                }
            }
        }

        .other {
            display: flex;
            justify-content: space-around;
            padding: 10px;
            border-top: 1px solid #ccc;

            div {
                width: 30%;
                text-align: center;

                h4 {
                    font-size: 12px;
                    color: #BFC2C5;
                }

                p {
                    font-size: 16px;
                }
            }

            div:nth-child(2) {
                border-left: 1px solid #ccc;
                border-Right: 1px solid #ccc;
            }
        }

        .backg {
            width: 100%;
            height: 15px;
            background: #F4F5F7;
            border-bottom: 1px solid #ccc;

        }

        .active {
            height: 100%;

            p {
                font-size: 14px;
                padding: 10px;
                border-bottom: 1px solid #cccccc;

                img {
                    width: 14px;
                }
            }

            .bulletin {
                color: #F89292;
            }

        }

        .shopPhoto {

            .photo {
                display: flex;
                justify-content: space-around;

                img {
                    width: 80px;
                }
            }
        }

        .info {
            p {
                font-size: 12px;
                padding: 10px;
                border-bottom: 1px solid #cccccc;
            }
        }

        .space {
            width: 100%;
            height: 250px;
        }
    }
</style>