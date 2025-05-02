// src/pages/system/CreateSystem.jsx
import React, { useState } from 'react';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Select,
    Typography,
    notification,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MenuPage from '../menu';
import { addTagToSystemApi, createSystemApiWithImage, getTagApi, uploadSystemDocumentApi } from '../../../utils/api';
import UploadImageAndDocument from '../system/uploadFileImageDoc';
import { useEffect } from 'react';

const CreateSystem = () => {
    const [tagOptions, setTagOptions] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [documentFile, setDocumentFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            const res = await getTagApi();
            if (res) {
                setTagOptions(res.map(tag => ({ label: tag.name, value: tag._id })));
            }
        };
        fetchTags();
    }, []);

    const onFinish = async (values) => {
        const res = await createSystemApiWithImage(values, file);
        if (res) {
            if (selectedTags.length > 0) {
                for (const tagId of selectedTags) {
                    await addTagToSystemApi(res._id, tagId);
                }
            }
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

                    <Form.Item label="Tags">
                        <Select
                            mode="multiple"
                            placeholder="Select tags"
                            options={tagOptions}
                            onChange={(value) => setSelectedTags(value)}
                        />
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
