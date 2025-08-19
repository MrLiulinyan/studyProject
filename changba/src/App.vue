<template>
  <div class="header">
    <div class="title">歌星点歌</div>
    <div class="header-right">
      <div class="select-num">
        <image-to-canvas src="https://picsum.photos/200/300"></image-to-canvas>
        <span>已点4</span>
      </div>
      <div class="icon"></div>
    </div>
  </div>
  <div class="container">
    <div class="container-left">
      <div class="search-input">
        例如周杰伦输入“ZJL”
      </div>
      <div class="keyboard-container">
        <div v-for="(value, index) of keyboard" :key="index" class="keyboard">
          {{ value }}
        </div>
      </div>
      <div class="btns">
        <div class="btn">清空</div>
        <div class="btn">删除</div>
        <div class="btn">切换为九宫格输入</div>
      </div>
    </div>
    <div class="container-right">
      <div class="tabs">
        <div v-for="(item, index) of tabs" :key="index" class="tab-item">
          {{ item }}
        </div>
      </div>
      <div class="search-num">为您找到24297位歌手</div>
      <div class="singer-list">
        <div class="singer-item" v-for="item of singerList" :key="item.id">
          <div class="item-avatar">
            <image-to-canvas :src="item.avatar" width="254" height="254"></image-to-canvas>
          </div>
          <div class="item-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import imageToCanvas from "./components/imageToCanvas.vue";
import avatarImage from "./assets/images/avatar.png";

// 生成 A-Z 的数组
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const keyboard = [...alphabet,...Array(10).keys()];

const tabs = ref(["全部歌手", "华语男歌手", "华语女歌手", "华语乐队组合", "外国男歌手", "外国女歌手"]);
console.log(avatarImage)
const singerList = ref([
  {
    id: 1,
    name: "乐佳怡",
    avatar:avatarImage,
  },
  {
    id: 2,
    name: "沈子祯",
    avatar:avatarImage,
  },
  {
    id: 3,
    name: "吕涵涵",
    avatar:avatarImage,
  },
  {
    id: 4,
    name: "康洋辉",
    avatar:avatarImage,
  },
  {
    id: 5,
    name: "程瑾昆",
    avatar:avatarImage,
  },
  {
    id: 6,
    name: "鲁杰瑞",
    avatar:avatarImage,
  },
  {
    id: 7,
    name: "鲁子园",
    avatar:avatarImage,
  },
  {
    id: 8,
    name: "廉诗悦",
    avatar:avatarImage,
  },
  {
    id: 9,
    name: "毕佩玉",
    avatar:avatarImage,
  },
  {
    id: 10,
    name: "安杰瑞",
    avatar:avatarImage,
  },
  {
    id: 11,
    name: "柏欣汝",
    avatar:avatarImage,
  },
  {
    id: 12,
    name: "费甜",
    avatar:avatarImage,
  },
])


</script>

<style lang="scss">
body{
  background-color: #111b68;
  color: #FFFFFF;
  margin: 0;
}
div{
  box-sizing: border-box;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 175px;
  // box-sizing: border-box;
  border-radius: 0 0 40px 40px;
  border: solid 3px #50588b;
  border-top: 0;
  padding: 0 152px;
  background-color: rgba(255,255,255, 0.1);
  margin-bottom: 75px;
  .title{
    font-weight: bold;
    font-size: 32px;
  }
  .select-num{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 240px;
    height: 84px;
    box-sizing: border-box;
    font-size: 20px;
    border: solid 3px #50588b;
    border-radius: 40px;
    background-color: rgba(255,255,255, 0.1);
  }
}

.container{
  display: flex;
  justify-content: space-between;
  .container-left{
    width: 690px;
    height: auto;
    background-color: rgba(255,255,255, 0.1);
    border-radius: 0 20px 20px 0;
    padding: 28px 55px;
    .search-input{
      width: 518px;
      height: 84px;
      line-height: 84px;
      border: solid 3px #50588b;
      background-color: rgba(255,255,255, 0.1);
      border-radius: 50px;
      padding: 0 46px;
      font-size: 24px;
    }
    .keyboard-container{
      margin-top: 32px;
      padding: 0 5px;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      .keyboard{
        font-size: 24px;
        width: 78px;
        height: 72px;
        font-weight: bold;
        padding-left:23px;
        padding-top: 26px;
      }
    }
    .btns{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 46px;
      .btn{
        width: 270px;
        height: 76px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 3px #50588b;
        border-radius: 15px;
        font-size: 24px;
        background-color: rgba(255,255,255, 0.1);
      }
      .btn:nth-child(3){
        width: 100%;
        margin-top: 46px;
      }
    }
  }
  .container-right{
    width: calc(100% - 720px);
    padding-top: 36px;
    .tabs{
      display: flex;
      margin-bottom: 58px;
      overflow-x: scroll;
      scrollbar-width: none; /* Firefox 兼容 */
      -ms-overflow-style: none; /* IE/Edge 兼容 */
      &::-webkit-scrollbar {
        display: none;
      }
      .tab-item{
        width: auto;
        height: 95px;
        line-height: 95px;
        font-size: 24px;
        padding: 0 44px;
        flex-shrink: 0;
        background-color: rgba(255,255,255, 0.1);
        border-radius: 10px;
        margin-right: 30px;
        &:last-of-type{
          margin-right: 0;
        }
      }
    }
    .search-num{
      font-size: 20px;
      margin-bottom: 28px;
    }
    .singer-list{
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 50px 30px;
      .singer-item{
        display: flex;
        flex-direction: column;
      }
      .item-avatar{
        width: 254px;
        height: 254px;
        border-radius: 10px;
        overflow: hidden;
        background-color: #ccc;
      }
      .item-name{
        font-size: 24px;
        text-align: center;
        margin-top: 26px;
      }
    }
  }
}
</style>
