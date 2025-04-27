import { Button, Col, Input, notification, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { delUserApi, getUserApi } from "../utils/api";
import MenuPage from "../components/layout/menu";
import { UsergroupAddOutlined } from "@ant-design/icons";
import UserDeleteButton from "../components/layout/user/deleteUser";
import EditUserModal from "../components/layout/user/editUser";
import "../styles/admin/table.css"
const UserPage = () => {
    const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchText, setSearchText] = useState(''); // Thêm searchText

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
    const handleDelete = async (id) => {
        try {
            await delUserApi(id);
            notification.success({ message: "User deleted successfully" });
            setDataSource(prev => prev.filter(user => user._id !== id));
        } catch (err) {
            notification.error({ message: "Delete failed", description: err.message });
        }
    };
    const handleEdit = (record) => {
        setCurrentUser(record);
        setIsModalOpen(true);
    };

    const handleUpdateUser = (updatedUser) => {
        setDataSource(prev =>
            prev.map(user => user._id === updatedUser._id ? updatedUser : user)
        );
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            width: 300,
            ellipsis: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 200,
            ellipsis: true,
        },
        // {
        //     title: 'Id',
        //     dataIndex: '_id',
        // },
        {
            title: 'Role',
            dataIndex: 'role',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'Action',
            width: 200,
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button type="default" onClick={() => handleEdit(record)}>Edit</Button>
                    <UserDeleteButton user={record} onDelete={handleDelete} />
                </div>
            ),
        }

    ];
    const onClick = (e) => {
        console.log("Menu click ", e);
    };
    const filteredData = dataSource.filter(user =>
        user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <div >
            <Row gutter={0} className="custom-layout">
                <Col span={6} className="custom-sidebar">
                    <MenuPage
                        onClick={onClick}
                        defaultSelectedKeys={["tag-info"]}
                        defaultOpenKeys={["sub1"]}
                    />
                </Col>
                <Col span={18} className="custom-content">
                    <Row justify="space-between" align="middle" style={{ marginBottom: 16, padding: 16 }}>
                        <Col>
                            <Typography.Title level={3} style={{ marginBottom: 16, padding: 16 }}>
                                User's list
                            </Typography.Title>
                        </Col>
                        <Col>
                            <Input.Search
                                placeholder="Search users..."
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
            <EditUserModal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={currentUser}
                onUpdate={handleUpdateUser}
            />
        </div>
    )
}
export default UserPage