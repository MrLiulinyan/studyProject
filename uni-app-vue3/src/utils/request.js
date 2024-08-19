let BASE_URL = 'https://tea.qingnian8.com';

// #ifdef H5
BASE_URL = 'host';
// #endif
const request = (config = {}) => {
  let { url, params = {}, method = 'GET', header = {} } = config;
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${url}`,
      data: params,
      method: method,
      header: header,
      success: (res) => {
        const { errCode, errMsg } = res.data;
        if (errCode === 0) {
          resolve(res.data);
        } else if (errCode === 400) {
          uni.showModal({
            title: '提示',
            content: errMsg,
            showCancel: false,
          });
          reject(res.data);
        } else {
          uni.showToast({
            title: '提示',
            icon: 'none',
            content: errMsg,
            showCancel: false,
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '提示',
          icon: 'none',
          content: err,
          showCancel: false,
        });
        reject(err);
      },
    });
  });
};
const get = (url, params) => request({ url, params, method: 'GET' });

const post = (url, params) => request({ url, params, method: 'POST' });

export { get, post };
