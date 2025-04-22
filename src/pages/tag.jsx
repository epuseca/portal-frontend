import React, { useEffect, useState } from "react";
import { notification, Table, Menu, Row, Col, Typography, Button, Popover } from "antd";
import { delTagApi, getTagApi } from "../utils/api";

import MenuPage from "../components/layout/menu";
import TagDeleteButton from "../components/layout/tag/deleteTag";
import EditTagModal from "../components/layout/tag/editTag";

const TagPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTag, setCurrentTag] = useState(null);
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
        // {
        //     title: "Id",
        //     dataIndex: "_id",
        // },
        {
            title: 'Action',
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
                <Col span={18}>
                    <Typography.Title level={3} style={{ marginBottom: 16, padding: 16 }}>
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
