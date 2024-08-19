export const goHome = () => {
  uni.showModal({
    title: '提示',
    content: '页面有误，将返回首页',
    showCancel: false,
    success: () => {
      uni.reLaunch({
        url: '/pages/index/index',
      });
    },
  });
};
