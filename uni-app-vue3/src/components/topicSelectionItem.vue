<template>
  <view class="topic-selection-item">
    <navigator class="navigator-link" :url="`/pages/classifyDetail/classifyDetail?id=${data._id}&title=${data.name}`">
      <view v-if="updateTime" class="update-time">{{ `${updateTime}更新` }}</view>
      <image :src="data.picurl" mode="aspectFill" lazy-load></image>
      <view class="topic-selection-title">
        <text>{{ data.name }}</text>
        <view class="title-bg"></view>
      </view>
    </navigator>
  </view>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const calculateUpdateTime = (timestamp) => {
  const now = new Date().getTime;
  const timeDiff = now - timestamp;
  if (timeDiff < 60 * 1000) {
    return '1分钟内';
  } else if (timeDiff < 60 * 60 * 1000) {
    return `${Math.floor(timeDiff / 60 / 1000)}分钟前`;
  } else if (timeDiff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(timeDiff / 60 / 60 / 1000)}小时前`;
  } else if (timeDiff < 24 * 60 * 60 * 1000 * 30) {
    return `${Math.floor(timeDiff / 24 / 60 / 60 / 1000)}天前`;
  } else if (timeDiff < 24 * 60 * 60 * 1000 * 90) {
    return `${Math.floor(timeDiff / 24 / 60 / 60 / 1000 / 30)}月前`;
  } else {
    return null;
  }
};

const updateTime = ref(null);
updateTime.value = calculateUpdateTime(props.data.updateTime);
</script>

<style lang="scss" scoped>
.topic-selection-item {
  width: auto;
  height: 360rpx;
  overflow: hidden;
  border-radius: 10rpx;

  .navigator-link {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  &:nth-of-type(3n) {
    margin-right: 0;
  }

  image {
    width: 100%;
    height: 100%;
  }

  .update-time {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: #d88673;
    border-radius: 0 0 15rpx;
    width: auto;
    padding: 5rpx 14rpx;
    color: #fff;
    font-size: 22rpx;
    transform: scale(0.8);
    transform-origin: left top;

    &::before {
      content: '';
      width: 8rpx;
      height: 8rpx;
      background-color: #fff;
      border-radius: 50%;
      display: inline-block;
      margin-right: 5rpx;
      margin-bottom: 2rpx;
    }
  }

  .topic-selection-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 68rpx;
    line-height: 68rpx;
    text-align: center;
    color: #fff;
    font-size: 28rpx;
    background-color: rgb(0 0 0 / 20%);
    backdrop-filter: blur(10rpx);
  }
}
</style>
