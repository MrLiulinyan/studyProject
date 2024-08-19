import { Tabs } from "antd";
import React, { useRef, useState } from 'react';

const initialItems = [
  {
    label: "概况",
    key: "1",
    closable: false,
  },
  {
    label: "文章",
    key: "2",
    closable: true,
  },
];

const Header = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  // 切换
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
    console.log("onChange", newActiveKey);
  };
  // 删除
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  // 更改
  const onEdit = (targetKey, action) => {
    console.log("onEdit", targetKey, action);
    if (action !== "add") {
        remove(targetKey);
    }
  };
  return (
    <Tabs
      hideAdd
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
};

export default Header