<template>
  <view class="preview">
    <swiper class="image-swiper" loop :current="currentIndex" @click="swiperClick" @change="swiperChange">
      <swiper-item v-for="(item, index) of imageList" :key="item._id">
        <image v-if="imageArr.includes(index)" :src="item.picUrl" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
    <view v-show="markStatus" class="mask">
      <view class="back-btn" @click="backPage">
        <uni-icons type="left" size="16" color="#fff"></uni-icons>
      </view>
      <view class="count">{{ previewInfo }}</view>
      <view class="time">
        <uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
      </view>
      <view class="date">
        <uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
      </view>
      <view class="tools flex-row flex-align-center flex-around">
        <view class="tools-box flex-column flex-center" @click="showInfoPopup">
          <uni-icons type="info" size="23"></uni-icons>
          <view>信息</view>
        </view>
        <view class="tools-box flex-column flex-center" @click="showRatePopup">
          <uni-icons type="star" size="23"></uni-icons>
          <view>5分</view>
        </view>
        <view class="tools-box flex-column flex-center" @click="downloadImage">
          <uni-icons type="download" size="23"></uni-icons>
          <view>下载</view>
        </view>
      </view>
    </view>
  </view>
  <!-- 信息 -->
  <uni-popup ref="infoPopup" type="bottom" background-color="#fff" border-radius="10px 10px 0 0">
    <view class="info-popup">
      <view class="popup-title">壁纸信息</view>
      <uni-icons class="close-btn" type="closeempty" size="18" color="#a7a7a7" @click="closeInfoPopup"></uni-icons>
      <scroll-view class="info-container">
        <view class="info-row flex-row">
          <view class="label">壁纸ID：</view>
          <text class="value" selectabled>{{ currentInfo._id }}</text>
        </view>
        <view class="info-row flex-row">
          <view class="label">发布者：</view>
          <text class="value" selectabled>{{ currentInfo.nickname }}</text>
        </view>
        <view class="info-row flex-row">
          <view class="label">评分：</view>
          <view class="value flex-row flex-align-center">
            <uni-rate v-model="currentInfo.score" size="18" readonly touchable value="4" />
            <text class="rate-text" selectabled>{{ `${currentInfo.score}分` }}</text>
          </view>
        </view>
        <view class="info-row flex-row">
          <view class="label">摘要：</view>
          <text class="value" selectabled>{{ currentInfo.description }}</text>
        </view>
        <view class="info-row flex-row">
          <view class="label">标签：</view>
          <view class="value tabs flex-row flex-wrap" selectabled>
            <view v-for="(item, index) of currentInfo.tabs" :key="index" class="tab-item">{{ item }}</view>
          </view>
        </view>
        <view class="copyright">123466</view>
      </scroll-view>
    </view>
  </uni-popup>
  <!-- 评分 -->
  <uni-popup ref="ratePopup" type="center" background-color="#fff" border-radius="10px">
    <view class="rate-popup">
      <view class="popup-title">{{ currentInfo.userScore ? '已评分~' : '壁纸评分' }}</view>
      <uni-icons class="close-btn" type="closeempty" size="18" color="#a7a7a7" @click="closeRatePopup"></uni-icons>
      <view class="flex-column flex-align-center">
        <view class="flex-row flex-align-center">
          <uni-rate v-model="userRate" disabled-color="#ffca3e" :disabled="currentInfo.userScore" :size="24" allow-half />
          <text class="text">{{ `${userRate}分` }}</text>
        </view>
        <button :disabled="userRate == 0 || currentInfo.userScore" type="default" size="mini" plain @click="confirmRate">确认评分</button>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
import { apiSetRate, apiDownloadWall } from '@/apis/api';

defineProps({
  id: {
    type: String,
    default: '',
  },
});

const imageList = ref([]);
const currentIndex = ref(0);
const previewInfo = computed(() => `${currentIndex.value + 1} / ${imageList.value.length}`);
const currentInfo = computed(() => imageList.value[currentIndex.value] || {});
let imageArr = [];
// 获取壁纸列表
const arr = uni.getStorageSync('imageList') || [];
imageList.value = arr.map((e) => {
  return { ...e, userScore: e.userScore || null, picUrl: e.smallPicurl.replace('_small.webp', '.jpg') };
});

const updateImageArray = () => {
  const last = imageList.value.length;
  const prev = currentIndex.value ? currentIndex.value - 1 : last;
  const next = currentIndex.value === last ? 1 : currentIndex.value + 1;
  imageArr.push(currentIndex.value, prev, next);
  imageArr = [...new Set(imageArr)];
};

onLoad((params) => {
  // 获取当前壁纸索引
  const { id } = params;
  currentIndex.value = imageList.value.findIndex((e) => id == e._id);
  updateImageArray();
});

const backPage = () => {
  uni.navigateBack({
    fail: () => {
      uni.reLaunch({
        url: '/pages/index/index',
      });
    },
  });
};

const markStatus = ref(true);
const swiperClick = () => {
  markStatus.value = !markStatus.value;
};
const swiperChange = (e) => {
  currentIndex.value = e.detail.current;
  updateImageArray();
};
// 壁纸信息
const infoPopup = ref(null);
const showInfoPopup = () => {
  infoPopup.value.open();
};
const closeInfoPopup = () => {
  infoPopup.value.close();
};
// 评分
const ratePopup = ref(null);
const userRate = ref(0);
const showRatePopup = () => {
  userRate.value = currentInfo.value.userScore || 0;
  ratePopup.value.open();
};
const closeRatePopup = () => {
  ratePopup.value.close();
};
const confirmRate = () => {
  uni.showLoading();
  closeRatePopup();
  apiSetRate({
    classid: currentInfo.value.classid,
    wallId: currentInfo.value._id,
    userScore: userRate.value,
  })
    .then(() => {
      currentInfo.value.userScore = userRate.value;
      uni.hideLoading();
      uni.showToast({
        title: '评分成功',
        icon: 'none',
      });
    })
    .catch(() => {
      uni.hideLoading();
    });
};
// 下载

