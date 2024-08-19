const SYSTEM_INFO = uni.getSystemInfoSync(); // 获取系统信息
// 获取顶部状态栏高度
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 0;
export const getTitleBarHeight = () => {
  let barHeight = 40;
  // #ifndef H5
  const { height, top } = uni.getMenuButtonBoundingClientRect(); // 获取微信小程序右侧胶囊按钮位置信息
  barHeight = (top - getStatusBarHeight()) * 2 + height;
  // #endif
  return barHeight;
};

export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight();
