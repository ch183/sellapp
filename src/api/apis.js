import axios from "axios";
// import qs from "qs";

let req = axios.create({
    baseURL:" http://192.168.3.5:3000",
    timeout:8000,
});
/* 获取商家的详情信息 */
export function getSeller (){
    return req.get("/api/seller")
}
/* 获取商品信息 */
export function getGoods (){
    return req.get("/api/goods")
}
/* 获取评论信息 */
export function getRatings (){
    return req.get("/api/ratings")
}