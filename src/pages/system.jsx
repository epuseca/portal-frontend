import { Col, notification, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getSystemApi } from "../utils/api";
import MenuPage from "../components/layout/menu";

const SystemPage = () => {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getSystemApi()
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
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Link Access',
            dataIndex: 'linkAccess',
        },
        {
            title: 'Link Instruct',
            dataIndex: 'linkInstruct',
        },
        {
            title: 'Managing Unit',
            dataIndex: 'managingUnit',
        },
        {
            title: 'Contact Point',
            dataIndex: 'contactPoint',
        },
        {
            title: 'Id',
            dataIndex: '_id',
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
                        defaultOpenKeys={["sub3"]}
                    />
                </Col>
                <Col span={18} style={{ padding: 16 }}>
                    <Typography.Title level={3} style={{ marginBottom: 16 }}>
                        System's list
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
export default SystemPage