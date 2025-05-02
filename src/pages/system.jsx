import { Button, Col, Input, notification, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { delSystemApi, downloadSystemDocumentApi, getSystemApi } from "../utils/api";
import MenuPage from "../components/layout/menu";
import EditSystemModal from "../components/layout/system/editSystem";
import SystemDeleteButton from "../components/layout/system/deleteSystem";
import SystemImage from "../components/layout/system/systemImage";
import DownloadButton from "../components/layout/system/downloadDoc";

const SystemPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSystem, setCurrentSystem] = useState(null);
    const [searchText, setSearchText] = useState(''); // Thêm state searchText
    const [imageReloadKey, setImageReloadKey] = useState(Date.now());

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getSystemApi();
            console.log("RES", res);
            if (!res?.message) {
                setDataSource(res);
            } else {
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                });
            }
        };
        fetchUser();
    }, []);

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
        setImageReloadKey(Date.now());
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            width: 100,
            render: (_, record) => <SystemImage systemId={record._id} reloadKey={imageReloadKey} />
        },
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
            title: 'Document',
            dataIndex: 'document',
            width: 120,
            render: (_, record) => (
                <DownloadButton system={record} />
            )
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

    const filteredData = dataSource.filter(system =>
        system.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        system.description?.toLowerCase().includes(searchText.toLowerCase()) ||
        system.managingUnit?.toLowerCase().includes(searchText.toLowerCase()) ||
        system.contactPoint?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <Row gutter={0}>
                <Col span={6}>
                    <MenuPage
                        onClick={onClick}
                        defaultSelectedKeys={["system-info"]}
                        defaultOpenKeys={["sub3"]}
                    />
                </Col>
                <Col span={18}>
                    <Row justify="space-between" align="middle" style={{ marginBottom: 16, padding: 16 }}>
                        <Col>
                            <Typography.Title level={3} style={{ margin: 0 }}>
                                System's list
                            </Typography.Title>
                        </Col>
                        <Col>
                            <Input.Search
                                placeholder="Search systems..."
                                allowClear
                                onChange={(e) => setSearchText(e.target.value)}
                                value={searchText}
                                style={{ width: 300 }}
                            />
                        </Col>
                    </Row>
                    <Table
                        dataSource={filteredData}
                        columns={columns}
                        rowKey={"_id"}
                        pagination={{ pageSize: 7 }}
                        scroll={{ x: "100%" }}
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
    );
};

export default SystemPage;