const getImagePath = () => {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: currentInfo.value.picUrl,
      success: (res) => resolve(res.path),
      fail: () => {
        uni.showToast({
          title: '获取图片地址失败',
          icon: 'error',
        });
        reject(null);
      },
    });
  });
};
// 打开授权设置页
const openSetting = () => {
  uni.openSetting({
    success: (res) => {
      if (res.authSetting['scope.writePhotosAlbum']) {
        uni.showToast({ title: '授权成功', icon: 'none' });
      } else {
        uni.showToast({ title: '授权失败', icon: 'none' });
      }
    },
  });
};

const checkDownload = () => {
  return new Promise((resolve) => {
    apiDownloadWall({
      classid: currentInfo.value.classid,
      wallId: currentInfo.value._id,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};

const downloadImage = async () => {
  // #ifdef H5
  uni.showModal({
    title: '提示',
    content: '请长按图片保存到相册',
    showCancel: false,
  });
  // #endif
  // #ifndef H5
  uni.showLoading({ title: '下载中...' });
  const checkInfo = await checkDownload();
  if (checkInfo.errCode !== 0) return uni.hideLoading();
  const path = await getImagePath();
  if (!path) return uni.hideLoading();
  uni.saveImageToPhotosAlbum({
    filePath: path,
    success: () => {
      uni.showToast({
        title: '保存成功',
        icon: 'none',
      });
    },
    fail: (err) => {
      if (err.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
        uni.showToast({
          title: '保存失败，请重新点击下载',
          icon: 'none',
        });
      } else {
        uni.showModal({
          title: '保存失败',
          content: '请检查是否开启相册权限',
          success: (res) => res.confirm && openSetting(),
        });
      }
    },
    complete: () => {
      uni.hideLoading();
    },
  });
  // #endif
};

onUnload(() => {
  uni.removeStorageSync('imageList');
});
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100vh;

  .image-swiper {
    width: 100%;
    height: 100%;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .back-btn,
  .time,
  .date,
  .count,
  .tools {
    position: absolute;
    z-index: 10;
  }

  .time,
  .date,
  .count,
  .tools {
    width: fit-content;
    margin: auto;
    left: 0;
    right: 0;
  }

  .back-btn {
    top: 6vh;
    left: 28rpx;
    border-radius: 50%;
    width: 70rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    border: solid 1px $border-color;
    background-color: rgba(#000, 0.3);
  }

  .count {
    color: #fff;
    height: 38rpx;
    line-height: 38rpx;
    background-color: rgba(#000, 0.3);
    padding: 0 28rpx;
    border-radius: 40rpx;
    font-size: 22rpx;
    top: 10vh;
  }

  .time {
    color: #fff;
    top: calc(10vh + 80rpx);
    font-size: 140rpx;
    text-shadow: 0 4rpx rgba(#000, 0.3);
    line-height: 1em;
  }

  .date {
    font-size: 34rpx;
    color: #fff;
    top: calc(10vh + 230rpx);
    text-shadow: 0 4rpx rgba(#000, 0.3);
  }

  .tools {
    width: 490rpx;
    height: 120rpx;
    background-color: rgba(#fff, 0.8);
    bottom: 152rpx;
    border-radius: 120rpx;
    color: $text-font-color-2;
    box-shadow: 0 2rpx 0 rgb(0 0 0 / 10%);
    backdrop-filter: blur(20rpx);
    font-size: 26rpx;

    .tools-box {
      padding: 2rpx 12rpx;
    }
  }
}

.info-popup {
  padding: 45rpx 30rpx;
  position: relative;

  .popup-title {
    text-align: center;
    font-size: 26rpx;
    color: $text-font-color-3;
    margin-bottom: 40rpx;
  }

  .close-btn {
    position: absolute;
    top: 40rpx;
    right: 30rpx;
  }

  .info-row {
    font-size: 32rpx;
    padding: 16rpx 0;
    line-height: 1.7em;

    .label {
      color: $text-font-color-3;
      width: 140rpx;
      text-align: right;
      font-size: 30rpx;
      flex-shrink: 0;
    }

    .value {
      flex: 1;
    }

    .rate-text {
      margin-left: 10rpx;
      font-size: 26rpx;
      color: $text-font-color-2;
      line-height: normal;
    }

    .tab-item {
      color: $theme-color;
      border: solid 1px $theme-color;
      font-size: 22rpx;
      padding: 10rpx 30rpx;
      border-radius: 40rpx;
      line-height: 1em;
      height: 42rpx;
      margin: 5rpx;
    }
  }

  .copyright {
    font-size: 28rpx;
    padding: 20rpx;
    background-color: #f6f6f6;
    color: $text-font-color-2;
    margin-top: 20rpx;
    line-height: 1.6em;
  }
}

// 评分
.rate-popup {
  padding: 45rpx 30rpx;
  position: relative;
  width: 70vw;

  .popup-title {
    text-align: center;
    font-size: 26rpx;
    color: $text-font-color-3;
    margin-bottom: 40rpx;
  }

  .close-btn {
    position: absolute;
    top: 40rpx;
    right: 30rpx;
  }

  button {
    margin-top: 40rpx;
  }

  .text {
    width: 70rpx;
    text-align: right;
    color: #ffca3e;
    font-size: 26rpx;
  }
}
</style>
