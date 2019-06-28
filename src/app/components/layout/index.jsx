import { Layout, Menu, Breadcrumb, Icon } from "antd";
import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import HeaderBar from "../header/header-bar.jsx";
import Logo from "../../images/logo/GitHub_Logo_White.png";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <Layout style={{ height: "100vh" }}>
          <Header className="header">
            <img className="logo" src={Logo} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <Link to="/">All jobs</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <a href="https://jobs.github.com/post">Post a job</a>
              </Menu.Item>
              <Menu.Item key="3">
                <a href="https://jobs.github.com/faq">How it works</a>
              </Menu.Item>
              <HeaderBar />
            </Menu>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "10px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Jobs</Breadcrumb.Item>
            </Breadcrumb>
            <div className="container">{this.props.children}</div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Demo by Eddy Hu ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default MainLayout;
