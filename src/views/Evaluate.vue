<template>
    <div id="evaluate">
        <div class="header">
            <div class="headerLeft">
                <p class="rate">{{score}}</p>
                <p>综合评分</p>
                <p>高于周边商家{{sellerData.rankRate}}%</p>
            </div>
            <div class="headeRight">
                <p class="rate"><span>口味评分</span>
                    <Rate disabled show-text :value.sync="sellerData.score">
                        <span style="color: #f5a623">{{ sellerData.score }}</span>
                    </Rate>
                </p>
                <p class="rate"><span>服务态度</span>
                    <Rate disabled show-text :value.sync="sellerData.serviceScore">
                        <span style="color: #f5a623">{{ sellerData.serviceScore }}</span>
                    </Rate>
                </p>
                <p class="arriveTime"><span>送达时间</span><span> {{sellerData.deliveryTime}}分钟</span></p>
            </div>
        </div>
        <div class="backg"></div>
        <div class="main">
            <div class="checkRatings">
                <div class="all" @click="ratingsCheck(0,true)">全部</div>
                <div class="allGood" @click="ratingsCheck(0,false)">满意</div>
                <div class="allBad" @click="ratingsCheck(1,false)">不满意</div>
            </div>
            <div class="onlyContent">只看有有内容的评论</div>
            <div class="mainContent">
                <ul class="content">
                    <div v-for="obj in data" :key="obj.name" :class="{Ratings:true}" v-show="obj.rateType==rateCheck?true:check">
                        <div class="usernHeader">
                            <div class="headerImg">
                                <img :src="obj.avatar">
                            </div>
                            <div class="username">
                                <p>{{obj.username}}</p>
                                <p>
                                    <Rate disabled :value.sync="obj.score"></Rate><br>{{obj.deliveryTime}}分钟送达
                                </p>
                            </div>
                            <div class="date">
                                <p>{{formatDateT(obj.rateTime)}}</p>
                            </div>
                        </div>
                        <div>
                            <p class="ratingMain">{{obj.text}}</p>
                            <div class="goodFoods">
                                <div v-for="obj1 in obj.recommend" :key="obj1" class="foodItems">{{obj1}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="space"></div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getRatings
    } from "../api/apis.js";
    import {
        getSeller
    } from '../api/apis.js';
    import BScroll from 'better-scroll';
    export default {
        data() {
            return {
                data: {},
                sellerData: {},
                score: 0,
                rateCheck: 0,
                check:true,
            }
        },
        created() {
            getRatings().then(data => {
                this.data = data.data.data;
                console.log(this.data);
                getSeller().then(data => {
                    this.sellerData = data.data.data;
                    console.log(this.sellerData);
                    this.score = ((this.sellerData.score + this.sellerData.serviceScore) / 2).toFixed(1)
                })
            })
        },
        mounted() {
            new BScroll(document.querySelector(".mainContent"))
        },
        methods: {
            /* 转时间 */
            formatDateT(time) {
                var newDate = new Date(time + 8 * 3600 * 1000)
                return newDate.toISOString()
            },
            /* 看好评,差评 */
            ratingsCheck(i,check) {
                this.rateCheck = i;
                this.check=check;
            }
        }
    }
</script>

<style lang="less" scoped>
    #evaluate {
        height: 100%;

        /* 头部 */
        .header {
            padding: 10px;
            height: 120px;
            display: flex;
            justify-content: space-around;

            /* 左侧 */
            .headerLeft {
                padding: 10px;
                text-align: center;
                border-right: 1px solid #ccc;

                .rate {
                    color: #EF9915;
                    font-size: 30px;
                }

                p:nth-child(2) {
                    font-weight: bold;
                }

                p:last-child {
                    font-size: 12px;
                    color: #CECED0;
                }
            }

            /* 右侧 */
            .headeRight {
                padding: 10px;

                p {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 12px;

                    .ivu-rate {
                        width: 180px;
                        overflow: hidden;
                        white-space: nowrap;
                    }

                    span {
                        display: inline-block;
                        width: 50px;
                    }
                }

                .arriveTime {
                    display: flex;
                    justify-content: flex-start;
                }
            }
        }

        .backg {
            width: 100%;
            height: 20px;
            background: #F4F5F7;
        }

        /* 评论主体 */
        .main {
            height: 100%;

            .checkRatings {
                display: flex;
                justify-content: flex-start;
                padding: 10px;

                div {
                    width: 70px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    border-radius: 5px;
                    margin: 0 5px;
                }

                .all {
                    background: #00A0DB;
                    color: #fff;
                }

                .allGood {
                    background: #CCECF7;
                }

                .allBad {
                    background: #EAEBED;
                }
            }

            .onlyContent {
                padding: 10px 0px;
                border: 1px solid #ccc;
            }

            .mainContent {
                height: 100%;
                overflow: auto;
                padding: 40px 0px;

                /* 中间 */
                .space {
                    width: 100%;
                    height: 480px;
                }

                .Ratings {

                    /* 用户头像栏 */
                    .usernHeader {
                        display: flex;

                        .headerImg {
                            img {
                                width: 40px;
                                border-radius: 50%;
                            }
                        }
                    }

                    .ratingMain {
                        font-weight: bold;
                        padding-left: 40px;
                    }

                    .goodFoods {
                        display: flex;
                        padding-left: 40px;

                        .foodItems {
                            width: 50px;
                            font-size: 12px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            border: 1px solid #ccc;
                            margin: 0px 5px;
                            padding: 0 4px;
                        }
                    }
                }

            }
        }
    }
</style>