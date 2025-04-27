import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, notification, Row, Typography, Upload } from 'antd';
import { createSystemApiWithImage } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import MenuPage from '../menu';

const CreateSystem = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const res = await createSystemApiWithImage(values, file);
        console.log("res: ", res);
        if (res) {
            notification.success({
                message: "CREATE SYSTEM",
                description: "Success"
            });
            navigate("/system");
        } else {
            notification.error({
                message: "CREATE SYSTEM",
                description: "Error"
            });
        }
    };

    const propsUpload = {
        beforeUpload: (file) => {
            setFile(file); // save file to state
            return false; // prevent auto upload by Upload component
        },
        maxCount: 1,
    };

    return (
        <Row gutter={0}>
            <Col span={6}>
                <MenuPage
                    defaultSelectedKeys={["6"]}
                    defaultOpenKeys={["sub3"]}
                />
            </Col>
            <Col span={18} style={{ padding: 16 }}>
                <Typography.Title level={3}>Create New System</Typography.Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the system name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Link Access" name="linkAccess">
                        <Input placeholder="https://..." />
                    </Form.Item>

                    <Form.Item label="Link Instruction" name="linkInstruct">
                        <Input placeholder="https://..." />
                    </Form.Item>

                    <Form.Item label="Managing Unit" name="managingUnit">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Contact Point" name="contactPoint">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Upload Image">
                        <Upload {...propsUpload} showUploadList={{ showRemoveIcon: true }}>
                            <Button icon={<UploadOutlined />}>Select Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>

                <Divider />
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/system')}>
                    Back to System List
                </Button>
            </Col>
        </Row>
    );
};

export default CreateSystem;
