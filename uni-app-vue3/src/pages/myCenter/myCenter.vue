<template>
  <view class="my-center container page-bg">
    <view :style="{ height: `${navBarHeight}px` }"></view>
    <view class="user-info flex-column flex-align-center">
      <view class="avatar"><image src="/static/images/xxmLogo.png"></image></view>
      <view class="ip">{{ userInfo.IP }}</view>
      <view class="address">{{ `来自：${address}` }}</view>
    </view>
    <view class="user-menu">
      <menu-row label="我的下载" :count="userInfo.downloadSize" icon-name="download-filled"></menu-row>
      <menu-row label="我的评分" :count="userInfo.scoreSize" icon-name="star-filled"></menu-row>
      <menu-row label="联系客服" icon-name="chatboxes-filled">
        <!-- #ifndef MP-WEIXIN -->
        <button style="width: 100%; height: 100%" @click="callPhone">拨打电话</button>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <button style="width: 100%; height: 100%" open-type="contact">联系客服</button>
        <!-- #endif -->
      </menu-row>
    </view>
    <view class="user-menu">
      <menu-row label="订阅更新" icon-name="notification-filled"></menu-row>
      <menu-row label="常见问题" icon-name="flag-filled"></menu-row>
    </view>
  </view>
</template>

<script setup>
import { apiGetUserInfo } from '@/apis/api';
import { getNavBarHeight } from '@/utils/system.js';
import menuRow from './components/menuRow.vue';

const navBarHeight = ref(getNavBarHeight());
const userInfo = ref({
  downloadSize: 0,
  scoreSize: 0,
});
const address = computed(() => {
  const { address = null } = userInfo.value;
  return address ? `${address.province}${address.city}` : '未知';
});
const getUserInfo = () => {
  apiGetUserInfo().then((res) => {
    userInfo.value = res.data;
  });
};

// #ifdef H5
const callPhone = () => {
  uni.makePhoneCall({
    phoneNumber: '123456789',
  });
};
// #endif

onMounted(() => {
  getUserInfo();
});
</script>

<style lang="scss" scoped>
.my-center {
  .user-info {
    padding-top: 65rpx;
    margin-bottom: 100rpx;

    .avatar {
      width: 158rpx;
      height: 158rpx;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 35rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .ip {
      font-size: 34rpx;
      margin-bottom: 24rpx;
    }

    .address {
      color: #666;
      font-size: 28rpx;
    }
  }

  .user-menu {
    width: 100%;
    height: auto;
    background-color: #fff;
    border-radius: 10rpx;
    border: solid 1px #eee;
    box-shadow: 0 0 10rpx #eee;

    & + .user-menu {
      margin-top: 50rpx;
    }
  }
}
</style>
