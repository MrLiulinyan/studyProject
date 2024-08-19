<template>
  <view class="common-nav-bar" :style="{ height: `${navBarHeight}px` }">
    <view class="nav-bar-wrap">
      <view class="status-bar" :style="{ height: `${statusBarHeight}px` }"></view>
      <view class="flex-row flex-align-center" :style="{ height: `${titleBarHeight}px` }">
        <view class="title">{{ title }}</view>
        <view class="search flex-row" @click="openSearch">
          <uni-icons class="search-icon" type="search" size="18" color="#888"></uni-icons>
          <view class="text">搜索</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight } from '@/utils/system.js';

defineProps({
  title: {
    default: '推荐',
    type: String,
    required: true,
  },
});

const statusBarHeight = ref(getStatusBarHeight()); // 获取顶部状态栏高度
const titleBarHeight = ref(getTitleBarHeight());
const navBarHeight = ref(getNavBarHeight());

const openSearch = () => {
  uni.navigateTo({
    url: '/pages/search/search',
  });
};
</script>

<style lang="scss" scoped>
.common-nav-bar {
  width: 100%;
  margin-bottom: 30rpx;

  .nav-bar-wrap {
    width: 100%;
    padding: 0 28rpx;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: linear-gradient(to bottom, transparent, #fff 400rpx), linear-gradient(to right, #beecd8 20%, #f4e2d8);
  }

  .title {
    font-size: 22px;
    font-weight: 700;
    color: #333;
  }

  .search {
    width: 220rpx;
    height: 57rpx;
    line-height: 55rpx;
    border-radius: 40rpx;
    background-color: #e9f8f0;
    border: solid 1px #fff;
    color: $text-font-color-3;
    font-size: 24rpx;
    margin-left: 28rpx;
    padding-left: 20rpx;

    .text {
      margin-left: 10rpx;
    }
  }
}
</style>
