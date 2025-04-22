import { Button, Col, notification, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { delSystemApi, getSystemApi } from "../utils/api";
import MenuPage from "../components/layout/menu";
import EditSystemModal from "../components/layout/system/editSystem";
import SystemDeleteButton from "../components/layout/system/deleteSystem";

const SystemPage = () => {
    const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSystem, setCurrentSystem] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getSystemApi()
            console.log("RES", res)
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
    const handleDelete = async (id) => {
        try {
            await delSystemApi(id);
            notification.success({ message: "User deleted successfully" });
            setDataSource(prev => prev.filter(system => system._id !== id));
        } catch (err) {
            notification.error({ message: "Delete failed", description: err.message });
        }
    };
    const handleEdit = (record) => {
        setCurrentSystem(record);
        setIsModalOpen(true);
    };

    const handleUpdateSystem = (updatedSystem) => {
        setDataSource(prev =>
            prev.map(system => system._id === updatedSystem._id ? updatedSystem : system)
        );
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: 120,
            ellipsis: true,
        },
        {
            title: 'Link Access',
            dataIndex: 'linkAccess',
            width: 120,
            ellipsis: true,
        },
        {
            title: 'Link Instruct',
            dataIndex: 'linkInstruct',
            width: 120,
            ellipsis: true,
        },
        {
            title: 'Managing Unit',
            dataIndex: 'managingUnit',
            width: 120,
            ellipsis: true,
        },
        {
            title: 'Contact Point',
            dataIndex: 'contactPoint',
            width: 120,
            ellipsis: true,
        },
        // {
        //     title: 'Id',
        //     dataIndex: '_id',
        //     width: 120,
        //     ellipsis: true,
        // },
        {
            title: 'Action',
            width: 200,
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button type="default" onClick={() => handleEdit(record)}>Edit</Button>
                    <SystemDeleteButton system={record} onDelete={handleDelete} />
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
                        defaultSelectedKeys={["system-info"]}
                        defaultOpenKeys={["sub3"]}
                    />
                </Col>
                <Col span={18} >
                    <Typography.Title level={3} style={{ marginBottom: 16 , padding: 16}}>
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
            <EditSystemModal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                system={currentSystem}
                onUpdate={handleUpdateSystem}
            />
        </div>
    )
}
export default SystemPage