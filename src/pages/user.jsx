import { Button, Col, notification, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { delUserApi, getUserApi } from "../utils/api";
import MenuPage from "../components/layout/menu";
import { UsergroupAddOutlined } from "@ant-design/icons";
import UserDeleteButton from "../components/layout/user/deleteUser";
import EditUserModal from "../components/layout/user/editUser";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
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
                    <Button type="default" onClick={() => handleEdit(record)}>Edit</Button>
                    <UserDeleteButton user={record} onDelete={handleDelete} />
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