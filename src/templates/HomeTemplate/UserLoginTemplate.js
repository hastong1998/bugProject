import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";

const { Sider, Content } = Layout;

export const UserLoginTemplate = (propsRoute) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight),
      });
    };
  }, []);
  let { Component, ...restRoute } = propsRoute;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Layout>
              <Sider
                width={size.width / 2}
                style={{
                  height: size.height,
                  backgroundImage: `url(https://picsum.photos/${Math.round(
                    size.width / 2
                  )}/${Math.round(size.height)})`,
                }}
              ></Sider>
              <Content>
                <Component {...propsRoute} />
              </Content>
            </Layout>
          </>
        );
      }}
    />
  );
};
