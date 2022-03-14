import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
export default function DrawerCyberBugs(props) {
  const { Option } = Select;
  const { visible, ComponentContentDrawer, callBackSubmit, title } =
    useSelector((state) => state.DrawerReducer);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch({
      type: "CLOSE_DRAWER",
    });
  };

  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                callBackSubmit();
                dispatch({
                  type: "CLOSE_DRAWER",
                });
              }}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
        // Nội dung thay đôi rcủa drawre
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
