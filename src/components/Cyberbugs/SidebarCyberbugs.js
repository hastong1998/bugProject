import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarsOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";
export default function SidebarCyberbugs() {
  const dispatch = useDispatch();
  const { Header, Sider, Content } = Layout;
  const [state, setState] = useState({
    collapsed: true,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "100%" }}
      >
        <div className="text-right pr-2" onClick={toggle}>
          <BarsOutlined
            style={{ cursor: "pointer", color: "#fff", fontSize: 25 }}
          />
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            onClick={() => {
              dispatch({
                type: "OPEN_FORM_CREATE_TASK",
                ComponentContentDrawer: <FormCreateTask />,
                title: "Create task",
              });
            }}
            key="1"
            icon={<PlusOutlined style={{ fontSize: 20 }} />}
          >
            <span className="mb-2">Create issue</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
