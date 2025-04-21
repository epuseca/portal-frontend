import { Button, Col, notification, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../utils/api";
import MenuPage from "../components/layout/menu";
import { UsergroupAddOutlined } from "@ant-design/icons";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserApi()
            if (!res?.message) {
                setDataSource(res)
            } else {
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                })
            }
        }
        fetchUser();
    }, [])

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button type="default" onClick={() => console.log("Edit clicked:", record)}>
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => console.log("Delete clicked:", record)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        }
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
                        defaultOpenKeys={["sub1"]}
                    />
                </Col>
                <Col span={18} style={{ padding: 16 }}>
                    <Typography.Title level={3} style={{ marginBottom: 16 }}>
                        User's list
                    </Typography.Title>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        rowKey={"_id"}
                        pagination={{ pageSize: 7 }}
                    />
                </Col>
            </Row>
        </div>
    )
}
export default UserPage