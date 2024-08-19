<template>
  <view class="page-bg">
    <common-nav-bar title="分类"></common-nav-bar>
    <view class="topic-selection container">
      <topic-selection-item v-for="item of topicList" :key="item._id" :data="item"></topic-selection-item>
    </view>
    <uni-load-more :status="loadingStatus"></uni-load-more>
  </view>
</template>

<script setup>
import { apiGetClassify } from '@/apis/api';
import commonNavBar from '@/components/commonNavBar.vue';
import topicSelectionItem from '@/components/topicSelectionItem.vue';

const topicList = ref([]);

let pageNum = 1;
let listTotal = 1;
const noMore = computed(() => topicList.value.length >= listTotal);
const loadingStatus = computed(() => (noMore.value ? 'noMore' : 'loading'));
let loading = false;
const getTopicList = () => {
  apiGetClassify({
    pageNum,
    pageSize: 12,
  })
    .then((res) => {
      const { data, total } = res;
      topicList.value = [...topicList.value, ...data];
      listTotal = total;
    })
    .finally(() => {
      loading = false;
    });
};

onReachBottom(() => {
  if (!noMore.value && !loading) {
    loading = true;
    pageNum++;
    getTopicList();
  }
});

onMounted(() => {
  getTopicList();
});
</script>

<style lang="scss" scoped>
.topic-selection {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15rpx;
}
</style>
