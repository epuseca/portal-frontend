// src/pages/system/CreateSystem.jsx
import React, { useState } from 'react';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Typography,
    notification,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MenuPage from '../menu';
import { createSystemApiWithImage, uploadSystemDocumentApi } from '../../../utils/api';
import UploadImageAndDocument from '../system/uploadFileImageDoc';

const CreateSystem = () => {
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [documentFile, setDocumentFile] = useState(null);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const res = await createSystemApiWithImage(values, file);
        if (res) {
            if (documentFile) {
                await uploadSystemDocumentApi(res._id, documentFile);
            }
            notification.success({ message: "CREATE SYSTEM", description: "Success" });
            navigate("/system");
        } else {
            notification.error({ message: "CREATE SYSTEM", description: "Error" });
        }
    };

    return (
        <Row gutter={0}>
            <Col span={6}>
                <MenuPage defaultSelectedKeys={["6"]} defaultOpenKeys={["sub3"]} />
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
                    <Form.Item>
                        <UploadImageAndDocument
                            fileList={fileList}
                            setFileList={setFileList}
                            setImageFile={setFile}
                            documentFile={documentFile}
                            setDocumentFile={setDocumentFile}
                        />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Link Access" name="linkAccess">
                        <Input placeholder="https://..." />
                    </Form.Item>
                    <Form.Item label="Managing Unit" name="managingUnit">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Contact Point" name="contactPoint">
                        <Input />
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
