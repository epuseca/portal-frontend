import React, { useEffect, useState } from "react";
import { notification, Table, Menu, Row, Col, Typography } from "antd";
import { getTagApi } from "../utils/api";

import MenuPage from "../components/layout/menu";

const TagPage = () => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getTagApi();
            if (!res?.message) {
                setDataSource(res);
            } else {
                notification.error({
                    message: "Unauthorized",
                    description: res.message,
                });
            }
        };
        fetchUser();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "ListSystem",
            dataIndex: "listSystem",
            render: (list) => (list ? list.map((s) => s.name).join(", ") : "-"),
        },
        {
            title: "Id",
            dataIndex: "_id",
        },
    ];

    const onClick = (e) => {
        console.log("Menu click ", e);
    };

    return (
        <div >
            <Row gutter={0}>
                <Col span={6}>
                    <MenuPage
                        onClick={onClick}
                        defaultSelectedKeys={["tag-info"]}
                        defaultOpenKeys={["sub2"]}
                    />
                </Col>
                <Col span={18} style={{ padding: 16 }}>
                    <Typography.Title level={3} style={{ marginBottom: 16 }}>
                        Tag's list
                    </Typography.Title>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        rowKey="_id"
                        pagination={{ pageSize: 7 }}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default TagPage;
