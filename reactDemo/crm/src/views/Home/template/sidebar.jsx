import { Dropdown } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import './sidebar.scss';
import SidebarMenu from './menu';

function Sidebar() {
  const shortcutMenu = [
    {
      key: '1',
      label: <div>新增客户</div>,
    },
    {
      key: '2',
      label: <div>新增意向客户</div>,
    },
    {
      key: '3',
      label: <div>新增我的公海</div>,
    },
    {
      key: '4',
      label: <div>新增跟进记录</div>,
    },
    {
      key: '5',
      label: <div>新增任务</div>,
    },
    {
      key: '6',
      label: <div>新增商机</div>,
    },
    {
      key: '7',
      label: <div>新增合同</div>,
    },
    {
      key: '8',
      label: <div>新增寄存</div>,
    },
  ];

  return (
    <div className="sidebar flex-column flex-align-center">
      <Dropdown arrow placement="bottom" trigger={['click']} menu={{ items: shortcutMenu }}>
        <PlusCircleTwoTone twoToneColor="#aedaff" style={{ fontSize: '28px' }} className="margin-bottom-lg" />
      </Dropdown>
      <SidebarMenu></SidebarMenu>
    </div>
  );
}

export default Sidebar;
