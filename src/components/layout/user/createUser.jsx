import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row, Typography } from 'antd';
import { createUserApi } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPage from '../menu';

const CreateUser = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { name, email, password } = values;
        const res = await createUserApi(name, email, password);

        if (res) {
            notification.success({
                message: "CREATE USER",
                description: "Success"
            });
            navigate("/user");
        } else {
            notification.error({
                message: "CREATE USER",
                description: "Error"
            });
        }
    };

    return (
        <Row gutter={0}>
            <Col span={6}>
                <MenuPage
                    defaultSelectedKeys={["2"]}
                    defaultOpenKeys={["sub1"]}
                />
            </Col>
            <Col span={18} style={{ padding: 16 }}>
                <Typography.Title level={3}>Create New User</Typography.Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
                <Divider />
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/user')}>Back to User List</Button>
            </Col>
        </Row>
    );
};

export default CreateUser;
