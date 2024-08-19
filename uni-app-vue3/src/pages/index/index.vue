<template>
  <view class="page-bg">
    <common-nav-bar></common-nav-bar>
    <!-- 轮播图 -->
    <swiper class="banner-swiper" circular autoplay indicator-dots indicator-active-color="#fff">
      <swiper-item v-for="item of bannerList" :key="item._id">
        <view class="swiper-item container"><image mode="scaleToFill" :src="item.picurl"></image></view>
      </swiper-item>
    </swiper>
    <!-- 公告 -->
    <view class="container notice-container">
      <view class="notice flex-row flex-align-center">
        <view class="notice-left flex-row flex-align-center">
          <uni-icons type="sound-filled" size="20"></uni-icons>
          <text>公告</text>
        </view>
        <view class="notice-center">
          <swiper class="notice-swiper" circular autoplay :vertical="true" duration="300">
            <swiper-item v-for="item of noticeList" :key="item._id">
              <text class="ellsipsis">{{ item.title }}</text>
            </swiper-item>
          </swiper>
        </view>
        <view class="notice-right">
          <uni-icons type="forward" size="16" color="#666"></uni-icons>
        </view>
      </view>
    </view>
    <!-- 每日推荐 -->
    <common-title title="每日推荐">
      <view class="module-tips flex-row flex-align-center">
        <uni-icons type="calendar" size="22"></uni-icons>
        <uni-dateformat class="number" :date="new Date()" format="dd号"></uni-dateformat>
      </view>
    </common-title>
    <scroll-view class="daily-recommend" scroll-x @click="navigatorPreview">
      <view v-for="item of recommendList" :key="item._id" class="recommend-image">
        <image :data-id="item._id" :src="item.smallPicurl" lazy-load></image>
      </view>
    </scroll-view>
    <!-- 专题精选 -->
    <common-title title="专题精选" @click-more="navigatorClassify"></common-title>
    <view class="topic-selection container">
      <topic-selection-item v-for="item of topicList" :key="item._id" :data="item"></topic-selection-item>
      <view class="topic-selection-more">
        <navigator open-type="reLaunch" class="navigator-link" url="/pages/classify/classify">
          <image src="@/static/images/more.jpg" lazy-load></image>
          <view class="more-mask flex-column flex-center">
            <uni-icons type="more-filled" size="22" color="#fff"></uni-icons>
            <view>更多</view>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script setup>
import commonNavBar from '@/components/commonNavBar.vue';
import commonTitle from '@/components/commonTitle.vue';
import topicSelectionItem from '@/components/topicSelectionItem.vue';
import { apiGetHomeBanner, apiGetWallNewsList, apiGetRandomWall, apiGetClassify } from '@/apis/api';

// 轮播图
const bannerList = ref([]);
const getBannerList = () => {
  apiGetHomeBanner().then((res) => {
    bannerList.value = res.data;
  });
};
// 公告
const noticeList = ref([]);
const getNoticeList = () => {
  apiGetWallNewsList().then((res) => {
    noticeList.value = res.data;
  });
};

// 每日推荐
const recommendList = ref([]);
const getRecommendList = () => {
  apiGetRandomWall().then((res) => {
    recommendList.value = res.data;
  });
};

// 专题精选
const topicList = ref([]);
const getTopicList = () => {
  apiGetClassify({ select: true }).then((res) => {
    topicList.value = res.data;
  });
};
const navigatorClassify = () => {
  uni.reLaunch({ url: '/pages/classify/classify' });
};
const navigatorPreview = (e) => {
  uni.setStorageSync('imageList', recommendList.value);
  uni.navigateTo({ url: `/pages/preview/preview?id=${e.target.dataset.id}` });
};

// 分享
onShareAppMessage(() => {
  return {
    title: '壁纸',
    path: '/pages/index/index',
  };
});
onShareTimeline(() => {
  return {
    title: '壁纸',
  };
});

onMounted(() => {
  getBannerList();
  getNoticeList();
  getRecommendList();
  getTopicList();
});
</script>

<style lang="scss" scoped>
// 轮播图样式
.banner-swiper {
  width: 100%;
  height: 340rpx;
  margin-bottom: 30rpx;

  .swiper-item {
    width: 100%;
    height: 100%;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
    }
  }
}

// 公告样式
.notice-container {
  margin-bottom: 60rpx;

  .notice {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    padding: 0 30rpx;
    background-color: #f9f9f9;
    border-radius: 50rpx;
    overflow: hidden;

    .notice-left {
      margin-right: 45rpx;
      color: $theme-color;
      font-size: 28rpx;
    }

    .notice-center {
      flex: 1;
      height: 100%;
      color: #666;

      .notice-swiper {
        height: 100%;
      }

      text {
        width: 100%;
        height: 100%;
        display: inline-block;
        font-size: 30rpx;
      }
    }

    .notice-right {
      margin-left: 60rpx;
    }
  }
}

// 每日推荐
.module-tips {
  color: $theme-color;

  .number {
    margin-left: 5rpx;
    font-size: 28rpx;
  }
}

.daily-recommend {
  white-space: nowrap;
  margin-bottom: 60rpx;

  .recommend-image {
    width: 200rpx;
    height: 440rpx;
    margin-right: 15rpx;
    overflow: hidden;
    border-radius: 10rpx;
    display: inline-block;

    &:first-of-type {
      margin-left: 28rpx;
    }

    &:last-of-type {
      margin-right: 28rpx;
    }

    image {
      width: 100%;
      height: 100%;
    }
  }
}

// 专题精选
.topic-selection {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15rpx;
  padding-bottom: 42rpx;

  .topic-selection-more {
    width: auto;
    height: 360rpx;
    overflow: hidden;
    border-radius: 10rpx;

    image {
      width: 100%;
      height: 100%;
      filter: blur(20rpx);
    }

    .more-mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      height: 100%;
      text-align: center;
      color: #fff;
      font-size: 28rpx;
    }
  }
}

.notice-left,
.module-tips {
  :deep() {
    .uni-icons {
      color: $theme-color !important;
    }
  }
}
</style>
