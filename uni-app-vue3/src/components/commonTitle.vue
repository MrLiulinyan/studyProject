<template>
  <view class="common-title container flex-row flex-align-center flex-between">
    <view class="title-text">{{ title }}</view>
    <slot>
      <view class="more-btn" @click="openMore">More+</view>
    </slot>
  </view>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
    required: true,
  },
});

const emit = defineEmits(['click-more']);
const openMore = () => {
  emit('click-more');
};
</script>

<style lang="scss" scoped>
.common-title {
  width: 100%;
  margin-bottom: 38rpx;

  .title-text {
    font-size: 40rpx;
  }

  .more-btn {
    color: #999;
    font-size: 28rpx;
  }
}
</style>
