<template>
  <view class="menu-row flex-row flex-align-center flex-between">
    <view class="row-left flex-row flex-align-center">
      <uni-icons :type="iconName" size="24" color="#28b389"></uni-icons>
      <text class="label">{{ label }}</text>
    </view>
    <view class="row-right flex-row flex-align-center">
      <text v-if="count !== null" class="count">{{ count }}</text>
      <uni-icons type="right" size="20" color="#a3a3a3"></uni-icons>
    </view>
    <view v-if="$slots.default" class="slot-wrap">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
defineProps({
  label: {
    default: '',
    type: String,
    required: true,
  },
  count: {
    default: null,
    type: [Number, String],
  },
  iconName: {
    default: null,
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.menu-row {
  width: 100%;
  height: 100rpx;
  border-bottom: solid 1px #eee;
  padding: 0 30rpx;
  position: relative;

  &:last-of-type {
    border-bottom: none;
  }

  .row-left {
    font-size: 28rpx;
    color: #707070;
  }

  .row-right {
    font-size: 28rpx;
    color: #999;
  }

  .label {
    margin-left: 10rpx;
  }

  .count {
    margin-right: 10rpx;
  }

  .slot-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
  }
}

.uni-icons {
  color: $theme-color !important;
}
</style>
