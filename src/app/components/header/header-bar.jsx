import React from "react";
import { Avatar, Icon } from "antd";
import "./header-bar.scss";

class HeaderBar extends React.Component {
  render() {
    return (
      <div className="avatar">
        <Icon className="icons" type="search" />
        <Icon className="icons" type="bell" />
        <Icon className="icons" type="question-circle" />
        <Avatar className="avatarIcon" style={{ color: "#fffff", backgroundColor: "#1890ff" }}>
          E
        </Avatar>
        <span color="#fffff">Eddy</span>
      </div>
    );
  }
}

export default HeaderBar;
