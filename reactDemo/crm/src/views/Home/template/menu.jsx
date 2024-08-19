import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover, Divider } from 'antd';
import './menu.scss';

function Memu() {
  const navigate = useNavigate();
  let [activeMenu, setActiveMenu] = useState(0);
  const menuClickHandler = (index, path) => {
    setActiveMenu(index);
    navigate(path);
  };
  const list = [
    {
      label: '待办',
      icon: 'icon-column',
      children: [
        {
          title: '看板',
          list: [
            { label: '看板数据', path: '/backlog' },
            { label: '合同进程', path: '' },
          ],
        },
        {
          title: '任务',
          list: [{ label: '任务列表', path: '/taskList' }],
        },
        {
          title: '审批',
          list: [
            { label: '待审批', path: '' },
            { label: '已审批', path: '' },
            { label: '我参与的', path: '' },
            { label: '我发起的', path: '' },
          ],
        },
      ],
    },
    {
      label: '客户',
      icon: 'icon-fensi111',
      children: [
        {
          title: '客户管理',
          list: [
            { label: '意向客户', path: '/potential' },
            { label: '客户', path: '/customer' },
            { label: '通讯录', path: '' },
            { label: '公海', path: '' },
            { label: '粉丝', path: '' },
            { label: '企微客户', path: '' },
          ],
        },
      ],
    },
    {
      label: '销售',
      icon: 'icon-xiaoshou',
      children: [
        {
          title: '销售信息',
          list: [
            { label: '销售动态', path: '/sales' },
            { label: '销售助手', path: '' },
          ],
        },
        {
          title: '销售管理',
          list: [
            { label: '商机列表', path: '' },
            { label: '合同列表', path: '' },
            { label: '产品管理', path: '' },
          ],
        },
        {
          title: '资客管理',
          list: [
            { label: '资客列表', path: '' },
            { label: '清退列表', path: '' },
            { label: '打款记录', path: '' },
            { label: '人脉圈', path: '' },
          ],
        },
      ],
    },
    {
      label: '营销',
      icon: 'icon-marketing',
      children: [
        {
          title: '信息管理',
          list: [
            { label: '发送5G消息', path: '/marketing' },
            { label: '发送短信', path: '' },
            { label: '发送智能信息', path: '' },
            { label: '信息发送记录', path: '' },
          ],
        },
        {
          title: '企微营销',
          list: [
            { label: '站内引流', path: '' },
            { label: '群组活码', path: '' },
            { label: '群发客户', path: '' },
            { label: '渠道码', path: '' },
            { label: '欢迎语', path: '' },
          ],
        },
        {
          title: '其他',
          list: [{ label: '群发优惠券', path: '' }],
        },
      ],
    },
    {
      label: '统计',
      icon: 'icon-tongji',
      children: [
        {
          title: '客户数据分析',
          list: [{ label: '客户新增', path: '/statistics' }],
        },
        {
          title: '销售数据分析',
          list: [
            { label: '商机新增', path: '' },
            { label: '合同新增', path: '' },
          ],
        },
        {
          title: '员工数据分析',
          list: [{ label: '员工跟进次数分析', path: '' }],
        },
        {
          title: '产品数据分析',
          list: [
            { label: '商机产品', path: '' },
            { label: '合同产品', path: '' },
          ],
        },
      ],
    },
    {
      label: '其他',
      icon: 'icon-more',
      children: [
        {
          title: '寄存管理',
          list: [
            { label: '寄存列表', path: '/other' },
            { label: '取出列表', path: '' },
          ],
        },
        {
          title: '业绩管理',
          list: [
            { label: '员工业绩', path: '' },
            { label: '业绩异常处理', path: '' },
          ],
        },
        {
          title: '财务管理',
          list: [
            { label: '应收款记录', path: '' },
            { label: '回款记录', path: '' },
            { label: '退款记录', path: '' },
            { label: '坏账记录', path: '' },
          ],
        },
        {
          title: '--',
          list: [
            { label: '交接处理', path: '' },
            { label: '审批管理', path: '' },
            { label: '黑名单', path: '' },
            { label: '签到管理', path: '' },
            { label: '员工位置', path: '' },
          ],
        },
      ],
    },
  ];
  const menuList = list.map((e, index) => {
    const menuContent = e.children.map((child, i) => {
      const list = child.list.map((el, v) => (
        <div
          onClick={() => {
            menuClickHandler(index, el.path);
          }}
          className="list-item cursor-pointer text-center"
          key={v}>
          {el.label}
        </div>
      ));
      return (
        <div className="content-item margin-bottom-small" key={i}>
          <div className="padding-left-small item-title font-bold">{child.title}</div>
          <Divider className="line"></Divider>
          <div className="item-list flex-row flex-bettwen flex-wrap">{list}</div>
        </div>
      );
    });
    const content = <div className="menu-content">{menuContent}</div>;
    const item = (
      <Popover key={index} placement="rightTop" arrow={false} content={content} trigger={['hover']}>
        <div className={`${activeMenu === index ? 'active' : ''} menu-item padding-left flex-row flex-align-center margin-bottom-mini`}>
          <i className={`iconfont ${e.icon} margin-right-small`}></i>
          <span>{e.label}</span>
        </div>
      </Popover>
    );
    return item;
  });
  return (
    <>
      <div className="sidebar-menu">{menuList}</div>
    </>
  );
}

export default Memu;
