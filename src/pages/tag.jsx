import React, { useEffect, useState } from "react";
import { notification, Table, Menu, Row, Col, Typography, Button, Popover, Input, Spin } from "antd";
import { delTagApi, getTagApi } from "../utils/api";

import MenuPage from "../components/layout/menu";
import TagDeleteButton from "../components/layout/tag/deleteTag";
import EditTagModal from "../components/layout/tag/editTag";

const TagPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTag, setCurrentTag] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true); // Thêm loading state

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true); // Bắt đầu loading
                const res = await getTagApi();
                if (!res?.message) {
                    setDataSource(res);
                } else {
                    notification.error({
                        message: "Unauthorized",
                        description: res.message,
                    });
                }
            } catch (error) {
                notification.error({
                    message: "Error",
                    description: "Failed to fetch tags",
                });
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };
        fetchUser();
    }, []);

    const handleDelete = async (id) => {
        try {
            await delTagApi(id);
            notification.success({ message: "User deleted successfully" });
            setDataSource(prev => prev.filter(tag => tag._id !== id));
        } catch (err) {
            notification.error({ message: "Delete failed", description: err.message });
        }
    };

    const handleEdit = (record) => {
        setCurrentTag(record);
        setIsModalOpen(true);
    };

    const handleUpdateTag = (updatedTag) => {
        setDataSource(prev =>
            prev.map(tag => tag._id === updatedTag._id ? updatedTag : tag)
        );
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            width: 300,
            ellipsis: true,
        },
        {
            title: "Description",
            dataIndex: "description",
            width: 300,
            ellipsis: true,
        },
        {
            title: "ListSystem",
            dataIndex: "listSystem",
            width: 200,
            ellipsis: true,
            render: (list) => {
                const content = (
                    <div style={{ maxWidth: 200 }}>
                        {list.map((system) => (
                            <div key={system._id || system.name}>
                                • {system.name}
                            </div>
                        ))}
                    </div>
                );
                return (
                    <Popover content={content} title="Danh sách hệ thống" trigger="hover">
                        <Button type="link" >{list.length}: System</Button>
                    </Popover>
                );
            },
        },
        {
            title: 'Action',
            width: 200,
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button type="default" onClick={() => handleEdit(record)}>Edit</Button>
                    <TagDeleteButton tag={record} onDelete={handleDelete} />
                </div>
            ),
        }
    ];

    const onClick = (e) => {
        console.log("Menu click ", e);
    };

    const filteredData = dataSource.filter(tag =>
        tag.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        tag.description?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <Row gutter={0}>
                <Col span={6}>
                    <MenuPage
                        onClick={onClick}
                        defaultSelectedKeys={["tag-info"]}
                        defaultOpenKeys={["sub2"]}
                    />
                </Col>
                <Col span={18}>
                    <Row justify="space-between" align="middle" style={{ marginBottom: 16, padding: 16 }}>
                        <Col>
                            <Typography.Title level={3} style={{ margin: 0 }}>
                                Tag's list
                            </Typography.Title>
                        </Col>
                        <Col>
                            <Input.Search
                                placeholder="Search tags..."
                                allowClear
                                onChange={(e) => setSearchText(e.target.value)}
                                value={searchText}
                                style={{ width: 300 }}
                            />
                        </Col>
                    </Row>

                    <Spin spinning={loading} size="large" >
                        <Table
                            dataSource={filteredData}
                            columns={columns}
                            rowKey="_id"
                            pagination={{ pageSize: 7 }}
                            scroll={{ x: "100%" }}
                        />
                    </Spin>
                </Col>
            </Row>

            <EditTagModal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tag={currentTag}
                onUpdate={handleUpdateTag}
            />
        </div>
    );
};

export default TagPage;