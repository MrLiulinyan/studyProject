<template>
  <view class="classify-detail" @click="navigatorPreview">
    <view v-for="item of imageList" :key="item._id" class="image-item">
      <image :src="item.smallPicurl" :data-id="item._id" mode="aspectFill" lazy-load></image>
    </view>
  </view>
  <uni-load-more class="safe-area-inset-bottom" :status="loadingStatus"></uni-load-more>
</template>

<script setup>
import { apiGetClassifyDetail } from '@/apis/api';

defineProps({
  id: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});

let classid = null;
let pageNum = 1;
let listTotal = 1;
const imageList = ref([]);
const noMore = computed(() => imageList.value.length >= listTotal);
const loadingStatus = computed(() => (noMore.value ? 'noMore' : 'loading'));
let loading = false;
const getImageList = () => {
  apiGetClassifyDetail({
    classid,
    pageNum,
    pageSize: 12,
  })
    .then((res) => {
      const { data, total } = res.data;
      imageList.value = [...imageList.value, ...data];
      listTotal = total;
    })
    .finally(() => {
      loading = false;
    });
};

const navigatorPreview = (e) => {
  uni.setStorageSync('imageList', imageList.value);
  uni.navigateTo({ url: `/pages/preview/preview?id=${e.target.dataset.id}` });
};

onLoad((params) => {
  classid = params.id;
  uni.setNavigationBarTitle({ title: params.title });
});

onReachBottom(() => {
  if (!noMore.value && !loading) {
    loading = true;
    pageNum++;
    getImageList();
  }
});

onMounted(() => {
  getImageList();
});
</script>

<style lang="scss" scoped>
.classify-detail {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rpx;
  padding: 4rpx;

  .image-item {
    width: auto;
    height: 544rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
