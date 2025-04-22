import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row, Typography } from 'antd';
import { createTagApi } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPage from '../menu';

const CreateTag = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { name, description } = values;
        const res = await createTagApi(name, description);
        console.log("res: ", res)
        if (res) {
            notification.success({
                message: "CREATE TAG",
                description: "Success"
            });
            navigate("/tag");
        } else {
            notification.error({
                message: "CREATE TAG",
                description: "Error"
            });
        }
    };

    return (
        <Row gutter={0}>
            <Col span={6}>
                <MenuPage
                    defaultSelectedKeys={["4"]}
                    defaultOpenKeys={["sub2"]}
                />
            </Col>
            <Col span={18} style={{ padding: 16 }}>
                <Typography.Title level={3}>Create New Tag</Typography.Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the tag name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
                <Divider />
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/tag')}>Back to Tag List</Button>
            </Col>
        </Row>
    );
};

export default CreateTag;
