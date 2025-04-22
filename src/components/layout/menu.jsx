// src/components/MenuPage.js
import React from "react";
import { Menu } from "antd";
import {
    CodeSandboxOutlined,
    SlackOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const items = [
    {
        key: "sub1",
        label: "User",
        icon: <UsergroupAddOutlined />,
        children: [
            { key: "1", label: <Link to={'/user'}>User's information</Link> },
            { key: "2", label: <Link to={"/user/create"}>Create new user</Link> },
        ],
    },
    {
        type: "divider",
    },
    {
        key: "sub2",
        label: "Tag",
        icon: <CodeSandboxOutlined />,
        children: [
            { key: "3", label: <Link to={'/tag'}>Tag's information</Link> },
            { key: "4", label: <Link to={'/tag/create'}>Create new tag</Link> },
        ],
    },
    {
        type: "divider",
    },
    {
        key: "sub3",
        label: "System",
        icon: <SlackOutlined />,
        children: [
            { key: "5", label: <Link to={'/system'}>System's information</Link> },
            { key: "6", label: <Link to={'/system/create'}>Create new system</Link> },
        ],
    },


];

const MenuPage = ({ onClick, defaultSelectedKeys, defaultOpenKeys }) => {
    return (
        <Menu
            onClick={onClick}
            style={{ width: "100%" }}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            mode="inline"
            items={items}
        />
    );
};

export default MenuPage;
