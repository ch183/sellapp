<template>
    <div id="goods">
        <div class="businessLeft">
            <ul class="content">
                <div v-for="(obj,i) in data" :key="obj.name" @click="leftCheck(i)"
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
                <div v-for="(obj,i) in data" :key="obj.name" :id="i">
                    <h2 class="title">{{ obj.name }}</h2>
                    <div v-for="obj1 in obj.foods" :key="obj1.name" class="goods">
                        <div><img :src='obj1.image'></div>
                        <div>
                            <h3>
                                {{obj1.name}}
                            </h3>
                            <p>{{obj1.description}}</p>
                            <p>月销售 {{obj1.sellCount}}份 好评率 {{obj1.rating}}%</p>
                            <p><span>{{obj1.price}}</span> <span>{{obj1.oldPrice}}</span></p>
                        </div>
                        <div>
                            <p>
                                <Icon type="minus-circled"></Icon>
                                <span>1</span>
                                <Icon type="plus-circled"></Icon>
                            </p>
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
                data: {},
                index: 0,
            };
        },
        created() {
            var that = this;
            getGoods().then(data => {
                that.data = data.data.data;
                // console.log(that.data);
            });
        },
        mounted() {
            /* 左边滚动 */
            new BScroll(document.querySelector(".businessLeft"), {
                click: true,
            })

            /* 右边滚动 */
            this.right = new BScroll(document.querySelector(".rightContent"), {
                click: true,
            })
        },
        methods: {
            leftCheck(i) {
                this.index = i
                this.right.scrollToElement(document.getElementById(this.index), 1000)
            },
        }
    };
</script>

<style lang="less" scoped>
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
                height: 225px;
            }
        }

        /* 右边内容样式 */
        .rightContent {
            flex: 1;
            height: 100%;
            padding-left: 80px;
            overflow: auto;

            .title {
                background: #f4f5f7;
                text-align: left;
                padding-left: 15px;
                font-size: 14px;
            }

            div {
                width: 100%;

                img {
                    width: 80px;
                }

                .goods {
                    display: flex;
                }
            }

            .space {
                width: 100%;
                height: 245px;
            }
        }
    }
</style>